import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import Constants from "../utils/constants";
import { RootState } from "../store";
import { INewsSource, INewsItem, FeedType } from "../utils/types";

export interface Settings {
    sourceId: string,
    isPolling?: boolean,
    pollingTimespan?: string
}

export interface ThunkData {
    id?: string,
    settings: Settings,
    symbolStartsWith?: string
}

export interface AddSourceThunkData {    
    feedType: FeedType,
    title: string,
    url: string,
    timezone: string
}

export interface UpdateSourceThunkData {    
    id?: string,
    timezone: string
}

export const GetNewsManagerDetails = createAsyncThunk('news/GetNewsManagerDetails', async () => {
    const baseURL = Constants.BASE_API_REST_URL + `News/Details`;
    const response = await axios.get(baseURL);
    return response.data;  
})

export const GetNewsSourceDetails = createAsyncThunk('news/GetNewsSourceDetails', async (sourceId: string) => {
    const baseURL = Constants.BASE_API_REST_URL + `News/${sourceId}/Details`;
    const response = await axios.get(baseURL);
    return response.data;  
})

export const GetNewsItems = createAsyncThunk('news/GetNewsItems', async (sourceId: string) => {
    const baseURL = Constants.BASE_API_REST_URL + `News/${sourceId}/NewsItems`;
    const response = await axios.get(baseURL);
    return response.data;  
})

export const UpdateSourceMonitorSettings = createAsyncThunk('news/UpdateSourceMonitorSettings', async (data : ThunkData) => {
    const baseURL = Constants.BASE_API_REST_URL + `News/${data.id}/SourceMonitor`; 
    const response = await axios.put(baseURL, data.settings);
    return response.data;  
})

export const UpdateFeedSettings = createAsyncThunk('news/UpdateFeedSettings', async (data : UpdateSourceThunkData) => {
    const baseURL = Constants.BASE_API_REST_URL + `News/${data.id}/Feed`;  
    const response = await axios.put(baseURL, data);
    return response.data;   
})

export const ForceUpdate = createAsyncThunk('news/ForceUpdate', async (sourceId: string) => {
    const baseURL = Constants.BASE_API_REST_URL + `News/${sourceId}/ForceUpdate`;
    const response = await axios.get(baseURL);
    return response.data;  
})

export const ForceUpdateAll = createAsyncThunk('news/ForceUpdateAll', async () => {
    const baseURL = Constants.BASE_API_REST_URL + `News/ForceUpdateAll`;
    const response = await axios.get(baseURL);
    return response.data;  
})

export const AddSource = createAsyncThunk('news/AddSource', async (data: AddSourceThunkData) => {
    const baseURL = Constants.BASE_API_REST_URL + `News`;  
    const response = await axios.post(baseURL, data);
    return response.data;  
})

export const RemoveSource = createAsyncThunk('news/RemoveSource', async (sourceId: string) => {
    const baseURL = Constants.BASE_API_REST_URL + `News/${sourceId}`; 
    const response = await axios.delete(baseURL);
    return response.data;  
})

interface State {
    totalNumberOfNewsItems: number;
    sourceIds: string[],
    earliest: Date | null,
    latest: Date | null,
    numberOfRssFeeds: number,
    numberOfTwitterFeeds: number,
    newsSources: INewsSource[],
    newsItems: INewsItem[]
}

const initialState: State = {
    totalNumberOfNewsItems: 0,
    sourceIds: [],
    earliest: null,
    latest: null,
    numberOfRssFeeds: 0,
    numberOfTwitterFeeds: 0,
    newsSources: [],
    newsItems: []
}

const slice = createSlice({
    name: 'news',
    initialState,
    reducers: { },
    extraReducers: builder => {
        builder
        .addCase(GetNewsManagerDetails.fulfilled, (state, action) => {
            state.totalNumberOfNewsItems = action.payload.totalNumberOfNewsItems
            state.sourceIds = action.payload.sourceIds
            state.earliest = action.payload.earliest
            state.latest = action.payload.latest
            state.numberOfRssFeeds = action.payload.numberOfRssFeeds
            state.numberOfTwitterFeeds = action.payload.numberOfTwitterFeeds
        })
        .addCase(GetNewsSourceDetails.fulfilled, (state, action) => {
            const newsSource: INewsSource = action.payload as INewsSource;
            const sourceId = newsSource.sourceId;
            let index = state.newsSources.findIndex(x => x.sourceId === sourceId);
            if (index !== -1) {
                state.newsSources.splice(index, 1, newsSource);
            } else {
                state.newsSources.push(newsSource);
            }
        })
        .addCase(GetNewsItems.fulfilled, (state, action) => {
            state.newsItems = action.payload
        })
        .addCase(AddSource.fulfilled, (state, action) => {
            state.sourceIds = action.payload
        })
        .addCase(RemoveSource.fulfilled, (state, action) => {
            state.sourceIds = action.payload
        })
    }
})

// Action creators are generated for each case reducer function

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const SelectTotalNumberOfNewsItems = (state : RootState) => state.news.totalNumberOfNewsItems;
export const SelectSourceIds = (state : RootState) => state.news.sourceIds;
export const SelectEarliest = (state : RootState) => state.news.earliest;
export const SelectLatest = (state : RootState) => state.news.latest;
export const SelectNumberOfRssFeeds = (state : RootState) => state.news.numberOfRssFeeds;
export const SelectnNmberOfTwitterFeeds = (state : RootState) => state.news.numberOfTwitterFeeds;
export const SelectNewsItems = (state : RootState) => state.news.newsItems;
export const SelectNewsSourceItem = (sourceId: string) => (state : RootState) => state.news.newsSources.find(x => x.sourceId === sourceId);

export default slice.reducer