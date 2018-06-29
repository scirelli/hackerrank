#!/usr/bin/env node
/*
    Find the pattern and complete the function: 
        int[][] spiral(int n);
    where n is the size of the 2D array.

    Sample Result:

        input = 3
            123
            894
            765

        input = 4
            01 02 03 04
            12 13 14 05
            11 16 15 06
            10 09 08 07

        input = 8
            1 2 3 4 5 6 7 8
            28 29 30 31 32 33 34 9
            27 48 49 50 51 52 35 10
            26 47 60 61 62 53 36 11
            25 46 59 64 63 54 37 12
            24 45 58 57 56 55 38 13
            23 44 43 42 41 40 39 14
            22 21 20 19 18 17 16 15
 */
function spiral(n){
    let array = new Array(n*n);
    array.fill(0);

    return _spiral(array, {x:0, y:0, count:0}, n);
}

function _spiral(array, state, WIDTH){
    right(array, state, WIDTH);
    state.y++;
    down(array, state, WIDTH);
    state.x--;
    left(array, state, WIDTH);
    state.y--;
    up(array, state, WIDTH);
    state.x++;

    if(state.count < WIDTH*WIDTH){
        _spiral(array, state, WIDTH);
    }
    
    return array;
}

function right(array, state, WIDTH){
    let curPos = xyToIndex(state.x, state.y, WIDTH);
        
    if(state.x >= WIDTH){ 
        state.x = WIDTH -1;
        return;
    }

    if(array[curPos] !== 0){ 
        state.x--;
        return;
    }

    array[curPos] = ++state.count;
    state.x++;
    right(array, state, WIDTH);
}

function down(array, state,  WIDTH){
    let curPos = xyToIndex(state.x, state.y, WIDTH);

    if(state.y >= WIDTH){
        state.y = WIDTH - 1;
        return;
    }

    if(array[curPos] !== 0){
        state.y--;
        return;
    }

    array[curPos] = ++state.count;
    state.y++;
    down(array, state, WIDTH);
}

function left(array, state, WIDTH){
    let curPos = xyToIndex(state.x, state.y, WIDTH);

    if(state.x < 0){
        state.x = 0;
        return;
    }

    if(array[curPos] !== 0){
        state.x++;
        return;
    }

    array[curPos] = ++state.count;
    state.x--;
    left(array, state, WIDTH);
}

function up(array, state, WIDTH){
    let curPos = xyToIndex(state.x, state.y, WIDTH);

    if(state.y < 0){
        state.y = 0;
        return;
    }

    if(array[curPos] !== 0){
        state.y++;
        return;
    }

    array[curPos] = ++state.count;
    state.y--;
    up(array, state, WIDTH);
}

print(spiral(3), 3);
print(spiral(4), 4);
print(spiral(8), 8);
print(spiral(1), 1);


function xyToIndex(x, y, width){
    return y*width + x;
}

function print(array, WIDTH){
    let str = '';
    for(let y=0; y<WIDTH; y++){
        for(let x=0; x<WIDTH; x++){
            str += array[xyToIndex(x,y, WIDTH)] + ' ';
        }
        console.log(str);
        str = '';
    }
    console.log('');
}
