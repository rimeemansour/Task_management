import React, { useState } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import { Task } from '../models/task.model';

interface ITasksProps {
    task: Task,
    handleDelete: (id: string) => void,
    handleEdit: (task: Task) => void,
    handleComplete: (id: string) => void // Function to handle complete
}

const Tasks: React.FC<ITasksProps> = ({ task, handleDelete, handleEdit, handleComplete }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedTask, setEditedTask] = useState<Task>({
        id: task.id,
        title: task.title,
        text: task.text,
        color: task.color,
        completed: task.completed
    });

    const handleEditClick = () => {
        setShowEditModal(true);
        setEditedTask({
            id: task.id,
            title: task.title,
            text: task.text,
            color: task.color,
            completed: task.completed
        });
    };

    const handleCloseModal = () => {
        setShowEditModal(false);
    };

    const handleSaveChanges = () => {
        handleEdit(editedTask);
        setShowEditModal(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // Update the edited task when input fields change
        const { name, value } = e.target;
        setEditedTask(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCheckboxChange = () => {
        // Call handleComplete function with the task's id
        handleComplete(task.id);
    };

    return (
        <div className="mb-3">
            <Card style={{ backgroundColor: task.color, position: 'relative' }}>
                <Button
                    id="button"
                    onClick={() => handleDelete(task.id)}
                    style={{ color: '#4e0000', position: 'absolute', top: '10px', right: '10px' }}>
                    ✘
                </Button>
                <Button
                    id="button"
                    onClick={handleEditClick}
                    style={{ position: 'absolute', top: '10px', right: '70px' }}>
                    🖋️
                </Button>
                <Card.Body>
                    <Form.Check
                        type="checkbox"
                        label=""
                        checked={task.completed}
                        onChange={handleCheckboxChange}
                        className="checkbox"
                    />
                    <Card.Title>{task.title}</Card.Title>
                    <Card.Text>{task.text}</Card.Text>
                </Card.Body>
            </Card>


            <Modal show={showEditModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="editTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" name="title" value={editedTask.title} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="editText">
                            <Form.Label>Text</Form.Label>
                            <Form.Control as="textarea" rows={3} name="text" value={editedTask.text} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="editColor">
                            <Form.Label>Color</Form.Label>
                            <Form.Control type="color" name="color" value={editedTask.color} onChange={handleChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                    <Button variant="primary" onClick={handleSaveChanges}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Tasks;

