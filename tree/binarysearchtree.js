        //封装二叉搜索树
        function BinarySearchTree() {

            //节点内部类
            function Node(key) {
                this.key = key
                this.left = null
                this.right = null
            }

            //属性
            this.root = null

            //insert方法:对外向用户暴露的方法
            BinarySearchTree.prototype.insert = function(key) {
                //1.根据key创建节点
                var newNode = new Node(key)

                //2.判断根节点是否存在
                if (this.root == null) {
                    this.root = newNode
                        //根节点存在时
                } else {
                    this.insertNode(this.root, newNode)
                }
            }

            //内部使用的insertNode方法:用于比较节点从左边插入还是右边插入
            BinarySearchTree.prototype.insertNode = function(node, newNode) {
                //当newNode.key < node.key向左查找
                if (newNode.key < node.key) {
                    //情况1：node无左子节点，直接插入
                    if (node.left == null) {
                        node.left = newNode
                            //情况2：node有左子节点，递归调用insertNode(),直到遇到无左子节点成功插入newNode后，不再符合该情况，也就不再调用insertNode()，递归停止。
                    } else {
                        this.insertNode(node.left, newNode)
                    }
                    //当newNode.key >= node.key向右查找
                } else {
                    //情况1：node无右子节点，直接插入
                    if (node.right == null) {
                        node.right = newNode
                            //情况2：node有右子节点，依然递归调用insertNode(),直到遇到无右子节点成功插入newNode为止
                    } else {
                        this.insertNode(node.right, newNode)
                    }
                }
            }

            //先序遍历
            //掺入一个handler函数方便之后对得到的key进行处理
            BinarySearchTree.prototype.preOrderTraversal = function(handler) {
                this.preOrderTraversalNode(this.root, handler)
            }

            //封装内部方法，对某个节点进行遍历
            BinarySearchTree.prototype.preOrderTraversalNode = function(node, handler) {
                if (node != null) {
                    //1.处理经过的节点
                    handler(node.key)

                    //2.遍历左子树中的节点
                    this.preOrderTraversalNode(node.left, handler)

                    //3.遍历右子树中的节点
                    this.preOrderTraversalNode(node.right, handler)
                }
            }

            //中序遍历
            //掺入一个handler函数方便之后对得到的key进行处理
            BinarySearchTree.prototype.midOrderTraversal = function(handler) {
                this.midOrderTraversalNode(this.root, handler)
            }

            //封装内部方法，对某个节点进行遍历
            BinarySearchTree.prototype.midOrderTraversalNode = function(node, handler) {
                if (node != null) {
                    //1.遍历左子树中的节点
                    this.midOrderTraversalNode(node.left, handler)

                    //2.处理经过的节点
                    handler(node.key)

                    //3.遍历右子树中的节点
                    this.midOrderTraversalNode(node.right, handler)
                }
            }

            //后序遍历
            //掺入一个handler函数方便之后对得到的key进行处理
            BinarySearchTree.prototype.postOrderTraversal = function(handler) {
                this.postOrderTraversalNode(this.root, handler)
            }

            //封装内部方法，对某个节点进行遍历
            BinarySearchTree.prototype.postOrderTraversalNode = function(node, handler) {
                if (node != null) {
                    //1.遍历左子树中的节点
                    this.postOrderTraversalNode(node.left, handler)

                    //2.遍历右子树中的节点
                    this.postOrderTraversalNode(node.right, handler)

                    //3.处理经过的节点
                    handler(node.key)
                }
            }

            //寻找最大值
            BinarySearchTree.prototype.max = function() {
                //1.获取根节点
                var node = this.root
                    //2.定义key保存节点值
                var key = null
                    //3.依次向右不断查找，直到节点为null
                while (node != null) {
                    key = node.key
                    node = node.right
                }
                return key
            }

            //寻找最小值
            BinarySearchTree.prototype.min = function() {
                //1.获取根节点
                var node = this.root
                    //2.定义key保存节点值
                var key = null
                    //3.依次向左不断查找，直到节点为null
                while (node != null) {
                    key = node.key
                    node = node.left
                }
                return key
            }

            //查找特定的key
            BinarySearchTree.prototype.search = function(key) {
                //1.获取根节点
                var node = this.root

                //2.循环搜索key
                while (node != null) {
                    if (key < node.key) {
                        //小于根(父)节点就往左边找
                        node = node.left
                            //大于根(父)节点就往右边找
                    } else if (key > node.key) {
                        node = node.right
                    } else {
                        return true
                    }
                }
                return false
            }

            //删除节点
            BinarySearchTree.prototype.remove = function(key) {

                //1.1.定义变量current保存删除的节点，parent保存它的父节点。isLeftChild保存current是否为parent的左节点
                var current = this.root
                var parent = null
                var isLeftChild = true

                //1.2.开始寻找删除的节点
                while (current.key != key) {
                    parent = current
                        // 小于则往左查找
                    if (key < current.key) {
                        current = current.left
                        isLeftChild = true
                    } else {
                        isLeftChild = false
                        current = current.right
                    }
                    //找到最后依然没有找到相等的节点
                    if (current == null) {
                        return false
                    }
                }
                //结束while循环后：current.key = key

                //情况1：删除的是叶子节点(没有子节点)
                if (current.left == null && current.right == null) {
                    if (current == this.right) {
                        this.right = null
                    } else if (isLeftChild) {
                        parent.left = null
                    } else {
                        parent.right = null
                    }
                    //情况2：删除的节点有一个子节点
                    //当current存在左子节点时
                } else if (current.right == null) {
                    if (current = this.root) {
                        this.root = current.left
                    } else if (isLeftChild) {
                        parent.left = current.left
                    } else {
                        parent.right = current.left
                    }
                    //当current存在右子节点时
                } else if (current.left == null) {
                    if (current = this.root) {
                        this.root = current.right
                    } else if (isLeftChild) {
                        parent.left = current.right
                    } else {
                        parent.right = current.right
                    }
                    //情况3：删除的节点有两个子节点
                } else {
                    //1.获取后继节点
                    var successor = this.getSuccessor(current)

                    //2.判断是否根节点
                    if (current == this.root) {
                        this.root = successor
                    } else if (isLeftChild) {
                        parent.left = successor
                    } else {
                        parent.right = successor
                    }

                    //3.将后继的左子节点改为被删除节点的左子节点
                    successor.left = current.left
                }
            }

            //封装查找后继的方法
            BinarySearchTree.prototype.getSuccessor = function(delNode) {
                //1.定义变量,保存找到的后继
                var successor = delNode
                var current = delNode.right
                var successorParent = delNode

                //2.循环查找current的右子树节点
                while (current != null) {
                    successorParent = successor
                    successor = current
                    current = current.left
                }

                //3.判断寻找到的后继节点是否直接就是删除节点的right节点
                if (successor != delNode.right) {
                    successorParent.left = successor.right
                    successor.right = delNode.right
                }
                return successor
            }
        }