/*
You have been given a task of reordering some data from a log file. Every line in the log file is a space delimited
list of strings and all lines begin with an identifier that is alphanumeric. After the identifier, a line will
consist of either a list of words using only English letters or only a list of integers. There will be no lines that
consist of only an identifier.

Your task is to reorder the data from the log file such that all the lines with words are at the top in the log file,
in lexicographical order. Words are ordered lexicographically ignoring the identifier except in the case of ties. In the case
of ties (if there are two lines that are identical except for the identifier), the identifier is use to order
lexicographically. Alphanumerics should be sorted in ASCII order (numbers come before letters). The identifiers must
still be part of the lines in the output Strings. Lines with integers do not need to be sorted relative to other lines with integers.

Write an algorithm to reorder the data in the log file.

Input
The input to the function/method consist of two arguments -
logFileSize - an integer representing the number of lines in the log file;
logLines, a list of strings representing the log file.

Output
Return a list of strings representing the reordered log file data.

Note
Identifier consists of only english letters and numbers.
The lines with words are not required to match case and the sort needs to be case insensitive.

Example
Input:
logFileSize = 5
logLines =
[a1 9 2 3 1]
[g1 Act car]
[zo4 4 7]
[ab1 off KEY dog]
[a8 act zoo]

Output:
[g1 Act car]
[a8 act zoo]
[ab1 off KEY dog]
[a1 9 2 3 1]
[zo4 4 7]
*/

Array.prototype.shuffle = function shuffle() {
    var j, x, i, a =this;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function reorderLines(logFileSize, logfile){
    var ID = 0,
        words = [],
        numeric = [];
    
    logfile.map(function(line){
            return line.split(' ');
        })
        .map(function(aItms){
            if( isNaN(parseInt(aItms[1]))){
                words.push(aItms);
            }else{
                numeric.push(aItms.join(' '));
            }
        });

    for(var i=0, l=words.length, tmp, line; i<l; i++){
        line = words[i];
        tmp = line.shift();

        words[i] = {id: tmp, line:line.join(' ')};
    }

    words = words.sort(function(a,b){
        if(a.line > b.line) return 1;
        if(a.line < b.line) return -1;

        if(a.id > b.id) return 1;
        if(a.id < b.id) return -1;
        return 0;
    }).map(function(obj){
        return obj.id + ' ' + obj.line;
    });

    return words.concat(numeric);
}

var input1 = [
        'a1 alps cow bar',
        'wz3 34 54 398',
        'x4 45 21 7',
        'mi2 jog mid pet',
    ],
    input2 = [
        't2 13 121 98',
        'br8 eat nim did',
        'b4 xi me nu',
        'f3 52 54 31',
        'w1 has uni gry',
        'r1 box ape bit'
    ];

console.log(reorderLines(5, input2).join('\n'));
