function sumMajorCredits(subject1, subject2) {
    return { credits: subject1.credits + subject2.credits, brand: "MajorCredits" };
}
function sumMinorCredits(subject1, subject2) {
    return { credits: subject1.credits + subject2.credits, brand: "MinorCredits" };
}
var major1 = { credits: 3, brand: "MajorCredits" };
var major2 = { credits: 4, brand: "MajorCredits" };
var minor1 = { credits: 2, brand: "MinorCredits" };
var minor2 = { credits: 1, brand: "MinorCredits" };
console.log(sumMajorCredits(major1, major2));
console.log(sumMinorCredits(minor1, minor2));
//# sourceMappingURL=main.js.map