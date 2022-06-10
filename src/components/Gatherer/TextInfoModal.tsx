import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { 
    SelectBreakdown,
    GetInterestingItemBreakdown
} from '../../store/gathererSlice';
import { useEffect } from "react";
import TextInfoAnalysis from "./TextInfoAnalysis"
import TextInfoFinding from "./TextInfoFinding"
import { IFinding } from "../../utils/types"

type Props = {
    interestingItemId: string, 
    text: string, 
    findings: IFinding[], 
    setInterestingItemId: Function
};

export default function TextInfoModal({ interestingItemId, text, findings, setInterestingItemId } : Props) {
    const breakdown = useAppSelector(SelectBreakdown);  
    const dispatch = useAppDispatch();  

    useEffect(load, [interestingItemId, dispatch]);

    function load() {
        if (interestingItemId != null) {
            dispatch(GetInterestingItemBreakdown({
                id: interestingItemId
            }));
        }
    }

    const handleClose = () => setInterestingItemId(null);

    return (  
        <Modal 
        show={true} 
        size="xl"
        onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title> 
                    Text Information
                </Modal.Title>
            </Modal.Header>
            <Modal.Body> 
                
                <Container>
                    <Row>
                        <h5>Findings</h5>
                    </Row>
                    <Row>
                        <TextInfoFinding
                        findings={findings} />
                    </Row>

                    <Row>
                        <h5>Text analysis</h5>
                    </Row>
                    <Row>
                        <Col>
                        <TextInfoAnalysis 
                        text={text}
                        breakdown={breakdown}
                        findings={findings} />
                        </Col>
                    </Row>
                </Container>

                
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
    );
}