//封装单向链表类
function LinkList(){
    //封装内部类：节点类
    function Node(data){
        this.data = data
        this.next = null
    }

    // 属性
    // 属性head指向链表的第一个节点
    this.head = null
    this.length = 0

    // 链表尾部追加元素方法
    LinkList.prototype.append = function(data){
        // 1.根据新元素创建节点
        var newNode = new Node(data)

        // 2.判断原来链表是否为空
        if(this.length == 0){ // 链表尾空
            this.head = newNode
        }else{// 链表不为空
            // 2.1.定义变量, 保存当前找到的节点
            var current = this.head
            while(current.next){
                current = current.next
            }

            // 2.2.找到最后一项, 将其next赋值为node
            current.next = newNode
        }

        // 3.链表长度增加1
        this.length += 1
    }

    // 链表的toString方法
    LinkList.prototype.toString = function(){
        // 1.定义两个变量
        var current = this.head
        var resultString = ""

        // 2.循环获取链表中所有的元素
        while(current){
            resultString += current.data + " "
            current = current.next
        }

        // 3.返回最终结果
        return resultString
    }

    // 实现insert方法
    LinkList.prototype.insert = function(position,data){
        //理解positon的含义：position=0表示新界点插入后要成为第1个节点，position=2表示新界点插入后要成为第3个节点
        //1.对position进行越界判断:要求传入的position不能是负数且不能超过LinkList的length
        if(position < 0 || position > this.length){
            return false
        }

        //2.根据data创建newNode
        var newNode = new Node(data)

        //3.插入新节点
        //情况1：插入位置position=0
        if(position == 0){
            // 让新节点指向第一个节点
            newNode.next = this.head
            // 让head指向新节点
            this.head = newNode
            //情况2：插入位置position>0(该情况包含position=length)
        }else{
            var current = this.head
            var previous = null
            var index = 0
            //步骤1：通过while循环使变量current指向position位置的后一个节点(注意while循环的写法)
            while(index++ < position){
                //步骤2：在current指向下一个节点之前，让previous指向current当前指向的节点
                previous = current
                current = current.next
            }
            // 步骤3：通过变量current(此时current已经指向position位置的后一个节点)，使newNode指向position位置的后一个节点
            newNode.next = current
            //步骤4：通过变量previous，使position位置的前一个节点指向newNode
            previous.next = newNode
        }
        //4.新节点插入后要length+1
        this.length += 1

        return true
    }

    //实现get方法
    LinkList.prototype.get = function(position){
        //1.越界判断
        // 当position = length时，取到的是null所以0 =< position < length
        if(position < 0 || position >= this.length){
            return null
        }

        //2.获取指定的positon位置的后一个节点的data
        //同样使用一个变量间接操作节点
        var current = this.head
        var index = 0
        while(index++ < position){
            current = current.next
        }
        return current.data
    }

    //实现indexOf方法
    LinkList.prototype.indexOf = function(data){
        //1.定义变量
        var current = this.head
        var index = 0

        //2.开始查找:只要current不指向null就一直循环
        while(current){
            if(current.data == data){
                return index
            }
            current = current.next
            index += 1
        }

        //3.遍历完链表没有找到，返回-1
        return -1
    }

    //实现update方法
    LinkList.prototype.updata = function(position, data){
        //1.越界判断
        //因为被修改的节点不能为null，所以position不能等于length
        if(position < 0 || position >= this.length){
            return false
        }

        //2.查找正确的节点
        var current = this.head
        var index = 0
        while(index++ < position){
            current = current.next
        }

        //3.将position位置的后一个节点的data修改成newData
        current.data = data
        //返回true表示修改成功
        return true
    }

    //实现removeAt方法
    LinkList.prototype.removeAt = function(position){
        //1.越界判断
        if(position < 0 || position >= this.length){//position不能为length
            return false
        }

        //2.删除元素
        //情况1：position = 0时(删除第一个节点)
        var current = this.head
        var index = 0
        var previous = null
        if(position == 0){
            this.head = this.head.next
        }else{//情况2：position > 0时
            while(index++ < position){
                previous = current
                current = current.next
            }

            //循环结束后，current指向position后一个节点，previous指向current前一个节点
            //再使前一个节点的next指向current的next即可
            previous.next = current.next
        }

        //3，length-1
        this.length -= 1

        //返回被删除节点的data，为此current定义在最上面
        return current.data
    }

    //实现remove方法
    LinkList.prototype.remove = function(data){
        //1.获取data在列表中的位置
        var index = this.indexOf(data)
        //2.根据位置信息，删除结点
        return this.removeAt(index)
    }

    //实现isEmpty方法
    LinkList.prototype.isEmpty = function(){
        return this.length == 0
    }

    //实现size方法
    LinkList.prototype.size = function(){
        return this.length
    }

    //实现getFirst方法
    LinkList.prototype.getFirst = function(){
        return this.head.data
    }
}