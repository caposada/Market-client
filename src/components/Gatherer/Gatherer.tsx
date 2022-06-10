import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { BorderCol } from "../../utils/styling";
import { useEffect } from "react";
import InterestingItems from './InterestingItems';
import InterestingItemDetails from './InterestingItemDetails';
import AtoZpicker from "../Shared/AtoZpicker";
import SourcePicker from "../Shared/SourcePcker";
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { 
    SelectTotalInterestingItemsCount,
    SelectTotalNonInterestingItemsCount,
    SelectSourceItems,
    SelectHasTimeSeries,
    SelectNameStartsWith,
    SelectSymbolStartsWith,
    SelectSourceId,
    GetDetails,
    SetHasTimeSeries,
    SetNameStartsWith,
    SetSymbolStartsWith,
    SetSourceId
} from '../../store/gathererSlice';
import { 
    SelectMessageCount,
    SelectMessage
} from '../../store/websocketSlice';

export default function Gatherer() {
    const messageCount = useAppSelector(SelectMessageCount);
    const message = useAppSelector(SelectMessage);
    const totalInterestingItemsCount = useAppSelector(SelectTotalInterestingItemsCount);
    const totalNonInterestingItemsCount = useAppSelector(SelectTotalNonInterestingItemsCount);
    const hasTimeSeries = useAppSelector(SelectHasTimeSeries);
    const nameStartsWith = useAppSelector(SelectNameStartsWith);
    const symbolStartsWith = useAppSelector(SelectSymbolStartsWith);
    const sourceId = useAppSelector(SelectSourceId);
    const sourceItems = useAppSelector(SelectSourceItems);
    const dispatch = useAppDispatch();

    useEffect(refresh, [dispatch]);
    useEffect(websocketEvent, [messageCount, message, dispatch]);  

    function websocketEvent() {
        if (message != null ) {
            if (message.Root === "Gatherer") {
                if (message.EventName === "InterestedItemsChanged" && message.Data !== null && message.Data !== "0") {
                    dispatch(GetDetails());      
                }
            }
        }
    }

    function refresh() {
        dispatch(GetDetails());
    }

    function changeNameStartsWith(letters: string) {
        dispatch(SetNameStartsWith(letters))
    }

    function changeSymbolStartsWith(letters: string) {
        dispatch(SetSymbolStartsWith(letters.toUpperCase()))
    }

    function changeSource(sourceId: string) {
        dispatch(SetSourceId(sourceId))
    }

    function changeHasTimeSeries() {
        dispatch(SetHasTimeSeries(!hasTimeSeries))
    }

    function clear() {
        dispatch(SetNameStartsWith(""))        
        dispatch(SetSymbolStartsWith(""))     
        dispatch(SetSourceId(""))
    }

    return (
        <Container>
            <Row>
                <BorderCol>
                    <h3>
                        Gatherer
                    </h3>

                    <Row>
                        <Col md={8}>
                            <h5>No. of interesing items</h5>
                        </Col>
                        <Col md={4}>
                            {totalInterestingItemsCount}
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col md={8}>
                            <h5>No. of non-interesing items</h5>
                        </Col>
                        <Col md={4}>
                            {totalNonInterestingItemsCount}
                        </Col>
                    </Row>

                    <Row>
                        <Col md={8}>
                            <h5>Show only items with Time Series?</h5>
                        </Col>
                        <Col md={4}>
                        <ToggleButton
                            className="mb-2"
                            id="toggle-check"
                            type="checkbox"
                            variant="outline-primary"
                            checked={hasTimeSeries}
                            value="1"
                            onChange={changeHasTimeSeries}
                        >
                            {hasTimeSeries ? "Yes" : "No" }
                        </ToggleButton>
                            {hasTimeSeries}
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

                    <Row>
                        <Col md={8}>
                            <h5>Select (Source)</h5>
                        </Col>
                    </Row>       
                    <SourcePicker 
                    sourceItems={sourceItems} 
                    sourceId={sourceId}
                    changeSource={changeSource} />

                    <Button 
                    onClick={clear}
                    variant="primary" 
                    size="sm">Clear</Button>   

                </BorderCol>
                <BorderCol>
                    <InterestingItems />
                </BorderCol>
                <BorderCol>
                    <InterestingItemDetails />
                </BorderCol>
            </Row>
        </Container>        
    );
}