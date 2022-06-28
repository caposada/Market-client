import store from '../store';
import { IMessage } from "../utils/types";
import { 
  GetDetails
} from './gathererSlice';

export default function gathererMessageHandler(message: IMessage) {
    if (message.EventName === "InterestedItemsChanged" && message.Data !== null && message.Data !== "0") {
        store.dispatch(GetDetails());      
    } else if (message.EventName === "InformationChanged") {
        store.dispatch(GetDetails());      
    }
}