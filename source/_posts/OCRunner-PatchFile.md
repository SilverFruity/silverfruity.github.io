---
layout: post
title: OCRunner - 二进制补丁文件的实现
date: 2021-3-9 18:00:49
category: 
- OpenSource
tags: 
- hotfix
- iOS
- Objective-C
---

二进制补丁的主要目的是优化JSON补丁，所以先从JSON补丁说起。

## 前言

OCRunner 最初的时候是打算只使用 Json 补丁的，可当在我能力范围内对JSON补丁进行了压缩以后，发现 Json 补丁的大小仍不能接受的，太多的冗余字符了。在我思考了一段时间后，发现可以使用 Json 补丁的数据结构，以二进制数据的形式来消除这些冗余字符，大幅降低补丁的大小，所以二进制补丁的初衷是为了优化 Json 补丁的冗余字符，所以我们将先从 Json 补丁说起。

<!-- more -->

## Json 补丁

Json 补丁中，每个语法节点对象均拥 className 字段以及所有的属性变量。最后由它们的数组一起构成了语法树。

### 最初的 Json 补丁

示例:

```
int a = 1;
```

使用 oc2mangoLib 输出的语法树结构:

```
ORDeclareExpression:
    | ORTypeVarPair: pair
      | ORTypeSpecial: type
        | type: TypeInt
        | name: nil
      | ORVariable: var
        | isBlock: NO
        | ptCount: 0
        | varname: @"a"
    | modifier: DeclarationModifierNone
    | ORValueExpression: expression
      | value_type: OCValueInt
      | value: @"1"
```

未做任何压缩时，生成的最原始的 Json 补丁:

```
{
  "className": "ORDeclareExpression",
  "pair": {
    "className": "ORTypeVarPair",
    "type": {
      "className": "ORTypeSpecial",
      "type": 9
    },
    "var": {
      "className": "ORVariable",
      "ptCount": 0,
      "varname": "a",
      "isBlock": 0
    }
  }，
  "modifier": 0,
  "expression": {
    "className": "ORValueExpression",
    "value_type": 10,
    "value": "1"
  }
}
```

这个时候的补丁确实是清晰易懂的。但是当代码量增大的时候，天灵盖都会被给炸了。

对比一下大小情况: 

`int a = 1;`: 10个字符。

Json 补丁大小:  277字符，直接28倍 -. -。

### 第一次优化补丁大小:  使用映射表

观察上一步的 Json 补丁，你就可以发现，数据量的增加主要来源于类名，字段名。

那有没有办法压缩这两个数据并尽量将这两个数据压缩为长度为1的字符串呢？

首先语法树中，节点的类都是已知的，都存在于RunnerClasses.h文件中，并且每个类都有自己的属性列表。

因此我们可以将类名替换为当前类在 RunnerClasses.h 文件中所在序号，属性名替换为属性在类中的序号。

这个压缩过程，可以是一个简单的加解密过程，使用映射表替换就可以了。

加密过程：

1. 将类名替换为类的序号。
2. 将类中的属性名替换为在当前类中的序号。 第一个属性就是0，第二个就是1。

解密过程：

1. 将类序号转换为类名。
2. 将属性序号转换为当前类的属性名。

{% asset_img  JsonPatchEncrypt.png %}

这是将上一步的JSON补丁压缩后的内容:

```
{"1":{"n":"3","0":{"n":"1","0":9},"1":{"1":0,"n":"2","2":"a","0":0}},"n":"13","2":{"n":"7","0":10,"1":"1"},"0":0}
```

**结果：**

- 经过这轮压缩，总字符数缩减到了113个，和之前相比，缩小了3倍。

**关于如何生成映射表**：

在 OCRunnerClasses.h 文件中，根据每个类出现的顺序即可生成对应的枚举值，属性的序号值也是同理。具体实现在 **GeneralCryptoMapTool.py** 中，ORPatchFile 中 Json 补丁的加密解密文件 ClassDecryptMap.json 和 ClassEncryptMap.json 都是由它生成的（现在是 ClassSecretKeyMap.h ），**GeneralCryptoMapTool.py** 主要使用的是正则表达式来匹配类和属性，你可以修改其中的代码来实现你自己关于压缩的想法。

### 第二次优化补丁大小:  使用字符串表

**目的:**

解决补丁中字符串的重复使用。

**问题:**

如果代码中出现多次为'xxxxxx'的字符串，在补丁中也会出现多次'xxxxxx'的字符串。 当代码量变大时，这会是导致包体积变大的主要因素。

**解决办法:**

这个时候突然联想到了 Mach-O 中的字符串表（不知道该不该这么称呼）。有了这个思路，那么这里完全就可以修改为：补丁中有一个数组专用于存放字符串，而在节点中，所有对该字符串的引用，使用's|index'的形式来实现（其实最好是直接使用该字符串在数组中的 index ，但你在 Json 中直接使用 Int 的话，就没法区分这是一个字符串引用了）。

**最后结果**:

```
// 优化前
{
  "nodes": [
    {"1":0,"n":"2","2":"NSObject","0":0},
    {"1":0,"n":"2","2":"NSObject","0":0},
    {"1":0,"n":"2","2":"a","0":0}
  ]
}

// 优化后
{
  "nodes": [
    {"1":0,"n":"2","2":"s|0","0":0},
    {"1":0,"n":"2","2":"s|0","0":0},
    {"1":0,"n":"2","2":"s|1","0":0}
  ]
  "strings": ["NSObject","a"]
}
```

### Json 补丁优化后的反思

两次优化以后，使用 oc2mango 中的 TestFiles 进行测试后，发现生成的补丁仍然不能够接受.

1. 源文件大小 38 KB，Json 补丁大小 102 KB，仍然是2.7的样子.
2. 由于补丁文件中 Json 对象和字符串过多，从而使`{}"":`符号过多重复。这几个符号简直撑起了一片天☁️。
3. 能否将这些无用的符号干掉？能否更好的压缩数据：比如节点类型字段我只想让它占一个字节？这就是实现二进制补丁的起因。



## 二进制补丁

🎉欢迎来到二进制补丁，快乐频道（作者哭泣频道）。

二进制补丁就是为了优化 Json 补丁而出现的，主要为了移除 Json 中的`[]{}:"key`等字符（也算是压缩 Json 吧）。

### 二进制补丁内存布局

二进制补丁的核心是将整个语法树转换为全是基础类型数据的内存。

序列化和反序列化的过程，是树的遍历，但是遍历顺序是严格依照结构体成员顺序完成的。

并且每遇见一个节点，节点的基础类型成员需要写入内存或从内存中读取，子节点继续进入这个过程，直至没有子节点。一切都是为了能够完成类似 Json 的内存布局。

#### 结构体约定:

- 内存对齐值必须为1

- 第一个字节始终为节点类型

- 前置所有基本数据类型的结构体成员

- 每个结构体有一个静态变量，表明该结构体所有基础类型数据的长度: _xxxxNodeBaseLength。

  这个变量的作用，主要是为了后续的代码生成，统一结构体对内存的读写。

  {% asset_img StructMemeryLayout.png %}

#### 又是 int a = 1; 

```
// 同样使用JSON补丁中的例子 int a = 1; 生成的JSON文件
// 根据结构体的约定，已将JSON数据的顺序调整过
{"className":"ORDeclareExpression","modifier":0,"pair":{"className":"ORTypeVarPair","type":{"className":"ORTypeSpecial","type":9,"name":null},"var":{"className":"ORVariable","isBlock":0,"ptCount":0,"varname":"a"}},"expression":{"className":"ORValueExpression","value_type":10,"value":"1"}}
// 移除JSON中的 " 以及 key
{ORDeclareExpression,0,{ORTypeVarPair,{ORTypeSpecial,9,null},{ORVariable,0,0,"a"}},{ORValueExpression,10,"1"}}
//这不就是一个结构体吗😂
//就算出现嵌套，最终它也是一块连续的内存，相当于在栈上的结构体嵌套
//那把整个语法树拍平了，一样能够放进一块内存

//移除内部的{}后，其实就是补丁文件最终的内存布局
{ORDeclareExpression,0,ORTypeVarPair,ORTypeSpecial,9,null,ORVariable,0,0,"a",ORValueExpression,10,"1"}
//替换为_NodeType，内存大小为 41 字节
{_ORDeclareExpressionNode,0,_ORTypeVarPairNode,_ORTypeSpecialNode,9,null,_ORVariableNode,0,0,"a",_ORValueExpressionNode,10,"1"}
```

他们的结构转换如图所示:

{% asset_img json2binary.png %}

我们将下面这个例子，解释二进制补丁核心的序列化和反序列化。

#### 相关的结构体

```
// 使用预编译的方式实现继承，所有结构体的第一个字节为节点类型
#define _ORNodeFields \
uint8_t nodeType;

typedef struct {
    _ORNodeFields
}_ORNode; // nil

typedef struct {
    _ORNodeFields
    uint32_t modifier;
    _ORNode * pair;
    _ORNode * expression;
}_ORDeclareExpression;
static uint32_t _ORDeclareExpressionBaseLength = 5; // int a = 1

typedef struct {
    _ORNodeFields
    _ORNode * type;
    _ORNode * var;
}_ORTypeVarPair;
static uint32_t _ORTypeVarPairBaseLength = 1; // int a

typedef struct {
    _ORNodeFields
    uint32_t type;
    _StringNode * name;
}_ORTypeSpecial;
static uint32_t _ORTypeSpecialBaseLength = 5; // int 

typedef struct {
    _ORNodeFields
    BOOL isBlock;
    uint32_t ptCount;
    _StringNode * varname;
}_ORVariable;
static uint32_t _ORVariableBaseLength = 6;// a

typedef struct {
    _ORNodeFields
    uint32_t value_type;
    _ORNode * value;
}_ORValueExpression; // 1
static uint32_t _ORValueExpressionBaseLength = 5;

typedef struct {
    _ORNodeFields
    uint32_t offset;
    uint32_t strLen;
}_StringNode;
static uint32_t _StringNodeBaseLength = 9; // 字符串：变量名等
```

已知将`int a = 1;`的语法树转换为结构体表示后，语法树:

```
_ORDeclareExpression:
    | nodeType: _ORDeclareExpressionNode // uint8: 1字节
    | modifier: 0 // uint32: 4字节
    | _ORTypeVarPair: pair // _ORNode *
      | nodeType: _ORTypeVarPairNode // uint8: 1字节
      | _ORTypeSpecial: type // _ORNode *
        | nodeType: _ORTypeSpecialNode // uint8: 1字节
        | type: 9 // uint32: 4字节
        | name: nil //值为nil时，使用_ORNode结构体（uint8）替换，1字节
      | _ORVariable: var // _ORNode *
        | nodeType: _ORVariableNode // uint8: 1字节
        | isBlock: 0 // BOOL: 1字节
        | ptCount: 0  // uint32: 4字节
        | varname: @"a" //值为NSString时，使用_StringNode替换，9字节大小固定
    | _ORValueExpression: expression // _ORNode *
      | nodeType: _ORValueExpressionNode // uint8: 1字节
      | value_type: 10 // uint32:4字节
      | value: @"1" //值为NSString时，使用_StringNode替换，9字节大小固定
```

根据上述结果，我们可以计算出`int a = 1`在二进制补丁中的大小为41字节。

**最终目标:**

在一块41字节大小的内存中，存储的数据需要如下

```
//将nil和NSString替换为_ORNode和_StringNode后
{_ORDeclareExpressionNode,0,_ORTypeVarPairNode,_ORTypeSpecialNode,9,ORNodeType,_ORVariableNode,0,0,StringNodeType,0,0,_ORValueExpressionNode,10,StringNodeType,0,0}
//冒号后的是字节大小
{
_ORDeclareExpressionNode: 1,
0: 4,
_ORTypeVarPairNode: 1,
_ORTypeSpecialNode: 1,
9: 4,
ORNodeType: 1,
_ORVariableNode: 1,
0: 1,
0: 4,
StringNodeType: 1,
0: 4,
0: 4,
_ORValueExpressionNode: 1,
10: 4,
StringNodeType: 1,
0: 4,
0: 4
}
```

为了完成上述目标，`int a = 1;`语法树的序列化代码如下:

```
// 其实每个结构体的基本类型数据的读/写都是一样的，只是命名不同而已
// 如果有一个针对节点进行汇总处理的函数，这些代码是完全可以自动生成的

_ORDeclareExpression *declareExpNode;
void *buffer = malloc(41);
uint32_t cursor = 0;
//将_ORDeclareExpression的基本类型数据复制到内存中
memcpy(buffer, declareExpNode, _ORDeclareExpressionBaseLength);
//设置buffer的偏移量
cursor += _ORDeclareExpressionBaseLength; // cursor = 0 + 5 = 5
//buffer的[0,1)字节的值为_ORDeclareExpressionNode: uint8
//buffer的[1,5)字节的值为0: uint32

{
  _ORTypeVarPair *varPair = declareExpNode->pair;
  memcpy(buffer + cursor, varPair, _ORTypeVarPairBaseLength);
  cursor += _ORTypeVarPairBaseLength; // cursor = 5 + 1 = 6
  //buffer的[5,6)字节的值为_ORTypeVarPairNode: uint8

  _ORTypeSpecial *typeSpecail = varPair->type;
  memcpy(buffer + cursor, typeSpecail, _ORTypeSpecialBaseLength);
  cursor += _ORTypeSpecialBaseLength; // cursor = 6 + 5 = 11
  //buffer的[6,7)字节的值为_ORTypeSpecialNode: uint8
  //buffer的[7,11)字节的值为9: uint32

  _ORNode *typeName = varPair->name;
  memcpy(buffer + cursor, typeSpecail, _ORNodeBaseLength);
  cursor += _ORNodeBaseLength; // cursor = 11 + 1 = 12
  //buffer的[11,12)字节的值为ORNodeType: uint8
  
  {
      _ORVariable *variable = varPair->var;
   		memcpy(buffer + cursor, variable, _ORVariableBaseLength);
	    cursor += _ORVariableBaseLength; // cursor = 12 + 6 = 18
      //buffer的[12,13)字节的值为_ORVariableNode: uint8
      //buffer的[13,14)字节的值为0: BOOL
      //buffer的[14,18)字节的值为0: uint32

      _StringNode *variableName = variable->varname;
      memcpy(buffer + cursor, variableName, _StringNodeBaseLength);
      cursor += _StringNodeBaseLength;// cursor = 18 + 9 = 27
      //buffer的[18,19)字节的值为StringNodeType: uint8
      //buffer的[19,23)字节的值为0: uint32
      //buffer的[23,27)字节的值为0: uint32
  }
}

{
  _ORValueExpression *vlaueExp = declareExpNode->expression;
  memcpy(buffer + cursor, vlaueExp, _ORVariableBaseLength);
  cursor += _ORVariableBaseLength;// cursor = 27 + 5 = 32
  //buffer的[27,28)字节的值为_ORValueExpression: uint8
  //buffer的[28,32)字节的值为10: uint32

  _StringNode *stringNode = vlaueExp->value;
  memcpy(buffer + cursor, variable, _StringNodeBaseLength);
  cursor += _StringNodeBaseLength;// cursor = 32 + 9 = 41
  //buffer的[32,33)字节的值为StringNodeType: uint8
  //buffer的[33,37)字节的值为0: uint32
  //buffer的[37,41)字节的值为0: uint32
}
```

反序列化就是上面的反向操作了

```
//1.直接获取内存当前位置的第一个字节，用于判断节点类型
//2.根据节点类型，进入相关结构体的反序列化函数
//3.根据节点的基本类型数据的长度，从内存中读取相应长度的数据，增加游标
//4.根据所有子节点的顺序，依次回到第一步 (什么是子节点？类型是_ORNode *的结构体成员就是子节点了)
```

序列化：最后使用写入完成后的buffer初始化NSData，并将NSData写入到文件即可。

反序列化:  用NSData加载文件，并使用bytes生成_ORPatchFile。

### 代码生成

**BinaryPatchHelper.h/.m** 中的代码，除去**_ORNode, _ListNode, _StringsNode, _StringNode, _PatchNode**和相关函数外，其余代码皆由 **BinaryPatchCodeGenerator** 生成。

**BinaryPatchCodeGenerator** 使用 **oc2mangoLib** 将 **RunnerClasses.h** 解析为语法树，根据文件存在的类，生成相应的结构体代码，以及 转换、反转换、序列化、反序列化和销毁，一共5个函数。并且针对类型为NSUInteger、NSArray、NSString的属性，分别转换为 uint32_t、_ListNode 和 _StringNode。

参照如下例子:

```
@interface ORTypeSpecial: ORNode
@property (nonatomic, assign) TypeKind type;
@property (nonatomic, nullable, copy) NSString * name;
@end
//结构体名："_" + 类名
//结构体基础类型字段总和长度："_" + 类名 + "BaseLength"
//字段数量和名字：和类中的属性完全相同
typedef struct {
    _ORNodeFields
    uint32_t type;
    _StringNode * name;
}_ORTypeSpecial;
static uint32_t _ORTypeSpecialBaseLength = 5;
_ORTypeSpecial *_ORTypeSpecialConvert(ORTypeSpecial *exp, _PatchNode *patch, uint32_t *length);
ORTypeSpecial *_ORTypeSpecialDeConvert(_ORTypeSpecial *node, _PatchNode *patch);
void _ORTypeSpecialSerailization(_ORTypeSpecial *node, void *buffer, uint32_t *cursor);
_ORTypeSpecial *_ORTypeSpecialDeserialization(void *buffer, uint32_t *cursor, uint32_t bufferLength);
void _ORTypeSpecialDestroy(_ORTypeSpecial *node);
```

下列约定，主要用于序列化和反序列化的代码生成。

#### 节点序列化约定:

每个节点结构体的序列化函数，使用BaseLength值，将所有的基础类型的数据写入buffer。子节点的序列化同样使用这个规则。

- 每个结构体需实现自身的序列化函数

```
void \(structName)Serailization(\(structName) *node, void *buffer, uint32_t *cursor)
```

- 将所有基础类型数据写入内存时，采用如下方式

```
memcpy(buffer + *cursor, node, \(structName)BaseLength);
*cursor += \(structName)BaseLength;
```

- 针对复合类型字段，需要严格按照结构体成员的顺序写入内存。

```
typedef struct {
    _ORNodeFields
    _ORNode * type;
    _ORNode * var;
}_ORTypeVarPair;
static uint32_t _ORTypeVarPairBaseLength = 1;
void _ORTypeVarPairSerailization(_ORTypeVarPair *node, void *buffer, uint32_t *cursor){
    memcpy(buffer + *cursor, node, _ORTypeVarPairBaseLength);
    *cursor += _ORTypeVarPairBaseLength;
    _ORNodeSerailization((_ORNode *)node->type, buffer, cursor);
    _ORNodeSerailization((_ORNode *)node->var, buffer, cursor);
}
```

- 使用统一的入口，将结构体的基础类型数据写入内存。根据类型对应的结构体，使用该结构体的序列化函数

```
void _ORNodeSerailization(_ORNode *node, void *buffer, uint32_t *cursor){
	  if (node->nodeType == ORNodeType) {
        memcpy(buffer + *cursor, node, \(_ORNodeLength));
        *cursor += \(_ORNodeLength);
  	}else if
  	...
  	//各个节点类型判断，根据类型使用相应的序列化函数
}
```



#### 节点反序列化约定:

每个节点结构体的反序列化函数，使用BaseLength值，从buffer中读取所有的基础类型的数据，然后复制到结构体中。子节点的反序列化同样使用这个规则。

- 每个结构体需实现自身的反序列化函数

```
\(structName) *\(structName)Deserialization(void *buffer, uint32_t *cursor, uint32_t bufferLength)
```

- 从内存中将所有的基本类型数据保存到结构体时，采用如下方式

```
\(structName) *node = malloc(sizeof(\(structName)));
memcpy(node, buffer + *cursor, \(structName)BaseLength);
```

- 针对复合类型字段，需要严格按照结构体成员的顺序从内存中读取。

```
typedef struct {
    _ORNodeFields
    _ORNode * type;
    _ORNode * var;
}_ORTypeVarPair;
static uint32_t _ORTypeVarPairBaseLength = 1;
_ORTypeVarPair *_ORTypeVarPairDeserialization(void *buffer, uint32_t *cursor, uint32_t bufferLength){
    _ORTypeVarPair *node = malloc(sizeof(_ORTypeVarPair));
    memcpy(node, buffer + *cursor, _ORTypeVarPairBaseLength);
    *cursor += _ORTypeVarPairBaseLength;
    node->type =(_ORNode *) _ORNodeDeserialization(buffer, cursor, bufferLength);
    node->var =(_ORNode *) _ORNodeDeserialization(buffer, cursor, bufferLength);
    return node;
}
```

- 使用统一的入口，将结构体的基础类型数据写入内存。根据类型对应的结构体，使用该结构体的序列化函数

```
_ORNode *_ORNodeDeserialization(void *buffer, uint32_t *cursor, uint32_t bufferLength){
 	  _NodeType nodeType = ORNodeType;
    if (*cursor < bufferLength) {
        nodeType = *(_NodeType *)(buffer + *cursor);
    }
  	...
  	//各个节点类型判断，根据类型使用相应的反序列化函数
}
```



### 自定义的结构体

#### _ORNode

所有节点结构体都继承自**_ORNode**结构体，在内存中，第一个字节的数据，始终是类型字段nodeType: **_NodeType**枚举列表。

```
#define _ORNodeFields \
uint8_t nodeType;

//继承是使用预编译实现
typedef struct {
    _ORNodeFields
}_ORNode;
static uint32_t _ORNodeLength = 1;
```

#### _StringsNode

与JSON补丁中的字符串表类似，但**_StringsNode**结构体不再是一个数组，它拥有一块内存，用来存储所有的字符串，同时它还有这块内存的大小的字段。

```
typedef struct {
    _ORNodeFields
    uint32_t cursor;
    char *buffer;
}_StringsNode;
static uint32_t _StringsNodeBaseLength = 5;
```

#### _StringNode

与**_StringsNode**相配合使用，用于在**_StringsNode->buffer**中，直接定位并获取相应长度的字符串。

```
// StringNode是对NSString的转换。
typedef struct {
    _ORNodeFields
    uint32_t offset;
    uint32_t strLen;
}_StringNode;
static uint32_t _StringNodeBaseLength = 9;
```

使用**_StringNode**获取字符串，如下代码：

```
StringNode node = { StringNodeType, 3, 8 };
StringsNode table = {StringsNodeType, 11, "ABCNSObject"};
NSString *result = stringsNodeGetString(table, node);
result = @"NSObject";
```

在内存中的操作，如图所示:

{% asset_img BinaryPatchStringTable.png %}

#### _ListNode

```
// _ListNode是对NSArray的转换。
typedef struct {
    _ORNodeFields
    uint32_t count;
    _ORNode **nodes;
}_ListNode;
static uint32_t _ListNodeBaseLength = 5;
```

#### _PatchNode

```
// _PatchNode是对ORPatchFile的转换。
typedef struct {
    _ORNodeFields
    BOOL enable;
    _StringsNode *strings;
    _StringNode *appVersion;
    _StringNode *osVersion;
    _ListNode *nodes;
}_PatchNode;
static uint32_t _PatchNodeBaseLength = 2;
```

其他所有结构体相关代码，皆由**BinaryPatchCodeGenerator**生成

## 大小端问题

经测试，macos和iOS均是小端模式，放心使用即可。

## 结尾

说实话，这篇文章差点把我写哭泣，思路真不好理，很多地方我都不知道怎么表达。

大伙们将就着看吧。