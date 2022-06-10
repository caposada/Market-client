import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { FeedType } from "../../utils/types";

type Props = {
    feedType: FeedType
};

export default function FeedTypeRow({ feedType } : Props) {

    const feedTypeString = FeedType[feedType];  

    return (
        <Row>
            <Col md={4}><h5>Feed Type</h5></Col>
            <Col md={8}>{feedTypeString}</Col>
        </Row> 
    )
}