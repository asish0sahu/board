import TaskCard from './TaskCard';
import { Box, Typography } from '@mui/material';

const Column = ({ status, tasks, innerRef, children }) => {
  const getColumnColor = () => {
    switch(status) {
      case 'To Do': return '#ffebee';
      case 'In Progress': return '#fff8e1';
      case 'Done': return '#e8f5e9';
      default: return '#f5f5f5';
    }
  };

  return (
    <Box sx={{
      backgroundColor: getColumnColor(),
      borderRadius: 2,
      padding: 2,
      minWidth: 300,
      flex: 1,
      boxShadow: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }}>
      <Typography 
        variant="h6" 
        sx={{ 
          textAlign: 'center', 
          fontWeight: 'bold',
          color: 'text.secondary'
        }}
      >
        {status} ({tasks.length})
      </Typography>
      <Box 
        ref={innerRef}
        sx={{
          flex: 1,
          minHeight: 100,
          padding: 1,
          borderRadius: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          transition: 'background-color 0.2s ease',
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        {tasks.map((task, index) => (
          <TaskCard key={task.id} task={task} index={index} />
        ))}
        {children}
      </Box>
    </Box>
  );
};

export default Column;