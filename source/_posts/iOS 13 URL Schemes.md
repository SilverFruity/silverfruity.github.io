---
layout: post
title: iOS 13 URL Scheme
date: 2019-12-30
category: 
- 笔记
tags:
- iOS
- URL Scheme
---

### 1. before iOS 13

**AppDelegate.swift**

```swift
// 针对低版本，未启动时，使用URL Scheme启动App的情，低到什么程度我就不知道了。
// 添加了application(app: open: options:)方法，就别使用这个了，iOS 10.3.1测试
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    if let sechme = launchOptions?[UIApplicationLaunchOptionsKey.url] as? URL{
          DispatchQueue.main.asyncAfter(deadline: .now() + 5) {
            let alert = UIAlertController.init(title: "BBB", message: url.absoluteString, preferredStyle: .alert)
            alert.addAction(UIAlertAction.init(title: "cancel", style: .cancel, handler: nil))
            self.window?.rootViewController?.present(alert, animated: true, completion: nil)
    }
        // 转移到openUrl中处理
        // _ = self.application(application, open: sechme)
    }
}
```

   ```swift
// iOS 10.3.1 active / not active
func application(_ app: UIApplication, open url: URL, options: [UIApplicationOpenURLOptionsKey : Any] = [:]) -> Bool {
    DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
            let alert = UIAlertController.init(title: "AAA", message: url.absoluteString, preferredStyle: .alert)
            alert.addAction(UIAlertAction.init(title: "cancel", style: .cancel, handler: nil))
            self.window?.rootViewController?.present(alert, animated: true, completion: nil)
    }
    return true
}
   ```

经测试，在iOS 10.3.1中只使用application(app: open: options:)方法，能够应付App已启动和未启动两种情况。

同时使用上述两个方法，嗯，有BUG，都会调用。不信你试试🤨。有错误欢迎指正👏。

### 2. iOS 13.3

**SceneDelegate.swift**

#### 1. App未启动

```swift
// iOS 13 not active
func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
    if #available(iOS 13.0, *) {
        guard let _ = (scene as? UIWindowScene) else { return }
        for context in connectionOptions.urlContexts{
            DispatchQueue.main.asyncAfter(deadline: .now() + 5) {
                let alert = UIAlertController.init(title: "not active", message: context.url.absoluteString, preferredStyle: .alert)
                alert.addAction(UIAlertAction.init(title: "cancel", style: .cancel, handler: nil))
                self.window?.rootViewController?.present(alert, animated: true, completion: nil)
            }
        }
    } else {
        // Fallback on earlier versions
    }
}
```

#### 2. App已启动

```swift
@available(iOS 13.0, *)
// iOS 13 active
func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
    for context in URLContexts{
        DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
            let alert = UIAlertController.init(title: "active", message: context.url.absoluteString, preferredStyle: .alert)
            alert.addAction(UIAlertAction.init(title: "cancel", style: .cancel, handler: nil))
            self.window?.rootViewController?.present(alert, animated: true, completion: nil)
        }
    }
}
```

使用iOS13.3测试，已启动和未启动是分开写，可能后面会改为scene:openURLContexts:统一处理，到时候又会出现上面调用两次的情况(或许吧😂)。