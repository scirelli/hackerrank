'use strict';

/*
Starting with a 1-indexed array of zeros and a list of operations, for each operation add a value to each of the array element between two given indices, inclusive. Once all operations have been performed, return the maximum value in your array.
For example, the length of your array of zeros n = 10. Your list of queries is as follows:
    a b k
    1 5 3
    4 8 7
    6 9 1
Add the values of k between the indices a and b inclusive:
idx	 1 2 3  4  5 6 7 8 9 10
	[0,0,0, 0, 0,0,0,0,0, 0]
	[3,3,3, 3, 3,0,0,0,0, 0]
	[3,3,3,10,10,7,7,7,0, 0]
	[3,3,3,10,10,8,8,8,1, 0]

The largest value is 10 after all operations are performed.
Function Description Complete the function arrayManipulation in the editor below. It must return an integer, the maximum value in the resulting array.

arrayManipulation has the following parameters:
* n - the number of elements in your array
* queries - a two dimensional array of queries where each queries[i] contains three integers, a, b, and k.

Input Format
The first line contains two space-separated integers n and m, the size of the array and the number of operations. 
Each of the next m lines contains three space-separated integers a, b and k, the left index, right index and summand.

Constraints
3 <= n <= 10^7
1 <= m <= 2* 10^5
1 <= a <= b <= n
0 <= k <= 10^9

Output Format

Return the integer maximum value in the finished array.

Sample Input

5 3
1 2 100
2 5 100
3 4 100
Sample Output

200
Explanation

After the first update list will be 100 100 0 0 0. 
After the second update list will be 100 200 100 100 100. 
After the third update list will be 100 200 200 200 100. 
The required answer will be 200.
*/
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

/*
1 2 100 --\
2 5 100    >  1 5 100
3 4 100 --/   2 4 100

100 200 200 200 100

1 2        100 --\   1 1 100
  2 3 4 5  100    >  2 4 200    iterations went from 8 to 5
    3 4    100 --/   5 5 100
 */
function arrayManipulation_brute(n, queries) {
    let array = new Array(n),
        max = 0;

    array.fill(0);
    for(let qi=0,ql=queries.length,a,b,k; qi<ql; qi++){
        a = queries[qi][0]-1;
        b = queries[qi][1]-1;
        k = queries[qi][2];

        if(k==0) continue;

        for(; a<=b; a++){
            array[a] += k;
            max = Math.max(max, array[a]);
        }
    }

    return max;
}

/*
Example:
5 3 
1 2 100 
2 5 100 
3 4 100

If you were to do the operations you would get
[100, 200, 200, 200, 100]

Graphing the ranges
200 |      *  *  *    
    |                  
100 |   *           *  
    |                   
0   |                 
    -------------------
     0  1  2  3  4  5   

You can see the slope changes are (what the algorithm calculates)
[0, 100, 100, 0, 0, -100] 
Meaning starting at 0 the graph went up by 100, went up by 100 again, remained the same, then went back down by 100.
So the highest point is 200, the solution.
*/
function arrayManipulation(arrayLength, queries) {
    let array = new Array(arrayLength+1),//+1 for 1 based array
        x = 0,
        max = 0;

    array.fill(0);    
    for(let i=0, l=queries.length,rangeLB,rangeUB,sum; i<l; i++){
        rangeLB = queries[i][0];
        rangeUB = queries[i][1];
        sum     = queries[i][2];

        array[rangeLB] += sum;

        if((rangeUB + 1) <= arrayLength){
            //Reset; Go back to "ground", the level (value) before this range.
            array[rangeUB+1] -= sum;
        }
    }

    //Figure out the highest point in the graph.
    for(let i=1; i<=arrayLength; i++){
        x += array[i];
        if(max < x) max = x;
    }

    console.log(max);
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH || './output.txt');

    const nm = readLine().split(' ');

    const n = parseInt(nm[0], 10);

    const m = parseInt(nm[1], 10);

    let queries = Array(m);

    for (let i = 0; i < m; i++) {
        queries[i] = readLine().split(' ').map(queriesTemp => parseInt(queriesTemp, 10));
    }

    let result = arrayManipulation(n, queries);

    ws.write(result + "\n");

    ws.end();
}

