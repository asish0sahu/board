import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchTasks, createTask, updateTask } from '../api/task';

export const useTasks = () => {
  return useQuery('tasks', fetchTasks, {
    staleTime: 1000 * 60 * 5,
    retry: 2,
    refetchOnWindowFocus: false
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation(createTask, {
    onSuccess: (newTask) => {
      // Update the cache directly with the new task
      queryClient.setQueryData('tasks', (oldTasks) => [
        ...(oldTasks || []),
        newTask
      ]);
    },
    onSettled: () => {
      // Refetch tasks as a fallback
      queryClient.invalidateQueries('tasks');
    }
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation(updateTask, {
    onMutate: async (updatedTask) => {
      await queryClient.cancelQueries('tasks');
      const previousTasks = queryClient.getQueryData('tasks');
      
      queryClient.setQueryData('tasks', (old) => 
        old?.map(task => 
          task.id === updatedTask.id 
            ? { ...task, status: updatedTask.status } 
            : task
        ) || []
      );
      
      return { previousTasks };
    },
    onError: (err, updatedTask, context) => {
      queryClient.setQueryData('tasks', context.previousTasks);
    },
    onSettled: () => {
      queryClient.invalidateQueries('tasks');
    }
  });
};