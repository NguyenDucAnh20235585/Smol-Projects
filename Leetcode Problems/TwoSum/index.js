function two_sum(numbers, target) {

    for(let i = 0; i < numbers.length; i++) {
        for(let j = i + 1; j < numbers.length; j++){
            if (numbers[i] + numbers[j] === target) {
                return [i, j];
            }
        }
    }

    throw new Error("Nothing can found the target.")
}



console.log(two_sum([2, 7, 11, 15], 9)); // [0,1]
console.log(two_sum([3, 2, 4], 6));      // [1,2]
console.log(two_sum([3, 3], 6));         // [0,1]
console.log(two_sum([3, 2, 19, 27], 42));