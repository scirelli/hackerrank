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

function closestNumbers(arr) {
    let curMin = 2 * Math.pow(10,7) + 1,
        pairs = [];

    arr = arr.sort(function(a,b){
        return a - b;
    });

    for(let i=0, l=arr.length - 1, diff; i<l; i++) {
        diff = arr[i+1] - arr[i];

        if( diff < curMin ){
            curMin = diff;
            pairs = [arr[i], arr[i+1]];
        }else if( diff === curMin ){
            curMin = diff;
            pairs.push(arr[i], arr[i+1]);
        }
    }

    return pairs;
}

function main() {
    var n = parseInt(readLine());
    arr = readLine().split(' ');
    arr = arr.map(Number);
    var result = closestNumbers(arr);
    console.log(result.join(" "));
}
