function quickSort(arr) {
    let left = [], equal = [], right = [],
        pivot = arr[0];
    
    arr.forEach((itm)=>{
        if(itm > pivot){
            right.push(itm);
        }else if(itm < pivot){
            left.push(itm);
        }else{
            equal.push(itm);
        }
    });

    return left.concat(equal, right);
}


function quickSort(input) {
    let left = [],
        right = [],
        pivot = input[0];
    
    if(!input || input && input.length === 0) return [];
    if(input.length <= 1) return input;

    for(let i=1, l=input.length, itm; i<l; i++){
        itm = input[i];

        if(itm > pivot) {
            right.push(itm);
        }else if(itm <= pivot) {
            left.push(itm);
        }
    }
    
    left = quickSort(left);
    right = quickSort(right);

    left.push(pivot);
    rtn = left.concat(right);

    console.log(rtn.join(' '));
    return rtn;
}

function processData(input) {
    input = input.split('\n')[1].split(' ').map(Number);
    quickSort(input);
} 

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
