import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BorderCol } from "../../utils/styling";
import CompanyTimeSeries from "../Company/CompanyTimeSeries"
import CompanyBadge from "../Shared/CompanyBadge"
import dateFormat from "dateformat"
import { FeedType, IInterestingItemDetails, ICompany, AnalysisConfidence, ITimeSeries } from "../../utils/types";

export interface ILocalFinding {
    company: ICompany
    confidence: AnalysisConfidence
    timeSeries?: ITimeSeries | null
}

function getPreviousDate(date: Date) {
    // publishDate.setDate(publishDate.getDate()-2); // 2 days back from PublishedDate
    //const d = publishDate.getDate()-2;
    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()-2)
}

type Props = {
    details: IInterestingItemDetails, 
    finding: ILocalFinding, 
    setFindingInfo: Function
};

export default function FindingInfoModal({ details, finding, setFindingInfo }: Props) {

    const timeSeries: ITimeSeries | null = 
        details.timeSerieses != null 
        ? details.timeSerieses.find(x => x.symbol === finding.company.symbol) as ITimeSeries
        : null;
    const publishDate = new Date(details.publishDate);
    const newsPublishedDateTime = dateFormat(publishDate, "dd/mm/yyyy hh:MM:ss tt");
    const fromDate = getPreviousDate(publishDate);
    const feedTypeString = FeedType[details.feedType];

    const handleClose = () => setFindingInfo(null);

    return (  
        <Modal 
        show={true} 
        size="xl"
        onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title> 
                    Finding Information
                </Modal.Title>
            </Modal.Header>
            <Modal.Body> 
                
                <Container>     
                    <Row>
                        <BorderCol md={{ span: 12, offset: 0 }}>
                            <h4>
                                Text
                            </h4>
                            {details.text}
                        </BorderCol>
                    </Row>
                    <Row>
                        <BorderCol md={{ span: 3, offset: 0 }}> 
                            <Row className="mt-3">
                                <h4>Published</h4>
                            </Row>
                            {newsPublishedDateTime}

                            <Row className="mt-3">
                                <h4>Company</h4>
                            </Row>
                            <CompanyBadge clickable={false} company={finding.company}  />{' '}{finding.company.name}                                
                       
                            <Row className="mt-3">
                                <h4>Source</h4>
                            </Row>
                            {details.title}{' '}({feedTypeString})
                        </BorderCol>
                        <BorderCol md={{ span: 9, offset: 0 }}>
                            <h3>
                                Time Series (Min15)
                            </h3>
                            <CompanyTimeSeries timeSeries={timeSeries} fromDate={fromDate} />
                        </BorderCol>
                    </Row>
                </Container> 

            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
    );
}