        //封装队列
        function Queue(){
            //属性
            this.items = []

            // 1.enqueue():将元素加入到队列中
            Queue.prototype.enqueue = function(element){
                this.items.push(element)
            }

            // 2.dequeue():从队列中删除前端元素
            Queue.prototype.dequeue = function(){
                //这里删除第一个用shift
                return this.items.shift()
            }

            // 3.front():查看前端的元素
            Queue.prototype.front = function(){
                return this.items[0]
            }

            // 4.isEmpty:查看队列是否为空
            Queue.prototype.isEmpty = function(){
                return this.items.length == 0
            }

            // 5.size():查看队列中元素的个数
            Queue.prototype.size = function(){
                return this.items.length
            }

            // 6.toString():将队列中元素以字符串形式输出
            Queue.prototype.toString = function(){
                var resultString = ""
                for (let i = 0; i< this.items.length; i++) {
                //这里items要加this
                  resultString += this.items[i] + " ";
                  return resultString 
                }
            }
        }

            function passGame(nameList, num) {
                var queue = new Queue()
                for(var i = 0;i < nameList.length;i++){
                    queue.enqueue(nameList[i])
                }
                while(queue.size() > 1){
                    for(var i = 0;i < num - 1;i++){
                        queue.enqueue(queue.dequeue())
                    }
                    queue.dequeue()
                }

                console.log(queue.size())
                var endName = queue.front()
                console.log("最终剩下的人：" + endName)
                return nameList.indexOf(endName)
            }