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

var swaps = 0;
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
            swaps+=rightIndex;
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

    swaps+= ((left.length)-leftIndex) * rightIndex;
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

var inversions = 0;
function getInversions(nums, left, right) {
  if (left < right) {
    //Split in half
    var mid = Math.floor((left + right) / 2);
    //Sort recursively.
    getInversions(nums, left, mid);
    getInversions(nums, mid + 1, right);
    //Merge the two sorted sub arrays.
    merge(nums, left, mid, right);
  }
}
 
function merge(nums, left, mid, right) {
    var leftLength = mid - left + 1,
        rightLength = right - mid,
        leftArray = [],
        rightArray = [];

    for (var i = 0; i < leftLength; i++) {
        leftArray[i] = nums[left + i];
    }
    for (var i = 0; i < rightLength; i++) {
        rightArray[i] = nums[mid + 1 + i];
    }

    var leftIndex = 0, rightIndex = 0, k = left;
    while (leftIndex < leftLength && rightIndex < rightLength) {
        if (leftArray[leftIndex] <= rightArray[rightIndex]) {
            nums[k] = leftArray[leftIndex];
            inversions += rightIndex;
            leftIndex++;
        } else {
            nums[k] = rightArray[rightIndex];
            rightIndex++;
        }
        k++;
    }

    //remaining iversions
    inversions += rightIndex * (leftLength - leftIndex);
    if (leftIndex >= leftLength) {
        //copy remaining elements from right
        for (; rightIndex < rightLength; rightIndex++, k++) {
            nums[k] = rightArray[rightIndex];
        }
    } else {
        //copy remaining elements from left
        for (; leftIndex < leftLength; leftIndex++, k++) {
            nums[k] = leftArray[leftIndex];
        }
    }
}

function main() {
    var t = parseInt(readLine());
    for(var a0 = 0; a0 < t; a0++){
        swaps = 0;
        inversions = 0;
        var n = parseInt(readLine());
        arr = readLine().split(' ');
        arr = arr.map(Number);

        console.log(arr);
        var result1 = insertionSort2(arr.slice(0));
        process.stdout.write("insertion swaps: " + result1 + "\n");

        mergeSort(arr.slice(0));
        process.stdout.write("merge swaps: " + swaps + "\n");

        getInversions(arr.slice(0), 0, arr.length-1);
        process.stdout.write("merge2 swaps: " + inversions + "\n\n\n");
    }
}
