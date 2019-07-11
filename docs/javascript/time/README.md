# 倒计时

[[toc]]

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
    </head>
    <body>
        <div id="showText" style="color:red;"></div>
    </body>
    <script type="text/javascript">
    var showText = document.getElementById("showText");

    var fillNumber = function(num) {
        let number = Math.floor(num);
        return number>9?number:'0'+number;
    }

    var timeChange = function(){
        let endDate = new Date('2019-06-06 23:50');
        let nowDate = new Date();
        let leftDate = endDate - nowDate;
        if(leftDate<0){
            clearInterval(time);
            this.setData({
                activeState:0
            })
        }
        //求天时分秒 leftDate是毫秒
        let leftSecond = fillNumber(leftDate/1000%60);
        let leftMinute = fillNumber(leftDate/(1000*60)%60);
        let leftHours = fillNumber(leftDate/(1000*60*60)%60);
        let leftDay = fillNumber(leftDate/(1000*60*60)/24);
        showText.innerHTML = leftDay+'天'+leftHours+'小时'+leftMinute+'分钟'+leftSecond+'秒';
    }

    setTimeout(timeChange, 0);
    var time = setInterval(timeChange, 1000);
    </script>
</html>

```
