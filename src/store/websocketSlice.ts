import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
import Constants from "../utils/constants";
import { RootState } from "../store";
import { IMessage } from "../utils/types";

export const SendWebsocketEcho = createAsyncThunk('websocket/SendWebsocketEcho', async () => {
    const baseURL = Constants.BASE_API_REST_URL + `Test`; 
    const response = await axios.post(baseURL, 
        {
            root: "Gatherer",
            eventName: "InterestedItemsChanged",
            id: null,
            name: null,
            data: "9999"
        }
        // {
        //   root: "NewsManager",
        //   eventName: "FreshArrivals",
        //   id: "3d7c1c9d-64ef-45d6-8428-c4f940d548d5",
        //   name: "CNBC - Investing",
        //   data: "999"
        // }
    );
    return response.data;  
})

interface State {
    isEstablishingConnection: boolean,
    isConnected: boolean,
    messageCount: number,               // By having this, we always insure events are fired as two messages could be the same
    message: IMessage | null
}

const initialState: State = {
    isEstablishingConnection: false,
    isConnected: false,
    messageCount: 0,                    // By having this, we always insure events are fired as two messages could be the same
    message: null
};

const slice = createSlice({
    name: 'websocket',
    initialState,
    reducers: {
        StartConnecting: ((state) => {
            state.isEstablishingConnection = true
        }),
        ConnectionOpen: ((state) => {
            state.isConnected = true
            state.isEstablishingConnection = false
        }),
        ConnectionClosed: ((state) => {
            state.isConnected = false
            state.isEstablishingConnection = false
        }),
        MessageReceived: ((state, action) => {
            console.log(action.payload)
            state.messageCount++            // By having this, we always insure events are fired as two messages could be the same
            state.message = action.payload
        }),
        ResetMessage: ((state) => {
            state.message = null
        })
    },
    extraReducers: builder => {
        builder
        .addCase(SendWebsocketEcho.fulfilled, (state, action) => {
        })
    }
})

// Action creators are generated for each case reducer function
export const websocketActions = slice.actions
export const { 
    StartConnecting,
    ConnectionOpen,
    ConnectionClosed,
    MessageReceived,
    ResetMessage 
} = slice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const SelectIsConnected = (state : RootState) => state.websocket.isConnected;
export const SelectMessage = (state : RootState) => state.websocket.message;
export const SelectMessageCount = (state : RootState) => state.websocket.messageCount;

export default slice.reducer