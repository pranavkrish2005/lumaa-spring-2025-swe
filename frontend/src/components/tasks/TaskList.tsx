import { TaskItem } from './TaskItem';
import { TaskForm } from './TaskForm';
import { useTasks } from '../../hooks/useTasks';
import { Task } from '../../types';

export const TaskList = () => {
  const { tasks, loading, error, createTask, updateTask, deleteTask } = useTasks();

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Tasks</h2>
      <TaskForm onSubmit={createTask} />
      <div className="space-y-4">
        {tasks.map((task: Task) => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdate={updateTask}
            onDelete={deleteTask}
          />
        ))}
      </div>
    </div>
  );
};