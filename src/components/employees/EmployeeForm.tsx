import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Box } from "@mui/material";
import type { Employee, Department } from "../../types";
import type { ValidationErrors } from "../../utils/validation";
import { getValidationErrorText } from "../../utils/validation";

interface EmployeeFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Employee>) => void;
  editingEmployee: Employee | null;
  employees: Employee[];
  departments: Department[];
  formData: Partial<Employee>;
  onFormDataChange: (field: keyof Employee, value: any) => void;
  errors: ValidationErrors;
}

export const EmployeeForm = ({ open, onClose, onSubmit, editingEmployee, employees, departments, formData, onFormDataChange, errors }: EmployeeFormProps) => {
  const handleInputChange = (field: keyof Employee) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (field === "employmentDate") {
      const dateValue = value ? new Date(value) : new Date();
      onFormDataChange(field, dateValue);
    } else {
      onFormDataChange(field, value);
    }
  };

  const getDateValue = (date: Date | string | undefined | null): string => {
    if (!date) return "";

    try {
      const dateObj = typeof date === "string" ? new Date(date) : date;

      if (isNaN(dateObj.getTime())) return "";

      return dateObj.toISOString().split("T")[0];
    } catch (error) {
      return "";
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{editingEmployee ? "Редактирование сотрудника" : "Добавление сотрудника"}</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Имя"
            value={formData.firstName || ""}
            onChange={handleInputChange("firstName")}
            fullWidth
            required
            error={errors.firstName}
            helperText={errors.firstName ? getValidationErrorText("firstName") : ""}
          />
          <TextField
            label="Фамилия"
            value={formData.lastName || ""}
            onChange={handleInputChange("lastName")}
            fullWidth
            required
            error={errors.lastName}
            helperText={errors.lastName ? getValidationErrorText("lastName") : ""}
          />
          <TextField
            label="Должность"
            value={formData.position || ""}
            onChange={handleInputChange("position")}
            fullWidth
            required
            error={errors.position}
            helperText={errors.position ? getValidationErrorText("position") : ""}
          />
          <TextField
            label="Дата приёма на работу"
            type="date"
            value={getDateValue(formData.employmentDate)}
            onChange={handleInputChange("employmentDate")}
            InputLabelProps={{ shrink: true }}
            fullWidth
            required
            onKeyDown={(e) => {
              if (e.key === "Backspace" || e.key === "Delete") {
                e.preventDefault();
                onFormDataChange("employmentDate", new Date());
              }
            }}
            error={errors.employmentDate}
            helperText={errors.employmentDate ? getValidationErrorText("employmentDate") : ""}
          />
          <TextField
            select
            label="Отдел"
            value={formData.department || ""}
            onChange={handleInputChange("department")}
            fullWidth
            required
            error={errors.department}
            helperText={errors.department ? getValidationErrorText("department") : ""}
          >
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
