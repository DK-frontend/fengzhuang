// 封装优先级队列
function PriorityQueue(){

    //内部类：在类里面再封装一个类;表示带优先级的数据
    function QueueElement(element, priority){
        this.element = element
        this.priority = priority
    }

    // 封装属性
    this.items = []

    // 1.实现按照优先级插入方法
    PriorityQueue.prototype.enqueue = function(element, priority){
        // 1.1.创建QueueElement对象
        var queueElement = new QueueElement(element, priority)

        // 1.2.判断队列是否为空
        if(this.items.length ==0){
            this.items.push(queueElement)
        }else{
            // 定义一个变量记录是否成功添加了新元素
            var added = false
            for(var i = 0;i < this.items.length;i++){
                // 让新插入的元素与原有元素进行优先级比较(priority越小，优先级越大)
                if(queueElement.priority < this.items[i].priority){
                    this.items.splice(i,0,queueElement)
                    added = true
                    // 新元素已经找到插入位置了可以使用break停止循环
                    break
                }
            }
            // 新元素没有成功插入，就把它放在队列的最前面
            if(!added){
                this.items.push(queueElement)
            }
        }
    }

    // 2.dequeue():从队列中删除前端元素
    PriorityQueue.prototype.dequeue = function(){
       return this.items.shift()
    }

    // 3.front():查看前端的元素
    PriorityQueue.prototype.front = function(){
        return this.items[0]
    }

    // 4.isEmpty():查看队列是否为空
    PriorityQueue.prototype.isEmpty = function(){
        return this.items.length == 0
    }

    // 5.size():查看队列中元素的个数
    PriorityQueue.prototype.size = function(){
        return this.items.length
    }

    // 6.toString():以字符串形式输出队列中的元素
    PriorityQueue.prototype.toString = function(){
        var resultString = ""
        for(var i = 0;i < this.size();i++){
            resultString += this.items[i] + " "
            return resultString
        }
    }
}