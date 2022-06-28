import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect } from "react";
import { 
    SelectTotalNumberOfNewsItems,
    SelectSourceIds,
    SelectEarliest,
    SelectLatest,
    SelectNumberOfRssFeeds,
    SelectnNmberOfTwitterFeeds,
    GetNewsManagerDetails
} from '../../store/newsSlice';
import dateFormat from "dateformat";
import { useAppSelector, useAppDispatch } from '../../store/hooks';

export default function NewsDetails() {
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

    //console.log("render:NewsDetails");

    function refresh() {
        dispatch(GetNewsManagerDetails());
    }

    return (
        <div>
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
        </div>         
    );
}