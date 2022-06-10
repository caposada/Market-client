import { useAppDispatch } from '../../store/hooks';
import { SetInfo} from '../../store/marketSlice';
import { ClickableBadge } from "../../utils/styling";
import Badge from 'react-bootstrap/Badge';
import { AnalysisConfidence, ICompany } from "../../utils/types";

type Props = {
  confidence?: AnalysisConfidence;
  clickable?: boolean;
  company: ICompany;
};

export default function CompanyBadge({ confidence, clickable, company } : Props) {  
  const dispatch = useAppDispatch();  
  
  const cursor = confidence === AnalysisConfidence.HIGH ? "pointer" : "default";
  const isClickable = clickable === false ? false : true;

  function badgeClicked(e: React.MouseEvent<HTMLSpanElement>) {
    e.stopPropagation();
    dispatch(SetInfo(company));
  }

  function getColour() {
    switch (confidence) {
      case AnalysisConfidence.HIGH : return "success";
      case AnalysisConfidence.MEDIUM : return "warning";
      case AnalysisConfidence.LOW : return "warning";
      default: return "secondary";
    }
  }

  if (isClickable) {
    return (
      <ClickableBadge 
      cursor={cursor}
      pill 
      bg={getColour()} 
      onClick={badgeClicked}>
          {company.symbol}          
      </ClickableBadge>
    );
  } else {
    return (
      <Badge 
      pill 
      bg={getColour()} >
          {company.symbol}          
      </Badge>
    );
  }
}