import Card from 'react-bootstrap/Card';
import dateFormat from "dateformat";
import { INewsItem } from "../../utils/types";

type Props = {
  newsItem: INewsItem
};

export default function NewsItem({ newsItem } : Props) {   

  const dateTime = dateFormat(new Date(newsItem.publishDate), "dd/mm/yyyy hh:MM:ss tt");

  return (
    <Card
        bg="Secondary"
        key={newsItem.id}
        className="mb-2" >
        <Card.Header>
              {dateTime}
        </Card.Header>
        <Card.Body>
            <Card.Text>
                {newsItem.text}
            </Card.Text>
        </Card.Body>
    </Card>
  );
}