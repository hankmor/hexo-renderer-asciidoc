'use strict';

let asciidoctor = require('asciidoctor')();
let entities = require('entities');
let util = require('hexo-util');
let cheerio = require('cheerio');

let cheerio_load_option = {
    decodeEntities: false
};

let asciidoc_options = {
    doctype: 'article',
    linkcss: false,
    attributes: {
        icons: 'font',
        numbered: true,
        toc: 'auto'
    }
};

const COLNUM_PATTERN = /<i\sclass="conum".*\b>/g;

function asciidoctorRenderer(data, locals) {
    // asciidoc配置参数
    let custom_asciidoc_options = this.config.asciidoc;
    // highlight配置参数
    let highlight_options = this.config.highlight;
    asciidoc_options = util.deepMerge(custom_asciidoc_options, asciidoc_options);
    let html = asciidoctor.convert(data.text, asciidoc_options);
    let $ = cheerio.load(html, cheerio_load_option);

    $('.highlight code').each(function (index, elem) {
        let lang = elem.attribs['data-lang'];
        highlight_options['lang'] = lang;
        let isXml = lang.indexOf('xml') >= 0 || lang.indexOf('html') >= 0;
        // 处理代码内部有数字标号的内容，highlight会转义，需要unescape
        let code = $(elem).html();
        let number;
        // 处理标号替换
        number = code.match(COLNUM_PATTERN);
        if (number && number.length > 0) {
            code = code.replace(COLNUM_PATTERN, 'N_U_M_B_E_R');
        }
        let content = util.highlight(code, highlight_options);
        let nm = content.match(/(N_U_M_B_E_R)/gi);
        if (nm && nm.length > 0 && number && number.length > 0) {
            for (let i = 0; i < number.length; i++) {
                content = content.replace(/N_U_M_B_E_R/i, number[i]);
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
