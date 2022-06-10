import { MarketDataStatus } from "./types"

export function getVariantBaseOnMarketDataStatus(status: MarketDataStatus) {
    switch (status) {
        case MarketDataStatus.OKAY: return 'success'
        case MarketDataStatus.LOADING: return "primary"
        case MarketDataStatus.DELAYED: return 'warning'
        case MarketDataStatus.OFFLINE: return 'dange'
        default: return 'success'
    }
}
