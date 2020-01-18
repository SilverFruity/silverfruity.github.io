---
title: 'iOS 圆角加阴影,无卡顿终极解决方案'
date: 2020-01-15 11:36:27
category: 
- 笔记
tags:
- iOS
- Core Graphics
---

UI妹子，太喜欢在TableView中搞圆角加阴影了。页面一抓一大把。

最开始是给UIView加分类，用CALayer来做的。后面发现有些地方是左上右上有圆角，有些只有左右有阴影。关键是，圆角、阴影多了以后，开始掉帧了，哈哈。

下面隆重介绍一下，集圆角和阴影于一身的\*\*\*\*，让你永远如60FPS般流畅。今天特价，特价！，手快有手慢无哦。😂

先贴个效果图:

上下左右阴影:

![](https://user-gold-cdn.xitu.io/2020/1/15/16fa5540fb1a21e4?w=120&h=165&f=png&s=7484)

左右阴影：
![](https://user-gold-cdn.xitu.io/2020/1/15/16fa5544351e2f8e?w=126&h=158&f=png&s=6571)

上下阴影:

![](https://user-gold-cdn.xitu.io/2020/1/15/16fa554796835f45?w=131&h=181&f=png&s=6610)

没有圆角的阴影:
![](https://user-gold-cdn.xitu.io/2020/1/15/16fa554d074e7bc1?w=112&h=167&f=png&s=6780)

```swift
// 示例：
class ViewController: UIViewController {
    @IBOutlet weak var shadowView: UICornerShadowView!
    @IBOutlet weak var leftRightShadowView: UICornerShadowView!
  
    override func viewDidLoad() {
        super.viewDidLoad()
        self.shadowView._enableRectCornner = true
        self.shadowView._cornerRadius = 20
        self.shadowView._rectCornner = [.topLeft,.topRight,.bottomLeft,.bottomRight]
        self.shadowView._shadowPosition = [.left,.top,.right,.bottom]
        self.shadowView._shadowColor = UIColor.black.withAlphaComponent(0.3)
        self.shadowView._shadowRadius = 10
        
        self.leftRightShadowView._enableRectCornner = false
        self.leftRightShadowView._shadowPosition = [.left,.right]
        self.leftRightShadowView._shadowColor = UIColor.black.withAlphaComponent(0.3)
        self.leftRightShadowView._shadowRadius = 10
        
    }
}
```
<!-- more -->




先说一下思路吧。

1. 圆角大小
2. 圆角方向
3. 阴影相关参数
4. 阴影方向，这个最麻烦，只能数学去算，头疼。
5. 生成的图片，尽可能的小，缓存占用也就很小了。
6. 缓存方式，借鉴了Kingfisher.processor的identifier

个人认为关于生成的图片最小的情况是：使用圆角大小生成一个圆，然后以中心点向四个方向拉伸即可，不同Size，只要圆角和阴影的参数相同，就可以重复使用。为了满足这一点，就可以使用一个UIImageView，然后调整图片的拉伸模式，来显示。

1、2的两个，使用UIBezierPath就能解决，最麻烦的就在于3、4。


![](https://user-gold-cdn.xitu.io/2020/1/15/16fa554ff267456f?w=923&h=502&f=png&s=27766)


![](https://user-gold-cdn.xitu.io/2020/1/15/16fa5551ccef1d64?w=1062&h=492&f=png&s=27383)

首先阴影的offset和radius决定了，在绘制图片的时候，计算背景图的x，y的公式x = (offset.x > 0 ? 0 : fabs(offset.x))  + radius，y = (offset.y > 0 ? 0: fabs(offset.y)) + radius，计算width，height一样，width = background.size.width + radius + abs(offset.x)，height = background.size.height + radio + abs(offset.y)。这个时候整个context的Rect值也就计算出来了。

图片是生成了，可是还得计算出UIImageView相对于父试图的偏移量。


![](https://user-gold-cdn.xitu.io/2020/1/15/16fa555345581bcf?w=901&h=444&f=png&s=32621)


![](https://user-gold-cdn.xitu.io/2020/1/15/16fa5555192925ea?w=1107&h=512&f=png&s=37415)

UIImageView的x = (offset.x > 0 ? 0 : offset.x) - radius,  y = (offset.y > 0 ? 0 : offset.y) - radius，width = background.size.width + radius\*2 + abs(offset.x)，height = background.size.height + radius\*2 + abs(offset.y)。宽高的计算，和上面是一样的，只是一个是基于图片的宽高，一个是基于父视图的宽高。

至于关于四个方向的阴影是否显示计算，我不就写出来了。我也头大了。

缓存的话，identifier完全是参考了Kingfisher的processor（这个东西我是真的喜欢，感觉比Glide还好用，个人见解）

[Github](https://github.com/SilverFruity/UICornerShadowView)

后续用OC重写，再添加圆角阴影边框都是可选功能😂。
我也不想做个标题党，都是被逼的。