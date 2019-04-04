var http = require('http');
var fs = require('fs');//引入文件读取模块

var documentRoot = 'E:/blog';
//需要访问的文件的存放目录

var server= http.createServer(function(req,res){

    var url = req.url; 
    //客户端输入的url，例如如果输入localhost:8888/index.html
    //那么这里的url == /index.html 

    var file = documentRoot + url;

    fs.readFile( file , function(err,data){
    /*
        一参为文件路径
        二参为回调函数
            回调函数的一参为读取错误返回的信息，返回空就没有错误
            二参为读取成功返回的文本内容
    */
        if(err){
            res.writeHeader(404,{
                'content-type' : 'text/html;charset="utf-8"'
            });
            res.write('<h1 style="text-align:center;margin-top:80px;">404错误</h1><p style="text-align:center;">你要找的页面不存在</p>');
            res.end();
        }else{
            res.writeHeader(200,{
                'content-type' : 'text/html;charset="utf-8"'
            });
            res.write(data);//将index.html显示在客户端
            res.end();

        }

    });



}).listen(8080);

console.log('服务启动，port:8080');
// var http = require('http');//引入http模块

// //开启服务，监听8888端口
// //端口号最好为6000以上
// var server = http.createServer(function(req,res){
//     /*
//         req用来接受客户端数据
//         res用来向客户端发送服务器数据
//     */

//     console.log('有客户端连接');//创建连接成功显示在后台

//     //一参是http请求状态，200连接成功
//     //连接成功后向客户端写入头信息
//     res.writeHeader(200,{
//         'content-type' : 'text/html;charset="utf-8"'
//     });

//     res.write('这是正文部分');//显示给客户端
//     res.end();

// }).listen(8888);

// console.log('服务器开启成功');