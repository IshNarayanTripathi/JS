function removeEggs(arr){
  console.log("Original Array:", arr);
  const newArr = arr.slice().reverse();
  console.log("New Array:", newArr);
  count = 0;
  for(let i=0; i<newArr.length; i++){
    if (count !== 2 && newArr[i] === "egg"){
      newArr.splice(i, 1);
      count++;
    }
  }
  console.log(newArr);
}

function uniqueArray(arr){
  return [...new Set(arr)]
}

console.log(uniqueArray([1,2,2,3,4,4,5,5,5,6])); // [1,2,3,4,5,6]
