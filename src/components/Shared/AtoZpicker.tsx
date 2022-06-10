import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

type Props = {
    startsWith: string, 
    changeStartsWith: Function
};
  
export default function AtoZpicker({ startsWith, changeStartsWith } : Props) {
    const aToM : string = "ABCDEFGHIJKLM";
    const nToZ : string  = "NOPQRSTUVWXYZ";

    return (
        <Row>    
            <ButtonGroup className="mb-1">
                {
                    [...aToM].map((letter, index) => {
                        return (
                            <Button key={letter}
                            variant={letter === startsWith ? "primary" : "secondary"}
                            size='sm' 
                            onClick={() => changeStartsWith(letter)}>
                                {letter}
                            </Button>
                        )
                    })
                }
            </ButtonGroup>
            <ButtonGroup className="mb-1">
                {
                    [...nToZ].map((letter, index) => {
                        return (
                            <Button key={letter}
                            variant={letter === startsWith ? "primary" : "secondary"}
                            size='sm' 
                            onClick={() => changeStartsWith(letter)}>
                                {letter}
                            </Button>
                        )
                    })
                }
            </ButtonGroup>                  
            <Form>
                <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Control type="title" placeholder="Enter search" value={startsWith} onChange={e => changeStartsWith(e.target.value)} />
                </Form.Group>
            </Form>            
        </Row>        
    );
}