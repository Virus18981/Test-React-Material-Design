import { useState } from "react";
import { Container, Box } from "@mui/material";
import { CustomAppBar, EmployeeToolbar, EmployeeTable, EmployeeForm, DeleteDialog } from "./components";
import type { Employee, Department } from "./types";
import { mockDepartments, mockEmployees } from "./data";
import type { ValidationErrors } from "./utils/validation";
import { validateEmployeeForm, hasValidationErrors } from "./utils/validation";

const App = () => {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [departments] = useState<Department[]>(mockDepartments);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
  const [formData, setFormData] = useState<Partial<Employee>>({
    firstName: "",
    lastName: "",
    position: "",
    employmentDate: new Date(),
    department: 1,
  });
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateForm = (data: Partial<Employee>): boolean => {
    const newErrors = validateEmployeeForm(data);
    setErrors(newErrors);
    return !hasValidationErrors(newErrors);
  };

  const handleOpenDialog = (employee?: Employee) => {
    if (employee) {
      setEditingEmployee(employee);
      setFormData(employee);
    } else {
      setEditingEmployee(null);
      setFormData({
        firstName: "",
        lastName: "",
        position: "",
        employmentDate: new Date(),
        department: 1,
      });
    }
    setDialogOpen(true);
    setErrors({});
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingEmployee(null);
    setErrors({});
  };
const handleFormDataChange = (field: keyof Employee, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field in errors && errors[field as keyof ValidationErrors]) {
    setErrors((prev) => ({ ...prev, [field]: false }));
  }
  };

  const handleSubmit = (data: Partial<Employee>) => {
    if (!validateForm(data)) return;

    const employeeData = {
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      position: data.position || "",
      department: data.department || 1,
      employmentDate: data.employmentDate instanceof Date ? data.employmentDate : new Date(data.employmentDate || new Date()),
      mentorId: data.mentorId,
    };

    if (editingEmployee?.id) {
      const updatedEmployee: Employee = {
        ...employeeData,
        id: editingEmployee.id,
      };
      setEmployees((prev) => prev.map((emp) => (emp.id === editingEmployee.id ? updatedEmployee : emp)));
    } else {
      const newId =
        employees.reduce((maxId, employee) => {
          return employee.id !== undefined && employee.id > maxId ? employee.id : maxId;
        }, 0) + 1;
      const newEmployee: Employee = {
        ...employeeData,
        id: newId,
      };
      setEmployees((prev) => [...prev, newEmployee]);
    }

    handleCloseDialog();
  };

  const handleDeleteClick = (employee: Employee) => {
    setEmployeeToDelete(employee);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (employeeToDelete) {
      setEmployees((prev) => prev.filter((emp) => emp.id !== employeeToDelete.id));
      setDeleteDialogOpen(false);
      setEmployeeToDelete(null);
    }
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setEmployeeToDelete(null);
  };

    return (
    <>
      <CustomAppBar title="Управление сотрудниками" />

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, height: "80vh", display: "flex", flexDirection: "column" }}>
        <EmployeeToolbar onAddEmployee={() => handleOpenDialog()} />
          
        <Box sx={{ flexGrow: 1, overflow: "auto" }}>
          <EmployeeTable employees={employees} departments={departments} onEdit={handleOpenDialog} onDelete={handleDeleteClick} />
        </Box>

        <EmployeeForm
          open={dialogOpen}
          onClose={handleCloseDialog}
          onSubmit={handleSubmit}
          editingEmployee={editingEmployee}
          employees={employees}
          departments={departments}
          formData={formData}
          onFormDataChange={handleFormDataChange}
          errors={errors}
        />

        <DeleteDialog
          open={deleteDialogOpen}
          onClose={handleCloseDeleteDialog}
          onConfirm={handleConfirmDelete}
          title="Удаление сотрудника"
          itemName={`${employeeToDelete?.firstName} ${employeeToDelete?.lastName}`}
        />
      </Container>
    </>
  );
};

export default App;