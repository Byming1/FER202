import { Modal, Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { instance } from '../axios/Axios';

const AddMovie = ({ show, onHide, onAddSuccess }) => {
    const [formData, setFormData] = useState({
        title: '',
        year: '',
        rating: '',
        genres: '',
        director: '',
        description: '',
        image: ''
    });

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
            const genresArray = formData.genres
                .split(',')
                .map(g => g.trim())
                .filter(g => g);

            const newMovie = {
                title: formData.title,
                year: Number(formData.year),
                rating: Number(formData.rating),
                genres: genresArray,
                director: formData.director,
                description: formData.description,
                image: formData.image
            };

            await instance.post('/movies', newMovie);
            
            setFormData({
                title: '',
                year: '',
                rating: '',
                genres: '',
                director: '',
                description: '',
                image: ''
            });
            
            alert('Movie added successfully');
            onAddSuccess();
            onHide();
        } catch (error) {
            console.error('Error adding movie:', error);
            alert('Failed to add movie.');
        }
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            size="lg"
        >
            <Modal.Header
                closeButton
                style={{
                    backgroundColor: '#1a1a1a',
                    borderBottom: '1px solid #333',
                    color: 'white'
                }}
            >
                <Modal.Title>Add New Movie</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body style={{ backgroundColor: '#1a1a1a', color: 'white' }}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={formData.title}
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
                        <Form.Label>Year</Form.Label>
                        <Form.Control
                            type="number"
                            name="year"
                            value={formData.year}
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
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                            type="number"
                            name="rating"
                            step="0.1"
                            min="0"
                            max="10"
                            value={formData.rating}
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
                        <Form.Label>Genres (comma separated)</Form.Label>
                        <Form.Control
                            type="text"
                            name="genres"
                            value={formData.genres}
                            onChange={handleChange}
                            placeholder="Action, Drama, Thriller"
                            required
                            style={{
                                backgroundColor: '#2a2a2a',
                                border: '1px solid #444',
                                color: 'white'
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Director</Form.Label>
                        <Form.Control
                            type="text"
                            name="director"
                            value={formData.director}
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
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={formData.description}
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
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            required
                            style={{
                                backgroundColor: '#2a2a2a',
                                border: '1px solid #444',
                                color: 'white'
                            }}
                        />
                    </Form.Group>
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
                        type="submit"
                        style={{ backgroundColor: '#E50914', border: 'none' }}
                    >
                        Add Movie
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AddMovie;
