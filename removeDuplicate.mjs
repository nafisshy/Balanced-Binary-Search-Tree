//This function takes a sorted array and removes duplicates from it
function removeDuplicate(arr){
  let newarr = arr.filter((value,index)=>{
        if(!(value===arr[index+1]&&index!==arr.length-1)){
            return value; 
        }
  });
  return newarr;
}

export default removeDuplicate;