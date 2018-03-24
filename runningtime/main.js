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
// [2, 1, 3, 1, 2]
//  i  t
function insertionSort2(n, arr) {
    let shifts = 0;

    for(let j=1, l=arr.length, i,tmp; j<l; j++){
        tmp = arr[j];
        i = j-1; 
        while( i>=0 && tmp < arr[i] ){
            arr[i+1] = arr[i];
            i--;
            shifts++;
        }
        arr[i+1] = tmp;
    }
    console.log(shifts);
}

function main() {
    var n = parseInt(readLine());
    arr = readLine().split(' ');
    arr = arr.map(Number);
    insertionSort2(n, arr);

}
