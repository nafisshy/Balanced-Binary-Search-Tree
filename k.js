findParent(node, val, parent){
    if (node == null)
        return;
 
    // If current node is the required node
    if (node.data == val)
    {
 
        // Print its parent
        return parent;
    }
    else
    {
 
        // Recursive calls for the children
        // of the current node
        // Current node is now the new parent
        this.findParent(node.left, val, node.data);
        this.findParent(node.right, val, node.data);
    }
}

    remove(data){
       
    }
}