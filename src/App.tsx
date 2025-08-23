import { useState } from 'react';
import { Container } from '@mui/material';
import {
  CustomAppBar,
  EmployeeToolbar,
  EmployeeTable,
  EmployeeForm,
  DeleteDialog
} from './components';
import type { Employee, Department } from './types';
import {mockDepartments, mockEmployees} from './data';

const App = () => {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [departments] = useState<Department[]>(mockDepartments);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
  const [formData, setFormData] = useState<Partial<Employee>>({
    firstName: '',
    lastName: '',
    position: '',
    employmentDate: new Date(),
    department: 1
  });

  const handleOpenDialog = (employee?: Employee) => {
    if (employee) {
      setEditingEmployee(employee);
      setFormData(employee);
    } else {
      setEditingEmployee(null);
      setFormData({
        firstName: '',
        lastName: '',
        position: '',
        employmentDate: new Date(),
        department: 1
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingEmployee(null);
  };

  const handleFormDataChange = (field: keyof Employee, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (data: Partial<Employee>) => {
    if (!data.firstName || !data.lastName || !data.position || !data.department) {
      alert('Заполните все обязательные поля');
      return;
    }

    if (editingEmployee && editingEmployee.id) {
      setEmployees(prev => prev.map(emp =>
        emp.id === editingEmployee.id ? { ...data, id: editingEmployee.id } as Employee : emp
      ));
    } else {
      const newEmployee: Employee = {
        ...data as Required<Omit<Employee, 'id' | 'mentorId'>>,
        id: Math.max(...employees.map(e => e.id || 0), 0) + 1
      };
      setEmployees(prev => [...prev, newEmployee]);
    }
    handleCloseDialog();
  };

  const handleDeleteClick = (employee: Employee) => {
    setEmployeeToDelete(employee);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (employeeToDelete) {
      setEmployees(prev => prev.filter(emp => emp.id !== employeeToDelete.id));
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
      
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <EmployeeToolbar onAddEmployee={() => handleOpenDialog()} />
        
        <EmployeeTable
          employees={employees}
          departments={departments}
          onEdit={handleOpenDialog}
          onDelete={handleDeleteClick}
        />

        <EmployeeForm
          open={dialogOpen}
          onClose={handleCloseDialog}
          onSubmit={handleSubmit}
          editingEmployee={editingEmployee}
          employees={employees}
          departments={departments}
          formData={formData}
          onFormDataChange={handleFormDataChange}
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