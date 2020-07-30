// 封装栈类
function Stack(){
    // 栈中的属性
    this.items = []

    // 栈的相关操作
    // 1.push():将元素压入栈
    //方式一(不推荐)：给对象添加方法，其他对象不能复用
    // this.push = () => {
    // }
      
    //方式二(推荐)：给Stack类添加方法，能够多对象复用
    Stack.prototype.push = function(element){
        this.items.push(element)
    }

    // 2.pop():从栈中取出元素
    Stack.prototype.pop = function(){
        return this.items.pop()
    }

    // 3.peek():查看一下栈顶元素
    Stack.prototype.peek = function(){
        //return this.items[0] 这里是查看栈顶元素即最后加入栈的元素，是数组的最后一个元素，不是第一个
        return this.items[this.items.length - 1]
    }

    // 4.isEmpty():判断栈是否为空
    Stack.prototype.isEmpty = function(){
        return this.items.length == 0
    }

    // 5.size():获取栈中元素的个数
    Stack.prototype.size = function(){
        return this.items.length
    }

    // 6.toString():以字符串形式输出栈内数据
    Stack.prototype.toString = function(){
        var resultString = ""
        for (let i = 0; i < this.items.length; i++) {
            resultString += this.items[i] + " "
        }
        return resultString
    }
}

    //简单应用：
    //封装函数：将十进制转成二进制(十转二的运算最后倒叙取余的特点符合栈'先进后出')
function dec2bin(decNumber) {
    //1.定义一个栈对象，保存余数
    var stack = new Stack()
    var result = ""

     // 2.循环操作
    while(decNumber > 0){
        // 2.1.获取余数并放入栈中
        stack.push(decNumber % 2)
         // 2.2.获取整除后的结果作为下一次运算的数字(floor:向下取整)
        decNumber = Math.floor(decNumber / 2)
    }
    
    while(!stack.isEmpty()){//这里要判断非空，所以要取反
        result += stack.pop()
    }
    return result
}