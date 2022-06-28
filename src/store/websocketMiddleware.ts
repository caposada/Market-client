import { 
  StartConnecting,
  ConnectionOpen,
  ConnectionClosed,
  MessageReceived
} from './websocketSlice';
import Constants from "../utils/constants";
import { Middleware } from 'redux';
import { RootState } from '../store';
import { IMessage } from "../utils/types";
import companyMessageHandler from "./companyMessageHandler"
import gathererMessageHandler from "./gathererMessageHandler"
import marketMessageHandler from "./marketMessageHandler"
import newsMessageHandler from "./newsMessageHandler"

function ActOnMessage(message: IMessage) {
  if (message != null ) {
    switch (message.Root) {
      case "Company": companyMessageHandler(message); break;
      case "Gatherer": gathererMessageHandler(message); break;
      case "GathererInformation": gathererMessageHandler(message); break;
      case "Market": marketMessageHandler(message); break;
      case "NewsManager": newsMessageHandler(message); break;
    }
  }
}

const websocketMiddleware: Middleware<{}, RootState> = store => next => action => {
  if (!StartConnecting.match(action)) {
    return next(action);
  }
  
  const webSocket = new WebSocket(Constants.BASE_WEBSOCKET_URL + "websocket");

  webSocket.onopen = () => {
    store.dispatch(ConnectionOpen());
  }

  webSocket.onclose = () => {
    store.dispatch(ConnectionClosed());
    setTimeout(() => {
      store.dispatch(StartConnecting());
    }, 5000);
  }

  webSocket.onmessage = (event) => {
    var message = JSON.parse(event.data);

    ActOnMessage(message);

    store.dispatch(MessageReceived(message));
  }
 
  next(action);
}
 
export default websocketMiddleware;