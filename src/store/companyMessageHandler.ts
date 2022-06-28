import store from '../store';
import { IMessage } from "../utils/types";
import { 
    GetCompanyDetails
} from './companySlice'

export default function companyMessageHandler(message: IMessage) {
    if (message.EventName === "CompanyChanged") {
        store.dispatch(GetCompanyDetails({
          symbol: message.Id
        }));      
    }
}