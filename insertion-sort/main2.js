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
        inversions = 0;
        var n = parseInt(readLine());
        arr = readLine().split(' ');
        arr = arr.map(Number);
        getInversions(arr.slice(0), 0, arr.length-1);
        var result = inversions;
        process.stdout.write("" + result + "\n");
    }

}

