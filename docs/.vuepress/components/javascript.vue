<template>
    <div>

        <script>
            //arguments
            function _new() {
                console.log(arguments);
                console.log(arguments.callee===_new); //让匿名函数指向本身
                let iterator = arguments[Symbol.iterator]();
                console.log(iterator); // 迭代函数生成的迭代器
                console.log(iterator.next());//迭代器枚举的值

                let args = Array.prototype.slice.call(arguments); //将传入的参数转换为数组
                console.log(args)
            }
            _new([1],2,3);
        </script>

        <script>
            //new 实现原理
            function _new() {
                let target = {};
                // console.log(arguments)
                let [constructor,...args] = [...arguments];
                // console.log(constructor.prototype);
                target.__proto__ = constructor.prototype;
                let result = constructor.apply(target,args);
                // console.log(args);
                return target;

            }
            let obj = _new();
        </script>

        <script>

            //
            function add(a) {
                return function (b) {
                    return a+b
                }
            }
            add(3)(4);


            //柯里化函数的实现
            // 是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回一个新的函数的技术，新函数接受余下参数并返回运算结果
            function sumFun(a,b,c) {
                return a+b+c;
            }
            const curry = (fn,...args)=>args.length<fn.length?(...arguments)=>curry(fn,...args,...arguments):fn(...args);
            let sum = curry(sumFun);

            console.log(sum(2)(3)(4)); //9

            // 作用：参数复用，提前返回，返回接受余下的参数且返回结果的新函数
            // 延迟执行-返回新函数，等待执行

        </script>

    </div>
</template>

<script>
    export default {
        name: "javascript",
        created() {

        }
    }
</script>

<style scoped>

</style>
