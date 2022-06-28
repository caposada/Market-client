import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import NewsDetails from "./NewsDetails"
import NewsSources from './NewsSources';
import NewsItems from './NewsItems';
import { BorderCol } from "../../utils/styling";

export default function NewsManager() {
    
    //console.log("render:NewsManager");

    return (
        <Container>
            <Row>
                <BorderCol>
                    <NewsDetails />
                </BorderCol>
                <BorderCol>
                    <NewsSources />
                </BorderCol>
                <BorderCol>
                    <NewsItems />
                </BorderCol>
            </Row>
        </Container>         
    );
}