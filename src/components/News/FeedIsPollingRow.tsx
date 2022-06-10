import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { UpdateSourceMonitorSettings } from '../../store/newsSlice'
import { useAppDispatch } from '../../store/hooks'

type Props = {
    id: string,
    isPolling: boolean
};

export default function FeedIsPollingRow({ id, isPolling } : Props) {
    const dispatch = useAppDispatch();

    function togglePolling(e: React.MouseEvent<HTMLButtonElement>) {  
        e.stopPropagation();   
        dispatch(
          UpdateSourceMonitorSettings(
            {
              id: id,
              settings: 
              {
                sourceId: id,
                isPolling: !isPolling
              }
            }
          )
        );
    }

    return (
        <Row>
            <Col md={4}><h5>Is Polling</h5></Col>
            <Col md={8}>              
                <OverlayTrigger
                key="isPolling"
                placement="bottom"
                overlay={<Tooltip id="tooltip-isPolling">Toggle polling on/off</Tooltip>} >
                    <Button onClick={togglePolling} size="sm">{isPolling ? "True" : "False"}</Button>
                </OverlayTrigger>
            </Col>
        </Row>
    )
}