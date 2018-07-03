#!/usr/bin/env node

'use strict';

/*
 * You are given an unordered array consisting of consecutive integers  [1, 2, 3, ..., n] without any duplicates. You are allowed to swap any two elements. You need to find the minimum number of swaps required to sort the array in ascending order.
 * The first line contains an integer, n, the size of arr. 
 * The second line contains n space-separated integers arr[i].
 * 1 <= n <= 10^5
 * 1 <= arr[i] <= n
 */
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

/*
 0  1  2  3  4  5  6
---------------------

[7, 1, 3, 2, 4, 5, 6]


 */
/*
 * Why swap an integer x that is already in position. Use an out of order integer y, as swap space. 
 * And what do we swap it with? The number occupying y's correct location.
 */
function minimumSwaps(arr) {
    let minswaps = 0;

    for(let i=0, l=arr.length; i<l; i++){
        if(arr[i] === (i+1)){
            continue;
        }

        swap(arr, i, arr[i]-1)
        i--;
        minswaps++;
    }
    return minswaps;
}

function swap(arr, index1, index2){
    let tmp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = tmp;
    return arr;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH || './output.txt');

    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const res = minimumSwaps(arr);

    ws.write(res + '\n');

    ws.end();
}

