import { Modal, Button } from 'react-bootstrap';
import { instance } from '../axios/Axios';

const DeleteMovie = ({ show, movie, onHide, onDeleteSuccess }) => {
    const handleDeleteConfirm = async () => {
        try {
            const movieId = movie.id;

            await instance.delete(`/movies/${movieId}`);

            const watchListResponse = await instance.get('/watchList');
            const movieWatchLists = watchListResponse.data.filter(wl => 
                wl.movieId === movieId || 
                String(wl.movieId) === String(movieId)
            );

            for (const watchList of movieWatchLists) {
                await instance.delete(`/watchList/${watchList.id}`);
            }

            onDeleteSuccess(movieId);
            onHide();
        } catch (error) {
            console.error('Error deleting movie:', error);
            alert('Failed to delete movie.');
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
                Are you sure you want to delete movie <strong>{movie?.title}</strong>?
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

export default DeleteMovie;
