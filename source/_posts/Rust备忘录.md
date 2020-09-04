---
layout: post
title: Rust备忘录
date: 2020-2-7 10:57:49
category: 
- 笔记
tags: 
- Rust
---

## Cargo

cargo new {project_name}: 创建新项目

在{project_name}目录下执行:

cargo check: 调用编译器进行语法检查，速度比build更快

cargo build: 编译rust程序

cargo run: 编译并运行程序

**安装第三方库**

在cargo.toml的dependencies下添加第三方库名字和版本：rand = "0.7.0"

运行cargo build，会自动下载第三库进行下载以及编译

如 rand = "0.7.0"，运行cargo update，更新版本的区间为 [0.7.0，0.8.0)

## 语法

### 声明变量：
let：不可变变量，和swift中的let一样，不同的在于，可变变量需要使用 let mut a = xx的形式

   ```rust
 //rust shadow特点:
 fn main(){
  let a = 2;
  let a = a + 1;
  let a = a * 2;
  println!("a = {}",a);  
 }
 // 输出: a = 6
 // 在其他语言中，通常会有变量已经声明的错误
   ```

<!-- more -->

### 错误处理和枚举:

```rust
// 通常语言为 try{}catch{} try{}except{} ..
// rust 使用了模式匹配的方式进行处理(处理枚举的方式相同)
// 1.错误处理
let value = match enumValueExp {
   Ok(value) => value,
   Err( error ) => {
     	handle(error)
   }
}
// 2.枚举，这里是数字比较，来自官方教程的猜数游戏
match guess.cmp(&secret_number) {
    Ordering::Less => println!("too small"),
    Ordering::Greater => println!("too big"),
    Ordering::Equal => {
        println!("win!");
    }
}
```

### 集合类型切片

```rust
let s = String::from("hello");
// 这个指针的数据结构为prt，len. 
let slice = &s[0..2]; // ptr指向s的内存0位置，len为2(2 - 0)
let slice = &s[..2];

let len = s.len();

let slice = &s[3..len];
let slice = &s[3..];

let slice = &s[0..len];
let slice = &s[..];
```

### 内置类型：

#### 无符号整数:

**u8**:  内存大小8bit [0 , 2^8 - 1]，**u32**,  **u64** , **u128**，**usize**: 根据运行系统的指令集决定（64位和32位）

#### 有符号整数:

**i8**:  内存大小8bit 值范围 [-2^7 , 2^7 - 1], **i32** , **i64** , **i128** , **isize**: 根据当前系统决定（64位和32位） 

rust中有趣的是，关于官方文档提到的整形溢出问题，一个u8的变量，如果输入了256，它值会为1，如果是257，值为2，不会让你崩溃的。我想写一个缓冲区溢出的例子，可惜功力有限，写不出。

#### 浮点数:

**f32**: 32位单精度浮点数  , **f64**: 64位双精度浮点数

#### 布尔值类型:

**bool**:  **true** , **false**

#### 字符类型:

**char**: **4字节**(和C中的char:1字节不同)，C中是以ASCII为单个字符，rust中的是按照unicode的单位长度制定。

#### 元组:

```rust
fn main() {
	// 下标访问
    let x: (i32, f64, u8) = (500, 6.4, 1);
    let five_hundred = x.0;
    let six_point_four = x.1;
    let one = x.2;
    // 赋值访问
    let (x, y, z) = x;
}
```

#### 数组:

特点：长度不可变，内存分布在栈上。

针对长度可变时，请使用vector。

使用场景，例如一个数组中需要存放12个月份的名字，此时应该使用数组，因为它始终是12个，不会改变。

```rust
let months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
let a = [1, 2, 3, 4, 5];
let a: [i32; 5] = [1, 2, 3, 4, 5];
let a = [3; 5]; // let a = [3, 3, 3, 3, 3];
```

#### 函数:

格式:  **fn** funcname( arg1: type) -> type{  }

特点：最后一个值表达式，末尾不加  **;**  可直接作为返回值，不用加return。

Tips: 

文档里也有说，没有 **;** 时视为一个值表达式，有 **;** 会视为一个声明表达式。

官方后面在if里有说，代码块(Block ''{}'' )的最后一个表达式就是结算结果。

个人想法：只要是{ }，就可以试试这个。

例子:

```rust
// 1
fn main() {
    let x = 5;
    let y = {
        let x = 3;
        x + 1
    };
    println!("The value of y is: {}", y);
}
// 输出 y = 4

// 2
fn main() {
    let x = plus_one(5);
    println!("The value of x is: {}", x);
}
fn plus_one(x: i32) -> i32 {
    x + 1
}
// 输出 x = 6
```

### 控制语句

#### if else

基本语法与Swift差不多，但是有骚操作😂

```rust
// 上面提到的概念来了..
fn main() {
    let condition = true;
    let number = if condition {5} else {6};
    println!("The value of number is: {}", number);
}
```

#### 循环

**loop**

特点：可以拥有返回值🤔。

```rust
fn main() {
    let mut counter = 0;
    let result = loop {
        counter += 1;
        if counter == 10 {
            break counter * 2;
        }
    };
    println!("The result is {}", result);
}
//输出: The result is 20
```

**while**

平淡无奇，正常的while

也试过在里面使用 break value;

编译器给我的错误😂: can only break with a value inside `loop` or breakable block

**for in**

```rust
fn main() {
    let a = [10, 20, 30, 40, 50];
    for element in a.iter() {
        println!("the value is: {}", element);
    }
    for number in (1..4).rev() {
        println!("{}!", number);
    }
    println!("LIFTOFF!!!");
}
```

## 内存管理

### Ownership

1. Rust中的每个值都有一个称为其所有者的变量名。（例如：let name = "xxx"）
2. 同一时间只能有一个所有者。
3. 当所有者超出作用域时，该值将被删除。

------ from [Rust的所有权(Ownership)](https://segmentfault.com/a/1190000019560319)

```rust
// 当所有者超出作用域时，该值将被删除。
{
 // 存放在栈上，因为在编译的时候，就已经有了确定的值
	let str1 = "123";
  // 存放在堆上
	let str2 = String::from("1233");
}
// str1出栈
// 到这里其实str2指针指向的堆内存已经被释放
```

### 堆变量

赋值时，使用浅拷贝(仅仅只是拷贝的指针的内存)，但是不同的是，之前的指针会被free，rust称为move

```rust
// 同一时间只能有一个所有者
let s1 = String::from("hello");
let s2 = s1;
println!("{}, world!", s1); //编译器会报错
```

如果要进行深拷贝，调用.clone()

```rust
let s1 = String::from("hello");
let s2 = s1.clone();
println!("s1 = {}, s2 = {}", s1, s2);
```

### 栈变量

赋值时，默认会进行拷贝

```rust
let x = 5;
let y = x;
println!("x = {}, y = {}", x, y);
```

遵循了Copy trait的会在赋值时会和常用的标量类型一样自动copy，但是如果已经遵循了Drop trait，则不能遵循Copy trait。

### 引用和借用

在rust中使用引用(借用)，不会产生Ownership，也就不会在释放指针的时候同时释放掉内存。

我认为理解为借用更好，像文档中提到的，你需要一个东西，别人有，你可以去借用，但是你并不拥有它，不能去处置他，因为用完以后你还需要还给别人。

#### 不可变引用

```rust
fn main(){
	let s1 = String::from("hello");
	let len = calculate_length(&s1);
}
fn calculate_length(s: &String) -> usize { // s is a reference to a String
    s.len()
}
```

#### 可变引用

```rust
fn main() {
    let mut s = String::from("hello");
    change(&mut s);
}
fn change(some_string: &mut String) {
    some_string.push_str(", world");
}
```

#### 限制

1. 针对同一可变变量，在同一个作用域中，只能声明一个可变引用，不能有多个可变引用。

   文档中说道：这么做是为了避免在数据竞争的情况下导致的未知的错误。(同时有多个读、多个读，并且没有同步机制的情况)

   ```rust
   let mut s = String::from("hello");
   
   let r1 = &mut s;
   let r2 = &mut s;
   
   println!("{}, {}", r1, r2);
   ```

   错误如下：

   ```
   error[E0499]: cannot borrow `s` as mutable more than once at a time
    --> src/main.rs:5:14
     |
   4 |     let r1 = &mut s;
     |              ------ first mutable borrow occurs here
   5 |     let r2 = &mut s;
     |              ^^^^^^ second mutable borrow occurs here
   6 |
   7 |     println!("{}, {}", r1, r2);
     |                        -- first borrow later used here
   ```

2. 同一作用域中，先声明了一个不可变引用，在指针没有被回收的情况，不能声明一个可变引用。

   ```rust
   let mut s = String::from("hello");
   
   let r1 = &s; // no problem
   let r2 = &s; // no problem
   let r3 = &mut s; // BIG PROBLEM
   
   println!("{}, {}, and {}", r1, r2, r3);
   ```

   错误如下:

   ```
   error[E0502]: cannot borrow `s` as mutable because it is also borrowed as immutable
    --> src/main.rs:6:14
     |
   4 |     let r1 = &s; // no problem
     |              -- immutable borrow occurs here
   5 |     let r2 = &s; // no problem
   6 |     let r3 = &mut s; // BIG PROBLEM
     |              ^^^^^^ mutable borrow occurs here
   7 |
   8 |     println!("{}, {}, and {}", r1, r2, r3);
     |                                -- immutable borrow later used here
   ```

3. 悬挂指针（野指针）

  这里举出的例子，主要和rust的生命周期有关

  ```rust
  fn main() {
    let reference_to_nothing = dangle();
  }
  fn dangle() -> &String {
        let s = String::from("hello");
  
        &s //因为这里使用了引用，所有没用Ownership，出了作用域，s就会被回收内存。
  }
  ```

  错误如下:
  ```
  error[E0106]: missing lifetime specifier
     --> main.rs:5:16
    |
    5 | fn dangle() -> &String {
      |                ^ expected lifetime parameter
      |
      = help: this function's return type contains a borrowed value, but there is
      no value for it to be borrowed from
    = help: consider giving it a 'static lifetime
  ```

  解决办法:

  直接返回变量

  ```rust
fn no_dangle() -> String {
      let s = String::from("hello");

      s
}
  ```



## Struct

### 声明

当前只讨论了，字段类型不为引用的情况。所有权都在struct。

```rust
struct User {
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool,
}
// 元组结构体
struct Color {u32, u32, u32, u32}
```

### 初始化

1. 第一种

```rust
let user1 = User {
    email: String::from("someone@example.com"),
    username: String::from("someusername123"),
    active: true,
    sign_in_count: 1,
};
let color = Color(255, 255, 255, 255)
```

2. 第二种，当变量名和参数名完全相同时

```rust
fn build_user(email: String, username: String) -> User {
    User {
        email,
        username,
        active: true,
        sign_in_count: 1,
    }
}
```

3. 第三种，从另一个实例更新，语法糖。

使用`..`指定实例，使剩余字段的值与实例相同。

这里user2除了email、usename字段以外，其他字段的值都和user1相同。

```rust
let user2 = User {
    email: String::from("another@example.com"),
    username: String::from("anotherusername567"),
    ..user1
};
```

### 打印stuct信息

1. **println!**中的`{}`替换为`{:?}`或者`{:#?}`(优化打印信息格式)

2. 使用`#[derive(Debug)]`使stuct实现`std::fmt::Debug`

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect1 = Rectangle { width: 30, height: 50 };

    println!("rect1 is {:?}", rect1);
}
// rect1 is Rectangle { width: 30, height: 50 }
```


### 定义方法

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

fn main() {
    let rect1 = Rectangle { width: 30, height: 50 };

    println!(
        "The area of the rectangle is {} square pixels.",
        rect1.area()
    );
}
```

使用`&self`：只读，不会更改struct的内容。

使用`&mut self`的情形: 读写，可以更新stuct的内容。

使用`self`: 方法会获取self的所有权，在离开方法的作用域时，self就会被释放。通常是在特定的转换情况下使用，比如你将二进制数据转换为json数据，后续不会再使用二进制数据时。

Tips:

`rect1.area()`等价于`(&rect1).area()`，如果是`&mut self`则等价于`(&mut rect1).area()`，能这么写是因为Rust自动添加了`&`、`&mut`或者`*`。

C++中:` (*object).func() `等价于`object->func()`。

在Rust中没有`->`操作符。

### 定义关联函数

类似于我们常说的类方法

```rust
impl Rectangle {
    fn square(size: u32) -> Rectangle {
        Rectangle { width: size, height: size }
    }
}
let square = Rectangle::square(20);
```

未完待续.....