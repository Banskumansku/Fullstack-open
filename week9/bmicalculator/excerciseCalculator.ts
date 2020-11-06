

const { [0]: _command, [1]: _command2, [2]: target, ...excersices } = process.argv;

const a = _command;
const b = _command2;

a + b;

//console.log(excersices.map(a => a))

const numberex = Object.values(excersices).map(a => Number(a));



const trainingAmount = numberex.filter(ex => ex > 0);

const sum = trainingAmount.reduce((a, b) => a + b, 0);
const ave = sum / trainingAmount.length;

let success: boolean;
let rating: number;
let ratingText: string;

if (ave > Number(target)) {
    success = true;
} else {
    success = false;
}

if (success) {
    if (Math.round((ave - Number(target))) > 1) {
        rating = 2;
        ratingText = "Very good";
    } else {
        rating = 1;
        ratingText = "okay";
    }
} else {
    rating = 0;
    ratingText = "eh";
}


console.log({
    periodLength: numberex.length,
    trainingDays: trainingAmount.length,
    success: success,
    rating: rating,
    ratingDescription: ratingText,
    target: target,
    average: ave
});
/*{ periodLength: 7,
    trainingDays: 5,
    success: false,
    rating: 2,
    ratingDescription: 'not too bad but could be better',
    target: 2,
    average: 1.9285714285714286 }*/