import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { FeedType } from "../../utils/types";

function getLinkUrl(url: string, feedType: FeedType) {
    if (url !== null) {
        if (feedType === FeedType.TwitterFeed) 
            url = "https://twitter.com/" + url; // Prefix this only if it's a Twitter feed
        return url;
    } else {
        return "";
    }
}

type Props = {
    url: string, 
    feedType: FeedType
};

export default function FeedGotoRow({ url, feedType } : Props) {

    const linkUrl = getLinkUrl(url, feedType);

    return (
        <Row>                
            <Col md={4}>
                <h5>Url</h5>
            </Col>
            <Col md={6}><Form.Control type="title" value={linkUrl} size='sm' readOnly/></Col>
            <Col md={2}>                     
                <OverlayTrigger
                key="ChangePolling"
                placement="bottom"
                overlay={ <Tooltip id="tooltip-ChangePolling">Goto feed</Tooltip>} >
                    <a href={linkUrl} target="_blank" rel="noreferrer" ><Button size="sm"><i className="bi bi-box-arrow-up-right"></i></Button></a>
                </OverlayTrigger> 
            </Col>             
        </Row>  
    )
}