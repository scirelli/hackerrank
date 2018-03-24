/*
A company is partnering with the linguistics department at a local university to analyze important works of
English literature and identify patterns in word usage across different eras. To ensure a cleaner output,
the linguistics department has provided a list of commonly used words (e.g. "an", "the", etc.) to exclude from the
analysis. In the context of this search, a word is an alphabetic sequence of characters having no whitespace or punctuation.

Write an algorithm to find the most frequently used word in the text excluding the commonly used words.

Input
The input to the function/method consists of two arguments -
literatureText, a string representing the block of text;
wordsToExclude, a list of strings representing the commonly used words to be excluded while analyzing the 
word frequency.

Output
Return a list of strings representing the most frequently used word in the text or in case of a tie, all of the most
frequently used words in the text.

Note
Words that have a different case are counted as the same word.
The order of words does not matter in the output list.
All words in the wordsToExclude list are unique.
Punctuation should be treated as white space.

Example
Input:
literatureText = "Jack and Jill went to the market to buy bread and cheese. Cheese is Jack's and Jill's favorite food."
wordsToExclude= ["and", "he", "the", "to", "is", "Jack", "Jill"]

Output
["cheese", "s"]

Explanation:
The word "and" has a maximum of three frequency but this word should be excluded while analyzing the word frequency.

*/

function retrieveMostFrequentlyUsedWords(literatureText, wordsToExclude){
    var wordsToExcludeMap = {},
        freq = {};

    wordsToExclude.forEach(function(w){
        wordsToExcludeMap[w.toLowerCase()] = true;
    });

    literatureText
    .split(/[^a-zA-Z]/)
    .map(function(w){
        return w.toLowerCase();
    })
    .forEach(function(w) {
        if(!wordsToExcludeMap[w]){
            if(freq[w]){
                freq[w] += 1;
            }else{
                freq[w] = 1;
            }
        }
    });

    var largestFreq = [];

    for(var i=0, words=Object.getOwnPropertyNames(freq), l=words.length, cnt=0,maxf=0,word; i<l; i++){
        word = words[i];
        cnt = freq[word];

        if(cnt > maxf){
            largestFreq = [word];
            maxf = cnt;
        }else if(cnt === maxf){
            largestFreq.push(word);
        }
    }

    largestFreq = largestFreq.filter(function(w){
        return w !== '';
    });

    return largestFreq;
}


var inputTxt = 'Jack and Jill went to the market to buy bread and cheese. Cheese is Jack\'s and Jill\'s favorite food.',
    ignoreWords = ["and", "he", "the", "to", "is", "Jack", "Jill"],
    result;


result = retrieveMostFrequentlyUsedWords(inputTxt, ignoreWords);
console.log(result);
