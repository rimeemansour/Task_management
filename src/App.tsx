import React, { useState } from 'react';
import CreateLists from './components/CreateLists';
import TasksList from './components/TasksList';
import { Task } from './models/task.model';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const App: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    return (
        <div>
            <div className="container mt-5">
                <div className='task1'><CreateLists tasks={tasks} setTasks={setTasks} /></div>
                <div className='task2'><TasksList tasks={tasks} setTasks={setTasks} /></div>
            </div>
        </div>
    );
};

export default App;
