var teacher = {
    firstName: "Gerard",
    lastName: "Cirano",
    experienceTeachingC: 10,
    experienceTeachingJava: 5,
    experienceTeachingReact: 2,
};
var cpp = new Subjects.Cpp();
var java = new Subjects.Java();
var react = new Subjects.React();
cpp.setTeacher(teacher);
java.setTeacher(teacher);
react.setTeacher(teacher);
console.log("C++");
console.log(cpp.getRequirements());
console.log(cpp.getAvailableTeacher());
console.log("\nJava");
console.log(java.getRequirements());
console.log(java.getAvailableTeacher());
console.log("\nReact");
console.log(react.getRequirements());
console.log(react.getAvailableTeacher());
//# sourceMappingURL=main.js.map