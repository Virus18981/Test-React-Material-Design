import type { Employee, Department } from "./types";

export const mockDepartments: Department[] = [
  { id: 1, name: 'IT отдел' },
  { id: 2, name: 'Отдел продаж' },
  { id: 3, name: 'Бухгалтерия' }
];

export const mockEmployees: Employee[] = [
 {
    id: 1,
    firstName: 'Иван',
    lastName: 'Салтыков',
    position: 'Frontend-разработчик',
    employmentDate: new Date('2025-08-20'),
    department: 1,
    mentorId: 3
  },
  {
    id: 2,
    firstName: 'Елена',
    lastName: 'Петрова',
    position: 'Frontend-разработчик',
    employmentDate: new Date('2023-03-10'),
    department: 1,
    mentorId: 1
  },
  {
    id: 3,
    firstName: 'Алексей',
    lastName: 'Иванов',
    position: 'Team Lead',
    employmentDate: new Date('2020-05-20'),
    department: 1,
    mentorId: undefined
  },
  {
    id: 4,
    firstName: 'Мария',
    lastName: 'Сидорова',
    position: 'Менеджер проектов',
    employmentDate: new Date('2021-08-12'),
    department: 2,
    mentorId: 5
  },
  {
    id: 5,
    firstName: 'Дмитрий',
    lastName: 'Козлов',
    position: 'Руководитель отдела продаж',
    employmentDate: new Date('2019-11-05'),
    department: 2,
    mentorId: undefined
  },
  {
    id: 6,
    firstName: 'Ольга',
    lastName: 'Фёдорова',
    position: 'Бухгалтер',
    employmentDate: new Date('2022-09-30'),
    department: 3,
    mentorId: 7
  },
  {
    id: 7,
    firstName: 'Сергей',
    lastName: 'Николаев',
    position: 'Главный бухгалтер',
    employmentDate: new Date('2018-02-14'),
    department: 3,
    mentorId: undefined
  },
  {
    id: 8,
    firstName: 'Павел',
    lastName: 'Орлов',
    position: 'HR-менеджер',
    employmentDate: new Date('2020-07-22'),
    department: 4,
    mentorId: undefined
  }
];