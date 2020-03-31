# html5 - requestAnimationFrame

> requestAnimationFrame由系统来决定回调函数的执行时机。 优势：页面激活才执行，不会后台运行，消耗资源；节流执行，即在一定时间内，只执行一次;而settimeout页面关闭后仍能执行

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<div id="SomeElementYouWantToAnimate">SomeElementYouWantToAnimate</div>

<script type="text/javascript">
    var start = null;
    var element = document.getElementById('SomeElementYouWantToAnimate');
    element.style.position = 'absolute';

    function step(timestamp) {
        if (!start) start = timestamp;
        var progress = timestamp - start;
        element.style.left = Math.min(progress / 10, 200) + 'px';
        if (progress < 2000) {
            window.requestAnimationFrame(step);
        }
    }

    window.requestAnimationFrame(step);


    //requestAnimationFrame
    let num=0;
    let timer = requestAnimationFrame(function fn() {
        if (num < 10) {
            num++;
            console.log("num:"+num);
            requestAnimationFrame(fn)
        }else{
            cancelAnimationFrame(timer)
        }
    });

    //setInterval
    let num2 = 0;
    let timer2 = setInterval(function fn(){
        if (num2 < 10) {
            num2++;
            console.log("num2:"+num2);
        }else{
            clearInterval(timer2)
        }
    },100)

    //setTimeout
    let num3 = 0;
    let timer3 = setTimeout(function fn() {
        if(num3<10){
            num3++;
            console.log("num3:"+num3);
            timer3 = setTimeout(fn,100)
        }else{
            clearTimeout(timer3);
        }
    },100)

</script>
</body>
</html>

```
