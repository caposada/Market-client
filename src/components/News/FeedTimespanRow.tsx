import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { UpdateSourceMonitorSettings } from '../../store/newsSlice'
import { useAppDispatch } from '../../store/hooks'

type Props = {
    id: string,
    pollingTimespan: string
};

export default function FeedTimespanRow({ id, pollingTimespan } : Props) {
    const dispatch = useAppDispatch();

    function increaseTimeSpan(e: React.MouseEvent<HTMLButtonElement>) {   
        e.stopPropagation();     
        dispatch(
            UpdateSourceMonitorSettings(
                {
                    id: id,
                    settings: {
                        sourceId: id,
                        pollingTimespan:"00:01:00"
                    }
                }
            )
        );
    }
    
    function decreaseTimeSpan(e: React.MouseEvent<HTMLButtonElement>) {  
        e.stopPropagation();         
        dispatch(
            UpdateSourceMonitorSettings(
                {
                    id: id,
                    settings: {
                        sourceId: id,
                        pollingTimespan:"-00:01:00"
                    }
                }
            )
        );
    }

    return (
        <Row>
            <Col md={4}><h5>Timespan</h5></Col>
            <Col md={8}>
            {pollingTimespan}{' '}
                <OverlayTrigger
                key="ChangePolling"
                placement="bottom"
                overlay={ <Tooltip id="tooltip-ChangePolling">Change polling period</Tooltip>} >
                <ButtonGroup className="me-2" aria-label="First group">
                    <Button onClick={increaseTimeSpan} size="sm">+</Button>
                    <Button onClick={decreaseTimeSpan} size="sm">-</Button>
                </ButtonGroup>
                </OverlayTrigger>   
            </Col>
        </Row>
    )
}