#!/usr/bin/env node

function oneEditApart(str1, str2){
    let tmp;

    if(Math.abs(str1.length - str2.length) > 1 ){
        return false;
    }
    if(str1 == str2) return true;
    
    str1 = str1.split('');
    str2 = str2.split('');
        
    if(str2.length < str1.length){
        tmp = str1;
        str1 = str2;
        str2 = tmp;
    }
    
    //Add/Remove from end
    str1.push(str2[str2.length-1]);
    if(same(str1,str2)) return true;
    str1.pop();
    
    for(let i=0, l=str1.length; i<l; i++){
        if(str1[i] === str2[i]) continue; 

        //insert
        str1.splice(i, 0, str2[i]);        
        if(same(str1, str2)) return true;
        str1.splice(i, 1); 

        //replace
        tmp = str1[i];
        str1[i] = str2[i];
        if(same(str1, str2)) return true;
        str1[i] = tmp;

        //remove
        tmp = str2.splice(i,1);
        if(same(str1, str2)) return true;
        str2.splice(i, 0, tmp[0]);
    }

    return false;

    function same(str1, str2){
        if(str1.join('') === str2.join('')) return true;
        return false;
    }
}

console.log(oneEditApart("cat", "dog"));
console.log(oneEditApart("cat", "cats"));
console.log(oneEditApart("cat", "cut"));
console.log(oneEditApart("cat", "cast"));
console.log(oneEditApart("cat", "at"));
console.log(oneEditApart("cat", "act"));
