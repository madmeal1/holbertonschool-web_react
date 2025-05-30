interface Teacher {
    readonly firstName: string;
    readonly lastName: string;
    fullTimeEmployee: boolean;
    yearsOfExperience?: number;
    location: string;
    [key: string]: any;
  }
  
  interface Directors extends Teacher {
    numberOfReports: number;
  }
  
  interface printTeacherFunction {
    (firstName: string, lastName: string): string;
  }
  
  const printTeacher: printTeacherFunction = (firstName, lastName) => {
    return `${firstName.charAt(0)}. ${lastName}`;
  };
  
  interface StudentConstructor {
    new (firstName: string, lastName: string): StudentClass;
  }
  
  interface StudentClass {
    workOnHomework(): string;
    displayName(): string;
  }
  
  class Student implements StudentClass {
    firstName: string;
    lastName: string;
  
    constructor(firstName: string, lastName: string) {
      this.firstName = firstName;
      this.lastName = lastName;
    }
  
    workOnHomework(): string {
      return "Currently working";
    }
  
    displayName(): string {
      return this.firstName;
    }
  }
  
  const teacher3: Teacher = {
    firstName: 'Sylvain',
    lastName: 'Levy',
    fullTimeEmployee: false,
    location: 'Paris',
    contract: false,
  };
  
  console.log(teacher3);
  
  const director1: Directors = {
    firstName: 'Pierre',
    lastName: 'Chabrier',
    fullTimeEmployee: true,
    location: 'Paris',
    numberOfReports: 17,
  };
  
  console.log(director1);
  
  console.log(printTeacher("Sylvain", "Levy"));
  
  const student1 = new Student("Brad", "Bitt");
  console.log(student1.displayName());
  console.log(student1.workOnHomework());
