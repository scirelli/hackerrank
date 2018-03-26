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
    var n = parseInt(readLine()),
        cntSorted = (new Array(100)).fill('');
    for(var a0 = 0; a0 < n; a0++){
        var x_temp = readLine().split(' ');
        var x = parseInt(x_temp[0]);
        var s = x_temp[1];
        
        if(a0 < Math.floor(n/2)){
            s = '-';
        }
        
        if(cntSorted[x]){
            cntSorted[x] = cntSorted[x] + ' ' + s;
        }else{
            cntSorted[x] = s;
        }
    }
    
    console.log( cntSorted.filter((s)=>{ return s != ''; }).join(' ') );
}
