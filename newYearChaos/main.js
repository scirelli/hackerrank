#!/usr/bin/env node
'use strict';

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
                 
1 2 3 4 5 6 7 8 
       X
1 2 3 5 4 6 7 8 
----------------
1 2 3 4 5
       X
1 2 3 5 4
     X
1 2 5 3 4
 X
2 1 5 3 4
----------------
To Chaotic
1 2 3 4 5
          
2 5 1 3 4
Five is more than 2 swaps away from it's start position
----------------
1 2 3 4 5
       X  
1 2 3 5 4
     X    
1 2 5 3 4
----------------
1 2 3 4 5 6 7 8  | 1 2 3 4 5 6 7 8
       X        
1 2 3 5 4 6 7 8  | 
     X          
1 2 5 3 4 6 7 8  | 1 2 3 7 5 8 6 4
           X    
1 2 5 3 4 7 6 8  | 1 2 3 5 6 4 7 8
         X      
1 2 5 3 7 4 6 8  |
           X    
1 2 5 3 7 6 4 8  |
             X  
1 2 5 3 7 6 8 4  |
           X    
1 2 5 3 7 8 6 4  |

4 + 1 + 1        | 2 + 2 + 3
-2 + -2 +        |
 */
/*
All you need to do is to count the number of people who are overtaken by a person.

1 2 5 3 7 8 6 4

2 + 2 + 2 + 1


1 2 5 3 7 8 6 4

4 + 1 +
 */
function minimumBribes2(q) {
    let minBribes = 0; 

    for(let i=q.length-1, qIndex, origIndex, posDif, dist; i>=0; i--){
        qIndex = i+1; //Q numbers are one based.
        origIndex = q[i];

        //How far has this person moved
        posDif = qIndex - origIndex;
        dist = Math.abs(posDif);
        if(posDif < 0) continue;
        else minBribes += posDif;
    }
    
    console.log(minBribes);
}

function minimumBribes1(q){
    let ans = 0;
    for(let i = q.length - 1; i >= 0; i--) {
        if (q[i] - (i + 1) > 2) {
            console.log("Too chaotic")
            return;
        }
        for (let j = Math.max(0, q[i] - 2); j < i; j++)
            if (q[j] > q[i]) ans++;
    }
    console.log(ans);
}

function minimumBribes3(q){
    let bribes = 0;

    for(let qIndex=0, l=q.length, origIndex; qIndex<l; qIndex++){
        origIndex = q[qIndex];

        if(origIndex - (qIndex+1) > 2){
            console.log('Too chaotic');
            return;
        }

        for(let ahead = Math.max(0, q[qIndex]-1-1); ahead<qIndex; ahead++){
            if(q[ahead] > q[qIndex]){
                bribes++;
            }
        }
    }
    console.log(bribes);
}

function minimumBribes(q){
}

function main() {
    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine(), 10);

        const q = readLine().split(' ').map(qTemp => parseInt(qTemp, 10));

        minimumBribes(q);
    }
}
