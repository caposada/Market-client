import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import dateFormat from "dateformat"

type Props = {
    lastPoll: Date
};

export default function FeedLastPollRow({ lastPoll } : Props) {

    const lastPollFormatted = dateFormat(lastPoll, "dd/mm/yyyy hh:MM:ss tt");

    return (
        <Row>
          <Col md={4}><h5>Last Poll</h5></Col>
          <Col md={8}>{lastPollFormatted}</Col>
        </Row>
    )
}