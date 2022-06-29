import Card from 'react-bootstrap/Card'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Badge from 'react-bootstrap/Badge'
import { 
  GetNewsSourceDetails,
  GetNewsItems,
  ForceUpdate,
  RemoveSource,
  SelectNewsSourceItem
} from '../../store/newsSlice'
import { RightJustifiedButton, ClickableCard } from "../../utils/styling"
import { FeedType } from "../../utils/types"
import Confirmation from "../Shared/Confirmation"
import FeedGotoRow from "../Shared/FeedGotoRow"
import FeedTypeRow from "../Shared/FeedTypeRow"
import FeedTimeZoneRow from "./FeedTimeZoneRow"
import FeedLastPollRow from "../Shared/FeedLastPollRow"
import FeedIsPollingRow from "./FeedIsPollingRow"
import FeedTimespanRow from "./FeedTimespanRow"
import FeedLastPublishedRow from "./FeedLastPublishedRow"
import FeedNewsItemsRow from "./FeedNewsItemsRow"
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { useState, useEffect } from "react"

type Props = {
  id: string, 
  isSelected: boolean, 
  onSelection: Function
};

export default function NewsSource({ id, isSelected, onSelection } : Props) { 
  const details = useAppSelector(SelectNewsSourceItem(id));  
  const dispatch = useAppDispatch();
  const [confirmationShow, setConfirmationShow] = useState(false);
  
  //console.log(`render:NewsSource [${id}]`);

  useEffect(refresh, [id, dispatch]);  

  function refresh() {
    dispatch(GetNewsSourceDetails(id));
  }

  function remove() {
    dispatch(RemoveSource(id));    
  }

  function cardClicked() {
    dispatch(GetNewsItems(id));
    onSelection(id);
  }

  function refreshClicked(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation(); 
    refresh();
  }

  function updateClicked(e: React.MouseEvent<HTMLButtonElement>) {  
    e.stopPropagation();   
    dispatch(ForceUpdate(id));
  }

  function deleteClicked(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation(); 
    setConfirmationShow(true);
  }

  if (details != null) {    
    const lastPoll = details.lastPoll ?? new Date();
    const isPolling = details.isPolling ?? false;
    const pollingTimespan = details.pollingTimespan ?? "";
    const lastPublished = details.newsItems_LastPublished ?? new Date(); 
    const newsItems_Count = details.newsItems_Count ?? 0;
    const feedType = details.feedType ?? FeedType.RssFeed;  
    const url = details.url ?? "";
    const timezone = details.timezone ?? "";
    const confirmationHeading = "Delete Source";
    const confirmationBody = "Are you sure you want to delete this source?"; 
    
    return (
      <div> 
        <ClickableCard
        border={isSelected ? "primary" : "secondary" }
        key={id}
        className="mb-2" 
        onClick={cardClicked} >
          <Card.Header>    
            <Badge bg="secondary">
              {FeedType[feedType]} 
            </Badge>                      
            <OverlayTrigger
            key="refresh"
            placement="bottom"
            overlay={<Tooltip id="tooltip-refresh">Refresh details</Tooltip>} >
              <RightJustifiedButton onClick={refreshClicked} size="sm"><i className="bi bi-arrow-clockwise"></i></RightJustifiedButton>
            </OverlayTrigger>{' '}
            <OverlayTrigger
            key="isPolling"
            placement="bottom"
            overlay={<Tooltip id="tooltip-isPolling">Force update</Tooltip>} >
              <RightJustifiedButton onClick={updateClicked} size="sm"><i className="bi bi-arrow-left-right"></i></RightJustifiedButton>
            </OverlayTrigger>{' '}
            <OverlayTrigger
            key="remove"
            placement="bottom"
            overlay={<Tooltip id="tooltip-remove">Remove this source</Tooltip>} >
              <RightJustifiedButton onClick={deleteClicked} size="sm" variant="danger"><i className="bi bi-x-lg"></i></RightJustifiedButton>
            </OverlayTrigger>{' '}
          </Card.Header>
          <Card.Body>
            <Card.Title>
              <h4>{details.title}</h4>
            </Card.Title>
            
            <FeedGotoRow url={url} feedType={feedType} />

            <FeedTypeRow feedType={feedType} />

            <FeedTimeZoneRow id={id} timezone={timezone} />
            
            <FeedIsPollingRow id={id} isPolling={isPolling} />

            <FeedLastPollRow lastPoll={lastPoll} />
            
            <FeedTimespanRow id={id} pollingTimespan={pollingTimespan} />

            <FeedLastPublishedRow lastPublished={lastPublished} />

            <FeedNewsItemsRow newsItems_Count={newsItems_Count} />
            
          </Card.Body>
        </ClickableCard>
        
        { confirmationShow === true ? 
        <Confirmation 
        setShow={setConfirmationShow} 
        confirmed={remove}
        heading={confirmationHeading}
        body={confirmationBody} /> : 
        <></> } 

      </div>    
    );
  } else {
    return <></>
  }
}