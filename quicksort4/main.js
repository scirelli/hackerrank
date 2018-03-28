let swaps = 0,
    shifts = 0;
/*
 1 3 9 8 2 7 5
   l g       P
 lg                l=1
                   g=0
 */
function pivot(array, leftIndex, pivotIndex) {
    let pivotValue = array[pivotIndex],
        tmp, borderIndex=leftIndex;

    if(leftIndex === pivotIndex || leftIndex > pivotIndex || leftIndex >= array.length || leftIndex < 0 || pivotIndex >= array.length || pivotIndex < 0) return pivotIndex;

    for(let subjectIndex=leftIndex, l=pivotIndex-leftIndex, subjectValue; subjectIndex<pivotIndex; subjectIndex++){
        subjectValue = array[subjectIndex];

        if(subjectValue < pivotValue){
            tmp = array[borderIndex];
            array[borderIndex] = array[subjectIndex];
            array[subjectIndex] = tmp;
            swaps++;
            borderIndex++;
    console.log(array.join(' '));
        }
    }
    tmp = array[borderIndex]
    array[borderIndex] = pivotValue;
    array[pivotIndex] = tmp;
    swaps++;
    console.log(array.join(' '));

    pivot(array, leftIndex, borderIndex-1);
    pivot(array, borderIndex+1, pivotIndex)

    return borderIndex;
}

// 1 3 9 8 2 7 5
//   i j
function insertionSort2(n, arr) {
    var i = 0,
        j = 0,
        tmp;

    while( i < arr.length){
        j = i;

        while( j>0 && arr[j-1] > arr[j] ){
            tmp = arr[j];
            arr[j] = arr[j-1]
            arr[j-1] = tmp;
            shifts++;
            j--;
        }
        i++
    }
}

function processData(input) {
   input = input.split('\n')[1].split(' ').map(Number);
   pivot(input.slice(0), 0, input.length-1);
   insertionSort2(input.length, input.slice(0));
} 

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
   console.log('shifts = ' + shifts);
   console.log('swaps = ' + swaps);
   console.log(shifts - swaps);
});
