import { 
  StartConnecting,
  ConnectionOpen,
  ConnectionClosed,
  MessageReceived
} from './websocketSlice';
import Constants from "../utils/constants";
import { Middleware } from 'redux';
import { RootState } from '../store';

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
    store.dispatch(MessageReceived(message));
  }
 
  next(action);
}
 
export default websocketMiddleware;