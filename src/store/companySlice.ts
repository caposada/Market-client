/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
import Constants from "../utils/constants";
import { RootState } from "../store";
import { ISimpleCompany, TAliase, IOverview } from "../utils/types"

export interface ThunkData {
  symbol?: string,
  nameStartsWith?: string,
  symbolStartsWith?: string,
  aliases?: TAliase[] | null
}

export const GetDetails = createAsyncThunk('company/GetDetails', async () => {
  const baseURL = Constants.BASE_API_REST_URL + `Company/Details`;
  const response = await axios.get(baseURL);
  return response.data;  
})

export const GetCompanyOverview = createAsyncThunk('company/GetCompanyOverview', async (data : ThunkData) => {
  const baseURL = Constants.BASE_API_REST_URL + `Company/${data.symbol}/Overview`;
  const response = await axios.get(baseURL);
  return response.data;  
})

export const GetCompanyDetails = createAsyncThunk('company/GetCompanyDetails', async (data : ThunkData) => {
  const baseURL = Constants.BASE_API_REST_URL + `Company/${data.symbol}/Details`;
  const response = await axios.get(baseURL);
  return response.data;  
})

export const GetCompaniesByName = createAsyncThunk('company/GetCompaniesByName', async (data : ThunkData) => {
  const baseURL = Constants.BASE_API_REST_URL + `Company/Name/${data.nameStartsWith}`;
  const response = await axios.get(baseURL);
  return response.data;  
})

export const GetCompaniesBySymbol = createAsyncThunk('company/GetCompaniesBySymbol', async (data : ThunkData) => {
  const baseURL = Constants.BASE_API_REST_URL + `Company/Symbol/${data.symbolStartsWith}`;
  const response = await axios.get(baseURL);
  return response.data;  
})

export const UpdateCompany = createAsyncThunk('company/UpdateCompany', async (data : ThunkData) => {
  const baseURL = Constants.BASE_API_REST_URL + `Company/${data.symbol}`;  
  const response = await axios.put(baseURL, data);
  return response.data;   
})

interface State {
  numberOfCompanies: number
  companies: ISimpleCompany[],
  nameStartsWith: string
  symbolStartsWith: string
  company: ISimpleCompany | null
  companyOverviewSymbol: string
  overview: IOverview | null
}

const initialState: State = {
  numberOfCompanies: 0,
  companies: [],
  nameStartsWith: "",
  symbolStartsWith: "",
  company: null,
  companyOverviewSymbol: "",
  overview: null
}

const slice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        SetNameStartsWith: ((state, action) => {
          state.nameStartsWith = action.payload;
          state.symbolStartsWith = "";
        }),
        SetSymbolStartsWith: ((state, action) => {
          state.nameStartsWith = "";
          state.symbolStartsWith = action.payload;
        }),
        ResetCompanies: ((state, action) => {
          state.companies = [];
        }),        
        ResetOverview: ((state) => {
          state.overview = null;
        })
    },
    extraReducers: builder => {
      builder
        .addCase(GetDetails.fulfilled, (state, action) => {
          state.numberOfCompanies = action.payload.numberOfCompanies;
        })
        .addCase(GetCompaniesByName.fulfilled, (state, action) => {
          state.companies = action.payload;
        })
        .addCase(GetCompaniesBySymbol.fulfilled, (state, action) => {
          state.companies = action.payload;
        })
        .addCase(GetCompanyDetails.fulfilled, (state, action) => {
          const company: ISimpleCompany = action.payload
          state.company = company;

          const index = state.companies.findIndex(x => x.symbol === company.symbol);
          if (index !== -1) {
            state.companies.splice(index, 1, company);
          }
        })
        .addCase(GetCompanyOverview.fulfilled, (state, action) => {
          state.overview = action.payload;
        })
    }
})

// Action creators are generated for each case reducer function
export const { 
  SetNameStartsWith, 
  SetSymbolStartsWith, 
  ResetCompanies,
  ResetOverview
} = slice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
//export const selectInfo = (state) => state.company.info;
export const SelectCompany = (state : RootState) => state.company.company;
export const SelectNumberOfCompanies = (state : RootState) => state.company.numberOfCompanies;
export const SelectNameStartsWith = (state : RootState) => state.company.nameStartsWith;
export const SelectSymbolStartsWith = (state : RootState) => state.company.symbolStartsWith;
export const SelectCompanies = (state : RootState) => state.company.companies;
export const SelectOverview = (state : RootState) => state.company.overview;
export const SelectCompanyFromList = (symbol: string) => (state : RootState) => state.company.companies.find(x => x.symbol === symbol);

export default slice.reducer