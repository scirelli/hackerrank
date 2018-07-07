'use strict';
/*
 A kidnapper wrote a ransom note but is worried it will be traced back to him through his handwriting. He found a magazine and wants to know if he can cut out whole words from it and use them to create an untraceable replica of his ransom note. The words in his note are case-sensitive and he must use only whole words available in the magazine. He cannot use substrings or concatenation to create the words he needs.

Given the words in the magazine and the words in the ransom note, print Yes if he can replicate his ransom note exactly using whole words from the magazine; otherwise, print No.

For example, the note is "Attack at dawn". The magazine contains only "attack at dawn". The magazine has all the right words, but there's a case mismatch. The answer is No.

Function Description

Complete the checkMagazine function in the editor below. It must print  if the note can be formed using the magazine, Yes or No.

checkMagazine has the following parameters:

* magazine: an array of strings, each a word in the magazine
* note: an array of strings, each a word in the ransom note
*
Input Format

The first line contains two space-separated integers, m and n, the numbers of words in the magazine and the note.. 
The second line contains m space-separated strings, each magazine[i].
The third line contains n space-separated strings, each note[i].

Constraints
1 <= m,n <= 30000
1 <= |magazine[i]|, |note[i]| <= 5.
Each word constists of English alphabetic letters (i.e, a to z and A to Z).

Output Format

Print Yes if he can use the magazine to create an untraceable replica of his ransom note. Otherwise, print No.

Sample Input 0

    6 4
    give me one grand today night
    give one grand today

Sample Output 0

    Yes

Sample Input 1

    6 5
    two times three is not four
    two times two is four

Sample Output 1

    No

Explanation 1

'two' only occurs once in the magazine.
 */


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

// Complete the checkMagazine function below.
function checkMagazine(magazine, note) {
    let magMap = {};

    magazine.forEach(function(value){
        if(magMap[value]){
            magMap[value]++;
        }else{
            magMap[value] = 1;
        }
    });
    
    for(let i=0, l=note.length; i<l; i++){
        if(!magMap[note[i]]){
            console.log('No');
            return;
        }
        magMap[note[i]]--;
        if(magMap[note[i]] <= 0) delete magMap[note[i]];
    }

    console.log('Yes');
}

function main() {
    const mn = readLine().split(' ');

    const m = parseInt(mn[0], 10);

    const n = parseInt(mn[1], 10);

    const magazine = readLine().split(' ');

    const note = readLine().split(' ');

    checkMagazine(magazine, note);
}
