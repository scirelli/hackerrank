process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
    main();    
});

function readLine() {
    return input_stdin_array[input_currentline++];
}

/////////////// ignore above this line ////////////////////
function insertionSort(arr) {
    var swaps = 0;
    
    for(var i=1,j,l=arr.length, tmp; i<l; i++){
        j=i;
        while( j > 0 && arr[j-1] > arr[j] ){
            tmp = arr[j];
            arr[j] = arr[j-1];
            arr[j-1] = tmp;
            swaps++;
            j--;
        }
    }
    
    return swaps;
}
function insertionSort2(arr) {
    var swaps = 0,
        i=1,
        l=arr.length,
        x,j;

    while(i < l){
        x = arr[i];
        j = i -1;
        while( j>=0 && arr[j] > x){
            arr[j+1] = arr[j];
            swaps++;
            j--;
        }
        arr[j+1] = x;
        i++;
    }
    
    return swaps;
}

function mergeSort(arr){
    if(!Array.isArray(arr)) return [];
    if(arr.length <= 1) return arr;

    var midIndex = Math.floor(arr.length/2),
        left, right;
    
    left = mergeSort(arr.slice(0, midIndex-0));
    right = mergeSort(arr.slice(midIndex, arr.length));
    
    var leftIndex = 0,
        rightIndex = 0,
        leftLength = left.length,
        rightLength = right.length,
        output = [];

    while(leftIndex < leftLength && rightIndex < rightLength){
        if(left[leftIndex] > right[rightIndex]){
            output.push(right[rightIndex]);
            rightIndex++;
        }else if(left[leftIndex] < right[rightIndex]){
            output.push(left[leftIndex]);
            leftIndex++;
        }else{
            output.push(right[rightIndex]);
            output.push(left[leftIndex]);
            leftIndex++;
            rightIndex++;
        }
    }

    if(leftIndex < left.length){
        for(; leftIndex<left.length; leftIndex++){
            output.push(left[leftIndex]);
        }
    }
    if(rightIndex < right.length){
        for(; rightIndex<right.length; rightIndex++){
            output.push(right[rightIndex]);
        }
    }
    return output;
}

function main() {
    var t = parseInt(readLine());
    for(var a0 = 0; a0 < t; a0++){
        var n = parseInt(readLine());
        arr = readLine().split(' ');
        arr = arr.map(Number);
        //var result = insertionSort2(arr);
        var result = mergeSort(arr);
        process.stdout.write("" + result + "\n");
    }
}
