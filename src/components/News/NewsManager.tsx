import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NewsSources from './NewsSources';
import NewsItems from './NewsItems';
import { BorderCol } from "../../utils/styling";
import { useEffect } from "react";
import { 
    SelectTotalNumberOfNewsItems,
    SelectSourceIds,
    SelectEarliest,
    SelectLatest,
    SelectNumberOfRssFeeds,
    SelectnNmberOfTwitterFeeds,
    GetNewsManagerDetails,
    GetNewsSourceDetails
} from '../../store/newsSlice';
import dateFormat from "dateformat";
import { 
    SelectMessageCount,
    SelectMessage
} from '../../store/websocketSlice';
import { useAppSelector, useAppDispatch } from '../../store/hooks';

export default function NewsManager() {
    const messageCount = useAppSelector(SelectMessageCount);
    const message = useAppSelector(SelectMessage);
    const totalNumberOfNewsItems = useAppSelector(SelectTotalNumberOfNewsItems);
    const sourceIds = useAppSelector(SelectSourceIds);
    const earliest = useAppSelector(SelectEarliest);
    const latest = useAppSelector(SelectLatest);
    const numberOfRssFeeds = useAppSelector(SelectNumberOfRssFeeds);
    const nmberOfTwitterFeeds = useAppSelector(SelectnNmberOfTwitterFeeds);
    const dispatch = useAppDispatch();
    
    const earliestFormated = earliest != null ? dateFormat(new Date(earliest), "dd/mm/yyyy hh:MM:ss tt") : "";
    const latestFormated = latest != null ? dateFormat(new Date(latest), "dd/mm/yyyy hh:MM:ss tt") : "";

    useEffect(refresh, [dispatch]);
    useEffect(websocketEvent, [messageCount, message, dispatch]);  

    function websocketEvent() {
        if (message != null ) {
          if (message.Root === "NewsManager") {
            if (message.EventName === "FreshArrivals") {
              dispatch(GetNewsManagerDetails());       
            } else if (message.EventName === "SourceMonitorChanged") {
              dispatch(GetNewsSourceDetails(message.Id)); // SourceId
            }
          }
        }
    }

    function refresh() {
        dispatch(GetNewsManagerDetails());
    }

    return (
        <Container>
            <Row>
                <BorderCol>
                    <h3>
                        News Manager
                    </h3>
                    <Row>
                        <Col md={6}>
                            <h5>Total news items</h5>
                        </Col>
                        <Col md={6}>
                            {totalNumberOfNewsItems}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h5>No. of sources</h5>
                        </Col>
                        <Col md={6}>
                            {sourceIds.length}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h5>Rss Feed(s)</h5>
                        </Col>
                        <Col md={6}>
                            {numberOfRssFeeds}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h5>Twitter Feed(s)</h5>
                        </Col>
                        <Col md={6}>
                            {nmberOfTwitterFeeds}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h5>Earliest</h5>
                        </Col>
                        <Col md={6}>
                            {earliestFormated}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h5>Latest</h5>
                        </Col>
                        <Col md={6}>
                            {latestFormated}
                        </Col>
                    </Row>
                </BorderCol>
                <BorderCol>
                    <NewsSources sourceIds={sourceIds}  />
                </BorderCol>
                <BorderCol>
                    <NewsItems />
                </BorderCol>
            </Row>
        </Container>         
    );
}