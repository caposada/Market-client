import Card from 'react-bootstrap/Card';
import CompanyBadge from "../Shared/CompanyBadge";
import { ClickableCard } from "../../utils/styling";
import { useAppDispatch } from '../../store/hooks';
import { 
    GetCompanyDetails
} from '../../store/companySlice';
import { ISimpleCompany } from "../../utils/types";

type Props = {
    company: ISimpleCompany, 
    isSelected: boolean, 
    onSelection: Function
};

export default function CompanyItem({ company, isSelected, onSelection }: Props) {  
    const dispatch = useAppDispatch();

    function cardClicked() {
        dispatch(GetCompanyDetails({
            symbol: company.symbol
        })); 
        onSelection(company.symbol);
    }

    return (
        <ClickableCard
        border={isSelected ? "primary" : "secondary" }
        key={company.symbol}
        className="mb-2" 
        onClick={cardClicked} >
            <Card.Header>
                <CompanyBadge company={company} />{' '}{company.name}{' '}   
                { company.hasOverview === true ? <i className="bi bi-card-list"></i> : "" }
            </Card.Header>
        </ClickableCard>
    );
}