# rem

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <style>
        @media screen and (max-width: 768px) {
            html {
                font-size: 50px;
            }

            body {
                background-color: #FFFF00;
            }
        }

        /* 小型设备（平板电脑，768px 起） */
        @media screen and (min-width: 768px) and (max-width: 992px) {
            html {
                /*font-size: 75px;*/
                font-size: 77.42px; /*(100/992*768) = 77.4193px*/
            }

            body {
                background-color: #6633FF;
            }
        }

        /*中型设备（台式电脑，992px 起）*/
        @media screen and (min-width: 992px) and (max-width: 1200px) {
            html {
                font-size: 100px;
            }

            body {
                background-color: #00FF66;
            }
        }

        /*大型设备（大台式电脑，1200px 起）*/
        @media screen and (min-width: 1200px) {
            html {
                /*font-size: 150px;*/
                font-size: 121px; /*100/992*1200*/
            }

            body {
                background-color: #FF6699;
            }
        }

        .fon1 {
            font-size: 0.16rem;
            width: 1rem;
            height: 1rem;
            background-color: palevioletred;
        }

        body {
            font-size: 14px;
        }
    </style>
</head>
<body>

<div class="fon1">我是字体一</div>
<div class="fon2">我是字体二</div>
<div class="fon3">我是字体三</div>
<div class="fon4">我是字体四</div>
<div class="fon4">注意事项

    <pre class="fon1">
        rem适配方案不好维护，设备会更新，设计稿尺寸会发生改变 预设基准值
        适配主流设备十几种
    </pre>

</div>
</body>
</html>

```
