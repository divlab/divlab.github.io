相信对于Javacript有一定了解的人都听过prototype原型这个概念，今天我们深度的分析下prototype与proto。
好了，下面看一个非常简单的例子：
var Person = function(name) {
this.name = name ;
};
var p = new Person("Ben");
console.log(p.name);
代码简单的 你不用说明了，如果现在让大家根据上面的代码画一张包含Function与Object的内存图，大家肯定回想什么叫包含Function与Object，上面的代码和它们有几毛钱的关系。好了，下面我先按要求把图画出来，大家参考下：
center

解析下：
1、任何一个由构造器产生的对象都有 proto 属性，且此属性指向该构造器的prototype。
2、所有构造器/函数的 proto 都指向Function的prototype
拿第2条对比第1条，貌似我们发现了什么，没错函数的构造器就是Function，看下面的代码：

//函数表达式
var Person = function(name) {
this.name = name ;
};
//函数声明
function Person(name) {
this.name = name ;
}
//上面两种方式实际上就相当与new Function
var Person = new Function("name" , "this.name = name ;" );
当然了不能说说，下面看代码验证：

console.log(Person.proto === Function.prototype); //true
console.log(typeof p.proto);//objcect
console.log(p.proto.proto === Object.prototype); //true

有人会问，那么Function与Object的prototype,prop到底是什么呢？

console.log(Object.proto === Function.prototype); // true
console.log(Function.proto === Function.prototype); //true console.log(Function.prototype.proto == Object.prototype); //true
console.log(Object.prototype.proto); //null

有此可见
1、所有的构造器包括Object和Function都继承了Function.prototype的方法，由第三行可知所有的构造器都是对象，即js中一切皆为对象。
2、proto最终的指向都是Object.prototype，这也就是js中的原型链。

最后我们看一下Object的文档：
Properties
The following table lists properties of the Object Object.
Property
Description
proto Property
Specifies the prototype for an object.
constructor Property
Specifies the function that creates an object.
prototype Property
Returns a reference to the prototype for a class of objects.
发现Object还有个constructor属性。
1、constructor属性指向的是创建当前对象的构造函数。
2、每个函数都有一个默认的属性prototype，而这个prototype的constructor默认指向这个函数
看下面的例子：

//函数表达式
var Person = function(name)
{
this.name = name ;
};
var p = new Person("Ben");
console.log(p.constructor === Person);//true
console.log(Person.prototype.constructor === Person); //true
console.log(Person.prototype instanceof Object); //true
console.log(Person.prototype instanceof Person); //false
//改变Person的prototype
Person.prototype = {name:"123"} ;
var p2 = new Person("Ben");
console.log(p2.constructor === Object);//true
console.log(p2.constructor === Person.prototype.constructor);//true
console.log(Person.prototype.constructor === Object);//true
console.log(Person.prototype.constructor === Person);//false

当改变Person的prototype时，会发现，Person.prototype.constructor指向了Object，主要是因为:
Person.prototype = {name:"123"} 相当于Person.prototype=new Object({name:"123"} );此时的构造器变成了Object.


jianli


如何创建嵌套的过滤器
//允许你减少集合中的匹配元素的过滤器， //只剩下那些与给定的选择器匹配的部分。在这种情况下， //查询删除了任何没（:not）有（:has） //包含class为“selected”（.selected）的子节点。 .filter(":not(:has(.selected))")
如何重用元素搜索
var allItems = $("div.item"); var keepList = $("div#container1 div.item"); //现在你可以继续使用这些jQuery对象来工作了。例如， //基于复选框裁剪“keep list”，复选框的名称 //符合
class names: $(formToLookAt + " input:checked").each(function () { keepList = keepList.filter("." + $(this).attr("name")); });
任何使用has()来检查某个元素是否包含某个类或是元素
//jQuery 1.4.*包含了对这一has方法的支持。该方法找出 //某个元素是否包含了其他另一个元素类或是其他任何的 //你正在查找并要在其之上进行操作的东东。 $("input").has(".email").addClass("email_icon");
如何使用jQuery来切换样式表
//找出你希望切换的媒体类型（media-type），然后把href设置成新的样式表。
$('link[media="screen"]').attr('href', 'Alternative.css');
如何限制选择范围（基于优化目的）
//尽可能使用标签名来作为类名的前缀， //这样jQuery就不需要花费更多的时间来搜索 //你想要的元素。还要记住的一点是， //针对于你的页面上的元素的操作越具体化， //就越能降低执行和搜索的时间。
var in_stock = $('#shopping_cart_items input.is_in_stock');
Item X
Item Y
Item Z
如何正确地使用ToggleClass
//切换（toggle）类允许你根据某个类的 //是否存在来添加或是删除该类。 //这种情况下有些开发者使用：
a.hasClass('blueButton') ? a.removeClass('blueButton') : a.addClass('blueButton');
//toggleClass允许你使用下面的语句来很容易地做到这一点
a.toggleClass('blueButton');
如何设置IE特有的功能
if ($.browser.msie) {
// Internet Explorer其实不那么好用
}
如何使用jQuery来代替一个元素
$('#thatdiv').replaceWith('fnuh');
如何验证某个元素是否为空
if ($('#keks').html().trim()) {
//什么都没有找到;
}
如何从一个未排序的集合中找出某个元素的索引号
$("ul > li").click(function () { var index = $(this).prevAll().length; });
如何把函数绑定到事件上
$('#foo').bind('click', function () { alert('User clicked on "foo."'); });
如何追加或是添加html到元素中
$('#lal').append('sometext');
在创建元素时，如何使用对象字面量（literal）来定义属性
var e = $("", { href: "#", class: "a-class another-class", title: "..." });
如何使用多个属性来进行过滤
//在使用许多相类似的有着不同类型的input元素时， //这种基于精确度的方法很有用
var elements = $('#someid input[type=sometype][value=somevalue]').get();
如何使用jQuery来预加载图像
jQuery.preloadImages = function () { for (var i = 0; i < arguments.length; i++) { $("").attr('src', arguments[i]); } };
//用法$.preloadImages('image1.gif', '/path/to/image2.png', 'some/image3.jpg');
如何为任何与选择器相匹配的元素设置事件处理程序
$('button.someClass').live('click', someFunction); //注意，在jQuery 1.4.2中，delegate和undelegate选项 //被引入代替live，因为它们提供了更好的上下文支持 //例如，就table来说，以前你会用 //.live() $("table").each(function () { $("td", this).live("hover", function () { $(this).toggleClass("hover"); }); }); //现在用 $("table").delegate("td", "hover", function () { $(this).toggleClass("hover"); });
如何找到一个已经被选中的option元素
$('#someElement').find('option:selected');
如何隐藏一个包含了某个值文本的元素
$("p.value:contains('thetextvalue')").hide();
如果自动滚动到页面中的某区域
jQuery.fn.autoscroll = function (selector) {
$('html,body').animate( { scrollTop: $(this).offset().top },
500
);
}
//然后像这样来滚动到你希望去到的class/area上。
$('.area_name').autoscroll();
如何检测各种浏览器
if( $.browser.safari) //检测Safari
if ($.browser.msie && $.browser.version > 6 ) //检测IE6及之后版本
if ($.browser.msie && $.browser.version <= 6 ) //检测IE6及之前版本
if ($.browser.mozilla && $.browser.version >= '1.8' ) //检测FireFox 2及之后版本
如何替换串中的词
var el = $('#id'); el.html(el.html().replace(/word/ig, ''));
如何禁用右键单击上下文菜单
$(document).bind('contextmenu', function (e) {
return false;
});
如何定义一个定制的选择器
$.expr[':'].mycustomselector = function(element, index, meta, stack){ // element- 一个DOM元素 // index – 栈中的当前循环索引 // meta – 有关选择器的元数据 // stack – 要循环的所有元素的栈 // 如果包含了当前元素就返回true // 如果不包含当前元素就返回false }; // 定制选择器的用法： $('.someClasses:test').doSomething();
如何检查某个元素是否存在
if ($('#someDiv').length) {
//你妹，终于找到了
}
如何使用jQuery来检测右键和左键的鼠标单击两种情况
$("#someelement").live('click', function (e) { if ((!$.browser.msie && e.button == 0) || ($.browser.msie && e.button == 1)) { alert("Left Mouse Button Clicked"); } else if (e.button == 2) { alert("Right Mouse Button Clicked"); } });
如何显示或是删除input域中的默认值
//这段代码展示了在用户未输入值时， //如何在文本类型的input域中保留 //一个默认值
$(".swap").each(function (i) { wap_val[i] = $(this).val(); $(this).focusin(function () { if ($(this).val() == swap_val[i]) { $(this).val(""); } }).focusout(function () { if ($.trim($(this).val()) == "") { $(this).val(swap_val[i]); } }); });
如何在一段时间之后自动隐藏或关闭元素（支持1.4版本）
//这是1.3.2中我们使用setTimeout来实现的方式
setTimeout(function () { $('.mydiv').hide('blind', {}, 500) }, 5000); //而这是在1.4中可以使用delay()这一功能来实现的方式（这很像是休眠） $(".mydiv").delay(5000).hide('blind', {}, 500);
如何把已创建的元素动态地添加到DOM中
var newDiv = $('');
newDiv.attr('id', 'myNewDiv').appendTo('body');
如何限制“Text-Area”域中的字符的个数
jQuery.fn.maxLength = function (max) { this.each(function () { var type = this.tagName.toLowerCase(); var inputType = this.type ? this.type.toLowerCase() : null; if (type == "input" && inputType == "text" || inputType == "password") { this.maxLength = max; } else if (type == "textarea") { this.onkeypress = function (e) { var ob = e || event; var keyCode = ob.keyCode; var hasSelection = document.selection ? document.selection.createRange().text.length > 0 : this.selectionStart != this.selectionEnd; return !(this.value.length >= max && (keyCode > 50 || keyCode == 32 || keyCode == 0 || keyCode == 13) && !ob.ctrlKey && !ob.altKey && !hasSelection); }; this.onkeyup = function () { if (this.value.length > max) { this.value = this.value.substring(0, max); } }; } }); };
//用法$('#mytextarea').maxLength(500);
如何为函数创建一个基本的测试
//把测试单独放在模块中 module("Module B"); test("some other test", function () { //指明测试内部预期有多少要运行的断言 expect(2); //一个比较断言，相当于JUnit的assertEquals equals(true, false, "failing test"); equals(true, true, "passing test"); });
如何在jQuery中克隆一个元素
var cloned = $('#somediv').clone();
在jQuery中如何测试某个元素是否可见
if ($(element).is(':visible')) {
//该元素是可见的
}
如何把一个元素放在屏幕的中心位置
jQuery.fn.center = function () { this.css('position', 'absolute'); this.css('top', ($(window).height() - this.height())
/ +$(window).scrollTop() + 'px'); this.css('left', ($(window).width() - this.width())
/ 2 + $(window).scrollLeft() + 'px'); return this; }
//这样来使用上面的函数：$(element).center();
如何把有着某个特定名称的所有元素的值都放到一个数组中
var arrInputValues = new Array();
$("input[name='table[]']").each(function () {
arrInputValues.push($(this).val());
});
如何从元素中除去HTML
(function ($) { $.fn.stripHtml = function () { var regexp = /<("[^"]"|'[^']'|[^'">])*>/gi; this.each(function () { $(this).html($(this).html().replace(regexp, "")); }); return $(this); } })(jQuery);
//用法：$('p').stripHtml();
如何使用closest来取得父元素
$('#searchBox').closest('div');
如何使用Firebug和Firefox来记录jQuery事件日志
// 允许链式日志记录 // 用法： $('#someDiv').hide().log('div hidden').addClass('someClass'); jQuery.log = jQuery.fn.log = function (msg) { if (console) { console.log("%s: %o", msg, this); } return this; };
如何强制在弹出窗口中打开链接
jQuery('a.popup').live('click', function () { newwindow = window.open($(this).attr('href'), '', 'height=200,width=150'); if (window.focus) { newwindow.focus(); } return false; });
如何强制在新的选项卡中打开链接
jQuery('a.newTab').live('click', function () { newwindow = window.open($(this).href); jQuery(this).target = "_blank"; return false; });
在jQuery中如何使用.siblings()来选择同辈元素
// 不这样做
$('#nav li').click(function () { $('#nav li').removeClass('active'); $(this).addClass('active'); });
//替代做法是
$('#nav li').click(function () { $(this).addClass('active').siblings().removeClass('active'); });
如何切换页面上的所有复选框
var tog = false;
// 或者为true，如果它们在加载时为被选中状态的话
$('a').click(function () { $("input[type=checkbox]").attr("checked", !tog); tog = !tog; });
如何基于一些输入文本来过滤一个元素列表
//如果元素的值和输入的文本相匹配的话 //该元素将被返回
$('.someClass').filter(function () { return $(this).attr('value') == $('input#someId').val(); })
如何获得鼠标垫光标位置x和y
$(document).ready(function () { $(document).mousemove(function (e) { $('#XY').html("X Axis : " + e.pageX + " | Y Axis " + e.pageY); }); });
如何把整个的列表元素（List Element，LI）变成可点击的
$("ul li").click(function () { window.location = $(this).find("a").attr("href"); return false; });
Link 1
Link 2
Link 3
Link 4
如何使用jQuery来解析XML（基本的例子）
function parseXml(xml) { //找到每个Tutorial并打印出author $(xml).find("Tutorial").each(function () { $("#output").append($(this).attr("author") + ""); }); }
如何检查图像是否已经被完全加载进来
$('#theImage').attr('src', 'image.jpg').load(function () { alert('This Image Has Been Loaded'); });
如何使用jQuery来为事件指定命名空间
//事件可以这样绑定命名空间 $('input').bind('blur.validation', function (e) { // ... }); //data方法也接受命名空间 $('input').data('validation.isValid', true);
如何检查cookie是否启用
var dt = new Date(); dt.setSeconds(dt.getSeconds() + 60); document.cookie = "cookietest=1; expires=" + dt.toGMTString(); var cookiesEnabled = document.cookie.indexOf("cookietest=") != -1; if (!cookiesEnabled) { //没有启用cookie }
如何让cookie过期
var date = new Date(); date.setTime(date.getTime() + (x * 60 * 1000)); $.cookie('example', 'foo', { expires: date });
如何使用一个可点击的链接来替换页面中任何的URL
$.fn.replaceUrl = function () { var regexp = /((ftp|http|https)://(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(/|/([\w#!:.?+=&%@!-/]))?)/gi; this.each(function () { $(this).html( $(this).html().replace(regexp, '$1') ); }); return $(this); }
//用法　$('p').replaceUrl();
取得类型 [object Number]或其它
var _getType = function(o) {
return Object.prototype.toString.call(o);
}
实现一个函数clone，可以对JavaScript中的5种主要的数据类型（包括Number、String、Object、Array、Boolean）进行值复制。
/**
对象克隆
支持基本数据类型及对象
递归方法
*/
function clone(obj) {
var o;
switch (typeof obj) {
case "undefined":
break;
case "string":
o = obj + "";
break;
case "number":
o = obj - 0;
break;
case "boolean":
o = obj;
break;
case "object": // object 分为两种情况 对象（Object）或数组（Array）
if (obj === null) {
o = null;
} else {
if (Object.prototype.toString.call(obj).slice(8, -1) === "Array") {
o = [];
for (var i = 0; i < obj.length; i++) {
o.push(clone(obj[i]));
}
} else {
o = {};
for (var k in obj) {
o[k] = clone(obj[k]);
}
}
}
break;
default:
o = obj;
break;
}
return o;
}
3、如何消除一个数组里面重复的元素？
// 方法一：
var arr1 =[1,2,2,2,3,3,3,4,5,6],
arr2 = [];
for(var i = 0,len = arr1.length; i< len; i++){
if(arr2.indexOf(arr1[i]) < 0){
arr2.push(arr1[i]);
}
}
document.write(arr2); // 1,2,3,4,5,6

4、想实现一个对页面某个节点的拖曳？如何做？（使用原生JS）。

5、在Javascript中什么是伪数组？如何将伪数组转化为标准数组？
伪数组（类数组）：无法直接调用数组方法或期望length属性有什么特殊的行为，但仍可以对真正数组遍历方法来遍历它们。典型的是函数的argument参数，还有像调用getElementsByTagName,document.childNodes之类的,它们都返回NodeList对象都属于伪数组。可以使用Array.prototype.slice.call(fakeArray)将数组转化为真正的Array对象。
function log(){
var args = Array.prototype.slice.call(arguments);
//为了使用unshift数组方法，将argument转化为真正的数组
args.unshift('(app)');
console.log.apply(console, args);
};

6、Javascript中callee和caller的作用？
caller是返回一个对函数的引用，该函数调用了当前函数；
callee是返回正在被执行的function函数，也就是所指定的function对象的正文。

7、请描述一下cookies，sessionStorage和localStorage的区别
sessionStorage用于本地存储一个会话（session）中的数据，这些数据只有在同一个会话中的页面才能访问并且当会话结束后数据也随之销毁。因此sessionStorage不是一种持久化的本地存储，仅仅是会话级别的存储。而localStorage用于持久化的本地存储，除非主动删除数据，否则数据是永远不会过期的。
web storage和cookie的区别
Web Storage的概念和cookie相似，区别是它是为了更大容量存储设计的。Cookie的大小是受限的，并且每次你请求一个新的页面的时候Cookie都会被发送过去，这样无形中浪费了带宽，另外cookie还需要指定作用域，不可以跨域调用。
除此之外，Web Storage拥有setItem,getItem,removeItem,clear等方法，不像cookie需要前端开发者自己封装setCookie，getCookie。但是Cookie也是不可以或缺的：Cookie的作用是与服务器进行交互，作为HTTP规范的一部分而存在 ，而Web Storage仅仅是为了在本地“存储”数据而生。

8、手写数组快速排序
关于快排算法的详细说明，可以参考阮一峰老师的文章快速排序
“快速排序”的思想很简单，整个排序过程只需要三步：
（1）在数据集之中，选择一个元素作为”基准”（pivot）。
（2）所有小于”基准”的元素，都移到”基准”的左边；所有大于”基准”的元素，都移到”基准”的右边。
（3）对”基准”左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。

9、统计字符串”aaaabbbccccddfgh”中字母个数或统计最多字母数。
var str = "aaaabbbccccddfgh";
var obj = {};
for(var i=0;i<str.length;i++){
var v = str.charAt(i);
if(obj[v] && obj[v].value == v){
obj[v].count = ++ obj[v].count;
}else{
obj[v] = {};
obj[v].count = 1;
obj[v].value = v;
}
}
for(key in obj){
document.write(obj[key].value +'='+obj[key].count+' '); // a=4 b=3 c=4 d=2 f=1 g=1 h=1
}

10、写一个function，清除字符串前后的空格。（兼容所有浏览器）
function trim(str) {
if (str && typeof str === "string") {
return str.replace(/(^\s_)|(\s_)$/g,""); //去除前后空白符
}
}

其他
1、一次完整的HTTP事务是怎样的一个过程？
基本流程：
a. 域名解析
b. 发起TCP的3次握手
c. 建立TCP连接后发起http请求
d. 服务器端响应http请求，浏览器得到html代码
e. 浏览器解析html代码，并请求html代码中的资源
f. 浏览器对页面进行渲染呈现给用户
