//封装集合类
function Set(){
    //属性
    this.items = {}

    // 判断集合中是否有某个元素
    Set.prototype.has = function(value){
        return this.items.hasOwnProperty(value)
    }

    // 向集合中添加元素
    Set.prototype.add = function(value){
        // 1.判断集合中是否已经包含了该元素
        if(this.has(value)){//这里直接用this.has(value)而不用this.items.has(value)
            return false
        }

        // 2.将元素添加到集合中
        this.items[value] = value

        //这里记得添加return true
        return true
    }

    // 从集合中删除某个元素
    Set.prototype.remove = function(value){
        // 1.判断集合中是否包含该元素
        if(!this.has(value)){
            return false
        }

        // 2.包含该元素, 那么将元素删除
        delete this.items[value]

        //这里记得添加return true
        return true
    }

    // 清空集合中所有的元素
    Set.prototype.clear = function(){
        //原来的对象没有引用指向，会被自动回收
        this.items = {}
    }

    // 获取集合的大小
    Set.prototype.size = function(){
        return Object.keys(this.items).length
    }

    // 获取集合中所有的值
    Set.prototype.values = function(){
        return Object.keys(this.items)
    }
    Set.prototype.union = function(otherSet){
        // this:集合对象A
        // otherSet:集合对象B
        //1.创建一个新的集合
        var unionSet = new Set()

        //2.将A集合中的所有元素添加到新集合中
        var values = this.values()
        for (let i = 0; i < values.length; i++) {
            unionSet.add(values[i])                
        }

        //3.取出B集合中的元素,判断是否需要加到新集合中
        values = otherSet.values()
        for (let j = 0; j< values.length; j++) {
            unionSet.add(values[j])
        }
        return unionSet
    }
    Set.prototype.intersection = function(otherSet) {
        // this:集合A
        // otherSet:集合B
        //1.创建新的集合
        var intersectionSet = new Set()

        //2.从A中取出一个元素，判断是否同时存在于集合B中，是则放入新集合中
        var values = this.values()
        for (let i = 0; i < values.length; i++) {
            var item = values[i]
            if(otherSet.has(item)){
                intersectionSet.add(item)
            }        
        }
        return intersectionSet
    }
    Set.prototype.difference = function(otherSet){
        //this:集合A
        //otherSet:集合B
        //1.创建新的集合
        var differenceSet = new Set()

        //2.取出A集合中的每一个元素，判断是否同时存在于B中，不存在则添加到新集合中
        var values = this.values()
        for (let i = 0; i < values.length; i++) {
            var item = values[i]
            if(!otherSet.has(item)){
                differenceSet.add(item)
            }
        }
        return differenceSet
    }
    Set.prototype.subset = function(otherSet){
        //this:集合A
        //otherSet：集合B
        //遍历集合A中的所有元素，如果发现，集合A中的元素，在集合B中不存在，那么放回false，如果遍历完整个集合A没有返回false，就返回true
        var values = this.values()
        for (let i = 0; i < values.length; i++) {
            var item = values[i]
            if(!otherSet.has(item)){
                return false
            }
        }
        return true
    }
}