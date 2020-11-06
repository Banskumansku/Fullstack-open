console.log("This works");
const mass = Number(process.argv[2]);
const height = Number(process.argv[3]);

console.log("BMI of", (mass/Math.pow(height/100, 2)));

if ((mass/Math.pow(height/100, 2)) < 18.5) {
    console.log("underweight");
} else if ((mass/Math.pow(height/100, 2)) < 25) {
    console.log("normal");
} else {
    console.log("Overweight");
}

console.log(process.argv);