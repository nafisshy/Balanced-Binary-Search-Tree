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
    constructor(root=null){
        this.root=root;
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

    prettyPrint(node, prefix = '', isLeft = true){
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
}
let tree = new Tree();
let root =tree.buildTree([31,2,4,20,1,9,7,12,8,9,10,6]);
tree.prettyPrint(root);
