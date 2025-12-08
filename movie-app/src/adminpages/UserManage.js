import { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Form, Button, Badge, InputGroup } from 'react-bootstrap';
import { instance } from '../axios/Axios';

const UserManage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await instance.get('/users');
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            setLoading(false);
        }
    };

    const filteredUsers = users.filter(user =>
        user.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return <div style={{ color: 'white', textAlign: 'center', padding: '40px' }}>Loading...</div>;
    }

    return (
        <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', color: 'white' }}>
            <div style={{
                position: 'fixed',
                left: 0,
                top: 0,
                width: '200px',
                height: '100vh',
                backgroundColor: '#000',
                padding: '20px'
            }}>
                <h5 style={{ color: '#E50914', marginBottom: '30px' }}>ADMIN PANEL</h5>
                <div style={{ marginBottom: '10px', padding: '10px', cursor: 'pointer' }}>
                    Dashboard
                </div>
                <div style={{
                    marginBottom: '10px',
                    padding: '10px',
                    backgroundColor: '#E50914',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}>
                    Users
                </div>
                <div style={{ marginBottom: '10px', padding: '10px', cursor: 'pointer' }}>
                    Movies
                </div>
                <div style={{ marginBottom: '10px', padding: '10px', cursor: 'pointer' }}>
                    Settings
                </div>
                <div style={{ position: 'absolute', bottom: '20px', padding: '10px', cursor: 'pointer' }}>
                    Logout
                </div>
            </div>

            <div style={{ marginLeft: '200px', padding: '30px' }}>
                <Container fluid>
                    <Row className="mb-4">
                        <Col>
                            <h2>User Management</h2>
                            <p style={{ color: '#888' }}>Manage and monitor all registered users</p>
                        </Col>
                        <Col xs="auto">
                            <InputGroup>
                                <Form.Control
                                    placeholder="Search users..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{
                                        backgroundColor: '#1a1a1a',
                                        border: '1px solid #333',
                                        color: 'white',
                                        '::placeholder': {
                                            color: 'white'
                                        }
                                    }}
                                />
                            </InputGroup>
                        </Col>
                        <Col xs="auto">
                            <Button variant="danger">
                                Add New User
                            </Button>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col>
                            <div style={{
                                backgroundColor: '#1a1a1a',
                                padding: '20px',
                                borderRadius: '10px'
                            }}>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div>
                                        <strong>All Users</strong> <span style={{ color: '#888' }}>{filteredUsers.length} users</span>
                                    </div>
                                    <div>
                                        <Button variant="outline-secondary" size="sm" className="me-2">
                                            Filter
                                        </Button>
                                        <Button variant="outline-secondary" size="sm">
                                            Export
                                        </Button>
                                    </div>
                                </div>

                                <Table hover variant="dark" style={{ backgroundColor: 'transparent' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid #333' }}>
                                            <th>User</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredUsers.map(user => (
                                            <tr key={user.userId} style={{ borderBottom: '1px solid #222' }}>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <div
                                                            style={{
                                                                width: '35px',
                                                                height: '35px',
                                                                borderRadius: '50%',
                                                                backgroundColor: '#333',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                marginRight: '10px'
                                                            }}
                                                        >
                                                            {user.username?.charAt(0).toUpperCase()}
                                                        </div>
                                                        {user.username}
                                                    </div>
                                                </td>
                                                <td style={{ color: '#888' }}>{user.email}</td>
                                                <td>
                                                    <Badge bg={user.role === 'admin' ? 'danger' : 'primary'}>
                                                        {user.role}
                                                    </Badge>
                                                </td>
                                                <td>
                                                    <Badge bg="success">
                                                        Active
                                                    </Badge>
                                                </td>
                                                <td>
                                                    <Button variant="link" size="sm" style={{ color: 'white', textDecoration: 'none', marginRight: '10px' }}>
                                                        Edit
                                                    </Button>
                                                    <Button variant="link" size="sm" style={{ color: '#888', textDecoration: 'none' }}>
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>

                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <div style={{ color: '#888' }}>
                                        Showing 1-{filteredUsers.length} of {users.length}
                                    </div>
                                    <div>
                                        <Button variant="outline-secondary" size="sm" className="me-2">Previous</Button>
                                        <Button variant="danger" size="sm" className="me-2">1</Button>
                                        <Button variant="outline-secondary" size="sm" className="me-2">2</Button>
                                        <Button variant="outline-secondary" size="sm" className="me-2">3</Button>
                                        <span className="me-2">...</span>
                                        <Button variant="outline-secondary" size="sm" className="me-2">Next</Button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default UserManage;