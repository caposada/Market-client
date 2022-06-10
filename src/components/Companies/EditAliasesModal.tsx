import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { 
    SelectCompany,
    UpdateCompany
} from '../../store/companySlice';
import { RightJustifiedButton, ScrollingContainer } from "../../utils/styling";
import Constants from "../../utils/constants";
import { TAliase } from "../../utils/types";

type Props = {
    symbol: string, 
    setShow: Function
};

export default function EditAliasesModal({ symbol, setShow }: Props) {
    const company = useAppSelector(SelectCompany);
    const dispatch = useAppDispatch();
    const [name, setName] = useState('');

    const handleClose = () => setShow(false);

    function close() {  
        handleClose();
    }

    function addClicked() {   
        const found = company && company.aliases.find(x => x === name)
        if (found === undefined && name.length >= Constants.MIN_ALIAS_SIZE)  {
            const aliases: TAliase[] = [];
            company && company.aliases.forEach(item => { aliases.push(item) });
            aliases.push(name);
            dispatch(
                UpdateCompany(
                    {
                        symbol: symbol,
                        aliases: aliases
                    }
                )
            );    
            setName('');
        }
    }

    function deleteClicked(name: string) {
        const aliases: TAliase[] | null = company && company.aliases.filter(x => x !== name);
        dispatch(
            UpdateCompany(
                {
                    symbol: symbol,
                    aliases: aliases
                }
            )
        ); 
    }

    return (  
        <Modal show={true} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit aliases</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ScrollingContainer height="200px" className="p-1">
                    {
                        company && company.aliases.map((name, index) => {
                            return (
                                <Card
                                key={index}
                                bg="Secondary"
                                className="mb-2"  >
                                    <Card.Header>
                                        {name}     
                                        <RightJustifiedButton 
                                        onClick={() => deleteClicked(name)} 
                                        size="sm" 
                                        variant="danger">
                                            <i className="bi bi-x-lg"></i>
                                        </RightJustifiedButton>
                                    </Card.Header>
                                </Card>
                            )
                        })
                    }                
                </ScrollingContainer>
                <Form className="mt-2">
                    <InputGroup className="mb-3">
                        <FormControl
                        placeholder="Enter alias"
                        aria-label="Company alias"
                        aria-describedby="basic-addon2"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        />
                        <Button 
                        variant="primary" 
                        id="addBbutton"
                        onClick={addClicked}>
                            Add
                        </Button>
                    </InputGroup>
                </Form>    
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={close}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
    );
}