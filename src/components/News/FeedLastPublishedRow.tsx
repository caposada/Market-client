import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import dateFormat from "dateformat"

type Props = {
    lastPublished: Date
};

export default function FeedLastPublishedRow({ lastPublished } : Props) {

    const lastPublishedFormatted = dateFormat(lastPublished, "dd/mm/yyyy hh:MM:ss tt");

    return (
        <Row>
            <Col md={4}><h5>Last Published</h5></Col>
            <Col md={8}>{lastPublishedFormatted}</Col>
        </Row>
    )
}