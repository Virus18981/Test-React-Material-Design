import { Box, Typography, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

interface EmployeeToolbarProps {
  onAddEmployee: () => void;
}

export const EmployeeToolbar = ({ onAddEmployee }: EmployeeToolbarProps) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
      <Typography variant="h4" component="h1">
        Сотрудники
      </Typography>
      <Button variant="contained" startIcon={<AddIcon />} onClick={onAddEmployee}>
        Добавить сотрудника
      </Button>
    </Box>
  );
};
