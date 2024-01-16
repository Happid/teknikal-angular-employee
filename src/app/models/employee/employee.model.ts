export class ListEmployees {
  id?: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  birthDate?: string;
  basicSalary?: number;
  status?: string;
  group?: string;
  description?: string;
}

export class Employee {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  group: string;
  status: string;
  basicSalary: number;
  description: string;

  constructor(
    id: number,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    birthDate: string,
    group: string,
    status: string,
    basicSalary: number,
    description: string
  ) {
    this.id = id;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.birthDate = birthDate;
    this.group = group;
    this.status = status;
    this.basicSalary = basicSalary;
    this.description = description;
  }
}

export interface ListEmployee {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  group: string;
  status: string;
  basicSalary: number;
  description: string;
}
