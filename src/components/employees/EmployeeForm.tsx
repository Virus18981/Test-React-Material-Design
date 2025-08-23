import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Box } from "@mui/material";
import type { Employee, Department } from "../../types";

interface EmployeeFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Employee>) => void;
  editingEmployee: Employee | null;
  employees: Employee[];
  departments: Department[];
  formData: Partial<Employee>;
  onFormDataChange: (field: keyof Employee, value: any) => void;
}

export const EmployeeForm = ({ open, onClose, onSubmit, editingEmployee, employees, departments, formData, onFormDataChange }: EmployeeFormProps) => {
  const handleInputChange = (field: keyof Employee) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onFormDataChange(field, field === "employmentDate" ? new Date(value) : value);
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{editingEmployee ? "Редактирование сотрудника" : "Добавление сотрудника"}</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="Имя" value={formData.firstName || ""} onChange={handleInputChange("firstName")} fullWidth required />
          <TextField label="Фамилия" value={formData.lastName || ""} onChange={handleInputChange("lastName")} fullWidth required />
          <TextField label="Должность" value={formData.position || ""} onChange={handleInputChange("position")} fullWidth required />
          <TextField
            label="Дата приёма на работу"
            type="date"
            value={formData.employmentDate ? (formData.employmentDate as Date).toISOString().split("T")[0] : ""}
            onChange={handleInputChange("employmentDate")}
            InputLabelProps={{ shrink: true }}
            fullWidth
            required
          />
          <TextField select label="Отдел" value={formData.department || ""} onChange={handleInputChange("department")} fullWidth required>
            {departments.map((dept) => (
              <MenuItem key={dept.id} value={dept.id}>
                {dept.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField select label="Наставник" value={formData.mentorId || ""} onChange={handleInputChange("mentorId")} fullWidth>
            <MenuItem value="">Нет наставника</MenuItem>
            {employees
              .filter((emp) => emp.id !== editingEmployee?.id)
              .map((emp) => (
                <MenuItem key={emp.id} value={emp.id}>
                  {emp.firstName} {emp.lastName}
                </MenuItem>
              ))}
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleSubmit} variant="contained">
          {editingEmployee ? "Сохранить" : "Добавить"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
