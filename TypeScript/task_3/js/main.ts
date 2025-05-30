import { RowID, RowElement } from "./interface";
import * as CRUD from "./crud";

const row: RowElement = {
  firstName: "Gerard",
  lastName: "Cirano",
};

const newRowID: RowID = CRUD.insertRow(row);
console.log(`Inserted Row ID: ${newRowID}`);

const updatedRow: RowElement = { 
  ...row, 
  age: 23 
};

CRUD.updateRow(newRowID, updatedRow);

CRUD.deleteRow(newRowID);