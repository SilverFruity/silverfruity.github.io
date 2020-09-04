---
layout: post
title: OCRunner：完全体的iOS热修复方案
date: 2020-9-4 10:57:49
category: 
- OpenSource
tags: 
- hotfix
- iOS
- Objective-C
---

使用[OCRunner](https://github.com/SilverFruity/OCRunner)开发补丁的工作流.

{% asset_img OCRunner_0.jpeg %}

OCRunner与[JSPatch](https://github.com/bang590/JSPatch)，[OCEval](https://github.com/lilidan/OCEval)和[MangoFix](https://github.com/YPLiang19/Mango)等的主要区别:

* 下发二进制补丁文件。增加安全性，减小补丁大小，省去词法分析与语法分析，优化启动时间，可在PatchGenerator阶段进行优化（TODO: 未被调用的函数等信息，将会被过滤）

* 自定义的Arm64 ABI （可以不使用libffi）

* 完整的Objective-C语法支持，除去预编译和部分语法

<!-- more -->

## 本地使用OCRunner运行补丁

[OCRunnerDemo](https://github.com/SilverFruity/OCRunner/tree/master/OCRunnerDemo)可以作为整个流程的参照.

###  1. Cocoapods导入OCRunner
```ruby
pod 'OCRunner'      #支持所有架构，包含libffi.a
# 或者
pod 'OCRunnerArm64' #仅支持 arm64和arm64e，没有libffi.a
```

### 2. 下载 [PatchGenerator](https://github.com/SilverFruity/oc2mango/releases)

解压PatchGenerato.zip，然后将PatchGenerator保存到/usr/bin/或项目目录下.

### 3.  添加PatchGenerator的 `Run Script` 

1. **Project Setting** -> **Build Phases** -> 左上角的 `+` -> `New Run Script Phase`

2. PatchGenerator的路径 **-files** Objective-C源文件列表或者文件夹 **-refs** Objective-C头文件列表或者文件夹 **-output** 输出补丁保存的位置

3. 比如OCRunnerDemo中的`Run Script`

   ```shell
   $SRCROOT/OCRunnerDemo/PatchGenerator -files $SRCROOT/OCRunnerDemo/ViewController1 -refs  $SRCROOT/OCRunnerDemo/Scripts.bundle -output $SRCROOT/OCRunnerDemo/binarypatch
   ```

### 4. 开发环境下: 运行补丁

1. 将生成的补丁文件作为资源文件添加到项目中

2. Appdelegate.m

```objc
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
#if DEBUG
    NSString *patchFilePath = [[NSBundle mainBundle] pathForResource:@"PatchFileName" ofType:nil];
#else
   // download from server
#endif
    [ORInterpreter excuteBinaryPatchFile:patchFilePath];
    return YES;
}
```

3. 每次修改文件，记得Command+B，调用Run Scrip，重新生成补丁文件.

### 5. 正式环境

1. 将补丁上传到服务器
2. App中下载补丁文件并保存到本地
3. 使用**[ORInterpreter excuteBinaryPatchFile:PatchFilePath]** 执行补丁



## 使用介绍



### 1. 引入结构体、枚举、typedef

可以通过修改**OCRunnerDemo**中的**ViewController1**，运行以下代码.

```objc
// 将添加一个名为dispatch_once_t的新类型
typedef NSInteger dispatch_once_t;
// link NSLog
void NSLog(NSString *format, ...);

typedef enum: NSUInteger{
    UIControlEventTouchDown                                         = 1 <<  0,
    UIControlEventTouchDownRepeat                                   = 1 <<  1,
    UIControlEventTouchDragInside                                   = 1 <<  2,
    UIControlEventTouchDragOutside                                  = 1 <<  3,
    UIControlEventTouchDragEnter                                    = 1 <<  4
}UIControlEvents;

int main(){
    UIControlEvents events = UIControlEventTouchDown | UIControlEventTouchDownRepeat;
    if (events & UIControlEventTouchDown){
        NSLog(@"UIControlEventTouchDown");
    }
    NSLog(@"enum test: %lu",events);
    return events;
}
main();
```

**Tips:** 

推荐新建一个文件来放置以上代码，类似于OCRunnerDemo中的UIKitRefrence和GCDRefrence文件，然后使用**PatchGenerator**以**-links**的形式加入补丁生成。作者想偷偷懒，不想再去CV了，头文件太多了😭.



### 2. 使用系统内置C函数

```objc
//you only need to add the C function declaration in Script.
//link NSLog
void NSLog(NSString *format, ...);

//then you can use it in Scrtips.
NSLog(@"test for link function %@", @"xixi");
```

当你运行以上代码时. OCRunner将会使用`ORSearchedFunction` 搜索函数的指针. 

这个过程的核心实现是 `SymbolSearch` (修改自`fishhook`).

如果搜索到的结果是NULL，OCRunner将会自动在控制台打印如下信息:

```objc
|----------------------------------------------|
|❕you need add ⬇️ code in the application file |
|----------------------------------------------|
[ORSystemFunctionTable reg:@"dispatch_source_set_timer" pointer:&dispatch_source_set_timer];
```



### 3. 修复OC对象（类）方法、添加属性

> 小天才英语学习机，不会哪里点哪里

想修复哪个方法，将改方法实现即可，不用实现其他方法.


```objc
@interface ORTestClassProperty:NSObject
@property (nonatomic,copy)NSString *strTypeProperty;
@property (nonatomic,weak)id weakObjectProperty;
@end
@implementation ORTestClassProperty
- (void)otherMethod{
    self.strTypeProperty = @"Mango";
}
- (NSString *)testObjectPropertyTest{
    [self otherMethod];
    return self.strTypeProperty;
}
@end
```



### 4.Block使用、循环引用解决

```objc
// 用于解决循环引用
__weak id object = [NSObject new];
// 最简block声明
void (^a)(void) = ^{
    int b = 0;
};
a();
```



未完待续....

先出去骑摩托了.