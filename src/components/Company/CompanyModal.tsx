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
    GetTimeSeries
} from '../../store/marketSlice';
import { useEffect } from "react";
import { makeRequest, Response } from "../../utils/requests";
import Constants from "../../utils/constants";
import CompanyLatest from "./CompanyLatest";
import MarketDataStatusIndicator from "./MarketDataStatusIndicator";


export default function CompanyModal() {
    const info = useAppSelector(SelectInfo);  
    const quote = useAppSelector(SelectQuote);  
    const timeSeries = useAppSelector(SelectTimeSeries);  
    const timeSeriesInterval = useAppSelector(SelectTimeSeriesInterval);
    const marketDataStatus = useAppSelector(SelectMarketDataStatus);
    const dispatch = useAppDispatch();  
    
    useEffect(loadQuote, [info, dispatch]);
    useEffect(loadTimeSeriesData, [info, timeSeriesInterval, dispatch]);

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