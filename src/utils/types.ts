
export enum AssetTypes {
    ETF,
    STOCK
}

export enum StockExchanges {
    BATS,
    LSE,            // London Stock Exchange
    NASDAQ,         // NASDAQ, New York
    NYSE,           // New York Stock Exchange
    NYSE_ARCA,
    NYSE_MKT
}

export enum Interval {
    Min1,
    Min5,
    Min15,
    Min30,
    Min60,
    Daily,
    Weekly,
    Monthly
}

export enum FeedType {
    RssFeed = 0,
    TwitterFeed = 1
}

export enum AnalysisConfidence {
    LOW = 1,
    MEDIUM = 2,
    HIGH = 3
}

export enum AnalysisRationale {
    NONE,
    NAME_FRAGMENT,
    SYMBOL,
    FULL_NAME
}

export enum PartOfSpeech {
    NONE,
    ADJ,
    ADP,
    ADV,
    AUX,
    CCONJ,
    DET,
    INTJ,
    NOUN,
    NUM,
    PART,
    PRON,
    PROPN,
    PUNCT,
    SCONJ,
    SYM,
    VERB,
    X
}

export enum MarketDataStatus {
    OKAY,
    LOADING,
    DELAYED,
    OFFLINE
}

export enum MarketDataRequestStatus {
    PENDING,
    SUCCESS,
    ERROR,
    DELAYED
}

export enum PriceChangeVolatility {
    LOW,
    NORMAL,
    HIGH,
    SIGNIFICANT,
    EXTREME
}

export type IDataPoint = {
    openingPrice: number,
    closingPrice: number,
    highestPrice: number,
    lowestPrice: number,
    volume: number,
    time: string,
    change: number,
    changePercent: number
}

export interface IQuote {
    openingPrice: number
    previousClosingPrice: number
    highestPrice: number
    lowestPrice: number
    price: number
    volume: number
    change: number
    changePercent: number
    latestTradingDay: Date
}

export interface ICompany {
    symbol: string
    name: string
    exchange: StockExchanges
}

export interface IToken {
    text: string
    pos: number
    lemma: string
    position: number
    begin: number
    length: number
}

export interface IBreakDown {
    allTokens: IToken[]
}

export interface IFinding {
    company: ICompany
    confidence: AnalysisConfidence
    rationale: AnalysisRationale
    tokens: IToken[]
}

export interface ITimeSeries {
    publishedDate: Date
    symbol: string
    validUntil: Date
    timeStamp: Date
    interval: Interval
    dataPoints: IDataPoint[]
    min: number
    max: number
    from: Date
    to: Date
    minChangePercent: number
    maxChangePercent: number
    lowVolatility: PriceChangeVolatility
    highVolatility: PriceChangeVolatility
}

export interface IInterestingItemDetails {
    id: string
    text: string
    publishDate: Date
    timestamp: Date
    findings: IFinding[]
    timeSerieses: ITimeSeries[]
    lastPoll: Date
    feedType: FeedType
    title: string
    url: string
};

export interface IInterestingItem {
    id: string
    text: string
    publishDate: Date
    findings: IFinding[]
    hasTimeSeries: boolean
}

export type TAliase = string

export interface ISimpleCompany {
    symbol: string
    name: string
    exchange: StockExchanges
    assetType: AssetTypes
    ipoDate: Date
    status: string
    longName: string
    aliases: TAliase[]
    hasOverview: boolean
}

export interface INewsItem {
    id: string
    refId: string
    publishDate: Date
    timestamp: Date
    text: string
    sourceId: string
}

export interface IMessage {
    Root: string
    EventName: string,
    Id: string,
    Name: string,
    Data: string
}

export interface IMarketDetails {
    status: MarketDataStatus
    nextReady: Date
    availableCalls: number
    callCountInMinute: number,
    activeCallsCount: number
}

export type INewsSource = {
    sourceId?: string,
    title?: string,
    url?: string,
    feedType?: FeedType,
    timezone?: string,
    isPolling?: boolean,
    lastPoll?: Date,
    pollingTimespan?: string,
    newsItems_Count?: number,
    newsItems_LastPublished?: Date
}

export interface ISourceItem {
    id: string,
    name: string,
    feedType: FeedType
}

export interface IOverview {
    symbol: string
    lastUpdated: Date
    overviewDictionary: { [key: string]: string; }
}

export interface IFindingInfo {
    title: string
    text: string
    publishDate: Date
    feedType: FeedType
    confidence: AnalysisConfidence
    company: ICompany
    timeSeries: ITimeSeries
}