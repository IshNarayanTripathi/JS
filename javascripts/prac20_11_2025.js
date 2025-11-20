const multiply = (a, b) => a * b;

//console.log(multiply(5, 10)); // Output: 50

const countPositive = (arr) => {
  return arr.filter((value) => value > 0).length;
};

console.log(countPositive([-10, 0, 5, 15, -3, 7])); // Output: 3

const addNum = (arr, num) => {
  return arr.map((value) => value + num);
};

console.log(addNum([1, 2, 3], 5)); // Output: [6, 7, 8]

const removeEgg = (arr) => {
  let eggCount = 0;
  return arr.filter((value, index) => {
    if (value === "egg" && eggCount < 2) {
      eggCount++;
      return false;
    }
    return true;
  });
};
console.log(removeEgg(["egg", "milk", "bread", "egg", "butter", "egg"])); // Output: ['milk', 'bread', 'butter']
