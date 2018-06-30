#!/usr/bin/env node

'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the hourglassSum function below.
function hourglassSum(arr) {
    let max = -10000000;

    for(let y=0; y<=6-3; y++){
        for(let x=0; x<=6-3; x++){
            max = Math.max(max, isum(arr, x, y));
        }
    }

    return max;

    function isum(arr, offsetX, offsetY){
        printI(arr, offsetX, offsetY);
        return arr[0 + offsetY][0 + offsetX] + arr[0 + offsetY][1 + offsetX] + arr[0 + offsetY][2 + offsetX]
                                             + arr[1 + offsetY][1 + offsetX] +
               arr[2 + offsetY][0 + offsetX] + arr[2 + offsetY][1 + offsetX] + arr[2 + offsetY][2 + offsetX];
    }
    function printI(arr, offsetX, offsetY){
        var str = arr[0 + offsetY][0 + offsetX] + ' ' + arr[0 + offsetY][1 + offsetX] + ' ' + arr[0 + offsetY][2 + offsetX] + '\n' +
                  '  ' + arr[1 + offsetY][1 + offsetX] + '  \n' +
                  arr[2 + offsetY][0 + offsetX] + ' ' +  arr[2 + offsetY][1 + offsetX] + ' ' + arr[2 + offsetY][2 + offsetX];
        console.log(str);
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH || './output.txt');

    let arr = Array(6);

    for (let i = 0; i < 6; i++) {
        arr[i] = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));
    }

    let result = hourglassSum(arr);

    ws.write(result + "\n");

    ws.end();
}
