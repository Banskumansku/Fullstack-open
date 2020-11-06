class Calculator {
    bmi(weight: number, height: number): string {
        if ((weight / Math.pow(height / 100, 2)) < 18.5) {
            return "Underweight";
        } else if ((weight / Math.pow(height / 100, 2)) < 25) {
            return "Normal (healthy weight)";
        } else {
            return "Overweight";
        }
    }
}
export { Calculator };
