'use strict';

var asciidoctor = require('asciidoctor')();
var entities = require('entities');
var util = require('hexo-util');
var cheerio = require('cheerio');

var cheerio_load_option = {
    decodeEntities: false
};

var asciidoc_options = {
    doctype: 'article',
    linkcss: false,
    attributes: {
        icons: 'font',
        numbered: true,
        toc: 'auto'
    }
};

function asciidoctorRenderer(data, locals) {
    // asciidoc配置参数
    let custom_asciidoc_options = this.config.asciidoc;
    // highlight配置参数
    let highlight_options = this.config.highlight;

    asciidoc_options = util.deepMerge(custom_asciidoc_options, asciidoc_options);
    var html = asciidoctor.convert(data.text, asciidoc_options);
    var $ = cheerio.load(html, cheerio_load_option);

    $('.highlight code').each(function (index, elem) {
        let lang = elem.attribs['data-lang'];
        highlight_options.lang = lang;
        let isXml = lang.indexOf('xml') >= 0 || lang.indexOf('html') >= 0;
        // 处理代码内部有数字标号的内容，highlight会转义，需要unescape
        let code = $(elem).html();
        let number;
        // 单独处理xml代码中含有标号
        if (isXml) {
            number = code.match(/(<.+>)/g);
            if (number && number.length > 0) {
                code = code.replace(/(<.+>)/g, 'NUMBER');
            }
        }
        let content = util.highlight(code, highlight_options);
        if (isXml) {
            var nm = content.match(/(NUMBER)/gi);
            if (nm && nm.length > 0) {
                for (var i = 0; i < number.length; i++) {
                    content = content.replace(/NUMBER/i, number[i]);
                }
            }
        }
        // 做unescape处理
        $(elem).html(util.unescapeHTML(content));
    });

    return $.html()
        .replace(/{/g, '&#123;')
        .replace(/}/g, '&#125;');
}

module.exports = asciidoctorRenderer;
