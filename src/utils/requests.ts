import axios from "axios"
import { MarketDataRequestStatus } from "./types"

export type Response = {
    id: string,
    requestStatus: MarketDataRequestStatus
}

export type Request = {
    name: string,
    url: string,
    postExecutionCallback: Function,
    response?: Response | null
}

const requestList: Request[] = [];

// Called by Components (CompanyLatest, etc.)
export function makeRequest(name: string, url: string, postExecutionCallback: Function) {
    const request: Request = {
        name: name,
        url: url,
        postExecutionCallback: postExecutionCallback
    }
    requestList.push(request)

    axios.get(url)
        .then((response) => {            
            request.response = {
                id: response.data.id,
                requestStatus: response.data.status
            }

            if (response.data.status === MarketDataRequestStatus.SUCCESS) {
                // Data is ready immediately (stored)    
                requestList.splice(requestList.indexOf(request), 1);
                request.postExecutionCallback(request.response);          
            } 
        })
}

export function getRequest(id: string) {
    return requestList.find(x => x.response?.id === id);
}

// Called by Online.js
export function requestExecuted(id: string) {
    const request = requestList.find(x => x.response?.id === id);
    if (request) {
        requestList.splice(requestList.indexOf(request), 1);
        request.postExecutionCallback(request.response);
    }
}

