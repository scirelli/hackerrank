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
    staircase(n);
}

function staircase( bottomCnt ){
    var array = new Array(bottomCnt);
    for( var i=0,l=array.length; i<l; i++ ){
        array[i] = ' ';
    }
    for( var i=array.length-1; i>=0; i-- ){
        array[i] = '#';
        console.log(array.join(''));
    }
}
