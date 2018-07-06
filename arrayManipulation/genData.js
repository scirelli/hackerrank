#!/usr/bin/env node

const fs = require('fs');

function main(){
    const ws = fs.createWriteStream('sample.txt');
    let output = new Array(3),
        sizeOfArray = Math.randRange(3, Math.pow(10,7)),
        mLines = Math.randRange(1, 2*Math.pow(10, 5));

    ws.write(sizeOfArray + ' ' + mLines + '\n');
    for(let i=0,a,b,k; i<mLines; i++){
        b = Math.randRange(1, sizeOfArray);
        a = Math.randRange(1, b);
        k = Math.randRange(0, Math.pow(10, 9));
        ws.write(a + ' ' + b + ' ' + k + '\n');
    }
}

Math.randRange = function(min, max){
    return ~~(Math.random()*((max+1)-min) + min);
}

main();
