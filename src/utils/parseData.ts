import { IDataPoint } from "./types"

export type Series = {
    x: Date,
    y: number
}

export type ParseData = {
    series: Series[],
    min: number,
    max: number
}

type dataPointsKeys = keyof IDataPoint

export function Parse(dataPointItemName: dataPointsKeys, dataPoints: IDataPoint[], fromDate?: Date, toDate?: Date) {
    const series: Series[] = [];
    let min = Number.MAX_SAFE_INTEGER; 
    let max = Number.MIN_SAFE_INTEGER;
    dataPoints.forEach((item: IDataPoint, index) => { 
        const y: number = item[dataPointItemName] as number;
        const date = new Date(item.time);
        if (fromDate != null && date < fromDate)
            return;
        if (toDate != null && date > toDate)
            return;
        series.push({
            x: date,
            y: y
        });
        min = y < min  ? min = y : min;
        max = y > max  ? max = y : max;
    })    
    const data: ParseData = {
        series: series,
        min: min,
        max: max
    }
    return data;
}
