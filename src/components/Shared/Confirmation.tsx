import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

type Props = {
    heading : string, 
    body: string, 
    setShow: Function, 
    confirmed: Function 
};
  
export default function Confirmation({ heading , body, setShow, confirmed } : Props) {
    const handleClose = () => setShow(false);

    function no() {   
        handleClose();
    }

    function yes() {
        confirmed();
        handleClose();
    }

    return (  
        <Modal show={true} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{heading}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {body}  
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={no}>
                No
            </Button>
            <Button variant="primary" onClick={yes}>
                Yes
            </Button>
            </Modal.Footer>
        </Modal>
    );
}