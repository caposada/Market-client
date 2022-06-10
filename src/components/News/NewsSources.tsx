import { useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import NewsSource from "./NewsSource";
import AddSourceModal from "./AddSourceModal";
import { ScrollingContainer } from "../../utils/styling";
import { ForceUpdateAll } from '../../store/newsSlice';
import { useAppDispatch } from '../../store/hooks';

type Props = {
  sourceIds: string[]
};

export default function NewsSources({ sourceIds } : Props) {  
  const [show, setShow] = useState(false);
  const [selectId, setSelectedId] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  
  function updateClicked(e: React.MouseEvent<HTMLButtonElement>) {  
    e.stopPropagation();   
    dispatch(ForceUpdateAll());
  }

  return (
    <div>
      <h3>
        Sources ({sourceIds.length}){' '}
        <OverlayTrigger
        key="addSource"
        placement="bottom"
        overlay={<Tooltip id="tooltip-addSource">Add new source</Tooltip>} >
          <Button onClick={() => setShow(true)} size="sm"><i className="bi bi-plus-circle"></i></Button>
        </OverlayTrigger>{' '}
        <OverlayTrigger
        key="isPolling"
        placement="bottom"
        overlay={<Tooltip id="tooltip-isPolling">Force update for all</Tooltip>} >
          <Button onClick={updateClicked} size="sm"><i className="bi bi-arrow-left-right"></i></Button>
        </OverlayTrigger>
      </h3>
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
      
      { show === true ?  <AddSourceModal setShow={setShow} /> : <></> }
        
    </div>
  );
}