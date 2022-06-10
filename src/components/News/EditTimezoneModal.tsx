import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { UpdateFeedSettings } from '../../store/newsSlice';
import { timezones } from "../../utils/timezone";
import { useAppDispatch } from '../../store/hooks';

type Props = {
    id: string, 
    currentTimezone: string, 
    setShow: Function
};

export default function EditTimezoneModal({ id, currentTimezone, setShow } : Props) {
    const [validated, setValidated] = useState(false);
    const [timezone, setTimezone] = useState(currentTimezone);
    const dispatch = useAppDispatch();

    const handleClose = () => setShow(false);

    function close() {  
        setValidated(false);
        setTimezone('');  
        handleClose();
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {  
        e.preventDefault();
        e.stopPropagation();  

        const form = e.currentTarget;
        if (form.checkValidity() === true) {
            dispatch(
                UpdateFeedSettings(
                    {
                        id: id,
                        timezone: timezone
                    }
                )
            );  
            setValidated(false);
            setTimezone('');  
            handleClose();    
        } else {
            setValidated(true);
        }
    }

    return (  
        <Modal show={true} onHide={handleClose}>
            <Form 
            noValidate 
            validated={validated} 
            onSubmit={handleSubmit}> 
                <Modal.Header closeButton>
                <Modal.Title>Edit Source</Modal.Title>
                </Modal.Header>
                <Modal.Body>  
                    <Form.Group className="mb-3" controlId="formTimeZone">         
                        <Form.Select 
                        required
                        defaultValue={timezone}
                        onChange={e => setTimezone(e.target.value)} >
                            <option selected disabled value="">Select timezone</option>
                            {
                                timezones.map((timezone, index) => {
                                    return (
                                        <option 
                                        key={index}
                                        value={timezone}>{timezone}</option>
                                    );
                                })
                            }
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={close}>
                    Cancel
                </Button>
                <Button variant="primary" type="submit" >
                    Update
                </Button>
                </Modal.Footer>
            </Form>    
        </Modal>
    );
}