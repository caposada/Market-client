import Spinner from 'react-bootstrap/Spinner';
import { ChartCard } from "../../utils/styling";
import { Parse, MarkSeries, Point } from "../../utils/parseData"; 
import { Chart } from "react-chartjs-2";
import 'chartjs-adapter-date-fns';
import { 
    Chart as ChartJS, 
    BarElement, 
    LineController, 
    LineElement, 
    PointElement, 
    LinearScale, 
    CategoryScale, 
    TimeScale, 
    TimeSeriesScale,
    Filler,
    Title, 
    Legend,
    Tooltip
} from 'chart.js';
import { useAppSelector } from '../../store/hooks';
import { 
    SelectTimeSeriesInterval
} from '../../store/marketSlice';
import { useMemo } from "react";
import { Interval, ITimeSeries } from "../../utils/types";
import dateFormat from "dateformat"

ChartJS.register(
    BarElement, 
    LineController, 
    LineElement, 
    PointElement, 
    LinearScale,
    CategoryScale, 
    TimeScale, 
    TimeSeriesScale,  
    Filler,
    Title, 
    Legend,
    Tooltip
);  

function getLineDataset(
    label: string, 
    series: Point[], 
    color: string, 
    fill: string | boolean, 
    hidden: boolean,
    yAxisID: string) {
    const dataset = {
        hidden: hidden,
        order: 1,
        type: 'line' as const,
        yAxisID: yAxisID,
        label: label,
        data: series,
        backgroundColor: color,
        borderColor: color,
        borderWidth: 1,
        radius: 1,
        hoverRadius: 4,
        hitRadius: 5,
        pointRadius: 0,
        fill: fill,
        //tension: 0.3
    }
    return dataset;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getBarDataset(
    label: string, 
    series: Point[], 
    color: string, 
    hidden: boolean) {
    const dataset = {
        hidden: hidden,
        order: 0,
        type: 'bar' as const,
        label: label,
        data: series,
        backgroundColor: color,
        borderColor: color
    }
    return dataset;
}

function getUnit(timeSeriesInterval: Interval) {
    // Min1,Min5,Min15,Min30,Min60,Daily,Weekly,Monthly
    // 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year';
    switch (timeSeriesInterval) {
        case Interval.Min1 : return "hour";
        case Interval.Min5 : return "hour";
        case Interval.Min15 : return "day";
        case Interval.Min30 : return "day";
        case Interval.Min60 : return "day";
        case Interval.Daily : return "week";
        case Interval.Weekly : return "month";
        case Interval.Monthly : return "quarter";
    }
}

type Props = {
    timeSeries: ITimeSeries | null, 
    fromDate?: Date, 
    toDate?: Date,
    markedDates?: Date[] | null
};

export default function CompanyTimeSeries({ timeSeries, fromDate, toDate, markedDates  }: Props) {  
    const timeSeriesInterval = useAppSelector(SelectTimeSeriesInterval);   

    // Closing Price
    const closingPriceParseData = useMemo(() => 
        timeSeries != null ? Parse("closingPrice", timeSeries.dataPoints, fromDate, toDate) : null, 
    [timeSeries, fromDate, toDate]);

    // Change Percent
    const changePercentParseData = useMemo(() => 
        timeSeries != null ? Parse("changePercent", timeSeries.dataPoints, fromDate, toDate) : null, 
    [timeSeries, fromDate, toDate]);

    if (timeSeries !== null && closingPriceParseData != null && changePercentParseData != null) {
        
        const datasets = []

        const closingPriceDataset = getLineDataset('Closing', closingPriceParseData?.series, "rgba(100, 0, 100, 0.6)", "start", false, "y"); // Magenta
        const yMin = closingPriceParseData?.min;
        const yMax = closingPriceParseData?.max;
        datasets.push(closingPriceDataset);

        const changePercentDataset = getLineDataset('Change Percent', changePercentParseData?.series, "rgba(0, 0, 0, 1.0)", false, false, "y2"); // Black
        const y2Min = changePercentParseData?.min;
        const y2Max = changePercentParseData?.max;
        datasets.push(changePercentDataset);

        if (markedDates !== null && markedDates !== undefined) {
            const series: Point[] = MarkSeries(timeSeries.dataPoints, markedDates, yMax);
            markedDates.forEach(date => {
                series.push({
                    x: date,
                    y: yMax
                })
            })
            const markedDataset = getBarDataset('Published', series, "rgba(255, 0, 0, 0.6)", false); // Red
            datasets.push(markedDataset);
        }
        
        const chartData = {
            // datasets is an array of objects where each object represents a set of data to display corresponding 
            // to the labels above. for brevity, we'll keep it at one object
            datasets: datasets
        }    

        const unit = getUnit(timeSeriesInterval);

        return (
            <div>         
                <ChartCard>
                    <Chart
                        type='bar' 
                        data={chartData}
                        options={{    
                            scales: {
                                x: {
                                    type: 'timeseries',
                                    time: {
                                        unit: unit,
                                        isoWeekday: 1
                                    }
                                },
                                y: {
                                    type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                                    position: 'left',
                                    min: yMin,
                                    max: yMax
                                },
                                y2: {
                                    type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                                    position: 'right',
                                    min: y2Min,
                                    max: y2Max
                                }
                            },              
                            plugins: {
                                filler: {
                                    propagate: false,
                                },
                                legend: {
                                    display: true,
                                    position: "bottom"
                                },
                                tooltip: {
                                    callbacks: {
                                        label: function(context) {
                                            let label = context.dataset.label || "";
                    
                                            if (context.dataset.label === "Published")
                                                return "Published: " + dateFormat(context.parsed.x, "dd/mm/yyyy hh:MM:ss tt");
                                            
                                            if (label) {
                                                label += ': ';
                                            }

                                            if (context.dataset.label === "Closing") {
                                                if (context.parsed.y !== null) {
                                                    label += context.parsed.y.toFixed(2);
                                                }
                                                return label;
                                            }

                                            return label += context.parsed.y.toFixed(2);
                                        }
                                    }
                                }
                            }
                        }}
                    />
                </ChartCard>
            </div>
        )
    } else {
        return (
            <>
                <Spinner animation="border" role="status" size="sm" variant="primary" />{' '}<span>Loading...</span>
            </>
        )        
    }
}