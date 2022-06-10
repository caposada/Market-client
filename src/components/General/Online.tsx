import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dateFormat from "dateformat";
import { 
  SelectMessageCount,
  SelectMessage, 
  SelectIsConnected, 
  SendWebsocketEcho
} from '../../store/websocketSlice';
import Badge from 'react-bootstrap/Badge';
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from '../../store/hooks';

export default function Online() {
  const messageCount = useAppSelector(SelectMessageCount);
  const message = useAppSelector(SelectMessage);
  const isConnected = useAppSelector(SelectIsConnected);
  const dispatch = useAppDispatch();

  useEffect(websocketEvent, [messageCount, message, dispatch]);  

  function websocketEvent() {
    if (message != null ) {
      const time = dateFormat( new Date().getTime(), "h:MM:ss TT");
      if (message.Root === "MarketApp") {
        if (message.EventName === "Echo") {
          toast.info(`${time} - A message "${message.Data}" has been sent.`);        
        }
      } else if (message.Root === "NewsManager") {
        if (message.EventName === "FreshArrivals") { 
          toast.info(`NewsManager (${time}) - ${message.Name} has ${message.Data} new News Item(s).`);    
        }
      } else if (message.Root === "Gatherer") {
        if (message.EventName === "InterestedItemsChanged" && message.Data !== null) {
          const count = Number(message.Data);
          if (count < 0) 
            toast.info(`Gatherer (${time}) - ${Math.abs(count)} item(s) removed.`); 
          else if (count > 0)
            toast.info(`Gatherer (${time}) - ${count} new item(s) added.`); 
          else
            toast.info(`Gatherer (${time}) - nothing new`); 
        }
      } 
    }
  }

  function sendWebsocketTest() {
    dispatch(SendWebsocketEcho());
  }

  return (
    <div> 
        <Badge 
        bg={isConnected === true ? "success" : "secondary"} 
        onClick={sendWebsocketTest}>
          {isConnected === true ? "Open" : "Closed"}
        </Badge>
        <ToastContainer 
            position="top-right"
            autoClose={10000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover />
    </div>
  );
}