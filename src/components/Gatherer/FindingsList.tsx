import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CompanyBadge from "../Shared/CompanyBadge"
import { useAppSelector } from '../../store/hooks'
import { 
    SelectInterestingItemDetails
} from '../../store/gathererSlice'
import { 
    RightJustifiedButton,
    ScrollingBorderlessContainer
} from "../../utils/styling"
import { IFinding, IInterestingItemDetails, IFindingInfo } from "../../utils/types";

type Props = {
    details: IInterestingItemDetails
    setFindingInfo: Function
};

export default function FindingsList({ details, setFindingInfo }: Props) {

    console.log(`render:FindingsList`);

    if (details.findings != null) {
        
        const findingInfos: IFindingInfo[] = [];

        if (details !== null) {
            details.findings.forEach((finding) => {
                const timeSeries = details.timeSerieses.find(x => x.symbol === finding.company.symbol);
                if (timeSeries !== undefined) {
                    findingInfos.push({
                        company: finding.company,
                        confidence: finding.confidence,
                        timeSeries: timeSeries,
                        title: details.title,
                        text: details.text,
                        publishDate: details.publishDate,
                        feedType: details.feedType
                    })
                }
            });
        }

        //console.log("findingInfo:" + findingInfo)

        return (
            <ScrollingBorderlessContainer height="100px">
                {
                    findingInfos.map((findingInfo, index) => {
                        if (findingInfo.timeSeries) {
                            return (    
                                <Row key={index} className="mt-1">            
                                    <Col md={4}>
                                        <CompanyBadge company={findingInfo.company} confidence={findingInfo.confidence} />
                                    </Col>  
                                    <Col md={6}>
                                        {findingInfo.company.name}
                                    </Col>   
                                    <Col md={2}>                
                                        <RightJustifiedButton onClick={() => setFindingInfo(findingInfo)} size="sm"><i className="bi bi-graph-up-arrow"></i></RightJustifiedButton>
                                    </Col>
                                </Row> 
                            )
                        } else {
                            return (   
                                <Row key={index} className="mt-1">              
                                    <Col md={4}>
                                        <CompanyBadge company={findingInfo.company} confidence={findingInfo.confidence} />
                                    </Col>                           
                                    <Col md={8}>
                                        {findingInfo.company.name}
                                    </Col>
                                </Row>                                    
                            )
                        }
                    })
                }
            </ScrollingBorderlessContainer>
        )
    }  else {
        return (<></>)
    }  
}