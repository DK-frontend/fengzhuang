        //创建列表类
        function ArrayList() {
            //属性
            this.array = []

            //方法
            //封装将数据插入到数组中方法
            ArrayList.prototype.insert = function(item) {
                this.array.push(item)
            }

            //toString方法
            ArrayList.prototype.toString = function() {
                return this.array.join('-')
            }

            //交换两个位置的数据
            ArrayList.prototype.swap = function(m, n) {
                let temp = this.array[m]
                this.array[m] = this.array[n]
                this.array[n] = temp
            }

            //冒泡排序
            ArrayList.prototype.bubbleSort = function() {
                //1.获取数组的长度
                var length = this.array.length

                //外层循环控制冒泡趟数
                for (let i = 0; i < length - 1; i++) {
                    //内层循环控制每趟比较的次数
                    for (let j = 0; j < length - i - 1; j++) {
                        if (this.array[j] > this.array[j + 1]) {
                            //交换两个数据
                            this.swap(j, j + 1)
                        }
                    }
                }
            }

            //选择排序
            ArrayList.prototype.selectionSort = function() {
                //1.获取数组的长度
                var length = this.array.length

                //2.外层循环：从0开始获取元素
                for (let i = 0; i < length - 1; i++) {
                    var min = i

                    //内层循环：从i+1位置开始，和后面的元素进行比较
                    for (let j = min + 1; j < length; j++) {
                        if (this.array[min] > this.array[j]) {
                            min = j
                        }

                    }
                    this.swap(min, i)
                }
            }

            //插入排序
            ArrayList.prototype.insertionSort = function() {
                //1.获取数组的长度
                var length = this.array.length

                //2.外层循环:从第二个数据开始，向左边的已经局部有序数据进行插入
                for (let i = 1; i < length; i++) {
                    //3.内层循环：获取i位置的元素，使用while循环(重点)与左边的局部有序数据依次进行比较
                    var temp = this.array[i]
                    var j = i
                    while (this.array[j - 1] > temp && j > 0) {
                        this.array[j] = this.array[j - 1] //大的数据右移
                        j--
                    }
                    //4.while循环结束后，index = j左边的数据变为局部有序且array[j]最大。此时将array[j]重置为排序前的数据array[i]，方便下一次for循环
                    this.array[j] = temp
                }
            }

            //希尔排序
            ArrayList.prototype.shellSort = function() {
                //1.获取数组的长度
                var length = this.array.length

                //2.初始化增量
                var gap = Math.floor(length / 2)

                //3.第一层循环：while循环(使gap不断减小)
                while (gap >= 1) {
                    //4.第二层循环：以gap为增量，进行分组，对分组进行插入排序
                    //重点为：将index = gap作为选中的第一个数据
                    for (let i = gap; i < length; i++) {
                        var temp = this.array[i]
                        var j = i
                            //5.第三层循环:寻找正确的插入位置
                        while (this.array[j - gap] > temp && j > 0) {
                            this.array[j] = this.array[j - gap]
                            j -= gap
                        }
                        //6.将j位置的元素设置为temp
                        this.array[j] = temp
                    }
                    gap = Math.floor(gap / 2)
                }
            }

            // 选择枢纽
            ArrayList.prototype.median = function(left, right) {
                // 1.求出中间的位置
                var center = Math.floor((left + right) / 2)

                // 2.判断并且进行交换
                if (this.array[left] > this.array[center]) {
                    this.swap(left, center)
                }
                if (this.array[center] > this.array[right]) {
                    this.swap(center, right)
                }
                if (this.array[left] > this.array[center]) {
                    this.swap(left, center)
                }

                // 3.巧妙的操作: 将center移动到right - 1的位置.
                this.swap(center, right - 1)

                // 4.返回pivot
                return this.array[right - 1]
            }

            // 快速排序实现
            ArrayList.prototype.quickSort = function() {
                this.quickSortRec(0, this.array.length - 1)
            }

            ArrayList.prototype.quickSortRec = function(left, right) {
                // 0.递归结束条件
                if (left >= right) return

                // 1.获取枢纽
                var pivot = this.median(left, right)

                // 2.开始进行交换
                // 2.1.记录左边开始位置和右边开始位置
                var i = left
                var j = right - 1
                    // 2.2.循环查找位置
                while (true) {
                    while (this.array[++i] < pivot) {}
                    while (this.array[--j] > pivot) {}
                    if (i < j) {
                        // 2.3.交换两个数值
                        this.swap(i, j)
                    } else {
                        // 2.4.当i<j的时候(一定不会=, 看下面解释中的序号3), 停止循环因为两边已经找到了相同的位置
                        break
                    }
                }

                // 3.将枢纽放在正确的位置
                this.swap(i, right - 1)

                // 4.递归调用左边
                this.quickSortRec(left, i - 1)
                this.quickSortRec(i + 1, right)
            }
        }