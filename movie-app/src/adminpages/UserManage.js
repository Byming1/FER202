import { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Form, Button, Badge, InputGroup } from 'react-bootstrap';
import { instance } from '../axios/Axios';
import AdminSidebar from './AdminSidebar';
import Pagination from './Pagination';
import DeleteUser from './DeleteUser';
import EditUser from './EditUser';
import AddUser from './AddUser';
import './UM.css';

const UserManage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [userToEdit, setUserToEdit] = useState(null);
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');

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

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    const handleEditClick = (user) => {
        setUserToEdit(user);
        setShowEditModal(true);
    };

    const handleDeleteSuccess = (userId) => {
        const deletedUser = users.find(u => (u.id === userId || u.userId === userId));
        alert(`Delete user with name: ${deletedUser?.username} successfully`);
        setUsers(users.filter(u => (u.id || u.userId) !== userId));
    };

    const handleEditSuccess = (userId, updatedData) => {
        setUsers(users.map(u => {
            if (u.id === userId || u.userId === userId) {
                return { ...u, ...updatedData };
            }
            return u;
        }));
        alert('User updated successfully');
    };

    const handleAddSuccess = () => {
        fetchUsers();
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = roleFilter === 'all' || user.role === roleFilter;
        const matchesStatus = statusFilter === 'all' || (user.status || 'active') === statusFilter;

        return matchesSearch && matchesRole && matchesStatus;
    });

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, roleFilter, statusFilter]);

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
                                    placeholder="Search users by name..."
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
                            <Button
                                onClick={() => setShowAddModal(true)}
                                style={{ backgroundColor: '#E50914', color: 'white', border: 'none' }}
                            >
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
                                    <div className="d-flex gap-2">
                                        <Form.Select
                                            size="sm"
                                            value={roleFilter}
                                            onChange={(e) => setRoleFilter(e.target.value)}
                                            style={{
                                                backgroundColor: '#1a1a1a',
                                                border: '1px solid #444',
                                                color: 'white',
                                                width: '150px'
                                            }}
                                        >
                                            <option value="all">All Roles</option>
                                            <option value="admin">Admin</option>
                                            <option value="user">User</option>
                                        </Form.Select>
                                        <Form.Select
                                            size="sm"
                                            value={statusFilter}
                                            onChange={(e) => setStatusFilter(e.target.value)}
                                            style={{
                                                backgroundColor: '#1a1a1a',
                                                border: '1px solid #444',
                                                color: 'white',
                                                width: '150px'
                                            }}
                                        >
                                            <option value="all">All Status</option>
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </Form.Select>
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
                                        {currentUsers.map(user => (
                                            <tr id='table-content' key={user.id || user.userId} style={{ borderBottom: '1px solid #222' }}>
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
                                                    <Badge
                                                        bg=""
                                                        className={user.role === 'admin' ? 'badge-admin' : 'badge-user'}
                                                    >
                                                        {user.role}
                                                    </Badge>
                                                </td>
                                                <td>
                                                    <Badge
                                                        bg=""
                                                        className={
                                                            (user.status || 'active') === 'active' ? 'badge-active' :
                                                                user.status === 'inactive' ? 'badge-inactive' :
                                                                    'badge-pending'
                                                        }
                                                    >
                                                        {user.status || 'Active'}
                                                    </Badge>
                                                </td>
                                                <td>
                                                    <i
                                                        className="bi bi-pencil-square"
                                                        onClick={() => handleEditClick(user)}
                                                        style={{
                                                            color: 'white',
                                                            cursor: 'pointer',
                                                            marginRight: '15px',
                                                            fontSize: '18px'
                                                        }}
                                                    ></i>
                                                    {user.role === 'user' && (
                                                        <i
                                                            className="bi bi-trash"
                                                            onClick={() => handleDeleteClick(user)}
                                                            style={{
                                                                color: '#E50914',
                                                                cursor: 'pointer',
                                                                fontSize: '18px'
                                                            }}
                                                        ></i>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>

                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                    indexOfFirstItem={indexOfFirstUser}
                                    indexOfLastItem={indexOfLastUser}
                                    totalItems={filteredUsers.length}
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <DeleteUser
                show={showDeleteModal}
                user={userToDelete}
                onHide={() => setShowDeleteModal(false)}
                onDeleteSuccess={handleDeleteSuccess}
            />

            <EditUser
                show={showEditModal}
                user={userToEdit}
                onHide={() => setShowEditModal(false)}
                onEditSuccess={handleEditSuccess}
            />

            <AddUser
                show={showAddModal}
                onHide={() => setShowAddModal(false)}
                onAddSuccess={handleAddSuccess}
            />
        </div>
    );
};

export default UserManage;