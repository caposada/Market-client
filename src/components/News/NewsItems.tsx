import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NewsItem from "./NewsItem";
import { ScrollingContainer } from "../../utils/styling";
import { useAppSelector } from '../../store/hooks';
import { SelectNewsItems } from '../../store/newsSlice';

export default function NewsItems() {
    const newsItems = useAppSelector(SelectNewsItems);

    return (
        <div>
            <h3>News Items ({newsItems.length})</h3>
            <ScrollingContainer className="p-1">
                {
                    newsItems.map((newsItem) => {
                        return (
                        <Row key={newsItem.id}>
                            <Col>
                                <NewsItem newsItem={newsItem} />
                            </Col>
                        </Row>
                        );
                    })
                }
            </ScrollingContainer>
        </div>
    );
}