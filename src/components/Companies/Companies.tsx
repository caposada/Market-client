import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import CompaniesList from "./CompaniesList";
import CompanyDetails from "./CompanyDetails";
import AtoZpicker from "../Shared/AtoZpicker";
import { BorderCol } from "../../utils/styling";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { 
    SelectNumberOfCompanies,
    SelectNameStartsWith,
    SelectSymbolStartsWith,
    GetDetails,
    SetNameStartsWith,
    SetSymbolStartsWith
} from '../../store/companySlice';

export default function Companies() {
    const numberOfCompanies = useAppSelector(SelectNumberOfCompanies);
    const nameStartsWith = useAppSelector(SelectNameStartsWith);
    const symbolStartsWith = useAppSelector(SelectSymbolStartsWith);
    const dispatch = useAppDispatch();

    useEffect(refresh, [dispatch]);
    
    function refresh() {
        dispatch(GetDetails());
    }

    function changeNameStartsWith(letters: string) {
        dispatch(SetNameStartsWith(letters))
    }

    function changeSymbolStartsWith(letters: string) {
        dispatch(SetSymbolStartsWith(letters.toUpperCase()))
    }

    function clear() {
        dispatch(SetNameStartsWith(""))        
        dispatch(SetSymbolStartsWith(""))
    }

    return (
        <Container>
            <Row>
                <BorderCol>
                    <h3>
                        Companies
                    </h3>
                    <Row>
                        <Col md={8}>
                            <h5>No. of compnaies</h5>
                        </Col>
                        <Col md={4}>
                            {numberOfCompanies}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={8}>
                            <h5>Search (Name)</h5>
                        </Col>
                    </Row>
                    <AtoZpicker startsWith={nameStartsWith} changeStartsWith={changeNameStartsWith} />                
                    <Row>
                        <Col md={8}>
                            <h5>Search (Symbol)</h5>
                        </Col>
                    </Row>
                    <AtoZpicker startsWith={symbolStartsWith} changeStartsWith={changeSymbolStartsWith} />                   
                    <Button 
                    onClick={clear}
                    variant="primary" 
                    size="sm">Clear</Button>
                </BorderCol>
                <BorderCol>
                    <CompaniesList />
                </BorderCol>
                <BorderCol>
                    <CompanyDetails />
                </BorderCol>
            </Row>
        </Container>        
    );
}