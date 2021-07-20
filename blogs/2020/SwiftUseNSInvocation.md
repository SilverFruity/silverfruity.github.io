---
layout: post
title: Swift中使用NSInvocation时遇见的问题
date: 2020-1-04
categories: 
- 笔记
tags: 
- iOS
- Swift
---

这几天被这个坑哭了。

先说说问题。

### 1.返回值莫名其妙的被release

```
做Router时，返回的ViewController，push显示了，结果Xcode给你说，self是nil。黑人问号.jpg
```

解决方式就是判断当前类是否是Swift的类(包含".")，如果是的话Retain一次
```objc
const char * returnType = [signature methodReturnType];
if (self.isSwift && returnValue && strcmp(returnType, @encode(id)) == 0){
    CFRetain((__bridge CFTypeRef)returnValue);
}
```

在10.3.1 11.4 12.4 13.3模拟器测试下，对象都能正常销毁。

### 2.执行时报EXC_BAD_INSTRUCTION ????
<!-- more -->
```
在iOS13上运行得好好的，结果到了 10 11 12上，全崩溃。我差点就疯了。
```

这个问题到解决好，我心路历程还挺多。

1.为啥会崩啊，在13上没问题啊。

2.试试performSelector:withObject，卧槽，也会崩。

3.试试不传参呢，诶，没问题啊，什么鬼啊？

4.不会向返回值一样被release了吧，试试双指针。没用，还是会崩

5.传参的字典key value都是String试试，没问题啊

6.似乎NSDictionary的Value是不是必须是继承自NSObject啊，让模型继承NSObject试试，🐂🍺，没问题了，稳了。

7.需要把所有模型都都继承自NSObject，头疼，还遵循了Hashable协议。要不搞个ArgumentWrapper，字典的每个值都用Wrapper包一层。

8.最终在写demo时，发现第二个问题是参数类型转换失败导致的。demo的单元测试里有。

### 结语

当然最终得出了一个结论，iOS13，遵循了Hashale的类，动态调用能转换为AnyHashable，而iOS13以下不行。直接调用的话，10-13都能转换为AnyHashable。

所以使用时，一定要注意方法的参数类型。别像我一样，被坑得差点哭了。



感兴趣的可以去下载**[NSInvocationDemo](https://github.com/SilverFruity/NSInvocationDemo)**，在单元测试里玩一玩。