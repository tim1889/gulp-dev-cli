# gulp 自动化开发

## 开发运行

* 执行 `npm install` , 下载所需依赖包
* 执行 `npm install gulp -g`
* 执行 `gulp`, 观察 command log ,打开网址 （一般是 [http://loaclhost:800/src](http://loaclhost:800/src')）


## 打包

* 修改 gulpfile.js 文件,将压缩打包取消注释，并注释自动刷新的代码
  ```js
  gulp.task('default',function(){
    /**压缩打包 */
    gulp.run('img', 'js', 'css', 'rev');
    /**自动刷新 */
    //gulp.run('img', 'js', 'css','watch', 'connect');
  });
  ```

## src 目录结构
* src
  - css
  - img
  - js
  - index.html

## style 编译
使用编译工具 [less]('http://less.bootcss.com/')