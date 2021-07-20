module.exports = {
  "title": "SilverFruity",
  "description": "",
  "dest": "public",
  "head": [
    ["link", { "rel": "icon", "href": "/favicon.ico" } ],
    ["meta", { "name": "viewport", "content": "width=device-width,initial-scale=1,user-scalable=no" } ],
    ["meta", {name: "robots", content: "all"}],
    ["meta", {name: "author", content: "SilverFruity"}],
    ["meta", {name: "keywords", content: "SilverFruity,iOS开发,iOS热更新,iOS热修复,OCRunner,OCRunner热修复,OCRunner热更新,iOS13 URL Scheme,iOS libffi,iOS圆角阴影边框,SFImageMaker"}],
  ],
  "theme": "reco",
  plugins: [
    ['vuepress-plugin-code-copy', true],
    'vuepress-plugin-baidu-autopush',
    ['sitemap', {
        hostname: 'https://silverfruity.github.io'
    }],
    ['copyright', {
      noCopy: false, // 允许复制内容
      minLength: 100, // 如果长度超过 100 个字符
      authorName: "https://silverfruity.github.io",
      // clipboardComponent: "请注明文章出处, [Java 全栈知识体系](https://www.pdai.tech)"
    }],
  ],
  "themeConfig": {
    mode: 'auto',
    modePicker: true,
    subSidebar: 'auto',
    vssueConfig: {
      platform: 'github',
      owner: 'SilverFruity',
      repo: 'silverfruity.github.io',
      clientId: '4d78553fd7e83437e10e',
      clientSecret: 'ddf64636c9c757bd81bd5b968e6e39488d78fecc',
    },
    "nav": [
      {
        "text": "Home",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "TimeLine",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      {
        "text": "Contact",
        "icon": "reco-message",
        "items": [
          {
            "text": "GitHub",
            "link": "https://github.com/SilverFruity",
            "icon": "reco-github"
          }
        ]
      }
    ],
    "sidebar": {
      "/docs/theme-reco/": [
        "",
        "theme",
        "plugin",
        "api"
      ]
    },
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "Category"
      },
      "tag": {
        "location": 3,
        "text": "Tag"
      }
    },
    "logo": "/logo.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "SilverFruity",
    "authorAvatar": "/avatar.png",
    "record": "xxxx",
    "startYear": "2017"
  },
  "markdown": {
    "lineNumbers": true
  }
}