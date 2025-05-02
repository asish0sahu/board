import { Draggable } from 'react-beautiful-dnd';
import { Box, Typography, useTheme } from '@mui/material';

const TaskCard = ({ task, index }) => {
  const theme = useTheme();
  
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            backgroundColor: snapshot.isDragging 
              ? theme.palette.primary.light 
              : 'background.paper',
            padding: 2,
            borderRadius: 1,
            boxShadow: 1,
            transition: 'all 0.2s ease',
            '&:hover': {
              boxShadow: 3,
              transform: 'translateY(-2px)'
            },
            opacity: snapshot.isDragging ? 0.8 : 1,
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {task.title}
          </Typography>
          {task.description && (
            <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
              {task.description}
            </Typography>
          )}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'flex-end',
            mt: 1
          }}>
            <Typography 
              variant="caption" 
              sx={{ 
                color: 'text.disabled',
                fontStyle: 'italic'
              }}
            >
              #{task.id}
            </Typography>
          </Box>
        </Box>
      )}
    </Draggable>
  );
};

export default TaskCard;