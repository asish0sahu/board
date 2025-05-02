import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Column from './Column';
import { useTasks,useUpdateTask } from '../../hooks/useTask';

import { Box } from '@mui/material';
import { useSnackbar } from 'notistack';

const KanbanBoard = () => {
  const { data: tasks, isLoading, error } = useTasks();
  const updateTaskMutation = useUpdateTask();
  const { enqueueSnackbar } = useSnackbar();

  const onDragEnd = (result) => {
    if (!result.destination) return;
    
    const taskId = parseInt(result.draggableId);
    const newStatus = result.destination.droppableId;
    
    const taskToUpdate = tasks?.find(task => task.id === taskId);
    if (!taskToUpdate) return;
    
    updateTaskMutation.mutate(
      { id: taskId, status: newStatus },
      {
        onError: () => {
          enqueueSnackbar('Failed to update task status', { variant: 'error' });
        }
      }
    );
  };

  if (isLoading) return <Box sx={{ textAlign: 'center', p: 4 }}>Loading tasks...</Box>;
  if (error) return <Box sx={{ textAlign: 'center', p: 4, color: 'error.main' }}>Error loading tasks</Box>;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box sx={{
        display: 'flex',
        gap: 3,
        padding: 2,
        overflowX: 'auto',
        minHeight: '70vh',
        '@media (max-width: 900px)': {
          flexDirection: 'column',
          gap: 2
        }
      }}>
        {['To Do', 'In Progress', 'Done'].map((status) => (
          <Droppable droppableId={status} key={status}>
            {(provided) => (
              <Column 
                status={status}
                tasks={tasks?.filter(t => t.status === status) || []}
                innerRef={provided.innerRef}
                {...provided.droppableProps}
              >
                {provided.placeholder}
              </Column>
            )}
          </Droppable>
        ))}
      </Box>
    </DragDropContext>
  );
};

export default KanbanBoard;