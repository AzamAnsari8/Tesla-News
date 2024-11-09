import React from 'react';
import { Col, Card } from 'react-bootstrap';
import NoImage from '../assets/image.png'

const News = (props) => {

    const { title, description, image, url, date, authorName, onDelete } = props;

    return (
        <Col lg={3} className='mb-4'>
            <Card className="news-card shadow" style={{ width: '100%' }}>
                <Card.Img variant="top" className='card-img-top' src={image ? image : NoImage} />
                <Card.Body>
                    <Card.Title className='news-title'>
                        {title ? (title.length > 60 ? title.slice(0, 60) + '...' : title)
                            : 'No title available.'}
                    </Card.Title>
                    <Card.Text>
                        {description ? (description.length > 100 ? description.slice(0, 100) + '...' : description)
                            : 'No description available.'}
                    </Card.Text>
                    <div className='news-ref'>
                        <div className='publish-at'><h6>Publish At: </h6><small>{date}</small></div>
                        <div className='publish-at author'><h6>author: </h6><em><small>{authorName}</small></em></div>
                    </div>
                    <a href={url} target="_blank" rel="noopener noreferrer" className='btn btn-primary btn-sm mt-3'>
                        Learn More
                    </a>
                    <button onClick={() => onDelete(url)} className='btn btn-danger btn-sm mt-3'>Delete</button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default News