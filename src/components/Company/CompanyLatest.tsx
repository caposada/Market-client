import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { BorderCol } from "../../utils/styling";
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { 
    SelectTimeSeriesInterval,
    SetTimeSeriesInterval
} from '../../store/marketSlice';
import CompanyQuote from "./CompanyQuote";
import CompanyTimeSeries from "./CompanyTimeSeries";
import { Interval, IQuote, ITimeSeries } from "../../utils/types";

type Props = {
    quote : IQuote | null, 
    timeSeries: ITimeSeries | null
};

export default function CompanyLatest({ quote, timeSeries}: Props) {    
    const timeSeriesInterval = useAppSelector(SelectTimeSeriesInterval);  
    const dispatch = useAppDispatch();  

    const timeIntervalChoices = [Interval.Min1, Interval.Min5, Interval.Min15, Interval.Min30, Interval.Min60, Interval.Daily, Interval.Weekly, Interval.Monthly];

    function changeTimeSeriesInterval(timeIntervalChoice: Interval) {
        dispatch(SetTimeSeriesInterval(timeIntervalChoice))
    }

    return (  
        <Container>   
            <Row>
                <BorderCol md={{ span: 3, offset: 0 }}>
                    <h3> 
                        Quote{' '}
                    </h3>
                    <CompanyQuote quote={quote} />                          
                </BorderCol>
                <BorderCol md={{ span: 9, offset: 0 }}>
                    <h3>
                        Time Series{' '}
                    </h3>
                    <ButtonGroup className="mb-1">
                    {
                        timeSeries !== null ? 
                        timeIntervalChoices.map((timeIntervalChoice, index) => {
                            return (
                                <Button key={timeIntervalChoice}
                                variant={timeIntervalChoice === timeSeriesInterval ? "primary" : "secondary"}
                                size='sm' 
                                onClick={() => changeTimeSeriesInterval(timeIntervalChoice)}>
                                    {Interval[timeIntervalChoice]}
                                </Button>
                            )
                        }) :
                        <></>
                    }
                    </ButtonGroup>
                    <CompanyTimeSeries timeSeries={timeSeries} />
                </BorderCol>
            </Row>
        </Container> 
    );
}