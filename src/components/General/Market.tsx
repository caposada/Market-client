import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { 
    SelectMessageCount,
    SelectMessage,
    SelectIsConnected
} from '../../store/websocketSlice';
import { 
    SelectDetails,
    SelectMarketDataStatus,
    GetMarketDetails
} from '../../store/marketSlice';
import { useEffect } from "react";
import dateFormat from "dateformat";
import { MarketDataStatus, IMessage } from "../../utils/types";
import { getVariantBaseOnMarketDataStatus } from "../../utils/helpers";

export default function Market() {
    const messageCount = useAppSelector(SelectMessageCount);
    const message: IMessage | null = useAppSelector(SelectMessage);
    const isConnected = useAppSelector(SelectIsConnected);
    const marketDataStatus = useAppSelector(SelectMarketDataStatus);
    const details = useAppSelector(SelectDetails);
    const dispatch = useAppDispatch();

    const status = details ? details.status : MarketDataStatus.OKAY;
    const statusText = MarketDataStatus[status];
    const variant = getVariantBaseOnMarketDataStatus(status);
    
    const nextReadyTime = details && details.nextReady != null ? dateFormat(new Date(details.nextReady), "HH:MM") : "";
    const nextReady = status !== MarketDataStatus.DELAYED && status !== MarketDataStatus.OFFLINE ? "NOW" : nextReadyTime;

    useEffect(refresh, [isConnected, marketDataStatus, dispatch]);
    useEffect(websocketEvent, [messageCount, message, dispatch]);  

    function websocketEvent() {
        if (message != null ) {
            if (message.Root === "Market") {
                if (message.EventName === "StateChange" && message.Data !== null) {
                    dispatch(GetMarketDetails());
                }
            }
        }
    }

    function refresh() {
        dispatch(GetMarketDetails());
    }
    
    return (
        <Container>
            <Row>
                <Col md={8}>
                    Status
                </Col>
                <Col md={4}>
                    <Badge bg={variant} >{statusText}</Badge>
                </Col>
            </Row>
            <Row>
                <Col md={8}>
                    Next Ready
                </Col>
                <Col md={4}>
                    {nextReady}
                </Col>
            </Row>
            <Row>
                <Col md={8}>
                    Active Calls
                </Col>
                <Col md={4}>
                    {details && details.activeCallsCount}
                </Col>
            </Row>
            <Row>
                <Col md={8}>
                    CountInMinute Calls
                </Col>
                <Col md={4}>
                    {details && details.callCountInMinute}
                </Col>
            </Row>
            <Row>
                <Col md={8}>
                    Available Calls
                </Col>
                <Col md={4}>
                    {details && details.availableCalls}
                </Col>
            </Row>
        </Container>
    )
}