import React from 'react';
import Tasks from './Tasks';
import { Task } from '../models/task.model';

interface ITasksListProps {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TasksList: React.FC<ITasksListProps> = ({ tasks, setTasks }) => {
    const handleDelete = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const handleEdit = (editedTask: Task) => {
        const updatedTasks = tasks.map(task =>
            task.id === editedTask.id ? editedTask : task
        );
        setTasks(updatedTasks);
    };

    const handleComplete = (id: string) => {
        const updatedTasks = tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };

    const completedTasks = tasks.filter(task => task.completed);
    const unfinishedTasks = tasks.filter(task => !task.completed);

    return (
        <div className='div2'>
            <h2 id='create'>Unfinished Tasks</h2>
            <div className="overflow-auto" style={{ maxHeight: "190px" }}>
                <div id='task'>
                    {unfinishedTasks.map(task => (
                        <Tasks
                            key={task.id}
                            task={task}
                            handleDelete={handleDelete}
                            handleComplete={handleComplete}
                            handleEdit={handleEdit}
                        />
                    ))}
                </div>
            </div>


            <h2 id='create'>Completed Tasks</h2>
            <div className="overflow-auto" style={{ maxHeight: "190px" }}>
                <div id='task'>
                    {completedTasks.map(task => (
                        <Tasks
                            key={task.id}
                            task={task}
                            handleDelete={handleDelete}
                            handleComplete={handleComplete}
                            handleEdit={handleEdit}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TasksList;
