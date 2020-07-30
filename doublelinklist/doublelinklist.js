//封装双向链表类
function DoubleLinkList(){
    //封装内部类：节点类
    function Node(data){
        this.data = data
        this.prev = null
        this.next = null
    }

    //属性
    this.head = null
    this.tail = null
    this.length = 0

    //append方法
    DoubleLinkList.prototype.append = function(data){
        //1.根据data创建新节点
        var newNode = new Node(data)

        //2.添加节点
        //情况1：添加的是第一个节点
        if(this.length == 0){
            this.head = newNode
            this.tail = newNode
        //情况2：添加的不是第一个节点
        }else{
            newNode.prev = this.tail
            this.tail.next = newNode
            this.tail = newNode
        }

         //3.length+1
        this.length += 1
    }

    //将链表转变为字符串形式
    //一.forwardString方法
    DoubleLinkList.prototype.forwardString = function(){
        //1.定义变量
        var current = this.tail
        var resultString = ""

        //2.依次向前遍历，获取每一个节点
        while(current){
            resultString += current.data + " "
            current = current.prev
        }
        return resultString
    }

    //二.backwardString方法
    DoubleLinkList.prototype.backwardString = function(){
        //1.定义变量
        var current = this.head
        var resultString = ""

        //2.依次向后遍历，获取每一个节点
        while(current){
            resultString += current.data + " "
            current = current.next
        }
        return resultString
    }

    //三.toString方法
    DoubleLinkList.prototype.toString = function(){
        //这里记得要return backwardString()的结果
         return this.backwardString()
    }

    //insert方法
    DoubleLinkList.prototype.insert = function(position,data){
        //1.越界判断
        if(position < 0 || position > this.length){
            return false
        }

        //2.根据data创建新的节点
        var newNode = new Node(data)

        //3.插入新节点
        //原链表为空
        //情况1：插入的newNode是第一个节点
        if(this.length == 0){
            this.head = newNode
            this.tail = newNode
        //原链表不为空
        }else{
            //情况2：position == 0
            if(position == 0){
                this.head.prev = newNode
                newNode.next = this.head
                this.head = newNode
            //情况3：position == this.length 
            }else if(position == this.length){
                this.tail.next = newNode
                newNode.prev = this.tail
                this.tail = newNode
            //情况4：0 < position < this.length
            }else{
                //根据位置决定搜索顺序
                if(position < (this.length / 2)){
                    var currenthead = this.head
                    var index = 0
                    while(index++ < position){
                        currenthead = currenthead.next
                    }
                    //修改pos位置前后节点变量的指向
                    newNode.prev = currenthead.prev
                    newNode.next = currenthead
                    currenthead.prev.next = newNode
                    currenthead.prev = newNode 
                }else{
                    var currenttail = this.tail
                    var index = this.length - 1
                    while(index-- > position){
                        currenttail = currenttail.prev
                    }
                    //修改pos位置前后节点变量的指向
                    newNode.prev = currenttail.prev
                    newNode.next = currenttail
                    currenttail.prev.next = newNode
                    currenttail.prev = newNode
                }
            }
        }

        //4.length+1
        this.length += 1
        return true//返回true表示插入成功
    }

    //get方法
    DoubleLinkList.prototype.get = function(position){
        //1.越界判断
        if(position < 0 || position >= this.length){//获取元素时position不能等于length
            return null
        }
        //this.length / 2 > position:从头开始遍历
        if(position < (this.length / 2)){
            //2.获取元素
            let current = this.head
            let index = 0
            while(index++ < position){
                current = current.next
            }
        //this.length / 2 =< position:从尾开始遍历
        }else{
            //2.获取元素
            let current = this.tail
            let index = this.length - 1
            while(index-- > position){
                current.current.prev
            }
        }
        return current.data
    }

    //indexOf方法
    DoubleLinkList.prototype.indexOf = function(data){
        //1.定义变量
        var current = this.head
        var index = 0

        //2.遍历链表，查找与data相同的节点
        while(current){
            if(current.data == data){
                return index
            }
            current = current.next
            index += 1
        }
        return -1
    }

    //update方法
    DoubleLinkList.prototype.update = function(position, newData){
        //1.越界判断
        if(position < 0 || position >= this.length){//获取元素时position不能等于length
            return null
        }

        //2.寻找正确的节点
        //this.length / 2 > position:从头开始遍历
        if(position < (this.length / 2)){
            let current = this.head
            let index = 0
            while(index++ < position){
                current = current.next
            }
            //3.修改找到节点的data
            current.data = newData
        //this.length / 2 =< position:从尾开始遍历
        }else{
            let current = this.tail
            let index = this.length - 1
            while(index-- > position){
                current = current.prev
            }
            //3.修改找到节点的data
            current.data = newData
        }
        //表示成功修改
        return true
    }

    //removeAt方法
    DoubleLinkList.prototype.removeAt = function(position){
        //1.越界判断
        if(position < 0 || position >= this.length){//删除元素时position不能等于length
            return null
        }

        //2.删除节点
        //当链表中length == 1
        //情况1：链表只有一个节点
        var current = this.head
        if(this.length == 1){
            this.head = null
            this.tail = null
        //当链表中length > 1
        }else{
            //情况2：删除第一个节点
            if(position == 0){
                //要把第二个节点指向第一个节点的引用设为空
                this.head.next.prev = null
                this.head = this.head.next
            //情况3：删除最后一个节点
            }else if(position == this.length - 1){
                current = this.tail
                this.tail.prev.next = null
                this.tail = this.tail.prev
            }else{
                //情况4：删除链表中间的节点
                if(position < (this.length / 2)){
                    let current = this.head
                    let index = 0
                    while(index++ < position){
                        current = current.next
                    }
                    current.prev.next = current.next
                    current.next.prev = current.prev
                //this.length / 2 =< position:从尾开始遍历
                }else{
                    let current = this.tail
                    let index = this.length - 1
                    while(index-- > position){
                        current = current.prev
                    }
                    current.prev.next = current.next
                    current.next.prev = current.prev
                }
            }
        }

        //3.length -= 1
        this.length -= 1
        //返回被删除节点的数据
        return current.data
    }

    //remove方法
    DoubleLinkList.prototype.remove = function(data){
        //1.根据data获取下标值
        var index = this.indexOf(data)

        //2.根据index删除对应位置的节点
        return this.removeAt(index)
    }

    //isEmpty方法
    DoubleLinkList.prototype.isEmpty = function(){
        return this.length == 0
    }

    //size方法
    DoubleLinkList.prototype.size = function(){
        return this.length
    }

    //getHead方法：获取链表的第一个元素
    DoubleLinkList.prototype.getHead = function(){
        //这里记得是返回data而不是this.head
        return this.head.data
    }

    //十二.getTail方法：获取链表的最后一个元素
    DoubleLinkList.prototype.getTail = function(){
        //这里记得是返回data而不是this.tail
        return this.tail.data
    }
}