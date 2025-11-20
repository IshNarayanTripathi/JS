const nums = [10, 20, 30];
nums[-1] = 99;
console.log(nums);


function arraySwap(arr){
  console.log(`Before swapping: ${arr}`);
  const temp = arr[0];
  arr[0] = arr[arr.length-1];
  arr[arr.length-1] = temp;

  
  console.log(`After swapping: ${arr}`);
}

arraySwap([1,2,3,4,5]);


function countWords(arr){
  const obj = {};
  for(let i=0; i<arr.length; i++){
    const word = arr[i];
    if(obj[word])
      obj[word] += 1;
    else
      obj[word] = 1;
  }
  console.log(obj);
}

countWords(["apple", "banana", "apple", "orange", "banana", "apple"]);