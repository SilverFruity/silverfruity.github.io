(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{521:function(s,t,a){s.exports=a.p+"assets/img/iOSReEnvNote_0.e9edecc6.jpeg"},522:function(s,t,a){s.exports=a.p+"assets/img/iOSReEnvNote_1.4c7bd687.jpeg"},549:function(s,t,a){"use strict";a.r(t);var e=a(6),n=Object(e.a)({},(function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h2",{attrs:{id:"_1-不完美越狱"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-不完美越狱"}},[s._v("#")]),s._v(" 1. 不完美越狱")]),s._v(" "),e("p",[e("a",{attrs:{href:"https://checkra.in/releases/0.9.8-beta",target:"_blank",rel:"noopener noreferrer"}},[s._v("checkra1n"),e("OutboundLink")],1),s._v("只支持MacOS，连接上USB后，根据App提示，即可越狱。然后在iPhone上打开checkra1n App，安装Cydia即可。")]),s._v(" "),e("p",[s._v("我的手机为iPhone7 13.3.1")]),s._v(" "),e("h2",{attrs:{id:"_2-cydia-安装openssh"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-cydia-安装openssh"}},[s._v("#")]),s._v(" 2. Cydia 安装OpenSSH")]),s._v(" "),e("ol",[e("li",[e("p",[s._v("在Cydia中搜索安装OpenSSH")])]),s._v(" "),e("li",[e("p",[s._v("确保手机和电脑在同一局域网")]),s._v(" "),e("div",{staticClass:"language-sh line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("ssh")]),s._v(" -P "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("22")]),s._v(" root@"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("iPhone局域网IP"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 默认密码为alpine")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br")])])]),s._v(" "),e("li",[e("p",[s._v("设置免密连接")]),s._v(" "),e("p",[e("a",{attrs:{href:"https://github.com/AloneMonkey/MonkeyDev/wiki/%E5%AE%89%E8%A3%85",target:"_blank",rel:"noopener noreferrer"}},[s._v("来源：MonkeyDev Wiki"),e("OutboundLink")],1)]),s._v(" "),e("div",{staticClass:"language-sh line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[s._v("ssh-keygen -t rsa -P "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("''")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#如果已经有了id_rsa，跳过这一波")]),s._v("\nssh-copy-id -i /Users/username/.ssh/id_rsa root@ip "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#这里提示错误，添加sudo即可")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br")])])])]),s._v(" "),e("h2",{attrs:{id:"_3-usb连接手机"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3-usb连接手机"}},[s._v("#")]),s._v(" 3. USB连接手机")]),s._v(" "),e("ol",[e("li",[e("p",[s._v("安装usbmuxd")]),s._v(" "),e("div",{staticClass:"language-sh line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[s._v("brew "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" usbmuxd \n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])])]),s._v(" "),e("li",[e("p",[s._v("映射本地端口到手机ssh 22端口")]),s._v(" "),e("div",{staticClass:"language-sh line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[s._v("iproxy "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("2222")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("22")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 这里将本地的2222，映射到了通过USB连接的手机的22端口")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])])]),s._v(" "),e("li",[e("p",[s._v("ssh连接")]),s._v(" "),e("div",{staticClass:"language-sh line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("ssh")]),s._v(" -P "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("2222")]),s._v(" root@localhost\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])])])]),s._v(" "),e("h2",{attrs:{id:"_4-使用scp和手机进行文件传输"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_4-使用scp和手机进行文件传输"}},[s._v("#")]),s._v(" 4. 使用scp和手机进行文件传输")]),s._v(" "),e("p",[s._v("比如手机的局域网ip为 192.168.0.100")]),s._v(" "),e("ol",[e("li",[e("p",[s._v("拷贝iPhone文件到电脑")]),s._v(" "),e("div",{staticClass:"language-sh line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("scp")]),s._v(" -P "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("22")]),s._v(" root@192.168.0.100:/Developer/usr/bin/debugserver ./debugserver\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])])]),s._v(" "),e("li",[e("p",[s._v("拷贝电脑文件到iPhone")]),s._v(" "),e("div",{staticClass:"language-sh line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("scp")]),s._v(" -P "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("22")]),s._v(" ./debugserver root@192.168.0.100:/usr/bin/debugserver\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])])])]),s._v(" "),e("p",[s._v("这里的命令都是当前mac中进行")]),s._v(" "),e("h2",{attrs:{id:"_4-砸壳工具"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_4-砸壳工具"}},[s._v("#")]),s._v(" 4. 砸壳工具")]),s._v(" "),e("p",[e("a",{attrs:{href:"https://www.jianshu.com/p/aec0325aa2dc",target:"_blank",rel:"noopener noreferrer"}},[s._v("来源于"),e("OutboundLink")],1)]),s._v(" "),e("ol",[e("li",[e("a",{attrs:{href:"https://github.com/KJCracks/Clutch",target:"_blank",rel:"noopener noreferrer"}},[s._v("Clutch"),e("OutboundLink")],1)])]),s._v(" "),e("div",{staticClass:"language-sh line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# mac")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("curl")]),s._v(" https://github.com/KJCracks/Clutch/releases/download/2.0.4/Clutch-2.0.4 -o ./Clutch\n"),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("chmod")]),s._v(" +x Clutch\n"),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("scp")]),s._v(" -P "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("22")]),s._v(" ./Clutch root@ip:/usr/bin/Clutch\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# iphone")]),s._v("\nClutch -i "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#列出已经安装的App")]),s._v("\nClutch -d "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("indexId"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br")])]),e("ol",{attrs:{start:"2"}},[e("li",[e("a",{attrs:{href:"https://github.com/KJCracks/Clutch",target:"_blank",rel:"noopener noreferrer"}},[s._v("dumpdecrypted"),e("OutboundLink")],1)])]),s._v(" "),e("div",{staticClass:"language-sh line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# mac ")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" clone https://github.com/stefanesser/dumpdecrypted.git\n"),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" dumpdecrypted\n"),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("make")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("scp")]),s._v(" -P "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("22")]),s._v(" ./dumpdecrypted.dylib root@ip:/var/root/dumpdecrypted.dylib\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# iphone")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" /var/root\n"),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("ps")]),s._v(" -ef "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("grep")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("App名字"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 获取到App可执行文件的路径")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("DYLD_INSERT_LIBRARIES")]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("dumpdecrypted.dylib "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("App可执行文件的路径"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 然后在/var/root/下生成AppName.decrypted文件，这个文件就可以被Hopper的等软件正常使用了。")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br")])]),e("h2",{attrs:{id:"_5-安装cycript"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_5-安装cycript"}},[s._v("#")]),s._v(" 5. 安装Cycript")]),s._v(" "),e("p",[s._v("打开Cydia，搜索Cycript安装即可")]),s._v(" "),e("h2",{attrs:{id:"_6-reveal查看视图层级"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_6-reveal查看视图层级"}},[s._v("#")]),s._v(" 6.Reveal查看视图层级")]),s._v(" "),e("p",[e("a",{attrs:{href:"https://www.jianshu.com/p/6cac1052879d",target:"_blank",rel:"noopener noreferrer"}},[s._v("来源于"),e("OutboundLink")],1)]),s._v(" "),e("ol",[e("li",[e("p",[s._v("mac上安装"),e("a",{attrs:{href:"https://pan.baidu.com/s/1lz9lwTKXD9bS8DnvT9gkBQ",target:"_blank",rel:"noopener noreferrer"}},[s._v("Reveal 4"),e("OutboundLink")],1),s._v("--提取密码:b31u")])]),s._v(" "),e("li",[e("p",[s._v("Cydia中, 下载Reveal2Loader")])])]),s._v(" "),e("p",[s._v("最后一步:")]),s._v(" "),e("div",{staticClass:"language-sh line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# mac")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("scp")]),s._v(" -r -P "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("22")]),s._v(" /Applications/Reveal.app/Contents/SharedSupport/iOS-Libraries/RevealServer.framework/RevealServer root@YourIPhoneIP:/Library/MobileSubstrate/DynamicLibraries/reveal2Loader.dylib\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br")])]),e("p",[s._v("最后一步:")]),s._v(" "),e("p",[s._v("打开设置 -> 找到Reveal -> 开启你需要查看的App")]),s._v(" "),e("h2",{attrs:{id:"_7-debugserver"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_7-debugserver"}},[s._v("#")]),s._v(" 7.DebugServer")]),s._v(" "),e("p",[s._v("主要参考"),e("a",{attrs:{href:"https://juejin.im/post/6844903889498537997#heading-3",target:"_blank",rel:"noopener noreferrer"}},[s._v("iOS 逆向指南：动态分析"),e("OutboundLink")],1)]),s._v(" "),e("p",[s._v("尝试过很多次，都有问题。最终解决办法。")]),s._v(" "),e("ol",[e("li",[e("p",[s._v("先将debugserver从iPhone拷贝到mac")]),s._v(" "),e("div",{staticClass:"language-sh line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("scp")]),s._v(" root@iOSDeviceIP:/Developer/usr/bin/debugserver ~/debugserver\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])])]),s._v(" "),e("li",[e("p",[s._v("瘦身")]),s._v(" "),e("div",{staticClass:"language-sh line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[s._v("lipo -thin arm64 ~/debugserver -output ~/debugserver\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])])]),s._v(" "),e("li",[e("p",[s._v("给 debugserver 添加 task_for_pid 权限，保存以下内容为 ent.xml 文件")]),s._v(" "),e("div",{staticClass:"language-xml line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-xml"}},[e("code",[e("span",{pre:!0,attrs:{class:"token doctype"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<!")]),e("span",{pre:!0,attrs:{class:"token doctype-tag"}},[s._v("DOCTYPE")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token name"}},[s._v("plist")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token name"}},[s._v("PUBLIC")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"-//Apple//DTD PLIST 1.0//EN"')]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"http://www.apple.com/DTDs/PropertyList-1.0.dtd"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("plist")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("version")]),e("span",{pre:!0,attrs:{class:"token attr-value"}},[e("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[s._v("=")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("1.0"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("dict")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n        "),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("key")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("com.apple.springboard.debugapplications"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("</")]),s._v("key")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n        "),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("true")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("/>")])]),s._v("\n        "),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("key")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("get-task-allow"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("</")]),s._v("key")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n        "),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("true")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("/>")])]),s._v("\n        "),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("key")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("task_for_pid-allow"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("</")]),s._v("key")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n        "),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("true")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("/>")])]),s._v("\n        "),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("key")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("run-unsigned-code"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("</")]),s._v("key")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n        "),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("true")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("/>")])]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("</")]),s._v("dict")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("</")]),s._v("plist")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br"),e("span",{staticClass:"line-number"},[s._v("12")]),e("br"),e("span",{staticClass:"line-number"},[s._v("13")]),e("br")])]),e("p",[s._v("然后执行以下命令添加权限："),e("code",[s._v("ldid -Sent.xml debugserver")])])]),s._v(" "),e("li",[e("p",[s._v("给 debugserver 重新签名，保存以下内容为 entitlements.plist 文件:")]),s._v(" "),e("div",{staticClass:"language-xml line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-xml"}},[e("code",[e("span",{pre:!0,attrs:{class:"token prolog"}},[s._v('<?xml version="1.0" encoding="UTF-8"?>')]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token doctype"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<!")]),e("span",{pre:!0,attrs:{class:"token doctype-tag"}},[s._v("DOCTYPE")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token name"}},[s._v("plist")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token name"}},[s._v("PUBLIC")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"-//Apple//DTD PLIST 1.0//EN"')]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"http://www.apple.com/DTDs/ PropertyList-1.0.dtd"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("plist")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("version")]),e("span",{pre:!0,attrs:{class:"token attr-value"}},[e("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[s._v("=")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("1.0"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("dict")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("key")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("com.apple.springboard.debugapplications"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("</")]),s._v("key")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n   "),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("true")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("/>")])]),s._v("\n   "),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("key")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("run-unsigned-code"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("</")]),s._v("key")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n   "),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("true")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("/>")])]),s._v("\n   "),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("key")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("get-task-allow"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("</")]),s._v("key")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n   "),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("true")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("/>")])]),s._v("\n   "),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("key")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("task_for_pid-allow"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("</")]),s._v("key")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n   "),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("true")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("/>")])]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("</")]),s._v("dict")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v(" \n"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("</")]),s._v("plist")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br"),e("span",{staticClass:"line-number"},[s._v("12")]),e("br"),e("span",{staticClass:"line-number"},[s._v("13")]),e("br"),e("span",{staticClass:"line-number"},[s._v("14")]),e("br")])]),e("p",[s._v("然后运行以下命令给的 debugserver 签名："),e("code",[s._v("codesign -s - --entitlements entitlements.plist -f debugserver")])])]),s._v(" "),e("li",[e("p",[s._v("先移除iPhone中的debugserver "),e("code",[s._v("rm /usr/bin/debugserver")])])]),s._v(" "),e("li",[e("p",[s._v("重新拷贝 debugserver 回手机中："),e("code",[s._v("scp ~/debugserver root@iOSDeviceIP:/usr/bin/debugserver")])])]),s._v(" "),e("li",[e("p",[s._v("第一次使用 debugserver 时需要为其添加可执行权限："),e("code",[s._v("chmod +x /usr/bin/debugserver")])])]),s._v(" "),e("li",[e("p",[s._v("iPhone运行debugserver "),e("code",[s._v("debugserver localhost:1234 /var/containers/Bundle/Application/4C579789-9197-4BDA-B3A8-8AC70CCB43F2/Xitu.app/Xitu")])])]),s._v(" "),e("li",[e("p",[s._v("Mac "),e("code",[s._v("iproxy 1234 1234")])])]),s._v(" "),e("li",[e("p",[s._v("Mac "),e("code",[s._v("lldb")])])]),s._v(" "),e("li",[e("p",[s._v("Mac "),e("code",[s._v("process connect connect://localhost:1234")])])])]),s._v(" "),e("div",{staticClass:"language-sh line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 还有一种，比如我的手机ip 192.168.0.100 Mac IP: 192.168.0.108")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# iPhone")]),s._v("\ndebugserver "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("192.168")]),s._v(".0.108:1234 /var/containers/Bundle/Application/4C579789-9197-4BDA-B3A8-8AC70CCB43F2/Xitu.app/Xitu`\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# Mac")]),s._v("\nlldb\nprocess connect connect://192.168.0.100:1234\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br")])]),e("h2",{attrs:{id:"_8-monkeydev运行问题"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_8-monkeydev运行问题"}},[s._v("#")]),s._v(" 8. MonkeyDev运行问题")]),s._v(" "),e("ol",[e("li",[e("p",[s._v("提示错误"),e("strong",[s._v("An empty identity is not valid when signing a binary for the product type 'Dynamic Library'.")]),s._v(" "),e("code",[s._v("Build Setting")]),s._v(" 中 "),e("strong",[s._v("添加")]),s._v(" "),e("code",[s._v("CODE_SIGNING_ALLOWED")]),s._v(" 等于 "),e("code",[s._v("NO")]),s._v(" "),e("img",{attrs:{src:a(521),alt:""}})])]),s._v(" "),e("li",[e("p",[s._v("提示错误"),e("strong",[s._v("building for iOS, but linking in .tbd file (/opt/theos/vendor/lib/CydiaSubstrate.framework/CydiaSubstrate.tbd) built for iOS Simulator, file '/opt/theos/vendor/lib/CydiaSubstrate.framework/CydiaSubstrate.tbd' for architecture arm64")])]),s._v(" "),e("p",[e("code",[s._v("sudo vim /opt/theos/vendor/lib/CydiaSubstrate.framework/CydiaSubstrate.tbd")])]),s._v(" "),e("p",[s._v("将"),e("code",[s._v("archs")]),s._v("修改为只有 "),e("code",[s._v("arm64")]),s._v(" "),e("img",{attrs:{src:a(522),alt:""}})])])])])}),[],!1,null,null,null);t.default=n.exports}}]);