/*
You are given q queries. Each query is of the form two integers described below: 
- 1 x: Insert x in your data structure. 
- 2 y: Delete one occurence of y from your data structure, if present. 
- 3 z: Check if any integer is present whose frequency is exactly z. If yes, print 1 else 0.

The queries are given in the form of a 2-D array queries of size q where queries[i][0] contains the operation, and queries[i][1] contains the data element. For example, you are given array queries = [(1,1), (2,2), (3,2), (1,1), (1,1), (2,1), (3,2)]. The results of each operation are:

Operation   Array   Output
(1,1)       [1]
(2,2)       [1]
(3,2)                   0
(1,1)       [1,1]
(1,1)       [1,1,1]
(2,1)       [1,1]
(3,2)                   1
Return an array with the output: [0,1].

Function Description

Complete the solve function in the editor below. It must return an array of integers where each element is a 1 if there is at least one element value with the queried number of occurrences in the current array, or 0 if there is not.

solve has the following parameter(s):

queries: a 2-d array of integers

Input Format

The first line contains of an integer , the number of queries. 
Each of the next q lines contains two integers denoting the 2-d array queries.

Constraints
1 <= q <= 10^6
1 <= x,y,z <= 10^9
All queries[i][0] ∈ {1,2,3}
1 <= queries[i][1] <= 10^9

Output Format

Return an integer array consisting of all the outputs of queries of type 3.

Sample Input 0

8
1 5
1 6
3 2
1 10
1 10
1 6
2 5
3 2

Sample Output 0

0
1

Explanation 0

For the first query of type 3, there is no integer whose frequency is 2 (array = [5,6]). So answer is 0.
For the second query of type 3, there are two integers in array = [6,10,10,6,5] whose frequency is 2 (integers = 6 and 10). So, the answer is 1.

Sample Input 1

4
3 4
2 1003
1 16
3 1

Sample Output 1

0
1

Explanation 1

For the first query of type 3, there is no integer of frequency 4. The answer is 0.
For the second query of type 3, there is one integer, 16  of frequency 1 so the answer is 1.
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
1 x: Insert x in your data structure. 
2 y: Delete one occurence of y from your data structure, if present. 
3 z: Check if any integer is present whose frequency is exactly z. If yes, print 1 else 0.

Constraints:
1 <= q <= 10^6
1 <= x,y,z <= 10^9
All queries[i][0] ∈ {1,2,3}
*/
function solve(queries) {
    const OPERATION = 0,
          VALUE = 1,
          INSERT = 1,
          DELETE = 2,
          CHECK = 3;

    let numberToFreq = {},
        freqCounts = {},
        output = [];

    for(let i=0, query,freq; i<queries.length; i++){
        query = queries[i];
        switch(query[OPERATION]){
        case INSERT:
            freq = numberToFreq[query[VALUE]];
            if(freq !== undefined){
                if(freqCounts[freq] !== undefined){
                    freqCounts[freq]--;
                    if(freqCounts[freq] < 0 ) freqCounts[freq]=0;
                }

                numberToFreq[query[VALUE]]++;
                freq = numberToFreq[query[VALUE]];
                if(freqCounts[freq] !== undefined){
                    freqCounts[freq]++;
                }else{
                    freqCounts[freq] = 1;
                }
            }else{
                numberToFreq[query[VALUE]] = 1;
                if(freqCounts[numberToFreq[query[VALUE]]] !== undefined){
                    freqCounts[numberToFreq[query[VALUE]]]++;
                }else{
                    freqCounts[numberToFreq[query[VALUE]]] = 1;
                }
            }
            break;
        case DELETE:
            freq = numberToFreq[query[VALUE]];

            if(freq !== undefined && freq > 0){
                if(freqCounts[freq] !== undefined){
                    freqCounts[freq]--;
                    if(freqCounts[freq] < 0 ) freqCounts[freq]=0;
                }

                numberToFreq[query[VALUE]]--;

                freq = numberToFreq[query[VALUE]];
                if(freqCounts[freq] !== undefined){
                    freqCounts[freq]++;
                }else{
                    freqCounts[freq] = 1;
                }
            }
            break;
        case CHECK:
            let freqCount = freqCounts[query[VALUE]];

            if(freqCount !== undefined && freqCount > 0){
                output.push(1);
            }else{
                output.push(0);
            }
            break;
        default:
            throw new Error('Invalid operation');
        }
    }

    return output;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH || './output.txt');

    const q = parseInt(readLine(), 10);

    let queries = Array(q);

    for (let i = 0; i < q; i++) {
        queries[i] = readLine().split(' ').map(queriesTemp => parseInt(queriesTemp, 10));
    }

    const ans = solve(queries);
    
    console.log(ans);
    ws.write(ans.join('\n') + '\n');

    ws.end();
}
