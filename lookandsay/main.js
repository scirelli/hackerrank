#!/usr/bin/env node
/*
Implement a function that outputs the Look and Say sequence:
    1 
    11
    21
    1211
    111221
    312211
    13112221
    1113213211
    31131211131221
    13211311123113112211
*/
/*
0   1                        1
1   11                       2
2   21                       2
3   1211                     4
4   111221                   6
5   312211                   6
6   13112221                 8
7   1113213211               10
8   31131211131221           14
9   13211311123113112211     20

Seems to be the frequency count of each number followed by that number.
1 has one one = 11
11 has two ones = 21
21 has one two and one 1 = 1211

*/

lookAndSay(15);

function lookAndSay(duration){
    let count = 0,
        chr = '', 
        outstr = '',
        str = '1';

    console.log(str);
    for(let iters=0, cc; iters<duration; iters++){
        count = 0;
        outstr = '';
        for(let i=0, l=str.length,nc; i<l-1; i++){
            cc = str.charAt(i);
            nc = str.charAt(i+1);

            count++;
            if(cc !== nc){
                outstr += count + cc;
                count = 0;
            }
        }
        count++;
        outstr += count + str.charAt(str.length-1); 
        console.log(outstr);
        str = outstr;
    }
}
