import { combineReducers, configureStore } from '@reduxjs/toolkit'
import websocketReducer from './websocketSlice'
import gathererReducer from './gathererSlice'
import newsReducer from './newsSlice'
import companyReducer from './companySlice'
import marketReducer from './marketSlice'
import websocketMiddleware from './websocketMiddleware'

const rootReducer = combineReducers({ 
  websocket: websocketReducer,
  gatherer: gathererReducer,
  news: newsReducer,
  company: companyReducer,
  market: marketReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([ websocketMiddleware ])
  }
})

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;