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

function bigSorting(arr) {
    let arrOfLengths = {},
        rtn = [];
    
    arr.forEach((itm, index)=>{
        if(arrOfLengths[itm.length]){
            arrOfLengths[itm.length].push(itm);
        }else{
            arrOfLengths[itm.length] = [itm];
        }
    });
    Object.getOwnPropertyNames(arrOfLengths).forEach((length)=>{
        arrOfLengths[length] = arrOfLengths[length].sort();                                                
    });
    
    Object.getOwnPropertyNames(arrOfLengths).sort((a,b)=>{ return parseInt(a) - parseInt(b); }).forEach((length)=>{
       rtn = rtn.concat(arrOfLengths[length]); 
    });
    return rtn;
}

function main() {
    var n = parseInt(readLine());
    var arr = [];
    for(var arr_i = 0; arr_i < n; arr_i++){
       arr[arr_i] = readLine();
    }
    var result = bigSorting(arr);
    console.log(result.join("\n"));



}
