/*
 1 3 9 8 2 7 5
   l g       P
 lg                l=1
                   g=0
 */
function pivot(array, leftIndex, pivotIndex) {
    let pivotValue = array[pivotIndex],
        tmp, borderIndex=0;

    if(leftIndex === pivotIndex || leftIndex > pivotIndex || leftIndex >= array.length || leftIndex < 0 || pivotIndex >= array.length || pivotIndex < 0) return pivotIndex;

    for(let subjectIndex=0, l=pivotIndex-leftIndex, subjectValue; subjectIndex<pivotIndex; subjectIndex++){
        subjectValue = array[subjectIndex];

        if(subjectValue < pivotValue){
            tmp = array[borderIndex];
            array[borderIndex] = array[subjectIndex];
            array[subjectIndex] = tmp;
            borderIndex++;
        }
    }
    tmp = array[borderIndex]
    array[borderIndex] = pivotValue;
    array[pivotIndex] = tmp;
    
    console.log(array.join(' '));

    pivot(array, leftIndex, borderIndex-1);
    pivot(array, borderIndex+1, pivotIndex)

    return borderIndex;
}

function processData(input) {
   input = input.split('\n')[1].split(' ').map(Number);
   pivot(input, 0, input.length-1);
} 

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
