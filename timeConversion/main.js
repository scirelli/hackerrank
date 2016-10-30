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
    var time = readLine();
        time = time.split(':'),
        amPM = time[2].slice(2);
    time[2] = time[2].slice(0,2);
    time[0] = parseInt(time[0]);
    
    if( amPM.toUpperCase() === 'PM' && time[0] >= 1 && time[0] < 12){
        time[0] = time[0] + 12;
    }else if( amPM.toUpperCase() === 'AM' && time[0] === 12 ){
        time[0] = 12 - time[0];
    }
    if(time[0] < 10 ){
            time[0] = '0' + time[0];
    }
    console.log(time.join(':'));
}
