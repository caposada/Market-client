import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Button from 'react-bootstrap/Button'
import EditTimezoneModal from "./EditTimezoneModal";
import React, { useState } from "react";

type Props = {
    id: string,
    timezone: string
};

export default function FeedTimeZoneRow({ id, timezone } : Props) {
    const [editShow, setEditShow] = useState(false);

    return (
        <Row>
            <Col md={4}><h5>Timezone</h5></Col>
            <Col md={6}>{timezone}</Col>
            <Col md={2}>
                <OverlayTrigger
                key="editTimezone"
                placement="bottom"
                overlay={<Tooltip id="tooltip-editTimezone">Edit timezone</Tooltip>} >
                    <Button onClick={() => setEditShow(true)} size="sm"><i className="bi bi-pencil-square"></i></Button>
                </OverlayTrigger>{' '}
            </Col> 
        
            { editShow === true ? 
            <EditTimezoneModal 
            setShow={setEditShow} 
            id={id}
            currentTimezone={timezone} /> : 
            "" }
        </Row>
    )
}