import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import TextInfoModal from "./TextInfoModal"
import FeedGotoRow from "../Shared/FeedGotoRow"
import FeedTypeRow from "../Shared/FeedTypeRow"
import FeedLastPollRow from "../Shared/FeedLastPollRow"
import FindingInfoModal from "./FindingInfoModal"
import FindingsList from "./FindingsList"
import dateFormat from "dateformat"
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { 
    SelectInterestingItemDetails,
    MarkNotInteresting,
    ResetInterestingItemDetails
} from '../../store/gathererSlice'
import { 
    RightJustifiedButton
} from "../../utils/styling"
import { useState } from "react"
import { IFindingInfo } from "../../utils/types";

export default function InterestingItemDetails() {
    const [breakdownId, setBreakdownId] = useState<string | null>(null);
    const [findingInfo, setFindingInfo] = useState<IFindingInfo | null>(null);
    const interestingItemDetails = useAppSelector(SelectInterestingItemDetails);
    const dispatch = useAppDispatch();

    //console.log(`render:InterestingItemDetails`);

    function showBreakdown() {
        if (interestingItemDetails !== null)
            setBreakdownId(interestingItemDetails.id);
    }

    function deleteClicked() {
        dispatch(MarkNotInteresting({
            id: interestingItemDetails?.id
        }));
        dispatch(ResetInterestingItemDetails());
    }

    if (interestingItemDetails != null) {
        const newsPublishedDateTime = interestingItemDetails.publishDate != null ? dateFormat(new Date(interestingItemDetails.publishDate), "dd/mm/yyyy hh:MM:ss tt") : "";
        const newsPollDateTime = interestingItemDetails.timestamp != null ? dateFormat(new Date(interestingItemDetails.timestamp), "dd/mm/yyyy hh:MM:ss tt") : "";
        const sourceLastPollDateTime = interestingItemDetails.lastPoll ?? new Date(); 
        
        return (
            <div>
                <Container>
                    <h3>
                        Details                       
                        <OverlayTrigger
                        key="remove"
                        placement="bottom"
                        overlay={<Tooltip id="tooltip-remove">Delete this item from InterestingItems list</Tooltip>} >
                        <RightJustifiedButton onClick={deleteClicked} size="sm" variant="danger"><i className="bi bi-x-lg"></i></RightJustifiedButton>
                        </OverlayTrigger> 
                    </h3>
                    <Row>
                        <Col md={4}>
                            <h5>Text</h5>
                        </Col>
                        <Col md={8}>
                            {interestingItemDetails.text}
                            <OverlayTrigger
                            key="isPolling"
                            placement="bottom"
                            overlay={<Tooltip id="tooltip-info">See info about this text</Tooltip>} >
                                <RightJustifiedButton onClick={showBreakdown} size="sm"><i className="bi bi-info-circle"></i></RightJustifiedButton>
                            </OverlayTrigger>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <h5>Published</h5>
                        </Col>
                        <Col md={8}>
                            {newsPublishedDateTime}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <h5>Polled</h5>
                        </Col>
                        <Col md={8}>
                            {newsPollDateTime}
                        </Col>
                    </Row>

                    <Row className="mt-3">
                        <h4>Company(s)</h4>
                    </Row>

                    <Row>
                        <FindingsList 
                        details={interestingItemDetails} 
                        setFindingInfo={setFindingInfo} />
                    </Row>

                    <Row className="mt-3">
                        <h4>Source</h4>
                    </Row>

                    <FeedTypeRow feedType={interestingItemDetails.feedType} />

                    <Row>
                        <Col md={4}>
                            <h5>Title</h5>
                        </Col>
                        <Col md={8}>
                            {interestingItemDetails.title}
                        </Col>
                    </Row>
            
                    <FeedGotoRow url={interestingItemDetails.url} feedType={interestingItemDetails.feedType} />

                    <FeedLastPollRow lastPoll={sourceLastPollDateTime} />
                    
                </Container>   
                
                { breakdownId !== null ? 
                <TextInfoModal 
                text={interestingItemDetails.text}
                findings={interestingItemDetails.findings}
                interestingItemId={breakdownId} 
                setInterestingItemId={setBreakdownId} /> : 
                <></> }

                { findingInfo !== null ? 
                <FindingInfoModal 
                findingInfo={findingInfo} 
                setFindingInfo={setFindingInfo} /> : 
                <></> }
            </div>  
        )
    }  else {
        return (<></>)
    }  
}