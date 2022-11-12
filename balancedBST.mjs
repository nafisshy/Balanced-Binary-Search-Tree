import mergesort from "./mergesort.mjs";
import removeDuplicate from "./removeDuplicate.mjs";

class Node{
    constructor(data=null){
        this.data=data;
        this.left=null;
        this.right=null;
    }
}

class Tree{
    constructor(...arr){
        this.root=null;
        this.root=this.buildTree(arr);
    }

    buildTree(arr){
        let sortedArray=mergesort(arr);
        let uniqueArray = removeDuplicate(sortedArray);
        let root= this.balancedBst(uniqueArray);
        this.root=root;
        return root;
    }
    balancedBst(arr){
        if(arr.length<1) return null;
        const mid = Math.floor((arr.length / 2)); 
        let node = new Node();
        node.data= arr[mid];
        let leftHalf = arr.slice(0, mid);
        let rightHalf = arr.slice(mid+1);
        node.left=this.balancedBst(leftHalf);
        node.right=this.balancedBst(rightHalf);
        return node;
    }

    prettyPrint(node=this.root, prefix = '', isLeft = true){
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }

    insert(data , root = this.root){
        if(root.data===data){
            return 'duplicate insertion';
        }
        if(data<root.data){
            if(root.left!==null){
                this.insert(data,root.left);
            }
            else{
                root.left= new Node(data);
                return true;
            }
        }
        else if(data>root.data){
            if(root.right!==null){
                this.insert(data,root.right);
            }
            else{
                root.right= new Node(data);
                return true;
            }
        }
    }

    insertNode(node,root =this.root){
        let data=node.data;
        if(root.data===data){
            return 'duplicate insertion';
        }
        if(data<root.data){
            if(root.left!==null){
                this.insertNode(node,root.left);
            }
            else{
                root.left= node;
                return true;
            }
        }
        else if(data>root.data){
            if(root.right!==null){
                this.insertNode(node,root.right);
            }
            else{
                root.right= node;
                return true;
            }
        }
    }

    find(value, root = this.root){
        let returnValue;
        if(value===root.data){
            return root;   
        }
        else if(value<root.data){
            if(root.left!==null){
                returnValue=this.find(value,root.left);
            }
        }
        else if(value>root.data){
            if(root.right!==null){
                returnValue=this.find(value,root.right);
            }
        }
        if(root.left==null && root.right==null){
            return null;
        }
        return returnValue;
    }

    findParent(value, root = this.root){
        let returnValue;
        if(value===root.left.data){
            return root;   
        }
        else if(value===root.right.data){
            return root;   
        }
        else{
        if(value<root.data){
            if(root.left!==null){
                returnValue=this.findParent(value,root.left);
            }
        }
        else if(value>root.data){
            if(root.right!==null){
                returnValue=this.findParent(value,root.right);
            }
        }
        else if(root.left==null && root.right==null){
            return null;
        }
        return returnValue;
        }
        
    }

    remove(data){
       const parentNode= this.findParent(data);
       const targetNode = this.find(data);
       if(parentNode.left.data===data){
        parentNode.left=null;
       }
       else if(parentNode.right.data===data){
        parentNode.right=null;
       }
       if(targetNode.left!==null){
        this.insertNode(targetNode.left);
       }
       if(targetNode.right!==null){
        this.insertNode(targetNode.right);
       } 
    }

    height(node){
        
        let returnValue,lh=0,rh=0;
        if(node===null){
            return 0;
        }
        if (node.right !== null) {
            rh = this.height(node.right);
        }
        if (node.left !== null) {
           
            lh = this.height(node.left);
            
        }
        returnValue = lh>rh?lh:rh;
        return returnValue+1;
    }

    depth(node,root=this.root){
        if(node===null){
            return 0;
        }
        if(root===node){
            return 0;
        }
        let lh=0,rh=0;
        if (root.right !== null) {
            rh = 1+this.depth(node,root.right);
        }
        if (root.left !== null) {
           
            lh = 1+this.depth(node,root.left);
            
        }
        return lh>rh?lh:rh;
    }

    levelOrder(callback=()=>{}){
        let node=this.root;
        let queue=[];
        let result=[];
        if(node==this.root){
            queue.push(node);
        }
        
        while(queue.length){
            let currentNode=queue.shift();
            callback(currentNode);
            result.push(currentNode.data);
            if (currentNode.left !== null)
            queue.push(currentNode.left);
            if (currentNode.right !== null)
            queue.push(currentNode.right);
            
        }
        return result;    
    }

    inorder(callback=() => {},node=this.root, arr=[]){
        if (node.left !== null)
        this.inorder(callback,node.left,arr);
        arr.push(node.data);
        callback(node);
        if (node.right !== null)
        this.inorder(callback,node.right,arr);
        return arr;
    }

    postorder(callback=() => {},node=this.root, arr=[]){
        if (node.left !== null)
        this.postorder(callback,node.left,arr);
        if (node.right !== null)
        this.postorder(callback,node.right,arr);
        arr.push(node.data);
        callback(node);
        return arr;
    }

    preorder(callback=() => {},node=this.root, arr=[]){
        arr.push(node.data);
        callback(node);
        if (node.left !== null)
        this.preorder(callback,node.left,arr);
        if (node.right !== null)
        this.preorder(callback,node.right,arr);
        return arr;
    }

    isbalanced(node=this.root){
        let lh=0,rh=0;
        let leftbalanced=true,rightbalanced=true;
        if (node.left !== null){
            lh=this.height(node.left);
            leftbalanced=this.isbalanced(node.left);
        }
        
        if (node.right !== null){
            rh=this.height(node.right);
            rightbalanced=this.isbalanced(node.right);
        } 
        const difference=lh>rh?lh-rh:rh-lh;
        const balanced=(difference<2);
        return balanced && leftbalanced && rightbalanced;

    }

    rebalance(root=this.root){
        if (this.isBalanced(root)) return root;
        let rebalancedNewTreeArray = [];
        rebalancedNewTreeArray = this.inorder();
        let balancedTree = new Tree();
        let newroot= balancedTree.buildTree([1,2,3,4,5,6,7,8,9,10,11,12,13,14])
        return newroot;
    }
}




