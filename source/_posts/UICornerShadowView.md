---
title: 'iOS圆角边框阴影，无卡顿解决方案'
date: 2020-01-15 11:36:27
category: 
- OpenSource
tags:
- iOS
- Core Graphics
---

[UICornerShadowView](https://github.com/SilverFruity/UICornerShadowView)

## 主要功能
1. 圆角，可控圆角方向。

2. 边框相关参数，可控边框方向。

3. 阴影相关参数，可控阴影方向。

4. 使用CoreGraphics生成图片，可异步执行。

5. 超小的缓存占用。图片大小与视图大小无关，1000张随机值的圆角阴影边框图片，占用29MB。

<!-- more -->

## 效果图

{% asset_img UICornerShadowView_1.jpeg %}

{% asset_img UICornerShadowView_2.jpeg %}

## 使用示例
```objective-c

// UIAppearance
[SFCSBView appearance].cornerRadius = 20;
[SFCSBView appearance].rectCornner = UIRectCornerAllCorners;
[SFCSBView appearance].shadowPosition = UIShadowPostionAll;
[SFCSBView appearance].shadowRadius = 20;
[SFCSBView appearance].borderColor = [UIColor systemBlueColor];
[SFCSBView appearance].borderWidth = 5;
[SFCSBView appearance].borderPosition = UIBorderPostionAll;


SFCSBView * shadowView = [SFCSBView new];
shadowView.cornerRadius = 20;
shadowView.rectCornner = UIRectCornerAllCorners;
shadowView.shadowPosition = UIShadowPostionAll;
shadowView.shadowColor = [[UIColor blackColor]colorWithAlphaComponent:0.6];
shadowView.shadowRadius = 20;
shadowView.borderColor = UIColor.systemBlueColor;
shadowView.borderWidth = 5;
shadowView.borderPosition = UIBorderPostionAll;
```


## SFCSBView主要实现代码
```objective-c
SFShadowImageMaker *shadowMaker = self.shadowProcessor;
SFCornerImageMaker *cornerMaker = self.cornerProcessor;
SFBorderImageMaker *borderMaker = self.borderProcessor;
SFColorImageMaker  *colorMaker = self.colorProcessor;
if (self.handleMakers)
    self.handleMakers(@[colorMaker,cornerMaker,borderMaker,shadowMaker]);

NSString *identifier = [NSString stringWithFormat:@"%@%@%@%@",colorMaker.identifier,cornerMaker.identifier,borderMaker.identifier,shadowMaker.identifier];
CGRect backImageViewFrame = self.bounds;
if (shadowMaker.isEnable){
    backImageViewFrame = [shadowMaker viewRectForSize:self.bounds.size];
    CGFloat insertValue = -1;
    backImageViewFrame = CGRectInset(backImageViewFrame, insertValue, insertValue);
}
// 每修改一次subview的frame，view会调用layoutSubviews方法。
// 目的：在高度重用UICornerShadowView的情况，并且每次都更新的情况下，减少frame更新。
// 如果上一次的identifer相同说明是重用图片
// 如果当前frame和需要的frame相同，也不用更新frame
if (![identifier isEqualToString:self.lastBackGroundImageIdentifer] || !CGRectEqualToRect(self.backGroundImageView.frame, backImageViewFrame)) {
    self.backGroundImageView.frame = backImageViewFrame;
}
UIImage *cacheImage = [[SFCSBViewImageCache shared] objectForKey:identifier];
if (cacheImage) {
    self.backGroundImageView.image = cacheImage;
    self.backgroundColor = UIColor.clearColor;
    self.lastBackGroundImageIdentifer = identifier;
    return;
}
__weak typeof(self) weakSelf = self;
dispatch_async(dispatch_get_global_queue(0, 0), ^{
    UIImage *image = [SFImageMakerManager.shared startWithGenerator:colorMaker processors:@[cornerMaker,borderMaker,shadowMaker]];
    if (shadowMaker.isEnable) {
        UIEdgeInsets inset = shadowMaker.convasEdgeInsets;
        CGFloat x = (image.size.width - inset.left - inset.right) / 2;
        CGFloat y = (image.size.height - inset.top - inset.bottom) / 2;
        image = [image resizableImageWithCapInsets:UIEdgeInsetsMake(y + inset.top, x + inset.left, y + inset.bottom, x + inset.right)];
    }else{
        image = [image resizableImageWithCapInsets:UIEdgeInsetsMake(image.size.height / 2, image.size.width / 2, image.size.height / 2, image.size.width / 2)];
    }
    [SFCSBViewImageCache.shared setObject:image forKey:identifier];
    dispatch_async(dispatch_get_main_queue(), ^{
        if (!weakSelf) {
            return;
        }
        weakSelf.lastBackGroundImageIdentifer = identifier;
        weakSelf.backGroundImageView.image = image;
    });
});
```
## 性能测试
```swift
// 以下代码:
// 模拟器，生成图片1000次，耗时1.3s，缓存大小约50MB。
// 真机iPhone7，生成图片1000次，耗时0.9秒，缓存大小约50MB。
// 每张图片约为50KB。在项目中的随机测试，所得结果更优。
func testPerformanceExample() {
    // This is an example of a performance test case.
   self.measure {
        var cost: Int = 0
        for _ in (0...1000){
            rectCorner.radius = CGFloat(Int.random(in: 0..<10))
            rectCorner.position = .allCorners
            shadow.position = .all
            shadow.shadowColor = UIColor.black.withAlphaComponent(0.6)
            shadow.shadowBlurRadius = CGFloat(Int.random(in: 8..<20))
            border.color = UIColor.systemBlue
            border.width = CGFloat(Int.random(in: 0..<20))
            border.position = .all
            var maxValue = rectCorner.radius > (border.width + 1) && rectCorner.isEnable ? rectCorner.radius : border.width + 1
            maxValue = shadow.shadowBlurRadius > maxValue ? shadow.shadowBlurRadius : maxValue
            let size = CGSize.init(width: maxValue * 2, height: maxValue * 2)
            var image = SFColorImage.init(color: UIColor.white, size: size).general()
            image = rectCorner.process(image)
            image = border.process(image, rectCorner: rectCorner)
            image = shadow.process(image)
            if let cgimg = image.cgImage{
                cost += cgimg.height * cgimg.width * (cgimg.bitsPerPixel / cgimg.bitsPerComponent)
            }
        }
        print("\(cost / (1024 * 1024))MB")
        cost = 0
    }
}
```

真机iPhone7 iOS 13.3.1，UITableView中。

每个cell圆角阴影边框都不相同的情况下（即时生成）1000个，在TableView中快速滑动。FPS保持在60FPS左右，CPU峰值为140%。

这种:
{% asset_img UICornerShadowView_2.jpeg %}
{% asset_img UICornerShadowView_3.jpegg %}

特定情况下，有复用，但是需要根据index判断，并且每次都要刷新的情况下。

例如这种，这里只显示了5个cell。在1000个cell，快速滑动的情况下，主线程峰值为40%。
{% asset_img UICornerShadowView_4.jpeg%}

{% asset_img UICornerShadowView_5.jpeg %}



## 十万个为什么
1. 为什么说超小缓存占用
{% asset_img UICornerShadowView_6.jpeg %}
2. 阴影方向控制、边框方向控制，是如何实现的？

    这是阴影的实现，边框相同。
{% asset_img UICornerShadowView_7.jpeg %}
![](https://user-gold-cdn.xitu.io/2020/3/12/170cf5d5dabf6857?w=569&h=308&f=png&s=26345)

3. 适合什么场景下使用:
    * 大量参数相同的情况下，放心食用。不必考虑View的size的大小，采用拉伸实现。
    * 部分参数相同的情况下，CPU使用率仍在可接受的范围。
    * 所有参数几乎不同的情况下，我放弃了。占用率太高，耗电不能接受。