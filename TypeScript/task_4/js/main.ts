const teacher: Subjects.Teacher = {
  firstName: "Gerard",
  lastName: "Cirano",
  experienceTeachingC: 10,
  experienceTeachingJava: 5,
  experienceTeachingReact: 2,
};

const cpp = new Subjects.Cpp();
const java = new Subjects.Java();
const react = new Subjects.React();

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
