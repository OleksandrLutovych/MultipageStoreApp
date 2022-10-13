const randomArr = Array.from({ length: 50 }, () =>
  Math.floor(Math.random() * 100)
);

let count = 0;
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[j + 1] < arr[j]) {
        let k = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = k;
      }
      count += 1;
    }
  }
  return arr;
}

function sortByChoice(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minValue = i;
    for (let j = i; j < arr.length; j++) {
      if (arr[minValue] > arr[j]) {
        minValue = j;
      }
      count += 1;
    }
    let k = arr[i];
    arr[i] = arr[minValue];
    arr[minValue] = k;
  }
  return arr;
}

function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let position = i;
    while (position > 0 && arr[position - 1] > arr[position]) {
      let k = arr[position];
      arr[position] = arr[position - 1];
      arr[position - 1] = k;
      position -= 1;

      count += 1;
    }
  }
  return arr;
}

function quickSort(arr) {
  if (arr < 1) {
    return arr;
  }
  let pivotIndex = Math.floor(arr.length / 2);
  let pivot = arr[pivotIndex];
  let lessArr = [];
  let moreArr = [];

  for (let i = 0; i < arr.length; i++) {
    count += 1;
    if (i === pivotIndex) {
      continue;
    }
    if (arr[i] < pivot) {
      lessArr.push(arr[i]);
    } else {
      moreArr.push(arr[i]);
    }
  }
  return [...quickSort(lessArr), pivot, ...quickSort(moreArr)];
}

function mergeSort (arr) {

}

// console.log(bubbleSort(randomArr), "bubble count:", count); // n = 50, quantity operation = 2500 ; complexity O(n^2)
// console.log(sortByChoice(randomArr), "choise count:", count); // 1275
// console.log(insertionSort(randomArr), "insertion count:", count); // 550-700
// console.log(quickSort(randomArr), "quick count:", count); // 260-390
// quantity of operation / array size = complexity of algorithm

