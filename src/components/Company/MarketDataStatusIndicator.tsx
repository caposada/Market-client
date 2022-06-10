import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { CenteredSpinner } from "../../utils/styling";
import { MarketDataStatus } from "../../utils/types";
import { getVariantBaseOnMarketDataStatus } from "../../utils/helpers";

type Props = {
    status: MarketDataStatus
};

export default function MarketDataStatusIndicator({ status }: Props) {
    if (status !== MarketDataStatus.OKAY) {
        const variant = getVariantBaseOnMarketDataStatus(status);
        return (  
            <OverlayTrigger
            key="loading"
            placement="bottom"
            overlay={<Tooltip id="tooltip-refresh">Data is loading</Tooltip>} >
                <CenteredSpinner animation="grow" variant={variant} /> 
            </OverlayTrigger> 
        )
    } else {
        return <></>;
    }    
}