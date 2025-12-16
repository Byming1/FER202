import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { instance } from '../axios/Axios';

const AddUser = ({ show, onHide, onAddSuccess }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [showPassword, setShowPassword] = useState(false);

    const validatePassword = (pass) => {
        const minLength = pass.length >= 6;
        const hasUpperCase = /[A-Z]/.test(pass);
        const hasNumber = /[0-9]/.test(pass);
        return minLength && hasUpperCase && hasNumber;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validatePassword(password)) {
            alert('Password must be at least 6 characters and contain at least one uppercase letter and one number!');
            return;
        }

        try {
            const usersResponse = await instance.get('/users');
            const users = usersResponse.data;

            const emailExists = users.some((user) => user.email === email);
            if (emailExists) {
                alert('Email is already registered!');
                return;
            }

            const usernameExists = users.some((user) => user.username === username);
            if (usernameExists) {
                alert('Username is already taken!');
                return;
            }

            const maxUserId = users.length > 0
                ? Math.max(...users.map(user => user.userId))
                : 0;

            const formData = {
                userId: maxUserId + 1,
                username: username,
                email: email,
                password: password,
                role: role,
                status: 'active'
            };

            await instance.post('/users', formData);
            alert('User added successfully!');
            onAddSuccess();
            handleClose();
        } catch (error) {
            console.error('Error adding user:', error);
            alert('Failed to add user. Please try again.');
        }
    };

    const handleClose = () => {
        setUsername('');
        setEmail('');
        setPassword('');
        setRole('user');
        setShowPassword(false);
        onHide();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton style={{ backgroundColor: '#1a1a1a', borderBottom: '1px solid #333' }}>
                <Modal.Title style={{ color: 'white' }}>Add New User</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: '#1a1a1a' }}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label style={{ color: '#b3b3b3' }}>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={{
                                backgroundColor: '#2a2a2a',
                                border: '1px solid #3a3a3a',
                                color: '#ffffff'
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label style={{ color: '#b3b3b3' }}>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                backgroundColor: '#2a2a2a',
                                border: '1px solid #3a3a3a',
                                color: '#ffffff'
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" style={{ position: 'relative' }}>
                        <Form.Label style={{ color: '#b3b3b3' }}>Password</Form.Label>
                        <Form.Control
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                backgroundColor: '#2a2a2a',
                                border: '1px solid #3a3a3a',
                                color: '#ffffff'
                            }}
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: 'absolute',
                                right: '12px',
                                top: '38px',
                                color: '#808080',
                                cursor: 'pointer'
                            }}
                        >
                            <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                        </span>
                        <Form.Text style={{ color: '#888', fontSize: '0.8rem' }}>
                            At least 6 characters, 1 uppercase letter and 1 number
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label style={{ color: '#b3b3b3' }}>Role</Form.Label>
                        <Form.Select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            style={{
                                backgroundColor: '#2a2a2a',
                                border: '1px solid #3a3a3a',
                                color: '#ffffff'
                            }}
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </Form.Select>
                    </Form.Group>

                    <div className="d-flex gap-2 justify-content-end">
                        <Button
                            variant="secondary"
                            onClick={handleClose}
                            style={{
                                backgroundColor: '#333',
                                border: 'none'
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            style={{
                                backgroundColor: '#E50914',
                                border: 'none'
                            }}
                        >
                            Add User
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddUser;