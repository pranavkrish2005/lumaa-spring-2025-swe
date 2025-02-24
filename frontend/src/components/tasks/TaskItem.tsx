import React from 'react';
import { Task } from '../../types';

interface TaskItemProps {
  task: Task;
  onUpdate: (id: number, task: Partial<Task>) => void;
  onDelete: (id: number) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdate, onDelete }) => {
  const handleUpdate = () => {
    const updatedTask = {
      title: prompt('Enter new title:', task.title) || task.title,
      description: prompt('Enter new description:', task.description) || task.description,
      isComplete: task.isComplete,
    };
    onUpdate(task.id, updatedTask);
  };

  const completedChange = () => {
    const updatedTask = {
      title: task.title,
      description: task.description,
      isComplete: !task.isComplete,
    };
    onUpdate(task.id, updatedTask);
  };

  return (
    <div className="p-4 border rounded shadow">
      <h3 className="font-bold">{task.title}</h3>
      <p>{task.description}</p>
      <button onClick={completedChange} className="mr-2 bg-blue-500 text-white p-1 rounded">
        {task.isComplete ? ' Mark as Not Completed' : 'Mark as Completed'}
      </button>
      <button onClick={handleUpdate} className="mr-2 bg-blue-500 text-white p-1 rounded">
        Edit
      </button>
      <button onClick={() => onDelete(task.id)} className="bg-red-500 text-white p-1 rounded">
        Delete
      </button>
    </div>
  );
};
