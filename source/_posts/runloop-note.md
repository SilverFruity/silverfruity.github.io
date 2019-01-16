---
layout: post
title: RunLoop学习笔记
date: 2017-4-9
category: 
- 笔记
tags: 
- iOS
- RunLoop
---
[图片和有些内容出自 - 深入理解RunLoop](http://blog.ibireme.com/2015/05/18/runloop/)

### RunLoop的内部组成

{% asset_img runLoop_note_0.png %}

```objc
CFRunLoopRef
   | CFRunLoopModeRef
	   | CFRunLoopSourceRef
	   | CFRunLoopTimerRef
       | CFRunLoopObserverRef
```

```objc
struct __CFRunLoopMode {
    CFStringRef _name;            // Mode Name, 例如 @"kCFRunLoopDefaultMode"
    CFMutableSetRef _sources0;    // Set
    CFMutableSetRef _sources1;    // Set
    CFMutableArrayRef _observers; // Array
    CFMutableArrayRef _timers;    // Array
    ...
};

struct __CFRunLoop {
    CFMutableSetRef _commonModes;     // Set
    CFMutableSetRef _commonModeItems; // Set<Source/Observer/Timer>
    CFRunLoopModeRef _currentMode;    // Current Runloop Mode
    CFMutableSetRef _modes;           // Set
    ...
};

```

<!-- more -->
### RunLoop的状态

```objc
typedef CF_OPTIONS(CFOptionFlags, CFRunLoopActivity) {
    kCFRunLoopEntry         = (1UL << 0), // 1   即将进入RunLoop
    kCFRunLoopBeforeTimers  = (1UL << 1), // 2   即将处理Timer
    kCFRunLoopBeforeSources = (1UL << 2), // 4   即将处理Sources
    kCFRunLoopBeforeWaiting = (1UL << 5), // 32  即将进入休眠
    kCFRunLoopAfterWaiting  = (1UL << 6), // 64  即将退出休眠，进入唤醒
    kCFRunLoopExit          = (1UL << 7), // 128 即将退出RunLoop
    kCFRunLoopAllActivities = 0x0FFFFFFFU
};
```

### RunLoop的内部逻辑
{% asset_img runLoop_note_1.png %}


### RunLoop内的自动释放池的创建与释放
```objc
{
    /// 1. 通知Observers，即将进入RunLoop
    /// 此处有Observer会创建AutoreleasePool: _objc_autoreleasePoolPush();
    __CFRUNLOOP_IS_CALLING_OUT_TO_AN_OBSERVER_CALLBACK_FUNCTION__(kCFRunLoopEntry);
    do {

        /// 2. 通知 Observers: 即将触发 Timer 回调。
        __CFRUNLOOP_IS_CALLING_OUT_TO_AN_OBSERVER_CALLBACK_FUNCTION__(kCFRunLoopBeforeTimers);
        /// 3. 通知 Observers: 即将触发 Source (非基于port的,Source0) 回调。
        __CFRUNLOOP_IS_CALLING_OUT_TO_AN_OBSERVER_CALLBACK_FUNCTION__(kCFRunLoopBeforeSources);
        __CFRUNLOOP_IS_CALLING_OUT_TO_A_BLOCK__(block);
    
        /// 4. 触发 Source0 (非基于port的) 回调。
        __CFRUNLOOP_IS_CALLING_OUT_TO_A_SOURCE0_PERFORM_FUNCTION__(source0);
        __CFRUNLOOP_IS_CALLING_OUT_TO_A_BLOCK__(block);
    
        /// 6. 通知Observers，即将进入休眠
        /// 此处有Observer释放并新建AutoreleasePool: _objc_autoreleasePoolPop(); _objc_autoreleasePoolPush();
        __CFRUNLOOP_IS_CALLING_OUT_TO_AN_OBSERVER_CALLBACK_FUNCTION__(kCFRunLoopBeforeWaiting);
    
        /// 7. sleep to wait msg.
        mach_msg() -> mach_msg_trap();


        /// 8. 通知Observers，线程被唤醒
        __CFRUNLOOP_IS_CALLING_OUT_TO_AN_OBSERVER_CALLBACK_FUNCTION__(kCFRunLoopAfterWaiting);
    
        /// 9. 如果是被Timer唤醒的，回调Timer
        __CFRUNLOOP_IS_CALLING_OUT_TO_A_TIMER_CALLBACK_FUNCTION__(timer);
    
        /// 9. 如果是被dispatch唤醒的，执行所有调用 dispatch_async 等方法放入main queue 的 block
        __CFRUNLOOP_IS_SERVICING_THE_MAIN_DISPATCH_QUEUE__(dispatched_block);
    
        /// 9. 如果如果Runloop是被 Source1 (基于port的) 的事件唤醒了，处理这个事件
        __CFRUNLOOP_IS_CALLING_OUT_TO_A_SOURCE1_PERFORM_FUNCTION__(source1);


    } while (...);
    
    /// 10. 通知Observers，即将退出RunLoop
    /// 此处有Observer释放AutoreleasePool: _objc_autoreleasePoolPop();
    __CFRUNLOOP_IS_CALLING_OUT_TO_AN_OBSERVER_CALLBACK_FUNCTION__(kCFRunLoopExit);
}
```


### Observer

添加一个Observer

```objc
    NSDictionary *arr = @{@(1):@"进入RunLoop",
                          @(2):@"即将处理Timer",
                          @(4):@"即将处理Source",
                          @(32):@"即将休眠",
                          @(64):@"即将唤醒",
                          @(128):@"即将退出RunLoop"};
    CFRunLoopObserverRef observer = CFRunLoopObserverCreateWithHandler(kCFAllocatorDefault, kCFRunLoopAllActivities, YES, 0, ^(CFRunLoopObserverRef observer, CFRunLoopActivity activity) {
        NSLog(@"%@",arr[@(activity)]);
    });
    CFRunLoopAddObserver(CFRunLoopGetCurrent(), observer, kCFRunLoopCommonModes);

```

### 定时器
```objc
    //GCD定时器
    static dispatch_source_t timer;
    timer = dispatch_source_create(DISPATCH_SOURCE_TYPE_TIMER, 0, 0, dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0));
    dispatch_source_set_timer(timer, DISPATCH_TIME_NOW, 1 * NSEC_PER_SEC, 0 * NSEC_PER_SEC);
    dispatch_source_set_event_handler(timer, ^{
        NSLog(@"----dispatchTimer %@-----",[NSThread currentThread]);
    });
    dispatch_resume(timer); //启动定时器


    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(5 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        dispatch_cancel(timer);
    
        //RunLoop定时器
        NSTimer *timer = [[NSTimer alloc]initWithFireDate:[NSDate date] interval:1.0 repeats:YES block:^(NSTimer * _Nonnull timer) {
            NSLog(@"runloopTimer --%@",[NSThread currentThread]);
        }];
        [[NSRunLoop currentRunLoop] addTimer:timer forMode:NSRunLoopCommonModes];


//        默认在default模式下运行,可以通过[[NSRunLoop currentRunLoop] runMode:<#(nonnull NSRunLoopMode)#> beforeDate:[NSDate distantFuture]];切换模式
//        [NSTimer scheduledTimerWithTimeInterval:1.0 repeats:YES block:<#^(NSTimer * _Nonnull timer)block#>]

//        [[NSRunLoop currentRunLoop] addTimer:timer forMode:NSDefaultRunLoopMode]; //默认模式
//        NSDefaultRunLoopMode,UITrackingRunLoopMode - 都属于 CommonModes标签
//        [[NSRunLoop currentRunLoop] addTimer:timer forMode:UITrackingRunLoopMode]; //滑动模式

        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(5 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
    
            [timer invalidate];
    
            dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
                NSTimer *timer = [[NSTimer alloc]initWithFireDate:[NSDate date] interval:1.0 repeats:YES block:^(NSTimer * _Nonnull timer) {
                    NSLog(@"runloopTimer ---%@",[NSThread currentThread]);
                }];
                [[NSRunLoop currentRunLoop] addTimer:timer forMode:NSRunLoopCommonModes];
                [[NSRunLoop currentRunLoop] run];
            });
        });
    
    });
```

### 开辟一个常驻线程
```objc
#import <Foundation/Foundation.h>

@interface NSObject (ResidentThread)
//获取常驻线程
+ (NSThread *)residentThread;

//销毁常驻线程
+ (void) releaseResidentThread;
@end
```

```objc
#import "NSObject+ResidentThread.h"

@implementation NSObject(ResidentThread)
-  (void)ResidentThreadRunLoopSelector{
    @autoreleasepool {
        //每个线程都有一个RunLoop,RunLoop是在获取的时候被创建的,主线程的RunLoop是在程序启动的时候就已经被创建和开始运行了.
        //RunLoop只有在添加了Source,Observer或者Timer后,run,才会持续执行,否则会直接退出,不进入循环.
        //CFRunLoop
        CFRunLoopSourceContext souce_context;
        bzero(&souce_context, sizeof(souce_context)); //将结构体的内存空间清零
        CFRunLoopSourceRef source = CFRunLoopSourceCreate(kCFAllocatorDefault, 0, &souce_context);
        CFRunLoopAddSource(CFRunLoopGetCurrent(), source, kCFRunLoopCommonModes);
//        CFRunLoopAddSource(CFRunLoopGetCurrent(), source, kCFRunLoopDefaultMode);

        CFRunLoopRun();
        //----  下面都不会执行的 ----
        CFRunLoopRunInMode(kCFRunLoopDefaultMode, kCFAbsoluteTimeIntervalSince1904, false);
        // NSRunLoop
        [[NSRunLoop currentRunLoop] addPort:[NSPort port] forMode:NSDefaultRunLoopMode];
        [[NSRunLoop currentRunLoop] addPort:[NSPort port] forMode:NSRunLoopCommonModes];
        [[NSRunLoop currentRunLoop] run];
    }
}
static  NSMutableDictionary <NSString * ,NSThread *> * __threadCacheForClass;

+ (NSThread *)residentThread{
    static  dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        __threadCacheForClass =  [NSMutableDictionary dictionary];
    });
    NSString *className = NSStringFromClass([self class]);
    NSThread *targetThread = __threadCacheForClass[className];
    if (targetThread) {
        return targetThread;
    }
    targetThread = [[NSThread alloc]initWithTarget:self selector:@selector(ResidentThreadRunLoopSelector) object:nil];
    [targetThread start];
    [__threadCacheForClass setObject:targetThread forKey:className];
    return targetThread;
}
+ (void) releaseResidentThread{
    NSString *className = NSStringFromClass([self class]);
    NSThread *targetThread = __threadCacheForClass[className];
    if (targetThread) {
        [NSThread exit];
    }
}

@end
```