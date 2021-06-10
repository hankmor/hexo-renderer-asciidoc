'use strict';

// mocha的使用：http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html
// 运行测试命令：mocha index.js
// 如果执行test目录的所有测试文件，执行: mocha
// 如果有子目录，则执行 mocha --recursive

// 断言库
var should = require('chai').should(); // eslint-disable-line

// mocha单元测试
// 测试套件
describe('asciidoc-test', function () {
    var r = require('../lib/renderer');

    // 测试用例
    it('header', function () {
        var body = `
== Test H2 ==
`;
        var result = r({text: body}, {});
        result.should.eql('<div id="toc" class="toc">\n' +
            '<div id="toctitle">Table of Contents</div>\n' +
            '<ul class="sectlevel1">\n' +
            '<li><a href="#_test_h2">1. Test H2</a></li>\n' +
            '</ul>\n' +
            '</div>\n' +
            '<div class="sect1">\n' +
            '<h2 id="_test_h2">1. Test H2</h2>\n' +
            '<div class="sectionbody">\n\n' +
            '</div>\n' +
            '</div>');
    });

    it('code-highlight', function () {
        var body = `
[source,ruby]
----
require 'sinatra'

get '/hi' do
  "Hello World!"
end
----`;
        var result = r({text: body}, {});
        console.log(result);
        result.should.eql('<div class="listingblock">\n' +
            '<div class="content">\n' +
            '<pre class="highlight"><code class="language-ruby" data-lang="ruby"><figure class="highlight ruby"><table><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br></pre></td><td class="code"><pre><span class="line"><span class="keyword">require</span> <span class="string">\'sinatra\'</span></span><br><span class="line"></span><br><span class="line">get <span class="string">\'/hi\'</span> <span class="keyword">do</span></span><br><span class="line">  <span class="string">"Hello World!"</span></span><br><span class="line"><span class="keyword">end</span></span><br></pre></td></tr></table></figure></code></pre>\n' +
            '</div>\n' +
            '</div>');
    });

    it('code lt gt', function () {
        var body = `
[source,java]
----
class CacheStrategy<K, V> {
}
----`;
        var result = r({text: body}, {});
        console.log(result);
        result.should.eql('<div class="listingblock">\n' +
            '<div class="content">\n' +
            '<pre class="highlight"><code class="language-java" data-lang="java"><figure class="highlight java"><table><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br></pre></td><td class="code"><pre><span class="line"><span class="class"><span class="keyword">class</span> <span class="title">CacheStrategy</span><<span class="title">K</span>, <span class="title">V</span>> </span>&#123;</span><br><span class="line">&#125;</span><br></pre></td></tr></table></figure></code></pre>\n' +
            '</div>\n' +
            '</div>');
    });
});
