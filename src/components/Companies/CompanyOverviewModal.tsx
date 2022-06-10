import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { 
    SelectOverview,
    ResetOverview
} from '../../store/companySlice';
import { ScrollingContainer } from "../../utils/styling";

export default function CompanyOverviewModal() {
    const overview = useAppSelector(SelectOverview);
    const dispatch = useAppDispatch();

    function handleClose() {
        dispatch(ResetOverview());       
    }

    if (overview !== null && overview !== undefined && overview.overviewDictionary !== null && overview.overviewDictionary !== undefined) {
        return (  
            <Modal show={true} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Company Overview</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ScrollingContainer height="200px" className="p-1">
                        {                            
                            Object.keys(overview.overviewDictionary).map((key, index) => {
                                return (
                                    <Row key={index}>
                                        <Col>{key}</Col>
                                        <Col>{overview.overviewDictionary[key]}</Col>
                                    </Row>
                                )
                            })
                        }                
                    </ScrollingContainer>    
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        )
    } else {
        return <></>
    }
}