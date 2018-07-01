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

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the rotLeft function below.
function rotLeft(arr, numOfRotations) {
    let tmp = [];
    numOfRotations = numOfRotations%arr.length;
    
    if(numOfRotations === 0) return arr;
    for(let i=0; i<numOfRotations; i++){
        tmp.push(arr[i]);
    }
    for(let i=numOfRotations,j=0; i<arr.length; i++){
        arr[j++] = arr[i];
    }
    for(let i=0,j=arr.length-numOfRotations; i<tmp.length; i++){
        arr[j++] = tmp[i];
    }
    return arr;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH || './output.txt');

    const nd = readLine().split(' ');

    const n = parseInt(nd[0], 10);

    const d = parseInt(nd[1], 10);

    const a = readLine().split(' ').map(aTemp => parseInt(aTemp, 10));

    const result = rotLeft(a, d);

    ws.write(result.join(' ') + '\n');

    ws.end();
}
