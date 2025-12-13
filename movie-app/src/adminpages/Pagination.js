import { Button } from 'react-bootstrap';

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    indexOfFirstItem,
    indexOfLastItem,
    totalItems
}) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }
        return pages;
    };

    if (totalPages <= 1) {
        return (
            <div className="d-flex justify-content-between align-items-center mt-3">
                <div style={{ color: '#888' }}>
                    Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, totalItems)} of {totalItems}
                </div>
            </div>
        );
    }

    return (
        <div className="d-flex justify-content-between align-items-center mt-3">
            <div style={{ color: '#888' }}>
                Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, totalItems)} of {totalItems}
            </div>
            <div>
                <Button
                    variant="outline-secondary"
                    size="sm"
                    className="me-2"
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                {getPageNumbers().map((page, index) => (
                    page === '...' ? (
                        <span key={`ellipsis-${index}`} className="me-2" style={{ color: '#888' }}>...</span>
                    ) : (
                        <Button
                            key={page}
                            style={currentPage === page ?
                                { backgroundColor: '#E50914', color: 'white', border: 'none' } :
                                {}
                            }
                            variant={currentPage === page ? '' : 'outline-secondary'}
                            size="sm"
                            className="me-2"
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </Button>
                    )
                ))}
                <Button
                    variant="outline-secondary"
                    size="sm"
                    className="me-2"
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default Pagination;
