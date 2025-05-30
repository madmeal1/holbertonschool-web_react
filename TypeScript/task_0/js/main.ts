interface Student {
    firstName: string;
    lastName: string;
    age: number;
    location: string;
}

const studentsList: Student[] = [
    { firstName: 'Brad', lastName: 'Pitt', age: 61, location: 'NYC' },
    { firstName: 'Anne', lastName: 'Pitt', age: 53, location: 'Paris' }
];

function createTable(students: Student[]): void {
    const table = document.createElement('table');
    table.style.borderCollapse = 'collapse';
    table.style.width = '50%';
    table.style.margin = '20px auto';
    table.style.textAlign = 'left';

    const headerRow = table.insertRow();
    ['First Name', 'Location'].forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        th.style.border = '1px solid black';
        th.style.padding = '8px';
        headerRow.appendChild(th);
    });

    students.forEach(student => {
        const row = table.insertRow();
        const td1 = row.insertCell();
        const td2 = row.insertCell();

        td1.textContent = student.firstName;
        td2.textContent = student.location;

        [td1, td2].forEach(td => {
            td.style.border = '1px solid black';
            td.style.padding = '8px';
        });
    });

    document.body.appendChild(table);
}

createTable(studentsList);
