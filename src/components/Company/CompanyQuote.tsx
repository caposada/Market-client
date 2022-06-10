import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import { IQuote } from "../../utils/types";

type Props = {
    quote : IQuote | null
};

export default function CompanyQuote({ quote }: Props) {  

    if (quote !== null) {
        return (  
            <div>      
                <Row>
                    <Col md={5}>
                        <h5>Open</h5>
                    </Col>
                    <Col>
                        {quote.openingPrice}
                    </Col>
                </Row>
                <Row>
                    <Col md={5}>
                        <h5>Previous Close</h5>
                    </Col>
                    <Col>
                        {quote.previousClosingPrice}
                    </Col>
                </Row>
                <Row>
                    <Col md={5}>
                        <h5>High</h5>
                    </Col>
                    <Col>
                        {quote.highestPrice}
                    </Col>
                </Row>
                <Row>
                    <Col md={5}>
                        <h5>Low</h5>
                    </Col>
                    <Col>
                        {quote.lowestPrice}
                    </Col>
                </Row>
                <Row>
                    <Col md={5}>
                        <h5>Price</h5>
                    </Col>
                    <Col>
                        {quote.price}
                    </Col>
                </Row>
                <Row>
                    <Col md={5}>
                        <h5>Volume</h5>
                    </Col>
                    <Col>
                        {quote.volume}
                    </Col>
                </Row>
                <Row>
                    <Col md={5}>
                        <h5>Change</h5>
                    </Col>
                    <Col>
                        {quote.change} ({quote.changePercent} %)
                    </Col>
                </Row>
            </div> 
        );
    } else {
        return (
            <>
                <Spinner animation="border" role="status" size="sm" variant="primary" />{' '}<span>Loading...</span>
            </>
        )        
    }
}