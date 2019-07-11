# rem-less
[[toc]]
## html
```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" type="text/less" href="../css/less/index.less">
    <script src="../asserts/less/less.min.js"></script>
</head>
<body>

<h1 style="font-size: 0.16rem">我是文字</h1>
<h1 style="font-size: 0.32rem">我是文字</h1>
</body>
</html>
```

## index.less

```less
@charset "UTF-8";
@adapterDeviceList: 1920px, 1600px, 1440px, 1280px, 800px, 750px, 640px, 540px, 420px, 320px; //适配适配
@psdWidth: 750px; //设计稿尺寸
@baseFontSize: 100px;
@len: length(@adapterDeviceList); //需要适配设备的数组长度

//进行适配
// 混入模块（进行适配）
.adapterMixin(@index) when ( @index > 0) {
  @media (min-width: extract(@adapterDeviceList, @index)) {
    html {
      font-size: @baseFontSize / @psdWidth * extract(@adapterDeviceList,@index);
    }
  }
  .adapterMixin(@index - 1);
}

// 适配模块(调用)
.adapterMixin(@len);

@import "reset";

```

## reset.less

```less

blockquote, body, button, dd, dl, dt, fieldset, form, h1, h2, h3, h4, h5, h6, hr, input, legend, li, ol, p, pre, td, textarea, th, ul {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  tap-highlight-color: transparent;
  -webkit-tap-highlight-color: transparent;
}

body, button, input, select, textarea {
  font: 12px/1.5 tahoma, arial, 'Hiragino Sans GB', '\5b8b\4f53', sans-serif
}

h1, h2, h3, h4, h5, h6 {
  font-size: 100%
}

address, cite, dfn, em, var {
  font-style: normal
}

code, kbd, pre, samp {
  font-family: courier new, courier, monospace
}

small {
  font-size: 12px
}

ol, ul {
  list-style: none
}

a {
  text-decoration: none
}

a:hover {
  text-decoration: underline
}

sup {
  vertical-align: text-top
}

sub {
  vertical-align: text-bottom
}

legend {
  color: #000
}

fieldset, img {
  border: 0
}

button, input, select, textarea {
  font-size: 100%
}

button {
  border-radius: 0
}

table {
  border-collapse: collapse;
  border-spacing: 0
}

input,textarea{
  border: none;
  outline: none;
  resize: none;
  -webkit-appearance: none;
}

.clearFix::before,
.clearFix::after{
  content: "";
  display: block;
  visibility: hidden;
  height: 0;
  line-height: 0;
  clear: both;
}
```
