import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import CompanyBadge from "../Shared/CompanyBadge"
import TextInfoModal from "./TextInfoModal"
import FeedGotoRow from "../Shared/FeedGotoRow"
import FeedTypeRow from "../Shared/FeedTypeRow"
import FeedLastPollRow from "../Shared/FeedLastPollRow"
import FindingInfoModal, { ILocalFinding } from "./FindingInfoModal"
import dateFormat from "dateformat"
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { 
    SelectInterestingItemDetails,
    MarkNotInteresting,
    ResetInterestingItemDetails
} from '../../store/gathererSlice'
import { RightJustifiedButton } from "../../utils/styling"
import { useState } from "react"

export default function InterestingItemDetails() {
    const [breakdownId, setBreakdownId] = useState<string | null>(null);
    const [findingInfo, setFindingInfo] = useState<ILocalFinding | null>(null);
    const interestingItemDetails = useAppSelector(SelectInterestingItemDetails);
    const dispatch = useAppDispatch();

    function getFindings() {
        const findings: ILocalFinding[] = [];

        if (interestingItemDetails !== null) {
            interestingItemDetails.findings.forEach((finding) => {
                const timeSeries = interestingItemDetails.timeSerieses.find(x => x.symbol === finding.company.symbol);
                findings.push({
                    company: finding.company,
                    confidence: finding.confidence,
                    timeSeries: timeSeries
                })
            });
        }

        return findings;
    }

    function showBreakdown() {
        if (interestingItemDetails !== null)
            setBreakdownId(interestingItemDetails.id);
    }

    function showGraph(finding: ILocalFinding) {
        setFindingInfo(finding);
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
                    {
                        getFindings().map((finding) => {
                            if (finding.timeSeries) {
                                return (    
                                    <Row key={finding.company.symbol}>            
                                        <Col md={4}>
                                            <CompanyBadge company={finding.company} confidence={finding.confidence} />
                                        </Col>  
                                        <Col md={6}>
                                            {finding.company.name}
                                        </Col>   
                                        <Col md={2}>                
                                            <RightJustifiedButton onClick={() => showGraph(finding)} size="sm"><i className="bi bi-graph-up-arrow"></i></RightJustifiedButton>
                                        </Col>
                                    </Row> 
                                )
                            } else {
                                return (   
                                    <Row key={finding.company.symbol}>              
                                        <Col md={4}>
                                            <CompanyBadge company={finding.company} confidence={finding.confidence} />
                                        </Col>                           
                                        <Col md={8}>
                                            {finding.company.name}
                                        </Col>
                                    </Row>                                    
                                )
                            }
                        })
                    }

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
                finding={findingInfo} 
                details={interestingItemDetails} 
                setFindingInfo={setFindingInfo} /> : 
                <></> }
            </div>  
        )
    }  else {
        return (<></>)
    }  
}