'use strict';
/*
 You are given an array and you need to find number of tripets of indices (i,j,k) such that the elements at those indices are in geometric progression for a given common ratio r and i < j < k.

For example, arr = [1,4,16,64]. If r = 4, we have [1,4,16] and [4,16,64] at indices (0,1,2) and (1,2,3).

Function Description

Complete the countTriplets function in the editor below. It should return the number of triplets forming a geometric progression for a given r as an integer.
countTriplets has the following parameter(s):

arr: an array of integers
r: an integer, the common ratio

Input Format

The first line contains two space-separated integers n and r, the size of arr and the common ratio. 
The next line contains  space-seperated integers arr[i].

Constraints
1 <= n <= 10^5
1 <= r <= 10^9
1 <= arr[i] <= 10^9

Output Format

Return the count of triplets that form a geometric progression.

Sample Input 0

4 2
1 2 2 4
Sample Output 0

2
Explanation 0

There are 2 triplets in satisfying our criteria, whose indices are (0,1,2) and (0,1,3) 

Sample Input 1

6 3
1 3 9 9 27 81
Sample Output 1

6
Explanation 1

The triplets satisfying are (0,1,2), (0,1,3), (1,2,4), (1,3,4), (2,4,5) and (3,4,5).


Geometric Progression:
In mathematics, a geometric progression, also known as a geometric sequence, is a sequence of numbers where each term after the first is found by multiplying the previous one by a fixed, non-zero number called the common ratio. For example, the sequence 2, 6, 18, 54, ... is a geometric progression with common ratio 3. Similarly 10, 5, 2.5, 1.25, ... is a geometric sequence with common ratio 1/2.

The n-th term of a geometric sequence with initial value a and common ratio r is given by

a_n = ar^(n-1).

Such a geometric sequence also follows the recursive relation

a_n = ra_(n-1) a_n = ra_(n-1) for every integer n >= 1.

Generally, to check whether a given sequence is geometric, one simply checks whether successive entries in the sequence all have the same ratio.

The common ratio of a geometric sequence may be negative, resulting in an alternating sequence, with numbers switching from positive to negative and back. For instance

1, −3, 9, −27, 81, −243, ...

is a geometric sequence with common ratio −3.

The behaviour of a geometric sequence depends on the value of the common ratio.

If the common ratio is:
    * Positive, the terms will all be the same sign as the initial term.
    * Negative, the terms will alternate between positive and negative.
    * Greater than 1, there will be exponential growth towards positive or negative infinity (depending on the sign of the initial term).
    * 1, the progression is a constant sequence.
    * Between −1 and 1 but not zero, there will be exponential decay towards zero.
    * −1, the progression is an alternating sequence
    * Less than −1, for the absolute values there is exponential growth towards (unsigned) infinity, due to the alternating sign.

An interesting result of the definition of a geometric progression is that for any value of the common ratio, any three consecutive terms a, b and c will satisfy the following equation:

 b^2 = ac 

where b is considered to be the geometric mean between a and c.
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
Notes:
    * Triplets who's indeicies (i,j,k) are in geometric progressions for a given ratio r and where i < j < k.
    * Constraints
        1 <= n <= 10^5       100,000
        1 <= r <= 10^9       1,000,000,000
        1 <= arr[i] <= 10^9  1,000,000,000
        where n is the size of the array and
        r is the common ratio

    a  = ar^(n-1)
     n

    a  = ra          n >= 1
     n     n -1 
     
    b^2 = ac
*/
function countTriplets(arr, r) {
    let dict = {},
        count = 0;
    
    for(let i=0; i<arr.length; i++){
        if(dict[arr[i]]){
            dict[arr[i]].push(i);
        }else{
            dict[arr[i]] = [i];
        }
    }
    
    for(let i=0, a,an1,an2; i<arr.length; i++){
        a = arr[i];
        an1 = a * r;
        an2 = an1 * r;

        if(r==1){
            count += dict[an1].length-2;
        }else if(dict[an1] && dict[an2]){
            count += dict[an1].length * dict[an2].length;
        }
    }
    return count;
}

/*
 static long countTriplets(long[] arr, long r) {
    long cnt = 0;
    Map<Long, Long> map = new HashMap<>();
    Map<Long, Long> rMap = new HashMap<>();
    for (long n : arr) {
        if (n % r == 0) {
            long pre = n / r;
            Long cnt2 = rMap.get(pre);
            if (cnt2 != null) cnt += cnt2;
            
            Long cnt1 = map.get(pre);
            if (cnt1 != null) rMap.put(n, rMap.getOrDefault(n, 0L) + cnt1);
        }
        map.put(n, map.getOrDefault(n, 0L) + 1);
    }
    return cnt;
}
 */
/*
hash: {n: [0, 0, 0]} #[singlet_count, doublet_count, triplet_count]
hash[n][2] += hash[n / r][1]
hash[n][1] += hash[n / r][0]
hash[n][0] += 1
ans = sumofalltriplets(n[2])

For example, if we have arr = [3, 9, 9, 27]

Here, index 0 = no. of singlets, 1 = no. of doublets, 2 = no. of triplets

For 3, we have  [1, 0, 0]
For 9, we have  [1, 1, 0] #(3, 9) - Doublet
For 9, we have  [2, 2, 0] #We now have two doublets, the previous one and the current one with the second 9 - (3, 9) & (3,9)
For 27, we have [1, 2, 2] # We have two doublets (9, 27), (9, 27) and two triplets (3, 9, 27).
 */
function countTriplets(arr, r){
    let count = 0,
        preMap = {},
        map = {};
    
    for(let n of arr){
        if(n % r === 0){
            let previousNum = n/r;

            if(preMap[previousNum] !== undefined){
                count += preMap[previousNum];
            }

            let cnt1 = map[previousNum];
            if(cnt1 !== undefined){
                preMap[n] = (preMap[n] || 0) + cnt1;
            }
        }

        map[n] = (map[n] || 0) + 1;
    }

    return count;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH || './output.txt');

    const nr = readLine().split(' ');

    const n = parseInt(nr[0], 10);

    const r = parseInt(nr[1], 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const ans = countTriplets(arr, r);

    ws.write(ans + '\n');
    console.log(ans);

    ws.end();
}
