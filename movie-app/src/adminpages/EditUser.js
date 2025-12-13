import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { instance } from '../axios/Axios';

const EditUser = ({ show, user, onHide, onEditSuccess }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        role: 'user',
        status: 'active'
    });

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || '',
                email: user.email || '',
                role: user.role || 'user',
                status: user.status || 'active'
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = user.id || user.userId;
            await instance.patch(`/users/${userId}`, formData);
            onEditSuccess(userId, formData);
            onHide();
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Failed to update user');
        }
    };

    if (!user) {
        return null;
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header
                closeButton
                style={{
                    backgroundColor: '#1a1a1a',
                    borderBottom: '1px solid #333',
                    color: 'white'
                }}
            >
                <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body style={{ backgroundColor: '#1a1a1a', color: 'white' }}>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            style={{
                                backgroundColor: '#2a2a2a',
                                border: '1px solid #444',
                                color: 'white'
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={{
                                backgroundColor: '#2a2a2a',
                                border: '1px solid #444',
                                color: 'white'
                            }}
                        />
                    </Form.Group>

                    {user.role !== 'admin' && (
                        <>
                            <Form.Group className="mb-3">
                                <Form.Label>Role</Form.Label>
                                <Form.Select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    style={{
                                        backgroundColor: '#2a2a2a',
                                        border: '1px solid #444',
                                        color: 'white'
                                    }}
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Status</Form.Label>
                                <Form.Select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    style={{
                                        backgroundColor: '#2a2a2a',
                                        border: '1px solid #444',
                                        color: 'white'
                                    }}
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="suspended">Suspended</option>
                                </Form.Select>
                            </Form.Group>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#1a1a1a', borderTop: '1px solid #333' }}>
                    <Button
                        variant="secondary"
                        onClick={onHide}
                        style={{ backgroundColor: '#333', border: 'none' }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        type="submit"
                        style={{ backgroundColor: '#E50914', border: 'none' }}
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default EditUser;