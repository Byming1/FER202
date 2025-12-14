import { Modal, Button } from 'react-bootstrap';
import { instance } from '../axios/Axios';

const DeleteUser = ({ show, user, onHide, onDeleteSuccess }) => {
    const handleDeleteConfirm = async () => {
        try {
            const userIdString = user.id || user.userId;
            const userIdNumber = user.userId || Number(user.id);

            await instance.delete(`/users/${userIdString}`);

            const watchListResponse = await instance.get('/watchList');

            const userWatchLists = watchListResponse.data.filter(wl => {
                const match = wl.userId === userIdNumber ||
                    wl.userId === userIdString ||
                    String(wl.userId) === String(userIdNumber) ||
                    Number(wl.userId) === Number(userIdString);
                return match;
            });

            for (const watchList of userWatchLists) {
                await instance.delete(`/watchList/${watchList.id}`);
            }

            onDeleteSuccess(userIdString);
            onHide();
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Failed to delete user.');
        }
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header
                closeButton
                style={{
                    backgroundColor: '#1a1a1a',
                    borderBottom: '1px solid #333',
                    color: 'white'
                }}
            >
                <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: '#1a1a1a', color: 'white' }}>
                Are you sure you want to delete user <strong>{user?.username}</strong>?
                <br />
                <small style={{ color: '#888' }}>This action cannot be undone. All watchlist data will also be deleted.</small>
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
                    variant="danger"
                    onClick={handleDeleteConfirm}
                    style={{ backgroundColor: '#E50914', border: 'none' }}
                >
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteUser;