---
layout: post
title: Flask学习笔记
date: 2019-12-10 00:37:49
categories: 
- 笔记
tags: 
- Python
- Flask
---

# 使用config.py设置Flask

```python
#config.py
DEBUG = True
#数据库相关
SECRET_KEY = "SECRET_KEY"
SQLALCHEMY = ""
```

```python
# main.py
from flask import Flask
import config
app = Flask(__name__)
app.config.from_object(config)


@app.route('/')
def hello_world():
    return 'Hello World!'

if __name__ == '__main__':
    app.run()
```
<!-- more -->

# URL传参

```python
@app.route('/article/<articleId>/')
def articleDetail(articleId: str):
    return "%s" % articleId
```

# URL反转，重定向

```python
from flask import redirect, url_for
url_for("article",articleId="132")
redirect('url')
redirect(url_for("article",articleId="132"))
```

# Jinja2

##  模版渲染和模版传参

index.html位于templates目录下

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<p>{{ usernames }}</p>
<p>{{ username }}</p>
<p>{{ gender }}</p>
<p>{{ age }}</p>
{# 访问模型 #}
<hr>
<p>{{ person.name }}</p>
<p>{{ person.age }}</p>
{# 访问字典 #}
<hr>
<p>{{ dict['google'] }}</p>
<p>{{ dict['baidu'] }}</p>
<p>{{ dict.google }}</p>
<p>{{ dict.baidu }}</p>
</body>
</html>
```

```python
# main.py
@app.route('/')
def hello_world():
    class Person(object):
        age = 1
        name = 'Person'
    p = Person()
    context = {
        'username': 'jkm',
        'gender': 'female',
        'age': '23',
        'person': p,
        'dict': {
            "google": 'www.google.com',
            'baidu': 'www.baidu.com'
        }
    }
    return render_template('index.html', **context, usernames="test")
```

## if 控制语句

```python
# main.py
@app.route('/<isLogin>/')
def hello_world(isLogin):
    if int(isLogin) > 0:
        user = {
            'username': 'test',
            'age': 18
        }
        return render_template('index.html', user=user)
    else:
        return render_template('index.html')
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    {% if user and user.age > 20 %}
        <p>username:{{ user.username }}</p>
        <p>age:{{ user.age }}</p>
    {% else %}
        <a>登陆</a>
        <a>注册</a>
    {% endif %}
</body>
</html>
```

## for循环语句

### 字典遍历

items()，keys()，values()等都可以使用

```python
@app.route('/')
def hello_world():
    user = {
        'username': 'test',
        'age': 21
    }
    return render_template('index.html', user=user)
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    {% for k, v in user.items() %}
        <p>{{ k }}: {{ v }}</p>
    {% endfor %}
</body>
</html>
```

### 数组遍历

```python
@app.route('/')
def hello_world():
    sites = ["https://wwww.baidu.com", "https://wwww.google.com"]
    return render_template('index.html', sites=sites)
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    {% for value in sites %}
        <a>{{ value }}</a>
    {% endfor %}
</body>
</html>
```

## 过滤器

1. 介绍和语法：

   * 过滤器可以处理变量，把原始的变量经过处理后再展示出来，作用的对象是变量，类似于Linux Shell的管道处理 ls -a | grep name.txt，常用过滤器有default设置默认值，length等

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <title>Title</title>
   </head>
   <body>
       {{ avatar | default "url" }}
   </body>
   </html>
   ```
## 模版继承

base.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
{% block container %} {% endblock %}
</body>
</html>
```

index.html

```
{% extends 'base.html' %}
{% block container %}
<p>index_page</p>
{% endblock %}
```

second.html

```html
{% extends 'base.html' %}
{% block container %}
<p>second_page</p>
{% endblock %}
```

## 加载静态文件css,png等

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="{{ url_for('static',filename='text.css') }}">
</head>
<body>
<img src="{{ url_for('static',filename='images/icon.png') }}" alt="">
</body>
</html>
```

