import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

type Props = {
    newsItems_Count: number
};

export default function FeedNewsItemsRow({ newsItems_Count } : Props) {

    return (
        <Row>
            <Col md={4}><h5>Items</h5></Col>
            <Col md={8}>                                      
            {newsItems_Count}
            </Col>
        </Row>
    )
}