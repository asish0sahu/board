import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

// Simulate delay for testing loading states
const simulateDelay = () => new Promise(resolve => setTimeout(resolve, 500));

const transformTask = (apiTask) => ({
  id: apiTask.id,
  title: apiTask.title,
  description: `User ID: ${apiTask.userId}`,
  status: apiTask.completed ? 'Done' : Math.random() > 0.5 ? 'In Progress' : 'To Do',
  userId: apiTask.userId,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
});

export const fetchTasks = async () => {
  await simulateDelay();
  try {
    const response = await axios.get(API_URL);
    return response.data.map(transformTask);
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    throw new Error('Failed to fetch tasks');
  }
};

export const createTask = async (taskData) => {
  await simulateDelay();
  try {
    const response = await axios.post(API_URL, {
      title: taskData.title,
      completed: taskData.status === 'Done',
      userId: taskData.userId || 1
    });
    return {
      ...transformTask(response.data),
      description: taskData.description,
      status: taskData.status
    };
  } catch (error) {
    console.error('Failed to create task:', error);
    throw new Error('Failed to create task');
  }
};

export const updateTask = async ({ id, status }) => {
  await simulateDelay();
  try {
    const response = await axios.patch(`${API_URL}/${id}`, {
      completed: status === 'Done'
    });
    return {
      ...transformTask(response.data),
      status,
      updatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error(`Failed to update task ${id}:`, error);
    throw new Error(`Failed to update task ${id}`);
  }
};