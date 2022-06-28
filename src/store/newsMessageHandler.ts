import store from '../store';
import { IMessage } from "../utils/types";
import { 
  GetNewsSourceDetails,
  GetNewsManagerDetails
} from './newsSlice'

export default function newsMessageHandler(message: IMessage) {    
    if (message.EventName === "SourceMonitorChanged" && message.Id !== null) {
        store.dispatch(GetNewsSourceDetails(message.Id)); // SourceId
    } else if (message.EventName === "FreshArrivals") {
        store.dispatch(GetNewsManagerDetails());       
    }
}