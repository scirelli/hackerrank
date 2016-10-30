function processData(input) {
    if(!input || input.length < 26){
        console.log('not pangram');
        return false;   
    }

    var freq = new Array(26),
        a = 'a'.charCodeAt(0);
    input = input.toLowerCase();
    for(var i=0, l=freq.length; i<l; i++) freq[i]=0;
    
    for(var i=0, l=input.length,c=-1; i<l; i++){
        c = input.charCodeAt(i) - a;
        if(c >= 0 && c <26 ){
            freq[c]++;
        }
    }
    
    for(var i=0, l=freq.length; i<l; i++) {
        if(freq[i] == 0){
            console.log('not pangram');
            return false;
        }
    }

    console.log('pangram');
    return true;
}

processData("We promptly judged antique ivory buckles for the next prize");
