import { Component, OnInit } from '@angular/core';
interface Employee {
  EmployeeId: number;
  EmployeeNumber: string;
  FirstName: string;
  LastName: string;
  Birthday: string;
  Gender: string;
  Picture: string;
}
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
 
 
  employees: Employee[] = [
    {
      EmployeeId: 1,
      EmployeeNumber: 'EMP001',
      FirstName: 'Sage',
      LastName: 'Gornez',
      Birthday: '2003-02-19',
      Gender: 'Male',
      Picture: 'https://example.com/sage.jpg'
    },
    {
      EmployeeId: 2,
      EmployeeNumber: 'EMP002',
      FirstName: 'Michael',
      LastName: 'San Jose',
      Birthday: '1999-05-02',
      Gender: 'Male',
      Picture: 'https://example.com/michael.jpg'
    }
  ];

  editMode = false;
  showEditForm = false;
  showEmployeeList = false;
  editEmployeeData: Employee = {
    EmployeeId: 0,
    EmployeeNumber: '',
    FirstName: '',
    LastName: '',
    Birthday: '',
    Gender: '',
    Picture: ''
  };

  employeeIdError = '';
  birthdayError = '';

  ngOnInit(): void {
    
  }

  toggleEmployeeList() {
    this.showEmployeeList = !this.showEmployeeList;
  }

  addEmployee() {
    this.editMode = false;
    this.showEditForm = true;
    this.editEmployeeData = {
      EmployeeId: 0,
      EmployeeNumber: '',
      FirstName: '',
      LastName: '',
      Birthday: '',
      Gender: '',
      Picture: ''
    };
  }

  editEmployee(employee: Employee) {
    this.editMode = true;
    this.showEditForm = true;
    this.editEmployeeData = { ...employee };
  }

  saveEmployee() {
    if (!this.validateEmployeeId()) {
      return;
    }

    if (!this.validateBirthday()) {
      return;
    }

    if (this.editMode) {
      const index = this.employees.findIndex(e => e.EmployeeId === this.editEmployeeData.EmployeeId);
      if (index !== -1) {
        this.employees[index] = { ...this.editEmployeeData };
      }
    } else {
      this.employees.push({ ...this.editEmployeeData });
    }

    this.showEditForm = false;
  }

  cancelEdit() {
    this.showEditForm = false;
  }

  private validateEmployeeId(): boolean {
    const employeeId = this.editEmployeeData.EmployeeId;
    if (!Number.isInteger(employeeId)) {
      this.employeeIdError = 'Employee ID must be an integer.';
      return false;
    }

    if (this.employees.some(e => e.EmployeeId === employeeId && e.EmployeeId !== this.editEmployeeData.EmployeeId)) {
      this.employeeIdError = 'Employee ID must be unique.';
      return false;
    }

    this.employeeIdError = '';
    return true;
  }

  private validateBirthday(): boolean {
    const birthday = new Date(this.editEmployeeData.Birthday);
    if (isNaN(birthday.getTime())) {
      this.birthdayError = 'Invalid birthday date.';
      return false;
    }

    this.birthdayError = '';
    return true;
  }
}