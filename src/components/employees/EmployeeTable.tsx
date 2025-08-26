import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Chip, Typography } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import type { Employee, Department } from "../../types";

interface EmployeeTableProps {
  employees: Employee[];
  departments: Department[];
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

export const EmployeeTable = ({ employees, departments, onEdit, onDelete }: EmployeeTableProps) => {
  const getDepartmentName = (departmentId: number) => {
    const department = departments.find((dept) => dept.id === departmentId);
    return department ? department.name : "Неизвестно";
  };

  const getMentorName = (mentorId?: number) => {
    if (!mentorId) return "Нет наставника";
    const mentor = employees.find((emp) => emp.id === mentorId);
    return mentor ? `${mentor.firstName} ${mentor.lastName}` : "Неизвестно";
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("ru-RU");
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ФИО</TableCell>
            <TableCell>Должность</TableCell>
            <TableCell>Дата приёма</TableCell>
            <TableCell>Отдел</TableCell>
            <TableCell>Наставник</TableCell>
            <TableCell align="center">Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id} hover>
              <TableCell>
                <Typography variant="subtitle1">
                  {employee.firstName} {employee.lastName}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip label={employee.position} variant="outlined" />
              </TableCell>
              <TableCell>{formatDate(employee.employmentDate)}</TableCell>
              <TableCell>{getDepartmentName(employee.department)}</TableCell>
              <TableCell>{getMentorName(employee.mentorId)}</TableCell>
              <TableCell align="center">
                <IconButton color="primary" onClick={() => onEdit(employee)} sx={{ mr: 1 }}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => onDelete(employee)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
