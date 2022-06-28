import { useState } from "react";
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import AddSourceModal from "./AddSourceModal";
import { 
  ForceUpdateAll
} from '../../store/newsSlice';
import { useAppDispatch } from '../../store/hooks';

type Props = {
    numOfSources: number
};

export default function NewsSourcesControl({ numOfSources } : Props) {  
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();
  
  //console.log("render:NewsSourcesControl");

  function updateClicked(e: React.MouseEvent<HTMLButtonElement>) {  
    e.stopPropagation();   
    dispatch(ForceUpdateAll());
  }

  return (
    <div>
      <h3>
        Sources ({numOfSources}){' '}
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
      
      { show === true ?  <AddSourceModal setShow={setShow} /> : <></> }
        
    </div>
  );
}