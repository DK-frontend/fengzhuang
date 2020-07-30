        //封装字典类
        function Dictionary(){
            //字典属性
            this.items = {}

            //字典操作方法
            //一.判断字典中是否有某个key
            Dictionary.prototype.has = function(key){
                return this.items.hasOwnProperty(key)
            }

            //二.在字典中添加键值对
            Dictionary.prototype.set = function(key, value){
                if(this.has(key)){
                    return false
                }
                this.items[key] = value
                return true
            }

            //三.从字典中移除元素
            Dictionary.prototype.remove = function(key){
                //1.判断字典中是否有这个key
                if(!this.has(key)){
                    return false
                }

                //2.从字典中删除key
                delete this.items[key]
                return true
            }

            //四.根据key获取value
            Dictionary.prototype.get = function(key){
                if(!this.has(key)){
                    //这里返回undefined比返回false好
                    return undefined
                }
                return this.items[key]
            }

            //五.clear方法
            Dictionary.prototype.clear = function(){
                this.items = {}
            }

            //六.获取所有keys
            Dictionary.prototype.keys = function(){
                return Object.keys(this.items)
            }

            //七.size方法
            Dictionary.prototype.size = function(){
                return this.keys().length
            }

            //八.获取所有keys
            Dictionary.prototype.values = function(){
                return Object.values(this.items)
            }
        }