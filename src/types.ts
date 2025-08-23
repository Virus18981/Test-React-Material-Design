export type DepartmentId = number;

export interface Department {
  id: DepartmentId;
  name: string;
}

export type EmployeeId = number;

export interface Employee {
  id?: EmployeeId;
  firstName: string;
  lastName: string;
  position: string;
  employmentDate: Date;
  mentorId?: EmployeeId;
  department: DepartmentId;
}
