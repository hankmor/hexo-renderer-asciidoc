'use strict';

// mocha的使用：http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html
// 运行测试命令：mocha index.js
// 如果执行test目录的所有测试文件，执行: mocha
// 如果有子目录，则执行 mocha --recursive

// 断言库
var should = require('chai').should(); // eslint-disable-line

// mocha单元测试
// 测试套件
describe('asciidoc-test', () => {
  const r = require('../lib/renderer');

  // 测试html title
  it('header', () => {
    const body = `
== Test H2 ==
`;
    const result = r({text: body}, {});
    result.should.eql('<div id="toc" class="toc">\n'
      + '<div id="toctitle">Table of Contents</div>\n'
      + '<ul class="sectlevel1">\n'
      + '<li><a href="#_test_h2">1. Test H2</a></li>\n'
      + '</ul>\n'
      + '</div>\n'
      + '<div class="sect1">\n'
      + '<h2 id="_test_h2">1. Test H2</h2>\n'
      + '<div class="sectionbody">\n\n'
      + '</div>\n'
      + '</div>');
  });

  // 测试代码高亮
  it('code-highlight', () => {
    const body = `
[source,ruby]
----
require 'sinatra'

get '/hi' do
  "Hello World!"
end
----`;
    const result = r({text: body}, {});
    console.log(result);
    result.should.eql('<div class="listingblock">\n'
      + '<div class="content">\n'
      + '<pre class="highlight"><code class="language-ruby" data-lang="ruby"><figure class="highlight ruby"><table><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br></pre></td><td class="code"><pre><span class="line"><span class="keyword">require</span> <span class="string">\'sinatra\'</span></span><br><span class="line"></span><br><span class="line">get <span class="string">\'/hi\'</span> <span class="keyword">do</span></span><br><span class="line">  <span class="string">"Hello World!"</span></span><br><span class="line"><span class="keyword">end</span></span><br></pre></td></tr></table></figure></code></pre>\n'
      + '</div>\n'
      + '</div>');
  });

  // 测试java代码
  it('java', () => {
    const body = `
[source,java]
----
class CacheStrategy<K, V> {
}
----`;
    const result = r({text: body}, {});
    console.log(result);
    result.should.eql('<div class="listingblock">\n'
      + '<div class="content">\n'
      + '<pre class="highlight"><code class="language-java" data-lang="java"><figure class="highlight java"><table><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br></pre></td><td class="code"><pre><span class="line"><span class="class"><span class="keyword">class</span> <span class="title">CacheStrategy</span><<span class="title">K</span>, <span class="title">V</span>> </span>&#123;</span><br><span class="line">&#125;</span><br></pre></td></tr></table></figure></code></pre>\n'
      + '</div>\n'
      + '</div>');
  });

  // 测试java代码
  it('java1', () => {
    const body = `
[source,java]
----
/**
 * manufacturer违反NotNull约束
 */
@Test
public void testManufacturerIsNull() { // <1>
    Car car = new Car(null, "川A﹒1234", 5);
    Set> cvs = validator.validate(car);
    // 有一条错误信息
    assertEquals(1, cvs.size());
    // hibernate-validator：ValidationMessages_zh_CN.properties
    assertEquals("不能为null", cvs.iterator().next().getMessage());
}
----`;
    const result = r({text: body}, {});
    console.log(result);
    result.should.eql('<div class="listingblock">\n'
      + '<div class="content">\n'
      + '<pre class="highlight"><code class="language-java" data-lang="java"><figure class="highlight java"><table><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br><span class="line">7</span><br><span class="line">8</span><br><span class="line">9</span><br><span class="line">10</span><br><span class="line">11</span><br><span class="line">12</span><br></pre></td><td class="code"><pre><span class="line"><span class="comment">/**</span></span><br><span class="line"><span class="comment"> * manufacturer违反NotNull约束</span></span><br><span class="line"><span class="comment"> */</span></span><br><span class="line"><span class="meta">@Test</span></span><br><span class="line"><span class="function"><span class="keyword">public</span> <span class="keyword">void</span> <span class="title">testManufacturerIsNull</span><span class="params">()</span> </span>&#123; <i class="conum" data-value="1"></i><b>(1)</b></span><br><span class="line">    Car car = <span class="keyword">new</span> Car(<span class="keyword">null</span>, <span class="string">"川A﹒1234"</span>, <span class="number">5</span>);</span><br><span class="line">    Set> cvs = validator.validate(car);</span><br><span class="line">    <span class="comment">// 有一条错误信息</span></span><br><span class="line">    assertEquals(<span class="number">1</span>, cvs.size());</span><br><span class="line">    <span class="comment">// hibernate-validator：ValidationMessages_zh_CN.properties</span></span><br><span class="line">    assertEquals(<span class="string">"不能为null"</span>, cvs.iterator().next().getMessage());</span><br><span class="line">&#125;</span><br></pre></td></tr></table></figure></code></pre>\n'
      + '</div>\n'
      + '</div>');
  });

  // 测试java代码
  it('java2', () => {
    const body = `
[source,java]
----
class NumberHolder<@typeparamanno t extends *@typeparamanno* number> { 
    /*@TypeParamAnno*/ T number; 
    List numbers; 

    public <@typeparamanno e> void m1(/*@TypeParamAnno*/ E e) { 
    }
    // ...
}
----`;
    const result = r({text: body}, {});
    console.log(result);
    result.should.eql('<div class="listingblock">\n'
      + '<div class="content">\n'
      + '<pre class="highlight"><code class="language-java" data-lang="java"><figure class="highlight java"><table><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br><span class="line">7</span><br><span class="line">8</span><br></pre></td><td class="code"><pre><span class="line"><span class="class"><span class="keyword">class</span> <span class="title">NumberHolder</span><@<span class="title">typeparamanno</@<span></span> <span class="title">t</span> <span class="keyword">extends</span> *@<span class="title">typeparamanno</span>* <span class="title">number</span>> </span>&#123;<br><span class="line">    <span class="comment">/*@TypeParamAnno*/</span> T number;</span><br><span class="line">    List numbers;</span><br><span class="line"></span><br><span class="line">    <span class="keyword">public</span> <<span class="meta">@typeparamanno</span> e> <span class="function"><span class="keyword">void</span> <span class="title">m1</span><span class="params">(<span class="comment">/*@TypeParamAnno*/</span> E e)</span> </span>&#123;</span><br><span class="line">    &#125;</span><br><span class="line">    <span class="comment">// ...</span></span><br><span class="line">&#125;</span><br></pre></td></tr></table></figure></code></pre>\n'
      + '</div>\n'
      + '</div>');
  });

  // 测试xml代码
  it('xml', () => {
    const body = `
[source,xml]
----
<dependency>
\t<groupId>org.springframework.boot</groupId> <!--1-->
\t<artifactId>spring-boot-starter</artifactId>
</dependency>
----`;
    const result = r({text: body}, {});
    console.log(result);
    result.should.eql('<div class="listingblock">\n'
      + '<div class="content">\n'
      + '<pre class="highlight"><code class="language-xml" data-lang="xml"><figure class="highlight xml"><table><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br></pre></td><td class="code"><pre><span class="line"><span class="symbol">&lt;</span>dependency<span class="symbol">&gt;</span></span><br><span class="line">\t<span class="symbol">&lt;</span>groupId<span class="symbol">&gt;</span>org.springframework.boot<span class="symbol">&lt;</span>/groupId<span class="symbol">&gt;</span> <i class="conum" data-value="1"></i><b>(1)</b></span><br><span class="line">\t<span class="symbol">&lt;</span>artifactId<span class="symbol">&gt;</span>spring-boot-starter<span class="symbol">&lt;</span>/artifactId<span class="symbol">&gt;</span></span><br><span class="line"><span class="symbol">&lt;</span>/dependency<span class="symbol">&gt;</span></span><br></pre></td></tr></table></figure></code></pre>\n'
      + '</div>\n'
      + '</div>');
  });

  // 测试html代码
  it('html', () => {
    const body = `
[source,xml]
----
<div class="listingblock"> <!--1-->
<div class="content">
    <h1>哈哈哈</h1>
</div>
</div>
----`;
    const result = r({text: body}, {});
    console.log(result);
    result.should.eql('<div class="listingblock">\n'
      + '<div class="content">\n'
      + '<pre class="highlight"><code class="language-xml" data-lang="xml"><figure class="highlight xml"><table><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br></pre></td><td class="code"><pre><span class="line"><span class="symbol">&lt;</span>div class="listingblock"<span class="symbol">&gt;</span> <i class="conum" data-value="1"></i><b>(1)</b></span><br><span class="line"><span class="symbol">&lt;</span>div class="content"<span class="symbol">&gt;</span></span><br><span class="line">    <span class="symbol">&lt;</span>h1<span class="symbol">&gt;</span>哈哈哈<span class="symbol">&lt;</span>/h1<span class="symbol">&gt;</span></span><br><span class="line"><span class="symbol">&lt;</span>/div<span class="symbol">&gt;</span></span><br><span class="line"><span class="symbol">&lt;</span>/div<span class="symbol">&gt;</span></span><br></pre></td></tr></table></figure></code></pre>\n'
      + '</div>\n'
      + '</div>');
  });
});
