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

function main() {
    var n = parseInt(readLine());
    arr = readLine().split(' ');
    arr = arr.map(Number);
    fraction(arr);
}

function fraction( array ){
    var zeroCount = 0,
        posCount = 0,
        negCount = 0,
        l = array.length;
    
    for( var i=0; i<l; i++ ){
        if( array[i] === 0 ){
            zeroCount++;
        }else if( array[i] < 0 ){
            negCount++;
        }else{
            posCount++;
        }
    }
    console.log((posCount/l).toFixed(6));
    console.log((negCount/l).toFixed(6));
    console.log((zeroCount/l).toFixed(6));
}
