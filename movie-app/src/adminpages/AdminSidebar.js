const AdminSidebar = ({ activePage }) => {
    return (
        <div style={{
            position: 'fixed',
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
                <i className="bi bi-speedometer2" style={{ marginRight: '10px' }}></i>
                Dashboard
            </div>

            <div style={{
                marginBottom: '10px',
                padding: '10px',
                backgroundColor: activePage === 'users' ? '#E50914' : 'transparent',
                borderRadius: '5px',
                cursor: 'pointer'
            }}>
                <i className="bi bi-people-fill" style={{ marginRight: '10px' }}></i>
                Users
            </div>

            <div style={{
                marginBottom: '10px',
                padding: '10px',
                cursor: 'pointer',
                backgroundColor: activePage === 'movies' ? '#E50914' : 'transparent',
                borderRadius: '5px'
            }}>
                <i className="bi bi-film" style={{ marginRight: '10px' }}></i>
                Movies
            </div>

            <div style={{
                marginBottom: '10px',
                padding: '10px',
                cursor: 'pointer'
            }}>
                <i className="bi bi-gear-fill" style={{ marginRight: '10px' }}></i>
                Settings
            </div>

            <div style={{
                position: 'absolute',
                bottom: '20px',
                padding: '10px',
                cursor: 'pointer'
            }}>
                <i className="bi bi-box-arrow-right" style={{ marginRight: '10px' }}></i>
                Logout
            </div>
        </div>
    );
};

export default AdminSidebar;