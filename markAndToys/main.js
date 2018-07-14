/*
Mark and Jane are very happy after having their first kid. Their son loves toys, so Mark wants to buy some. There are a number of different toys lying in front of him, tagged with their prices. Mark has only a certain amount to spend, and he wants to maximize the number of toys he buys with this money.

Given a list of prices and an amount to spend, what is the maximum number of toys Mark can buy? For example, if prices = [1,2,3,4] and Mark has k = 7 to spend, he can buy items [1,2,3] for 6, or [3,4] for 7 units of currency. He would choose the first group of 3 items.

Function Description

Complete the function maximumToys in the editor below. It should return an integer representing the maximum number of toys Mark can purchase.

maximumToys has the following parameter(s):

prices: an array of integers representing toy prices
k: an integer, Mark's budget

Input Format

The first line contains two integers, n and k, the number of priced toys and the amount Mark has to spend. 
The next line contains n space-separated integers [i]

Constraints
1 <= n <= 10^5
1 <= k <= 10^9
1 <= prices[i] <= 10^9

A toy can't be bought multiple times.
 
Output Format

An integer that denotes the maximum number of toys Mark can buy for his son.

Sample Input

7 50
1 12 5 111 200 1000 10

Sample Output

4

Explanation

He can buy only 4 toys at most. These toys have the following prices: 1, 12, 5, 10.
*/
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

function maximumToys(prices, k) {
    let i=0;

    prices = prices.sort((a,b)=>{return a-b;});

    while(k > 0 && i<prices.length){
        k -= prices[i++];
    }
    
    if(k < 0) i--;
    return i;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH || './output.txt');

    const nk = readLine().split(' ');

    const n = parseInt(nk[0], 10);

    const k = parseInt(nk[1], 10);

    const prices = readLine().split(' ').map(pricesTemp => parseInt(pricesTemp, 10));

    let result = maximumToys(prices, k);

    ws.write(result + "\n");
    console.log(result + "\n");

    ws.end();
}
