import store from '../store';
import { IMessage, MarketDataStatus } from "../utils/types";
import { 
  SetMarketDataStatus,
  GetMarketDetails
} from './marketSlice'
import { requestExecuted, getRequest } from "../utils/requests";

function getStatus(requestStatusString: string) {
  switch (requestStatusString) {
      case "OKAY" : 
          return MarketDataStatus.OKAY;
      case "LOADING" : 
          return MarketDataStatus.LOADING;
      case "DELAYED" : 
          return MarketDataStatus.DELAYED;
      case "OFFLINE" : 
          return MarketDataStatus.OFFLINE;      
      default: 
          return MarketDataStatus.OKAY;
  }
}

export default function marketMessageHandler(message: IMessage) {
    if (message.EventName === "StateChange" && message.Data !== null) {
        const status = getStatus(message.Data);
        store.dispatch(SetMarketDataStatus(status));
        store.dispatch(GetMarketDetails());
    } else if (message.EventName === "ResultReady" && message.Id) {  
        const request = getRequest(message.Id);
        if (request) {
            requestExecuted(message.Id);
        }
    }
}