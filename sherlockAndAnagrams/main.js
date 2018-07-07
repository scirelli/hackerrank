/*
Two strings are anagrams of each other if the letters of one string can be rearranged to form the other string. Given a string, find the number of pairs of substrings of the string which are anagrams of each other.

For example s = mom, the list of all anagrammatic pairs is [m,m], [mo,om] at positions [[0],[2]], [[0,1], [1,2]] respectively.

Function Description

Complete the function sherlockAndAnagrams in the editor below. It must return an integer representing the number of anagrammatic pairs of substrings in .

sherlockAndAnagrams has the following parameter(s):

s: a string.

Input Format

The first line contains an integer , the number of queries. 
Each of the next q lines contains a string s to analyze.

Constraints

1 <= q <= 10
2 <= |s| <= 100
 
String  contains only lowercase letters  ascii[a-z].

Output Format

For each query, return the number of unordered anagrammatic pairs.

Sample Input 0

2
abba
abcd

Sample Output 0

4
0

Explanation 0

The list of all anagrammatic pairs is [a,a], [ab, ba], [b,b] and [abb, bba] at positions [[0],[[3]], [[0,1], [2,3]], [[1],[2]] and [[0,1,2], [1,2,3]] respectively.
No anagrammatic pairs exist in the second query as no character repeats.

Sample Input 1

2
ifailuhkqq
kkkk
Sample Output 1

3
10

Explanation 1

For the first query, we have anagram pairs [i,i], [q,q] and [ifa, fai] at positions [[0],[3]], [[8],[9]] and [[0,1,2], [1,2,3]] respectively.

For the second query: 
There are 6 anagrams of the form [k,k] at positions [[0], [1], [[0], [2]], [[0],[3]], [[1],[2]], [[1],[3]] and [[2],[3]]. 
There are 3 anagrams of the form [kk,kk] at positions [[0,1], [1,2]], [[0,1], [2,3]] and [[1,2], [2,3]]. 
There is 1 anagram of the form [kkk, kkk] at position [[0,1,2], [1,2,3]].
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

/*
Notes:
 * Two strings are anagrams of each other if the letters of one string can be rearranged to form the other string.
 * Anagrams can be 1 character in length.
 * Input's smallest string will be 2 characters.
 * Input's largest string will be 100 characters.
 * Characters are ascii [a-z]
*/

/*
Algorithm:
    Compare all sub-strings of length one. Inc counter if they are anagrams.
    Then compare all sub-strings of length two. Inc counter if they are anagrams.
    etc.
*/
/*
kkkk

k k k k 
_
  _
    _
      _

kkkk
__
 __
  __

kkkk
___
 ___
k -?- k √
k -?- k √
k -?- k √
k -?- k √
k -?- k √
k -?- k √
kk -?- kk √
kk -?- kk √
kk -?- kk √
kkk -?- kkk √
*/
function sherlockAndAnagrams(s) {
    let count = 0,
        dict = {};
    
    for(let subStrLen=1, l=s.length; subStrLen<l; subStrLen++){
        for(let i=0, ss1; i<s.length-subStrLen; i++){
            ss1 = s.substr(i, subStrLen);
            for(let j=i+1, ss2; j<s.length-subStrLen+1; j++){
                ss2 = s.substr(j, subStrLen);
                if(isAnagram(ss1, ss2)){
                    console.log(ss1 + ' -?- ' + ss2 + ' √');  
                    count++;
                }else{
                    console.log(ss1 + ' -?- ' + ss2);  
                }
            }
        }
    }
    return count;

    function isAnagram(str1, str2){
        if(str1.length !== str2.length) return false;
        let dict = {};

        str1.split('').forEach((c)=>{
            if(dict[c]) dict[c]++;
            else dict[c] = 1;
        });
        
        str2 = str2.split('');
        for(let i=0; i<str2.length; i++){
            if(!dict[str2[i]] || dict[str2[i]] < 1){
                return false;
            }
            dict[str2[i]]--;
        }
        return true;
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH || './output');

    const q = parseInt(readLine(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const s = readLine();

        let result = sherlockAndAnagrams(s);

        ws.write(result + "\n");
    }

    ws.end();
}
