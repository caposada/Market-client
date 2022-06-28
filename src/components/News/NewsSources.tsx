import { useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NewsSource from "./NewsSource";
import NewsSourcesControl from "./NewsSourcesControl"
import { ScrollingContainer } from "../../utils/styling";
import { 
  SelectSourceIds,
  GetNewsSources
} from '../../store/newsSlice';
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from '../../store/hooks';

export default function NewsSources() {  
  const [selectId, setSelectedId] = useState<string | null>(null);
  const sourceIds = useAppSelector(SelectSourceIds);
  const dispatch = useAppDispatch();
  
  //console.log("render:NewsSources");

  useEffect(refresh, [dispatch]);
  
  function refresh() {
    dispatch(GetNewsSources());
  }

  return (
    <div>
      <NewsSourcesControl numOfSources={sourceIds.length} />

      <ScrollingContainer className="p-1" >
        {
          sourceIds.map((sourceId, index) => {
            return (
              <Row key={sourceId}>
                <Col>
                  <NewsSource 
                    onSelection={(selectId: string) => setSelectedId(selectId)}
                    isSelected={sourceId === selectId}
                    id={sourceId} />
                </Col>
              </Row>
            )
          })
        }
      </ScrollingContainer>    
        
    </div>
  );
}