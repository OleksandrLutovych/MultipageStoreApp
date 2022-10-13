const newArr = [
  43, 23, 38, 48, 20, 25, 12, 6, 33, 45, 38, 41, 13, 37, 38, 5, 34, 42, 6, 46,
  89, 567, 456
];

let count = 0;
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[j + 1] < arr[j]) {
        let k = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = k;
      }
      count = count++;
    }
  }
  return arr;
}
console.log("count =" + count);
console.log(bubbleSort(newArr));
