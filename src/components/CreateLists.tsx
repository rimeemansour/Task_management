import React, { useState } from 'react';
import { Button, Alert, Form, Container, Row, Col } from 'react-bootstrap';
import { Task } from '../models/task.model';
import './styles.css';

interface ICreateTaskProps {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const CreateTasks: React.FC<ICreateTaskProps> = ({ tasks, setTasks }) => {
    const [error, setError] = useState<string>("");
    const titleRef = React.useRef<HTMLInputElement | null>(null);
    const textRef = React.useRef<HTMLTextAreaElement | null>(null);
    const colorRef = React.useRef<HTMLInputElement | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (!titleRef.current?.value || !textRef.current?.value) {
            setError("All fields are mandatory");
            return;
        }

        setError("");
        const newTask: Task = {
            id: (new Date()).toString(),
            title: titleRef.current!.value,
            text: textRef.current!.value,
            color: colorRef.current!.value,
            completed: false,
        };
        setTasks([...tasks, newTask]);
        titleRef.current!.value = "";
        textRef.current!.value = "";
    }

    return (
        <Container className='container' >
            <Row >
                <Col md={8} lg={6} >
                    <div className="div1">
                        <h2 id="create">Create Tasks </h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="formBasicTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" placeholder="Enter Title for the Task" ref={titleRef} />
                            </Form.Group>
                            <Form.Group id="formBasicTitle">
                                <Form.Label>Text</Form.Label>
                                <Form.Control className='textarea' placeholder="Enter your tasks" as="textarea" rows={3} ref={textRef} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor="colorInput" id="formBasicTitle">Tasks Color</Form.Label>
                                <Form.Control type="color" id="colorInput" defaultValue="#dfdfdf" title="Choose your color" ref={colorRef} />
                                <Button type="submit" id="submit">Submit</Button>
                            </Form.Group>

                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateTasks;



