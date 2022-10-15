const randomArr = Array.from({ length: 50 }, () =>
  Math.floor(Math.random() * 100)
);
const newArr = [7, 6, 3, 2, 6, 8, 3, 5, 12, 45, 65, 65];
let count = 0;
function bubbleSort(arr) {
  console.time("timer of bubble sort");
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
  console.timeEnd("timer of bubble sort");
  return arr;
}

function sortByChoice(arr) {
  console.time("timer of choise sort");
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
  console.timeEnd("timer of choise sort");
  return arr;
}

function insertionSort(arr) {
  console.time("timer of insertion sort");
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
  console.timeEnd("timer of insertion sort");
  return arr;
}

console.time("timer of quick sort");
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
console.timeEnd("timer of quick sort");

console.time("timer of merge sort");
function mergeSort(arr) {
  if (arr.length < 2) {
    return arr;
  }

  let midIndex = Math.floor(arr.length / 2);
  let leftArr = arr.slice(0, midIndex);
  let rightArr = arr.slice(midIndex, arr.length);

  let leftSpliteArray = mergeSort(leftArr);
  let rightSplitArray = mergeSort(rightArr);
  return sortArray(leftSpliteArray, rightSplitArray);
}
console.timeEnd("timer of merge sort");
/*
1.создаем главную функцию для сортировки масива, в нее делаем переменные левого масива и правого масива.
левый масив будет принимать значение от 0 до среднего елемента, второй масив примет значение от среднего елемента до длинны масива
2. Разделаяем масив на подмасивы, а подмасивы еще на подмасивы пока не достигнем масива с длиной < 2 и заносим это в переменные. тут происходит рекурсия
3.cоздем функцию с параметрами (левый и правый массив) для сортировки разделенных масив. минимальный индекс левого масива = 0, правого = 0, создаем пустой масив в который мы будем 
пушить отсортированые елементы.
4. задаем цикл работы (пока длина левого масиа будет больше чем левый индекс и длина правого масива будет больше правого индекса) выполнять проверку
 - если значение левого масива с его индексом будет меньше значения правого масивого масива с его индексов то минимальный елемент будет ровнятся 
 меньшему значение, а минимальный елемент будет помещен в наш масим методом push. И наоборот.
6. в главной функции вызывает метод сортировки подмасивов (sortArray), и передаем туда параметры левого разделенного масива и правого.
7. А метод возвращает масив который при помощи метода concat будет соединен с левого отсортированого масива и правого. 
*/

function sortArray(left, right) {
  let mergedArr = [];
  let leftIndex = 0;
  let rightIndex = 0;
  while (leftIndex < left.length && rightIndex < right.length) {
    let minElement = 0;
    if (left[leftIndex] < right[rightIndex]) {
      minElement = left[leftIndex];
      leftIndex++;
    } else {
      minElement = right[rightIndex];
      rightIndex++;
    }
    mergedArr.push(minElement);
    count++;
  }

  return mergedArr
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex));
}

// console.log(bubbleSort(randomArr), "bubble count:", count); // n = 50, quantity operation = 2500 ; complexity O(n^2)
// console.log(sortByChoice(randomArr), "choise count:", count); // 1275
// console.log(insertionSort(randomArr), "insertion count:", count); // 550-700
console.log(quickSort(randomArr), "quick count:", count); // 260-390
console.log(mergeSort(randomArr), "merge sorted: ", count);
// quantity of operation / array size = complexity of algorithm


/*
В целом самые ефективные сортировки это merged и quick sorts. В 60% случаев сортировка слиянием быстре. в 5-10% случаев быстрее Быстрая сортировка. 
В некоторых случаях сортировка слиянием быстрее чем быстрая сортировка в 3-4 раза.  

*/ 