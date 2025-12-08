import { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Form, Button, Badge, InputGroup } from 'react-bootstrap';
import { instance } from '../axios/Axios';
import AdminSidebar from './AdminSidebar';
import './UM.css';

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
            <AdminSidebar activePage="users" />

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
                                        color: 'white'
                                    }}
                                />
                            </InputGroup>
                        </Col>
                        <Col xs="auto">
                            <Button style={{ backgroundColor: '#E50914', color: 'white' }}>
                                + Add New User
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

                                <Table hover>
                                    <thead>
                                        <tr id="table-header" style={{ borderBottom: '1px solid #333' }}>
                                            <th>User</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredUsers.map(user => (
                                            <tr id='table-content' key={user.userId} style={{ borderBottom: '1px solid #222' }}>
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
                                                    <Badge className={user.role === 'admin' ? 'badge-admin' : 'badge-user'}>
                                                        {user.role}
                                                    </Badge>
                                                </td>
                                                <td>
                                                    <Badge bg="success">
                                                        Active
                                                    </Badge>
                                                </td>
                                                <td>
                                                    <i
                                                        className="bi bi-pencil-square"
                                                        style={{
                                                            color: 'white',
                                                            cursor: 'pointer',
                                                            marginRight: '15px',
                                                            fontSize: '18px'
                                                        }}
                                                    ></i>
                                                    <i
                                                        className="bi bi-trash"
                                                        style={{
                                                            color: '#888',
                                                            cursor: 'pointer',
                                                            fontSize: '18px'
                                                        }}
                                                    ></i>
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
                                        <Button style={{ backgroundColor: '#E50914', color: 'white' }} size="sm" className="me-2">1</Button>
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

            <style jsx>{`
                input::placeholder {
                    color: #888 !important;
                }
            `}</style>
        </div>
    );
};

export default UserManage;