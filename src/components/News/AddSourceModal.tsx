import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { AddSource } from '../../store/newsSlice';
import { timezones } from "../../utils/timezone";
import { useAppDispatch } from '../../store/hooks';
import { FeedType } from "../../utils/types";

type Props = {
    setShow: Function
};

export default function AddSourceModal({ setShow } : Props) {
    const [validated, setValidated] = useState(false);
    const [feedType, setFeedType] = useState<FeedType | null>(null);
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [timezone, setTimezone] = useState("");
    const dispatch = useAppDispatch();

    const handleClose = () => setShow(false);

    function close() {  
        setValidated(false);
        setFeedType(null);
        setTitle('');
        setUrl('');  
        setTimezone('');  
        handleClose();
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {  
        e.preventDefault();
        e.stopPropagation();  

        const form = e.currentTarget;
        if (form.checkValidity() === true) {  
            dispatch(
                AddSource(
                    {
                        feedType: Number(feedType),
                        title: title,
                        url: url,
                        timezone: timezone
                    }
                )
            );  
            setValidated(false);
            setFeedType(null);
            setTitle('');
            setUrl('');  
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
                <Modal.Title>Add Source</Modal.Title>
                </Modal.Header>
                <Modal.Body>     
                    <Form.Group className="mb-3" controlId="formFeedType">         
                        <Form.Select 
                        required
                        onChange={e => setFeedType(Number(e.target.value))} >
                            <option selected disabled value="">Select a feed type</option>
                            <option value={FeedType.RssFeed}>RssFeed</option>
                            <option value={FeedType.TwitterFeed}>TwitterFeed</option>
                        </Form.Select>
                    </Form.Group> 
                    <Form.Group className="mb-3" controlId="formBasicTitle">
                        <Form.Control 
                        required
                        type="text" 
                        placeholder="Enter title" 
                        value={title} 
                        onChange={e => setTitle(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicUrl">
                        <Form.Control 
                        required
                        type="text" 
                        placeholder="Enter url"  
                        value={url} 
                        onChange={e => setUrl(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formTimeZone">         
                        <Form.Select 
                        required
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
                    Add
                </Button>
                </Modal.Footer>
            </Form>    
        </Modal>
    );
}