/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { 
  Modal, 
  TextField, 
  Select, 
  MenuItem, 
  Button, 
  Box, 
  Typography,
  FormControl,
  InputLabel,
  FormHelperText
} from '@mui/material';
import { useCreateTask } from '../../hooks/useTask';
import { useSnackbar } from 'notistack';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 500 },
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  outline: 'none'
};

const AddTaskModal = ({ open, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');
  const [titleError, setTitleError] = useState(false);
  const createTask = useCreateTask();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async () => {
    if (!title.trim()) {
      setTitleError(true);
      return;
    }
    
    try {
      await createTask.mutateAsync({
        title: title.trim(),
        description: description.trim(),
        status,
        userId: 1,
      });
      
      enqueueSnackbar('Task created successfully!', { variant: 'success' });
      resetForm();
      onClose();
    } catch (error) {
      enqueueSnackbar('Failed to create task', { variant: 'error' });
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStatus('To Do');
    setTitleError(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
          Add New Task
        </Typography>
        
        <FormControl fullWidth sx={{ mb: 3 }} error={titleError}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (titleError && e.target.value.trim()) setTitleError(false);
            }}
            required
            fullWidth
            error={titleError}
          />
          {titleError && <FormHelperText>Title is required</FormHelperText>}
        </FormControl>
        
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
          fullWidth
          sx={{ mb: 3 }}
        />
        
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            label="Status"
          >
            {['To Do', 'In Progress', 'Done'].map((statusOption) => (
              <MenuItem key={statusOption} value={statusOption}>
                {statusOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button onClick={handleClose} variant="outlined" sx={{ px: 3 }}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            disabled={!title.trim()}
            sx={{ px: 3 }}
          >
            Save Task
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddTaskModal;