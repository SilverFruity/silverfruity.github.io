(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{532:function(t,e,r){t.exports=r.p+"assets/img/Clang-LLVM.433d364d.png"},533:function(t,e,r){t.exports=r.p+"assets/img/0.3f77f104.png"},554:function(t,e,r){"use strict";r.r(e);var n=r(6),a=Object(n.a)({},(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h3",{attrs:{id:"为什么要热修复"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#为什么要热修复"}},[t._v("#")]),t._v(" 为什么要热修复")]),t._v(" "),n("p",[t._v("在软件开发过程中，很难避免 BUG 的存在，尤其是对于一些达到一定规模的 App 因为协作模式错综复杂，就很容易带着问题上线。")]),t._v(" "),n("p",[t._v("一旦问题上线之后，问题就麻烦了，不仅需要重新打包、测试，而且还需要重新提交审核，而这种修复问题的方式往往是低效且漫长的。")]),t._v(" "),n("p",[t._v("因此，在开发一个 App 的过程中，稳定性的就变成了一个难题，唯一的原因就是不希望带着问题上线导致用户对 App 失去信任。")]),t._v(" "),n("p",[t._v("热修复就可以很好的解决这类棘手的问题，因此带着好奇之心，研究了一下热修复在 iOS 端的可行性，实现\n了一个较为完备的热修复框架，我把它叫做 OCRunner。")]),t._v(" "),n("p",[t._v("我也会在未来几个月，把我做 OCRunner 的一些经验总结成博文，在「老司机技术周报」的公众号上与大\n家分享。")]),t._v(" "),n("h3",{attrs:{id:"已有的开源方案"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#已有的开源方案"}},[t._v("#")]),t._v(" 已有的开源方案")]),t._v(" "),n("ul",[n("li",[n("p",[t._v("采用 "),n("strong",[t._v("JavaScriptCore")]),t._v(" 的方案")]),t._v(" "),n("ul",[n("li",[n("a",{attrs:{href:"https://github.com/bang590/JSPatch",target:"_blank",rel:"noopener noreferrer"}},[n("em",[t._v("JSPatch")]),n("OutboundLink")],1),t._v("通过下发 JavaScript 脚本，使用系统提供的  JavaScriptCore 执行 JavaScript 脚本，通过 JavaScript 代码解析代码中的类信息，动态调用相应的 Objective-C 函数，然后配合 libffi 修改 Runtime，最终实现热更新，奠定了 Objective-C 的热修复基础。")]),t._v(" "),n("li",[n("a",{attrs:{href:"https://github.com/yangyangFeng/TTPatch",target:"_blank",rel:"noopener noreferrer"}},[n("em",[t._v("TTPatch")]),n("OutboundLink")],1),t._v("和 JSPatch 一样使用 JavaScriptCore 执行 JavaScript 脚本，但支持实时预览，这个是我超级喜欢的功能。")])])]),t._v(" "),n("li",[n("p",[t._v("自实现脚本解释器的方案")]),t._v(" "),n("ul",[n("li",[n("a",{attrs:{href:"https://github.com/lilidan/OCEval",target:"_blank",rel:"noopener noreferrer"}},[n("em",[t._v("OCEval")]),n("OutboundLink")],1),t._v("下发 Objective-C 源码解释执行，但支持的语法有限。作者"),n("a",{attrs:{href:"https://github.com/lilidan",target:"_blank",rel:"noopener noreferrer"}},[t._v("lilidan"),n("OutboundLink")],1),t._v("自己实现了 Objective-C 的词法分析器和语法分析器。其中的"),n("a",{attrs:{href:"https://github.com/lilidan/OCEval/blob/master/OCEval/helper/FuntionSearch.c",target:"_blank",rel:"noopener noreferrer"}},[t._v("FunctionSearch的实现"),n("OutboundLink")],1),t._v("也帮助了我许多。"),n("a",{attrs:{href:"https://github.com/letqingbin/DynamicOC",target:"_blank",rel:"noopener noreferrer"}},[t._v("DynamicOC"),n("OutboundLink")],1),t._v("将 OCEvel 的词法解析器和语法解析器使用 lex&yacc 实现。")]),t._v(" "),n("li",[n("a",{attrs:{href:"https://github.com/YPLiang19/Mango",target:"_blank",rel:"noopener noreferrer"}},[n("em",[t._v("Mango")]),n("OutboundLink")],1),t._v("作者设计了 Mango 的脚本语言（和 Objective-C 极为相似），使用 lex&yacc 生成语法树，然后再将 Mango 脚本的语法树解释执行。这也就是 OCRunner 的起源。")]),t._v(" "),n("li",[n("a",{attrs:{href:"https://github.com/SilverFruity/OCRunner",target:"_blank",rel:"noopener noreferrer"}},[t._v("OCRunner"),n("OutboundLink")],1),t._v("是我在 Mango 的基础之上优化后的一个方案。和 Mango 相同的是，采用lex&yacc生成语法树后解释执行、JSPatch 的 Runtime 的思想。但这一次，我们可以书写 Objective-C，然后直接动态执行它。同时也支持了许多特性：结构体、枚举、函数指针等。")])])])]),t._v(" "),n("p",[n("strong",[t._v("其他库不足的问题:")])]),t._v(" "),n("ol",[n("li",[t._v("支持不够完善：结构体、系统函数、枚举等。")]),t._v(" "),n("li",[t._v("语法问题：一些语法上的小问题，有时候无异于回炉重造，也是需要时间成本的。有时候一些奇怪的语法问题，或许都要花你一个下午的时间。")]),t._v(" "),n("li",[t._v("传输加解密:  JSPatch 等均采用 RSA (非对称加密)对整个脚本进行加密，个人认为着实耗费性能了一些。")])]),t._v(" "),n("h3",{attrs:{id:"为什么要写-ocrunner"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#为什么要写-ocrunner"}},[t._v("#")]),t._v(" 为什么要写 OCRunner")]),t._v(" "),n("p",[t._v("​\t这次可以慢慢的讨论这个问题了~")]),t._v(" "),n("p",[t._v("​\t19 年 4 月的时候，刚好在趋势榜上看见了"),n("a",{attrs:{href:"https://github.com/YPLiang19/Mango",target:"_blank",rel:"noopener noreferrer"}},[t._v("Mango"),n("OutboundLink")],1),t._v("项目，发现它是使用自定义的、和 Objective-C 语法非常相似的脚本语言（相当于自己创造一名语言吧，balabala），当时早已对编译相关的心驰神往，奈何一直没有一个合适的机会去学习，再加上当时的公司有热更新的需求，就想着试一试，看能不能写一个将 Objective-C 代码转换为 Mango 脚本的转换器（也想过能不能借此自己完成一个热更新库）。")]),t._v(" "),n("p",[t._v("​\t19 年 4 月 晚上 10 点正式开启了每天回家爆肝 lex&yacc 的升级打怪之路，各种各样的问题炸得我在锅里反复横跳（解决办法: 「  lex&yacc.pdf 」抱着啃），但最严重的的莫过于指针相关的，参考了好几个基于 lex&yacc 的开源编译器，才得以找到折中的解决办法。中间也发生了许多事情，从 19 年 7 月后，我休息了4个月。")]),t._v(" "),n("p",[t._v("​\t20 年 3 月的时候，想着 oc2mango 做了那么久，得把翻译器做出来了才能给自己一个交代，肝了一段时间，正确的使用 yyless 后，问题相较之前已经少了很多。这个时候 oc2mango 翻译器也能正常使用了，虽然仍有一些小问题。这个时候翻译器的小目标也就完成了✌️。")]),t._v(" "),n("p",[t._v("​\t当翻译器完成以后，我的野心变大了，我想试试我自己能不能完成一个像 Mango 一样的热更新库（内心戏： lex&yacc 就是从它那儿学来的，应该不难吧？😂）。结果确实是年少无知，各种各样的坑。当完成了和 Mango 一样的功能时，这个时候我就已经很想获得 github 的✨✨了，跑去提了一个老司机的 issue，额，被打回来了，也是应该的，当时确实有很多问题（天真的以为，arm64 下，直接将参数放在相应的寄存器上，然后调用函数就行了 👏）。后面去认真看了 arm64 程序调用标准和 libffi 的代码后，自然而然的也就实现了自定义 arm64 ABI（其实哭着看了一个月）。后续也实现了结构体和系统函数指针的调用以及 Json 补丁和二进制补丁。")]),t._v(" "),n("p",[t._v("​\t直到发布"),n("a",{attrs:{href:"https://silverfruity.github.io/2020/09/04/OCRunner/",target:"_blank",rel:"noopener noreferrer"}},[t._v("OCRunner：完全体的iOS热修复方案"),n("OutboundLink")],1),t._v(" 后，我才每天开开心心的看着 star 突突的涨。")]),t._v(" "),n("p",[t._v("​\t其实打从一开始，我就没想过我会把 OCRunner 写出来，最开始的时候离我太遥远了，我也只能给自己一步一步的定一个小目标。起初的时候，github 星星算不上我的动力，oc2mango 和 OCRunner 极少的星星也是去群里贴小广告来的。更多的动力，其实是来源于自己完成了一个又一个的目标后的成就感，别人不能满足自己，就自己满足自己吧😂（啤酒炸鸡走起 hhhh）。保持一个乐观的心态，向前冲~")]),t._v(" "),n("h3",{attrs:{id:"整体架构的启发"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#整体架构的启发"}},[t._v("#")]),t._v(" 整体架构的启发")]),t._v(" "),n("p",[t._v("在说OCRunner之前，我们先聊聊Clang和LLVM（让我多打几个字😂）。")]),t._v(" "),n("p",[t._v("通常我们在Xcode上运行 Objective-C 代码时，我们的编译器前端使用的是Clang，后端使用的是LLVM。首先 Clang 它通过词法、语法分析后，生成 抽象语法树 ，再由 抽象语法树 生成 LLVM IR 交给 LLVM 进行代码优化，最后将优化后的 LLVM IR 生成指定平台的机器代码，如图：")]),t._v(" "),n("p",[n("img",{attrs:{src:r(532),alt:""}}),t._v(" "),n("a",{attrs:{href:"https://blog.csdn.net/xhhjin/article/details/81164076",target:"_blank",rel:"noopener noreferrer"}},[t._v("图片出自: 简述 LLVM 与 Clang 及其关系"),n("OutboundLink")],1)]),t._v(" "),n("p",[t._v("在写 OCRunner 之前，我就在想，能不能用相似的架构去完成 OCRunner ？")]),t._v(" "),n("p",[t._v("Clang替换为自己撸的渣渣编译器，LLVM 替换为自己完成的解释执行器，LLVM IR（中间代码）替换为 抽象语法树 或者是其他。代码优化，不存在的，远着呢，哈哈。")]),t._v(" "),n("p",[t._v("但是，目前首先需要做的是，OCRunner能够正常跑起来😂。")]),t._v(" "),n("p",[t._v("OCRunner 是一个将 Objective-C 代码作为输入的"),n("strong",[t._v("语法树解释执行器")]),t._v("。")]),t._v(" "),n("p",[t._v("其主要过程为: Objective-C -> 抽象语法树 -> 解释执行语法树。")]),t._v(" "),n("p",[t._v("没有了解过这方面的人，光是看着抽象语法树这个鬼就已经头大了，何况是解释执行语法树（作者也是过来人之一🍻）。但是相信大家看完整个文章以后，对抽象语法树的认识会印象深刻的。")]),t._v(" "),n("ul",[n("li",[n("p",[t._v("Objective-C -> 抽象语法树:  由 oc2mangoLib 来完成。")])]),t._v(" "),n("li",[n("p",[t._v("抽象语法树 -> 解释执行语法树: 由 OCRunner 来完成。")])])]),t._v(" "),n("blockquote",[n("p",[t._v("起初的 OCRunner 项目中是包含了 oc2mangoLib 库的，为什么呢？")])]),t._v(" "),n("ol",[n("li",[t._v("作者当时对 Mango 中的很多东西也一知半解，需要用当前已有的方式去实现，等它的基础功能完善以后，才有时间去尝试我自己的东西。")]),t._v(" "),n("li",[t._v("省事，单元测试中，一个单元测试既测试了语法树生成，也测试了运行结果。")]),t._v(" "),n("li",[t._v("当时我也没想好，究竟应该以什么样的形式或者格式来作为中间者，它应该是一种固定的数据格式亦或是一种数据协议。")])]),t._v(" "),n("blockquote",[n("p",[t._v("既然抽象语法树已经能够满足解释运行的需求了，为什么还得要个中间数据协议呢？")])]),t._v(" "),n("p",[t._v("还记得Xcode中的"),n("strong",[t._v("Bitcode")]),t._v("吗？它的作用就是以 LLVM IR 替代目标程序，比如我们上传 iTune Store Connect 的时候，其实上传的是我们的LLVM IR，苹果在自己的服务器上使用 LLVM 将我们的LLVM IR转换为相应目标程序。很多时候，我就在想，LLVM IR 和我们在面对对象中使用的 Interface 相同。咳咳，说个原因，跑偏了这么多😂，回到正题。")]),t._v(" "),n("ol",[n("li",[n("p",[t._v("词法分析、语法分析产生的相关崩溃，应该由编译前端来负责，不应该出现在解释执行的过程中，比如：语法报错等等。")])]),t._v(" "),n("li",[n("p",[t._v("不采用共同的数据格式，那就只能采用传输源码的方式，亦或是目前JSPatch或者Mango对源码进行RSA加密的方式。1. 不加密：补丁源码泄漏，安全风险太高， 2. RSA加密的方式：性能拉垮，破解得到源码不难，3. 不论加密或者不加密，源码增加后，数据量大小的增量更大。")])]),t._v(" "),n("li",[n("p",[t._v("针对编译器前端的优化，不必每次都更新 OCRunner 解释器。")])]),t._v(" "),n("li",[n("p",[t._v("各自更清晰的职责划分。")])]),t._v(" "),n("li",[n("p",[t._v("作者太菜，对写出的 oc2mangoLib 没什么自信😂。")])])]),t._v(" "),n("blockquote",[n("p",[t._v("以采用 Json 补丁为中间数据格式为例，此时我们的整个流程如下：")])]),t._v(" "),n("p",[t._v("Objective-C -> 抽象语法树 -> Json补丁 -> 抽象语法树 -> 解释执行语法树")]),t._v(" "),n("ol",[n("li",[n("p",[t._v("Objective-C -> 抽象语法树:  oc2mangoLib")])]),t._v(" "),n("li",[n("p",[t._v("抽象语法树  ->  Json补丁:     ORPatchFile")])]),t._v(" "),n("li",[n("p",[t._v("Json补丁     ->  抽象语法树:  ORPatchFile")])]),t._v(" "),n("li",[n("p",[t._v("抽象语法树 -> 解释执行语法树: OCRunner")])])]),t._v(" "),n("h3",{attrs:{id:"ocrunner"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#ocrunner"}},[t._v("#")]),t._v(" OCRunner")]),t._v(" "),n("p",[t._v("最后再（啰嗦）介绍一下 OCRunner：")]),t._v(" "),n("p",[t._v("首先 "),n("a",{attrs:{href:"https://github.com/SilverFruity/oc2mango",target:"_blank",rel:"noopener noreferrer"}},[t._v("PatchGenerator"),n("OutboundLink")],1),t._v(" 使用 oc2mangoLib 将 Objective-C 源码生成语法树，随后使用 ORPatchFile 将语法树序列化为补丁文件，最后 OCRunner 使用 OCPatchFile 将补丁反序列化为语法树后解释执行语法树。")]),t._v(" "),n("h4",{attrs:{id:"优点"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#优点"}},[t._v("#")]),t._v(" 优点:")]),t._v(" "),n("ul",[n("li",[t._v("前后端分离：PatchGenerator 生成补丁，OCRunner 解释执行补丁。")]),t._v(" "),n("li",[t._v("补丁文件大小：相对于传输脚本文件，二进制补丁的大小拥有更好的表现。")]),t._v(" "),n("li",[t._v("完善的 Objective-C 语法支持：结构体，Protocol，枚举，C 函数声明即链接系统函数，多参数调用等。")]),t._v(" "),n("li",[t._v("可选的自定义 Arm64 ABI ：基于 Arm64 过程调用规约和 iOS TypeEncode 完成。")])]),t._v(" "),n("h4",{attrs:{id:"性能"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#性能"}},[t._v("#")]),t._v(" 性能:")]),t._v(" "),n("p",[t._v("设备: iPhone SE 2，iOS 14.3")]),t._v(" "),n("p",[t._v("在求斐波那契数列第25项的测试中:")]),t._v(" "),n("ul",[n("li",[n("strong",[t._v("JSPatch")]),t._v(": 执行时间，平均为 0.169 s。内存占用一直稳定在 12 MB 左右。")]),t._v(" "),n("li",[n("strong",[t._v("OCRunner")]),t._v(": 执行时间，平均为 1.05 s。内存占用，峰值为 60 MB 左右，其他稳定在 12 MB 左右。")]),t._v(" "),n("li",[n("strong",[t._v("Mango")]),t._v(": 执行时间，平均时间为 2.38 s。内存占用，持续走高，最高的时候大约为 350 MB。")])]),t._v(" "),n("p",[t._v("结论:")]),t._v(" "),n("p",[t._v("目前递归方法调用的速度，大约为JSPatch的1/5倍，为MangoFix的2.5倍左右。")]),t._v(" "),n("p",[t._v("问题:")]),t._v(" "),n("p",[t._v("关于递归方法调用时的内存占用，目前存在占用过大的问题。求斐波那契数列数列第30项的时候，OCRunner内存峰值占用大概在600MB。")]),t._v(" "),n("h4",{attrs:{id:"hook-objective-c-方法"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#hook-objective-c-方法"}},[t._v("#")]),t._v(" Hook Objective-C 方法")]),t._v(" "),n("ul",[n("li",[t._v("JSPatch ，通过将类的目标方法替换为 objc_msgForward，同时将 forwardInvocation: 方法的 IMP 替换为 JPForwardInvocation 函数，当目标方法被调用时触发消息转发，在 JPForwardInvocation 函数中获取 NSInvocation 的各个参数值，再使用 JavaScriptCore 调用相应的函数，再将得到的结果设置到 NSInvocation 的返回值。")]),t._v(" "),n("li",[t._v("OCRunner（MangoFix），通过直接将类的目标方法的 IMP 直接替换为使用 libffi 注册的 methodIMP 函数，通过 class 和 SEL 从 OCRunner 的方法注册表中获取到 ORMethodImplementation ，将它解释执行，获取到结果后，再写入 ret 指针中。")])]),t._v(" "),n("h4",{attrs:{id:"项目整体图"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#项目整体图"}},[t._v("#")]),t._v(" 项目整体图")]),t._v(" "),n("p",[n("img",{attrs:{src:r(533),alt:""}})]),t._v(" "),n("h3",{attrs:{id:"后续文章"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#后续文章"}},[t._v("#")]),t._v(" 后续文章")]),t._v(" "),n("h4",{attrs:{id:"_1-实现一个简单版-ocrunner"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_1-实现一个简单版-ocrunner"}},[t._v("#")]),t._v(" 1. "),n("a",{attrs:{href:"https://silverfruity.github.io/2021/03/09/OCRunner-SimpleOCRunner/",target:"_blank",rel:"noopener noreferrer"}},[t._v("实现一个简单版 OCRunner"),n("OutboundLink")],1)]),t._v(" "),n("h4",{attrs:{id:"_2-二进制补丁文件的实现"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_2-二进制补丁文件的实现"}},[t._v("#")]),t._v(" 2. "),n("a",{attrs:{href:"https://silverfruity.github.io/2021/03/09/OCRunner-PatchFile/",target:"_blank",rel:"noopener noreferrer"}},[t._v("二进制补丁文件的实现"),n("OutboundLink")],1)])])}),[],!1,null,null,null);e.default=a.exports}}]);