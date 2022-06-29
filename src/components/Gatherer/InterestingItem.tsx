import Card from 'react-bootstrap/Card';
import dateFormat from "dateformat";
import CompanyBadge from "../Shared/CompanyBadge";
import { useAppDispatch } from '../../store/hooks';
import { 
    ThunkData,
    GetInterestingItemDetails 
} from '../../store/gathererSlice';
import { ClickableCard } from "../../utils/styling";
import { IInterestingItem } from "../../utils/types";

type Props = {
    interestingItem: IInterestingItem, 
    isSelected: boolean, 
    onSelection: Function
};

export default function InterestingItem({ interestingItem, isSelected, onSelection } : Props) {   
    const dispatch = useAppDispatch();

    const dateTime = interestingItem.publishDate != null ? dateFormat(new Date(interestingItem.publishDate), "dd/mm/yyyy hh:MM:ss tt") : "";

    function cardClicked() {
        const thunkData: ThunkData = {
            id: interestingItem.id
        }
        dispatch(GetInterestingItemDetails(thunkData));
        onSelection(interestingItem.id);
    }

    return (
        <ClickableCard        
        border={isSelected ? "primary" : "secondary" }
        key={interestingItem.id}
        className="mb-2" 
        onClick={cardClicked} >
            <Card.Header>
                {
                    interestingItem.findings.map((finding, index) => {
                        return (
                            <span key={index}>
                                <CompanyBadge company={finding.company} confidence={finding.confidence} />{' '}                                
                            </span>
                        );
                    })
                }
                { interestingItem.hasTimeSeries ? <i className="bi bi-graph-up-arrow"></i> : "" }
            </Card.Header>
            <Card.Body>
                <Card.Title>
                    {dateTime}
                </Card.Title>
                <Card.Text>
                    {interestingItem.text}
                </Card.Text>
            </Card.Body>
        </ClickableCard>
    );
}