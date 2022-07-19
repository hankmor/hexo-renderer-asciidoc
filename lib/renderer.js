'use strict';

const asciidoctor = require('asciidoctor')();
// const entities = require('entities');
const util = require('hexo-util');
const cheerio = require('cheerio');

const cheerio_load_option = {
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
  const custom_asciidoc_options = this && this.config ? this.config.asciidoc : {};
  const highlight_options = this && this.config ? this.config.highlight : {};
  // highlight配置参数
  asciidoc_options = util.deepMerge(custom_asciidoc_options, asciidoc_options);
  const html = asciidoctor.convert(data.text, asciidoc_options);
  const $ = cheerio.load(html, cheerio_load_option);

  $('.highlight code').each(function(index, elem) {
    const lang = elem.attribs['data-lang'];
    highlight_options['lang'] = lang;
    const isXml = lang.indexOf('xml') >= 0 || lang.indexOf('html') >= 0;
    // 处理代码内部有数字标号的内容，highlight会转义，需要unescape
    let code = $(elem).html();
    // 处理标号替换
    const number = code.match(COLNUM_PATTERN);
    if (number && number.length > 0) {
      code = code.replace(COLNUM_PATTERN, 'N_U_M_B_E_R');
    }
    // 避免<>符号被转义
    if (!isXml) {
      code = code.replace(/<(\/?\w+)/g, "&lt;$1").replace(/(\w+)>/g, "$1&gt;")
    }
    let content = util.highlight(code, highlight_options);
    const nm = content.match(/(N_U_M_B_E_R)/gi);
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
