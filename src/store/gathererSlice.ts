import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
import Constants from "../utils/constants";
import { RootState } from "../store";
import { IInterestingItemDetails, IInterestingItem, IBreakDown } from "../utils/types";

export interface Filter {  
  hasTimeSeries?: boolean | null,
  dateFrom?: Date | null,
  dateTo?: Date | null
}

export interface ThunkData {
  id?: string
  sourceId?: string
  nameStartsWith?: string
  symbolStartsWith?: string
  filter?: Filter
}

export const GetDetails = createAsyncThunk('gatherer/GetDetails', async () => {
  const baseURL = Constants.BASE_API_REST_URL + `Gatherer/Details`;
  const response = await axios.get(baseURL);
  return response.data;  
})

export const GetInterestingItems = createAsyncThunk('gatherer/GetInterestingItems', async (data : ThunkData) => {
  const baseURL = Constants.BASE_API_REST_URL + `Gatherer/InterestingItems`;
  const response = await axios.post(baseURL, data.filter);
  return response.data;  
})

export const GetInterestingItemsByName = createAsyncThunk('gatherer/GetInterestingItemsByName', async (data : ThunkData) => {
  const baseURL = Constants.BASE_API_REST_URL + `Gatherer/InterestingItems/CompanyName/${data.nameStartsWith}`;
  const response = await axios.post(baseURL, data.filter);
  return response.data;  
})

export const GetInterestingItemsBySymbol = createAsyncThunk('gatherer/GetInterestingItemsBySymbol', async (data : ThunkData) => {
  const baseURL = Constants.BASE_API_REST_URL + `Gatherer/InterestingItems/CompanySymbol/${data.symbolStartsWith}`;
  const response = await axios.post(baseURL, data.filter);
  return response.data;  
})

export const GetInterestingItemsBySource = createAsyncThunk('gatherer/GetInterestingItemsBySource', async (data : ThunkData) => {
  const baseURL = Constants.BASE_API_REST_URL + `Gatherer/InterestingItems/Source/${data.sourceId}`;
  const response = await axios.post(baseURL, data.filter);
  return response.data;  
})

export const GetInterestingItemDetails = createAsyncThunk('gatherer/GetInterestingItemDetails', async (data : ThunkData) => {
  const baseURL = Constants.BASE_API_REST_URL + `Gatherer/InterestingItems/${data.id}/Details`;
  const response = await axios.get(baseURL);
  return response.data;  
})

export const GetInterestingItemBreakdown = createAsyncThunk('gatherer/GetInterestingItemBreakdown', async (data : ThunkData) => {
  const baseURL = Constants.BASE_API_REST_URL + `Gatherer/InterestingItems/${data.id}/Breakdown`;
  const response = await axios.get(baseURL);
  return response.data;  
})

export const MarkNotInteresting = createAsyncThunk('gatherer/MarkNotInteresting', async (data : ThunkData) => {
  const baseURL = Constants.BASE_API_REST_URL + `Gatherer/InterestingItems/${data.id}/MarkNotInteresting`; 
  const response = await axios.delete(baseURL);
  return response.data;  
})

interface State {
  totalInterestingItemsCount: number
  totalNonInterestingItemsCount: number
  sourceItems: []
  interestingItemsCount: number
  interestingItems: IInterestingItem[] | null
  interestingItemDetails: IInterestingItemDetails | null
  hasTimeSeries: boolean
  nameStartsWith: string
  symbolStartsWith: string
  sourceId: string
  breakdown: IBreakDown | null
}

const initialState: State = {
  totalInterestingItemsCount: 0,
  totalNonInterestingItemsCount: 0,
  sourceItems: [],
  interestingItemsCount: 0,
  interestingItems: null,
  interestingItemDetails: null,
  hasTimeSeries: false,
  nameStartsWith: "",
  symbolStartsWith: "",
  sourceId: "",
  breakdown: null
}

const slice = createSlice({
  name: 'gatherer',
  initialState,
  reducers: {
    SetHasTimeSeries: ((state, action) => {
      state.hasTimeSeries = action.payload;
    }),
    SetNameStartsWith: ((state, action) => {
      state.nameStartsWith = action.payload;
      state.symbolStartsWith = "";
      state.sourceId = "";
    }),
    SetSymbolStartsWith: ((state, action) => {
      state.nameStartsWith = "";
      state.symbolStartsWith = action.payload;
      state.sourceId = "";
    }),
    SetSourceId: ((state, action) => {
      state.nameStartsWith = "";
      state.symbolStartsWith = "";
      state.sourceId = action.payload;
    }),
    ResetInterestingItemDetails: ((state) => {
      state.interestingItemDetails = null
    })
  },
  extraReducers: builder => {
    builder
      .addCase(GetDetails.fulfilled, (state, action) => {
        state.totalInterestingItemsCount = action.payload.totalInterestingItemsCount
        state.totalNonInterestingItemsCount = action.payload.totalNonInterestingItemsCount
        state.sourceItems = action.payload.sourceItems
      })
      .addCase(GetInterestingItemDetails.fulfilled, (state, action) => {
        state.interestingItemDetails = action.payload
      })
      .addCase(GetInterestingItems.fulfilled, (state, action) => {
        state.interestingItemsCount = action.payload.interestingItemsCount
        state.interestingItems = action.payload.interestingItems
      })
      .addCase(GetInterestingItemsByName.fulfilled, (state, action) => {
        state.interestingItemsCount = action.payload.interestingItemsCount
        state.interestingItems = action.payload.interestingItems
      })
      .addCase(GetInterestingItemsBySymbol.fulfilled, (state, action) => {
        state.interestingItemsCount = action.payload.interestingItemsCount
        state.interestingItems = action.payload.interestingItems
      })
      .addCase(GetInterestingItemsBySource.fulfilled, (state, action) => {
        state.interestingItemsCount = action.payload.interestingItemsCount
        state.interestingItems = action.payload.interestingItems
      })
      .addCase(GetInterestingItemBreakdown.fulfilled, (state, action) => {
        state.breakdown = action.payload
      })
  }
})

// Action creators are generated for each case reducer function
export const { 
  SetHasTimeSeries,
  SetNameStartsWith, 
  SetSymbolStartsWith,
  SetSourceId,
  ResetInterestingItemDetails
} = slice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const SelectTotalInterestingItemsCount = (state : RootState) => state.gatherer.totalInterestingItemsCount;
export const SelectTotalNonInterestingItemsCount = (state : RootState) => state.gatherer.totalNonInterestingItemsCount;
export const SelectSourceItems = (state : RootState) => state.gatherer.sourceItems;
export const SelectInterestingItemDetails = (state : RootState) => state.gatherer.interestingItemDetails;
export const SelectInterestingItemsCount = (state : RootState) => state.gatherer.interestingItemsCount;
export const SelectInterestingItems = (state : RootState) => state.gatherer.interestingItems; 
export const SelectHasTimeSeries = (state : RootState) => state.gatherer.hasTimeSeries;
export const SelectNameStartsWith = (state : RootState) => state.gatherer.nameStartsWith;
export const SelectSymbolStartsWith = (state : RootState) => state.gatherer.symbolStartsWith;
export const SelectSourceId = (state : RootState) => state.gatherer.sourceId;
export const SelectBreakdown = (state : RootState) => state.gatherer.breakdown;

export default slice.reducer