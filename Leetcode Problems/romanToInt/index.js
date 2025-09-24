/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    const romanNumbers = 
    {   
        "I" : 1,
        "V" : 5,
        "X" : 10,
        "L" : 50,
        "C" : 100,
        "D" : 500,
        "M" : 1000
    }

    let total = 0;

    for (let i = 0; i < s.length; i++)  {
        let currentNumber = romanNumbers[s[i]];
        let nextNumber = romanNumbers[s[i + 1]];

        if (nextNumber > currentNumber)
            total = total - currentNumber;

        else{
            total = total + currentNumber;
        }
    }

    return total;
}
