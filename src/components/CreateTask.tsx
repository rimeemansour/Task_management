import * as React from 'react';
import Button from 'react-bootstrap/Button'
import { Task } from '../models/task.model';
import { Alert, Form } from 'react-bootstrap';

interface ICreateTaskProps {
    tasks: Task[],
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

const CreateTask: React.FunctionComponent<ICreateTaskProps> = ({ tasks, setTasks }) => { // Changed from {Task, setTasks}
    const [error, setError] = React.useState<string>("");
    const titleRef = React.useRef<HTMLInputElement | null>(null);
    const textRef = React.useRef<HTMLTextAreaElement | null>(null);
    const colorRef = React.useRef<HTMLInputElement | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (titleRef.current?.value === "" || textRef.current?.value === "") {
            return setError("All fields are mandatory");
        }

        setError("");
        setTasks([...tasks, {
            id: (new Date()).toString(),
            title: (titleRef.current as HTMLInputElement).value,
            text: (textRef.current as HTMLTextAreaElement).value,
            color: (colorRef.current as HTMLInputElement).value,
            completed: false
        }]);

        (titleRef.current as HTMLInputElement).value = "";
        (textRef.current as HTMLTextAreaElement).value = "";

    }

    return (
        <>
            <h2>Create Tasks</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form className="mt-3 mb-3" onSubmit={(e) => handleSubmit(e)}>
                <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control className="Textarea" type="text" placeholder="Enter Title for the Task" ref={titleRef} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Text</Form.Label>
                    <Form.Control className="Textarea"placeholder="Enter your notes" as="textarea" rows={3} ref={textRef} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="colorInput">Task Color</Form.Label>
                    <Form.Control type="color" id="colorInput" defaultValue="#dfdfdf" title="Choose your color" ref={colorRef} />
                </Form.Group>
                <Button type="submit" variant="primary">Submit</Button>
            </Form>
        </>
    );
};

export default CreateTask;
