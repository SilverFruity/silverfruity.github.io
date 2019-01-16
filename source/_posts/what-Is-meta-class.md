---
layout: post
title: Objectivce-C中的meta-class是什么
date: 2017-3-20
category: 
- 翻译
tags:
- iOS
- Runtime
---

*Copyright 2010 Matt Gallagher: [cocoawithlove.com](https://cocoawithlove.com).*

原文: [What is a meta-class in Objective-C?](http://www.cocoawithlove.com/2010/01/what-is-meta-class-in-objective-c.html). 本文由原作者授权翻译

在这篇文章中，我着重讲解Objective-C中的一个陌生的概念 - meta-class。Objective-C中的每个类都有一个与之关联的`meta-class`，但因为你很少直接使用它，它才会对你显得如此神秘。我将从如何使用runtime机制创建一个类说起。通过检查 objc_allocateClassPair 函数创建出的 "class pair" ，我将解释什么是meta-class，也会解释一些普遍存在的问题：在Objective-C中，meta-class 对一个对象或者一个类有着怎样的意义?
<!-- more -->

### 在程序运行的时候创建一个类
在程序运行的时候,下面的代码创建了一个`NSError`的子类，并给它添加了一个方法。

```objc
Class newClass = objc_allocateClassPair([NSError class], "RuntimeErrorSubclass", 0);
class_addMethod(newClass, @selector(report), (IMP)ReportFunction, "v@:");
objc_registerClassPair(newClass);
```

这个被添加的方法使用`ReportFunction`函数作为它的实现。`ReportFunction`函数的定义如下:

```objc
void ReportFunction(id self, SEL _cmd)
{
    NSLog(@"This object is %p.", self);
    NSLog(@"Class is %@, and super is %@.", [self class], [self superclass]);
    Class currentClass = [self class];
    for (int i = 1; i < 5; i++)
    {
        NSLog(@"Following the isa pointer %d times gives %p", i, currentClass);
        currentClass = object_getClass(currentClass);
    }
    NSLog(@"NSObject's class is %p", [NSObject class]);
    NSLog(@"NSObject's meta class is %p", object_getClass([NSObject class]));
}
```

表面上来看,这一切都很简单。

 因为在程序运行的时候创建一个类只需要这三个简单的步骤:
>
1. 为`class pair`开辟内存空间(使用`objc_allocateClassPair`).
2. 按照函数所需要,去给类添加方法和成员变量(我已经使用`class_addMethod`添加了一个方法)
3. 注册这个类,以便能够使用它(使用 `objc_registerClassPair`).

但是，现在的问题是：什么是`class pair`? `objc_allocateClassPair`函数只返回了一个值: 类。那这个`class pair`的另一半又在哪呢？我相信你已经猜到了:`class pair`的另一半就是`meta-class`（它是这篇文章的标题），但我需要向你解释它是什么,为什么你需要它，我将会给出一些Objectivce-C中的类和对象的背景。

### 让一个数据结构变成一个对象，需要些什么?

每一个对象都有一个类，这是面对对象的基本概念，但是在Objectivce-C中，它也是数据的基本组成部分(每个对象都拥有一个指向类结构体的指针)。任何 拥有一个指向在正确位置的类的指针 的数据结构都可以被视为一个对象。

在Objectivce-C中，一个对象的类被一个`isa`指针所决定。这个`isa`指针指向对象的类。

实际上，在Objectivce-C中，一个对象的基础定义是这样的:

 ```objc
 typedef struct objc_object {
    Class isa;
} *id;
 ```

👆这个定义说明:任何一个 以指向一个`Class`结构体的指针 开始的结构体都能够被视为一个对象。

在Objectivce-C中，对象最重要的功能就是我们能够给它们发送消息:

```objc
[@"stringValue" writeToFile:@"/file.txt" atomically:YES encoding:NSUTF8StringEncoding error:NULL];
```

这段代码之所以会执行,是因为当你向一个OC对象发送一个消息的时候(像这里的`NSCFString`),runtime机制会沿着对象的`isa`指针去获取对象的`Class`(在这里是`NSCFString`类)。接着,这个`Class`包含了一个适用于该类的所有对象的方法列表(拥有所有对象方法的列表)和一个指向超类的指针(用于查阅继承的方法)。由于获取到了对象对应的`Class`,这时,运行时机制会为了找到一个和消息选择器匹配的方法，浏览在`Class`和`superclass`上的方法列表(在上述情况下,`writeToFile:atomically:encoding:error`是在`NSString`的方法列表上的)。接着,runtime机制会执行这个方法对应的实现函数(`IMP`)。

重要的一点是: `Class`定义了你能够发送给对象的消息(对象方法列表)。

### 什么是`meta-Class`?

现在,像你所知道的: 一个`Class`在Objectivce-C中也是一个对象。这个就意味着你也能够给一个`Class`发送消息。

```objc
NSStringEncoding defaultStringEncoding = [NSString defaultStringEncoding];
```

在这里,`defaultStringEncoding`被发送给了`NSString`类.

这段代码之所以会执行，是因为在Objectivce-C中每一个`Class`其本质上也是一个对象.这就意味着`Class`结构体必须是以一个`isa`指针开始的结构体,以至于它与我上面显示的`objc_object`结构体是二进制兼容的,并且下一个在结构体中的字段必须是一个指向`superclass`的指针(或者对于基本类来说就是nil).

[像我上周展示的一样](http://www.cocoawithlove.com/2010/01/getting-subclasses-of-objective-c-class.html),这里有几种不同定义`Class`的方式,这取决于你所运行的`runtime`的版本,但是,它们都是以一个`isa`字段开头,后跟一个`superclass`字段。

```objc
typedef struct objc_class *Class;
struct objc_class {
    Class isa;
    Class super_class;
    /* followed by runtime specific details... */
};
```

但是,为了让我们能在`Class`上执行一个方法,`Class`的`isa`指针必须指向一个`Class`结构体, 并且这个`Class`结构体必须包含了能够让我们在类上执行方法的方法列表(类方法列表).

这就引出了`meta-class`的定义: `meta-class`是一个`Class`对象的类.

简而言之:
 * 当你给一个`对象`发送消息的时候,runtime机制会在对象的类对象的方法列表中查找该消息.
 * 当你给一个`类`发送消息的时候,runtime机制会在类对象的`meta-class`的方法列表中查找该消息.

`meta-class`是必须存在的,因为它为一个`Class`保存了该类的类方法。
对于每一个`Class`来说,都必须有一个独一无二的`meta-class`,因为每一个`Class`都有一个可能独一无二的类方法列表.

### 那`meta-class`的类的是什么呢?
`meta-class`像之前的`Class`一样,它也是一个对象.这就意味着你同样能够在它之上执行方法。那它也理所当然的必须属于一个类(`isa`指针)。

所有的`meta-class`使用基础类的`meta-class`(在它们继承体系的顶层的类的`meta-class`)作为它们的类。这就意味着所有继承自`NSObject`的类的`meta-class`的`Class`(`isa`指针)是`NSObject`的`meta-class`.

遵循这样的规则:所有的`meta-class`都使用基本类的`meta-class`作为它们的类(`isa`指针),任何基本(顶层)的`meta-class`的`Class`(`isa`指针)都将是它们自身(它们的`isa`始终指向自身).这就意味着`NSObject`的`meta-class`的`isa`指针是指向它自身的(它是它自身的实例).

### `meta-class`和`Class`的继承
 相同的是`Class`使用`super_class`指针指向其父类`Class`,`meta-class`使用自身的`super_class`指针指向`Class`的`super_class`的`meta-class`。(此处`meta-class->super_class` = `class->super_class->meta-class`)

 还有个奇葩就是,基类的`meta-class`(`isa`)的`super_class`指向的是基类本身.

 这样的继承体系导致的结果就是所有的实例,类和meta-class都继承自基类.

 对于所有在`NSObject`体系下的实例,类和meta-class的来说，`NSObject`的所有的对象方法对它们来说都是有效的。对于类和meta-class来说,所有的`NSObject`的类方法是有效的。

### 通过实验证明以上观点
为了证明以上观点,让我们看看我在文章开头给出的`ReportFunction`函数的输出吧.这个函数的目的是沿着`isa`指针并且打印它找到的是什么.

为了执行`ReportFunction`函数,我们需要创建一个动态创建的类的实例并且执行`report`对象方法.

```objc
id instanceOfNewClass = [[newClass alloc] initWithDomain:@"someDomain" code:0 userInfo:nil];
[instanceOfNewClass performSelector:@selector(report)];
//[instanceOfNewClass release];
```

因为这里并没有声明`report`方法,所以我为了编译器不会给出一个警告，使用`performSelector:`去执行它.

现在`ReportFunction`将会遍历所有的isa指针并且告诉我们什么对象被用作`Class`,`meta-Class`和`meta-Class`的类

>
获取一个对象的类: `ReportFunction`使用`object_getClass`去得到`isa`指针,应为`isa`是类的保护成员(你不能直接的访问其他对象的`isa`指针).`ReportFunction`没有使用`class`方法的原因是: 在一个类对象上执行`class`方法不会返回`meta-Class`，它始终都只会返回`Class`(所以`[NSString class]会返回`NSString`类而不是`NSString`的`meta-class`).

这是NSObject的class对象方法和类方法的实现:
{% asset_img instance-class-meta_class-02.png %}

当程序运行的时候,这是它的输出(去掉了`NSlog`的前缀):

```objc
This object is 0x10010c810.
Class is RuntimeErrorSubclass, and super is NSError.
Following the isa pointer 1 times gives 0x10010c600
Following the isa pointer 2 times gives 0x10010c630
Following the isa pointer 3 times gives 0x7fff71038480
Following the isa pointer 4 times gives 0x7fff71038480
NSObject's class is 0x7fff710384a8
NSObject's meta class is 0x7fff71038480
```

看着下面通过反复沿着`isa`指针到达的内存地址:
* 对象的地址是`0x10010c810`
* 类的地址是`0x10010c600`
* `meta-class`的地址为`0x10010c630`
* `meta-class`的`Class`(即`NSObject`的`meta-class`)的地址为`0x7fff71038480`
* `NSObject`的`meta-class`的`Class`的地址是它本身的地址

地址的值除了显示了我们之前讨论的从类到`meta-class`再到`NSObject`的`meta-class`的进展以外,其他的都并不重要.


### 结论
`meta-class`是一个`Class`对象的类.每一个`Class`都有一个自己的独特`meta-class`(因为每个`Class`有着自己的独特的方法列表).这就意味着所有的`Class`对象都各不相同.

`meta-class`总是会确保`Class`对象拥有在层级的顶层的基类(NSObject)的对象方法和类方法,再加上基类到当前类之前的类的类方法。对于继承自`NSObject`的类来说,`NSObject`的对象和协议方法是定义给所有的`Class`(和`meta-class`)对象.

✍️ ：在层级顶层的NSObject的`meta-class`的`superclass`指针是指向`NSObject`的类对象的,所以继承自`NSObject`的类的`meta-class`中会包含有`NSObject`所有的对象方法和类方法。
>
原文:The meta-class will always ensure that the `Class` object has all the instance and class methods of the base class in the hierarchy, plus all of the class methods in-between. For classes descended from `NSObject`, this means that all the `NSObject` instance and protocol methods are defined for all `Class` (and meta-class) objects.

所有的`meta-class`都使用基类的`meta-class`(在`NSObject`继承体系下,是`NSObject`的`meta-class`)作为他们的类,也包括了在运行时机制中唯一自定义的基础级的`meta-class`.

---

补充:

[iOS类型编码](https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/ObjCRuntimeGuide/Articles/ocrtTypeEncodings.html)
> id Class meta-class 之间的关系

{% asset_img instance-class-meta_class-01.png %}