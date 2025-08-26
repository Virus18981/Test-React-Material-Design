import type { Employee } from "../types";

export interface ValidationErrors {
  firstName?: boolean;
  lastName?: boolean;
  position?: boolean;
  department?: boolean;
  employmentDate?: boolean;
}

export const validateEmployeeForm = (data: Partial<Employee>): ValidationErrors => {
  const errors: ValidationErrors = {
    firstName: !data.firstName?.trim(),
    lastName: !data.lastName?.trim(),
    position: !data.position?.trim(),
    department: !data.department,
    employmentDate: !data.employmentDate,
  };

  return errors;
};

export const hasValidationErrors = (errors: ValidationErrors): boolean => {
  return Object.values(errors).some((error) => error === true);
};

export const validateEmploymentDate = (date: Date | string | undefined): boolean => {
  if (!date) return false;

  try {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return !isNaN(dateObj.getTime());
  } catch {
    return false;
  }
};

export const getValidationErrorText = (field: keyof ValidationErrors): string => {
  const errorMessages: Record<keyof ValidationErrors, string> = {
    firstName: "Имя обязательно для заполнения",
    lastName: "Фамилия обязательна для заполнения",
    position: "Должность обязательна для заполнения",
    department: "Отдел должен быть выбран",
    employmentDate: "Дата приёма обязательна для заполнения",
  };

  return errorMessages[field];
};
