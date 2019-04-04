使用npm安装插件：命令提示符执行

>npm install <name> [-g] [--save-dev]

5.1 <name>：node插件名称。例：npm install gulp-less --save-dev

5.2、-g：全局安装。将会安装在C:\Users\Administrator\AppData\Roaming\npm，并且写入系统环境变量； 非全局安装：将会安装在当前定位目录； 全局安装可以通过命令行在任何地方调用它，本地安装将安装在定位目录的node_modules文件夹下，通过require()调用；

5.3、--save：将保存配置信息至package.json（package.json是node.js的项目配置文件，在初始化文件 npm install 时会根据你配置文件中的条目进行安装）；

5.4、-dev：保存至package.json的devDependencies节点，不指定-dev将保存至dependencies节点；一般保存在dependencies的像这些express/ejs/body-parser等等。

5.5、使用npm卸载插件：

>npm uninstall <name> [-g] [--save-dev]  

5.6、使用npm更新插件：

>npm update <name> [-g] [--save-dev]
> 
>npm update [--save-dev]  // 更新全部插件
5.7、查看npm帮助：npm help

5.8、当前目录已安装插件：npm list
