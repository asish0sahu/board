import { useState } from 'react';
import { Box, Button, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import KanbanBoard from './components/KanbanBoard/Move';
import AddTaskModal from './components/AddTaskModal';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
    background: { default: '#f5f5f5' }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  }
});

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        padding: 3,
        minHeight: '100vh',
        backgroundColor: 'background.default'
      }}>
        <Button 
          variant="contained" 
          onClick={() => setIsModalOpen(true)}
          sx={{ 
            marginBottom: 3,
            boxShadow: 2,
            '&:hover': { boxShadow: 4 }
          }}
        >
          Add New Task
        </Button>
        
        <KanbanBoard />
        
        <AddTaskModal 
          open={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;