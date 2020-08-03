        //封装图类
        function Graph() {
            //属性：顶点(数组)/边(字典)
            this.vertexes = [] //顶点
            this.edges = new Dictionary() //边

            //添加方法
            //一.添加顶点
            Graph.prototype.addVertex = function(v) {
                    this.vertexes.push(v)
                    this.edges.set(v, []) //将边添加到字典中，新增的顶点作为键，对应的值为一个存储边的空数组
                }
                //二.添加边
            Graph.prototype.addVertex = function(v1, v2) { //传入两个顶点为它们添加边
                    this.edges.get(v1).push(v2) //取出字典对象edges中存储边的数组，并添加关联顶点
                    this.edges.get(v2).push(v1) //表示的是无向表，故要添加互相指向的两条边
                }
                //三.实现toString方法:转换为邻接表形式
            Graph.prototype.toString = function() {
                    //1.定义字符串，保存最终结果
                    var resultString = ""

                    //2.遍历所有的顶点以及顶点对应的边
                    for (var i = 0; i < this.vertexes.length; i++) { //遍历所有顶点
                        resultString += this.vertexes[i] + "-->"
                        var vEdges = this.edges.get(this.vertexes[i])
                        for (let j = 0; j < vEdges.length; j++) { //遍历字典中每个顶点对应的数组
                            resultString += vEdges[j] + " "
                        }
                        resultString += "\n"
                    }
                    return resultString
                }
                //四.初始化状态颜色
            Graph.prototype.initializeColor = function() {
                var color = []
                for (let i = 0; i < this.vertexes.length; i++) {
                    color[this.vertexes[i]] = "white"
                }
                return color
            }

            //五.实现广度搜索(BFS)
            //传入指定的第一个顶点和处理结果的函数
            Graph.prototype.bfs = function(initV, handler) {
                    //1.初始化颜色
                    var colors = this.initializeColor()

                    //2.创建队列
                    var que = new Queue()

                    //3.将顶点加入到队列中
                    que.enqueue(initV)

                    //4.循环从队列中取出元素，队列为空才停止
                    while (!que.isEmpty()) {
                        //4.1.从队列首部取出一个顶点
                        var v = que.dequeue()

                        //4.2.从字典对象edges中获取和该顶点相邻的其他顶点组成的数组
                        var vNeighbours = this.edges.get(v)

                        //4.3.将v的颜色变为灰色
                        colors[v] = "gray"

                        //4.4.遍历v所有相邻的顶点vNeighbours,并且加入队列中
                        for (let i = 0; i < vNeighbours.length; i++) {
                            var a = vNeighbours[i]
                                //判断相邻顶点是否被探测过，被探测过则不加入队列中；并且加入队列后变为灰色，表示被探测过
                            if (colors[a] == "white") {
                                colors[a] = "gray"
                                que.enqueue(a)
                            }
                        }

                        //4.5.处理顶点v
                        handler(v)

                        //4.6.顶点v所有白色的相邻顶点都加入队列后，将顶点v设置为黑色。此时黑色顶点v位于队列最前面，进入下一次while循环时会被取出
                        colors[v] = "black"
                    }
                }
                //六.实现深度搜索(DFS)
            Graph.prototype.dfs = function(initV, handler) {
                //1.初始化顶点颜色
                var colors = this.initializeColor()

                //2.从某个顶点开始依次递归访问
                this.dfsVisit(initV, colors, handler)
            }

            //为了方便递归调用，封装访问顶点的函数，传入三个参数分别表示：指定的第一个顶点、颜色、处理函数
            Graph.prototype.dfsVisit = function(v, colors, handler) {
                //1.将颜色设置为灰色
                colors[v] = "gray"

                //2.处理v顶点
                handler(v)

                //3.访问V的相邻顶点
                var vNeighbours = this.edges.get(v)
                for (let i = 0; i < vNeighbours.length; i++) {
                    var a = vNeighbours[i]
                        //判断相邻顶点是否为白色，若为白色，递归调用函数继续访问
                    if (colors[a] == "white") {
                        this.dfsVisit(a, colors, handler)
                    }
                }
                //4.将v设置为黑色
                colors[v] = "black"
            }
        }