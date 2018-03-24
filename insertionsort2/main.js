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
// [1, 4, 3, 5, 6, 2]
//  i  t
function insertionSort2(n, arr) {
    for(let j=1, l=arr.length, tmp,ins; j<l; j++){
        tmp = arr[j];
        ins = false;
        for(let i=j-1, itm; i>=0; i--){
            itm = arr[i];
            
            if(itm > tmp){
                arr[i+1] = itm;
                console.log(arr.join(' '));
                continue;
            }else {
                arr[i+1] = tmp;
                console.log(arr.join(' '));
                ins = true;
                break;
            }
        }
        if(!ins) arr[0] = tmp;
        console.log(arr.join(' '));
    }
}

function main() {
    var n = parseInt(readLine());
    arr = readLine().split(' ');
    arr = arr.map(Number);
    insertionSort2(n, arr);

}
