        //设计哈希函数
        //1.将字符串转成比较大的数字：hashCede
        //2.将大的数字hasCode压缩到数组范围(大小)之内
        function hashFunc(str, size){
            //1.定义hashCode变量
            var hasCode = 0

            //2.霍纳法则，计算hashCode的值
            //cats -> Unicode编码
            for (let i = 0; i < str.length; i++) {
                // str.charCodeAt(i)//获取某个字符对应的unicode编码
                hasCode += 37 * hasCode + str.charCodeAt(i)
            }

            //3.取余操作
            var index = hasCode % size
            return index
        }

        //封装哈希表类
        function HashTable(){
            //属性
            //装填因子：loadFactor > 0.75时需要扩容；loadFactor < 0.25时需要减少容量
            this.storage = []
            this.limit = 7//初始长度
            this.count = 0//计算已经存储的元素个数


            //方法
            //哈希函数
            HashTable.prototype.hashFunc = function(str, size){
            //1.定义hashCode变量
            var hasCode = 0

            //2.霍纳法则，计算hashCode的值
            //cats -> Unicode编码
            for (let i = 0; i < str.length; i++) {
                // str.charCodeAt(i)//获取某个字符对应的unicode编码
                hasCode += 37 * hasCode + str.charCodeAt(i)
            }

            //3.取余操作
            var index = hasCode % size
            return index
        }

        //插入&修改操作
        HashTable.prototype.put = function(key, value){
            //1.根据key获取对应的index
            var index = this.hashFunc(key, this.limit)

            //2.根据index取出对应的bucket
            var bucket = this.storage[index]

            //3.判断该bucket是否为null
            if(bucket == null){
                bucket = []
                this.storage[index] = bucket
            }

            //4.判断是否是修改数据
            for (let i = 0; i < bucket.length; i++) {
                var tuple = bucket[i]
                if(tuple[0] == key){
                    tuple[1] = value
                    return true
                }
                
            }

            //5.进行添加操作
            bucket.push([key,value])
            this.count += 1

            //判断是否需要扩容操作
            if(this.count > this.limit * 0.75){
                var newSize = this.limit * 2
                var newPrime = this.getPrime(newSize)
                this.resize(newPrime)
            }
        }

        //获取操作
        HashTable.prototype.get = function(key){
            //1.根据key获取对应的index
            var index = this.hashFunc(key,this.limit)

            //2.根据index获取对应的bucket
            var bucket = this.storage[index]

            //3.判断bucket是否等于null
            if(bucket == null){
                return null
            }

            //4.有bucket，那么就进行线性查找
            for (let i = 0; i < bucket.length; i++) {
                var tuple = bucket[i]
                if(tuple[0] == key){//tuple[0]存储key，tuple[1]存储value
                    return tuple[1]
            }
        }

            //5.依然没有找到，那么返回null
            return null
        }

        //删除操作
        HashTable.prototype.remove = function(key){
            //1.根据key获取对应的index
            var index = this.hashFunc(key,this.limit)

            //2.根据index获取对应的bucket
            var bucket = this.storage[index]

            //3.判断bucket是否等于null
            if(bucket == null){
                return null
            }

            //4.有bucket,那么就进行线性查找并删除
            for (let i = 0; i < bucket.length; i++) {
                var tuple = bucket[i]
                if(tuple[0] == key){//tuple[0]存储key，tuple[1]存储value
                    bucket.splice(i,1)
                    this.count -= 1

                    //缩小容量
                    if(this.limit > 7 && this.count < this.limit * 0.25){
                        var newSize = Math.floor(this.limit / 2)
                        var newPrime = this.getPrime(newSize)
                        this.resize(newPrime)
                    }
                    return tuple[1]
            }
            }

            //5.依然没有找到，那么返回null
            return null
        }

        //判断哈希表是否为null
        HashTable.prototype.isEmpty = function(){
            return this.count == 0
        }

        //获取哈希表中元素的个数
        HashTable.prototype.size = function(){
            return this.count
        }

        //哈希表扩容
        HashTable.prototype.resize = function(newLimit){
            //1.保存旧的storage数组内容
            var oldStorage = this.storage

            //2.重置所有的属性
            this.storage = []
            this.count = 0
            this.limit = newLimit

            //3.遍历oldStorage中所有的bucket
            for (let i = 0; i < oldStorage.length; i++) {
                //3.1.取出对应的bucket
                var bucket = oldStorage[i]

                //3.2.判断bucket是否为null
                if(bucket == null){
                    continue
                }

                //3.3.bucket中有数据，就取出数据重新插入
                for (let j = 0; j < bucket.length; j++) {
                    var tuple = bucket[j]
                    this.put(tuple[0],tuple[1])//插入数据的key和value
                }
            }
        }


        HashTable.prototype.isPrime1 = function(num){
            if(num <= 1){
                return false
            }
            for (let i = 2; i < num; i++) {
                if(num % i == 0 ){
                    return false
                }
            }
            return true
        }


        HashTable.prototype.isPrime = function(num){
            if(num <= 1){
                return false
            }
            //1.获取num的平方根:Math.sqrt(num)
            //2.循环判断
            var temp = parseInt(Math.sqrt(num))
            for (let i = 2; i < temp; i++) {
                if(num % i == 0 ){
                    return false
                }
            }
            return true
        }

        //获取质数的方法
        HashTable.prototype.getPrime = function(num){
            while(this.isPrime(num)){
                num += 1
            }
            return num
        }
    }
