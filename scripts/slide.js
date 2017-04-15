/**
 * Created by hugh on 2017/4/9.
 */


var fs = require('fs');
var path = require('path');
var ejs = require('ejs');
var yfm = require('hexo-front-matter');
var sourceRoot = 'source/_posts';
var templatePath= path.join('themes', 'hexo-material','layout', 'post-slide.ejs');
var outPathRoot = 'public';

var files = fs.readdirSync(path.join(sourceRoot));

files.forEach(function (_item) {
    var fileName = _item.toString();
    if(fileName.substring(fileName .lastIndexOf("."))=='.md') {

        //读取markdown文件
        var page = fs.readFileSync(path.join(sourceRoot, _item.toString()), "UTF-8");

        // 读取相关设置，title和date
        var title = yfm.parse(page).title;
        var date = new Date(yfm.parse(page).date);
        page = page.replace(/([\r\n\0]*?)---([\S\s]*?)---([\r\n\0]*?)/g, title+'\n');
        //生成输出路径

        var year = date.getFullYear().toString();
        var month = ("0" + (date.getMonth() + 1)).slice(-2).toString();
        var day = ("0" + date.getDate()).slice(-2).toString();
        var outPath = path.join(outPathRoot,year,month,day, title);
        if (!fs.existsSync(outPath)) {
            fs.mkdir(outPath, function (err) {
                if (err)
                    throw err;
                console.log('创建post目录成功');
            });
        }


//输出html文件
    var template = fs.readFileSync(templatePath, 'utf-8');
    var pageData = ejs.render(template, {
        filename:title,
        page: page
    });
    fs.writeFile(path.join(outPath, 'index-slide.html'), pageData, function (err) {
        if (err) throw err;
    });
    }

});
console.log('slide生成完成');