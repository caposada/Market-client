import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { 
    ThunkData,
    SelectInfo,
    SelectQuote,
    SelectTimeSeries,
    SelectTimeSeriesInterval,
    SelectMarketDataStatus,
    ResetData,
    GetQuote,
    GetTimeSeries,
    SetMarketDataStatus
} from '../../store/marketSlice';
import { 
    SelectMessageCount,
    SelectMessage 
} from '../../store/websocketSlice';
import { useEffect } from "react";
import { makeRequest, Response } from "../../utils/requests";
import Constants from "../../utils/constants";
import CompanyLatest from "./CompanyLatest";
import MarketDataStatusIndicator from "./MarketDataStatusIndicator";
import { MarketDataStatus, IMessage } from "../../utils/types";

function getStatus(requestStatusString: string) {
    switch (requestStatusString) {
        case "OKAY" : 
            return MarketDataStatus.OKAY;
        case "LOADING" : 
            return MarketDataStatus.LOADING;
        case "DELAYED" : 
            return MarketDataStatus.DELAYED;
        case "OFFLINE" : 
            return MarketDataStatus.OFFLINE;      
        default: 
            return MarketDataStatus.OKAY;
    }
}

export default function CompanyModal() {
    const messageCount = useAppSelector(SelectMessageCount);
    const message: IMessage | null = useAppSelector(SelectMessage);
    const info = useAppSelector(SelectInfo);  
    const quote = useAppSelector(SelectQuote);  
    const timeSeries = useAppSelector(SelectTimeSeries);  
    const timeSeriesInterval = useAppSelector(SelectTimeSeriesInterval);
    const marketDataStatus = useAppSelector(SelectMarketDataStatus);
    const dispatch = useAppDispatch();  
    
    useEffect(loadQuote, [info, dispatch]);
    useEffect(loadTimeSeriesData, [info, timeSeriesInterval, dispatch]);
    useEffect(websocketEvent, [messageCount, message, dispatch]);  

    function websocketEvent() {
        if (message != null ) {
            if (message.Root === "Market") {
                if (message.EventName === "StateChange" && message.Data !== null) {
                    const status = getStatus(message.Data);
                    //console.log("status: " + status);
                    dispatch(SetMarketDataStatus(status));
                }
            }
        }
    }

    function loadQuote() {
        if (info !== null) {
            const url = Constants.BASE_API_REST_URL + `Market/${info.symbol}/Quote`;
            makeRequest("Quote", url, (response : Response) => {
                const thunkData: ThunkData = {
                    id: response.id
                }
                dispatch(GetQuote(thunkData));
            })
        } 
    }

    function loadTimeSeriesData() {
        if (info !== null) {          
            const url = Constants.BASE_API_REST_URL + `Market/${info.symbol}/TimeSeries/${timeSeriesInterval}`;
            makeRequest("TimeSeries", url, (response : Response) => {
                const thunkData: ThunkData = {
                    id: response.id
                }
                dispatch(GetTimeSeries(thunkData));
            })
        } 
    }

    function handleClose() {
        dispatch(ResetData());
    }

    const show = info != null;
    const symbol = info != null ? info.symbol : null;
    const name = info != null ? info.name : null;     

    return (  
        <Modal 
        show={show} 
        size="xl"
        onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <Badge 
                    pill 
                    bg="secondary" >
                        {symbol}          
                    </Badge>{' '}
                    {name}{' '}
                    <MarketDataStatusIndicator status={marketDataStatus} />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body> 
                <CompanyLatest quote={quote} timeSeries={timeSeries} />
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
    );
}