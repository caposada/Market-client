import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
import Constants from "../utils/constants";
import { RootState } from "../store";
import { Interval, MarketDataStatus, ICompany, IQuote, IMarketDetails, ITimeSeries } from "../utils/types";

export interface ThunkData {
  id: string
}

export const GetMarketDetails = createAsyncThunk('market/GetMarketDetails', async () => {
  const baseURL = Constants.BASE_API_REST_URL + `Market/Details`;
  const response = await axios.get(baseURL);
  return response.data;  
})

export const GetQuote = createAsyncThunk('market/GetQuote', async (data: ThunkData) => {
  const baseURL = Constants.BASE_API_REST_URL + `Market/Quote/Request/${data.id}`;
  const response = await axios.get(baseURL);
  return response.data;  
})

export const GetTimeSeries = createAsyncThunk('market/GetTimeSeries', async (data: ThunkData) => {
  const baseURL = Constants.BASE_API_REST_URL + `Market/TimeSeries/Request/${data.id}`;
  const response = await axios.get(baseURL);
  return response.data;  
})

interface State {
  details: IMarketDetails | null
  info: ICompany | null
  quote: IQuote | null
  timeSeries: ITimeSeries | null
  timeSeriesInterval: Interval
  marketDataStatus: MarketDataStatus
}

const initialState: State = {
  details: null,
  info: null,
  quote: null,
  timeSeries: null,
  timeSeriesInterval: Interval.Min60, // Min1,Min5,Min15,Min30,Min60,Daily,Weekly,Monthly
  marketDataStatus: MarketDataStatus.OKAY,
}

const slice = createSlice({
    name: 'market',
    initialState,
    reducers: {
        SetInfo: ((state, action) => {
          state.info = action.payload;
        }),
        ResetData: ((state) => {
          state.info = null;
          state.quote = null;
          state.timeSeries = null;
        }),
        SetTimeSeriesInterval: ((state, action) => {
          state.timeSeries = null;
          state.timeSeriesInterval = action.payload;
        }),
        SetMarketDataStatus: ((state, action) => {
          state.marketDataStatus = action.payload;
        })
    },
    extraReducers: builder => {
      builder
        .addCase(GetMarketDetails.fulfilled, (state, action) => {
          state.details = action.payload;
        })
        .addCase(GetQuote.fulfilled, (state, action) => {
          const value = action.payload !== '' ? action.payload : null;
          state.quote = value;
        })
        .addCase(GetTimeSeries.fulfilled, (state, action) => {
          const value = action.payload !== '' ? action.payload : null;
          state.timeSeries = value;
        })
    }
})

// Action creators are generated for each case reducer function
export const { 
  SetInfo, 
  ResetData, 
  SetTimeSeriesInterval,
  SetMarketDataStatus
} = slice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const SelectDetails = (state: RootState) => state.market.details;
export const SelectInfo = (state: RootState) => state.market.info;
export const SelectQuote = (state: RootState) => state.market.quote;
export const SelectTimeSeries = (state: RootState) => state.market.timeSeries;
export const SelectTimeSeriesInterval = (state: RootState) => state.market.timeSeriesInterval;
export const SelectMarketDataStatus = (state: RootState) => state.market.marketDataStatus;

export default slice.reducer