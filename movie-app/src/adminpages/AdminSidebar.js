import React from 'react';

const AdminSidebar = ({ activePage }) => {
    return (
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

            <div style={{
                marginBottom: '10px',
                padding: '10px',
                cursor: 'pointer',
                backgroundColor: activePage === 'dashboard' ? '#E50914' : 'transparent',
                borderRadius: '5px'
            }}>
                Dashboard
            </div>

            <div style={{
                marginBottom: '10px',
                padding: '10px',
                backgroundColor: activePage === 'users' ? '#E50914' : 'transparent',
                borderRadius: '5px',
                cursor: 'pointer'
            }}>
                Users
            </div>

            <div style={{
                marginBottom: '10px',
                padding: '10px',
                cursor: 'pointer',
                backgroundColor: activePage === 'movies' ? '#E50914' : 'transparent',
                borderRadius: '5px'
            }}>
                Movies
            </div>

            <div style={{
                marginBottom: '10px',
                padding: '10px',
                cursor: 'pointer'
            }}>
                Settings
            </div>

            <div style={{
                position: 'absolute',
                bottom: '20px',
                padding: '10px',
                cursor: 'pointer'
            }}>
                Logout
            </div>
        </div>
    );
};

export default AdminSidebar;