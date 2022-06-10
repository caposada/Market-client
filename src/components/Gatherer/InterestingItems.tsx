import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import InterestingItem from "./InterestingItem";
import { ScrollingContainer } from "../../utils/styling";
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { 
    ThunkData,
    SelectTotalInterestingItemsCount,
    SelectInterestingItemsCount,
    SelectInterestingItems,
    SelectHasTimeSeries,
    SelectNameStartsWith,
    SelectSymbolStartsWith,
    SelectSourceId,
    GetInterestingItems,
    GetInterestingItemsByName,
    GetInterestingItemsBySymbol,
    GetInterestingItemsBySource
} from '../../store/gathererSlice';
import { useState, useEffect } from "react";
import { IInterestingItem } from "../../utils/types";

export default function InterestingItems() {
    const [selectId, setSelectedId] = useState<string | null>(null);
    const totalInterestingItemsCount = useAppSelector(SelectTotalInterestingItemsCount);
    const hasTimeSeries = useAppSelector(SelectHasTimeSeries);
    const nameStartsWith = useAppSelector(SelectNameStartsWith);
    const symbolStartsWith = useAppSelector(SelectSymbolStartsWith);
    const sourceId = useAppSelector(SelectSourceId);
    const interestingItemsCount = useAppSelector(SelectInterestingItemsCount);
    const interestingItems = useAppSelector(SelectInterestingItems);
    const dispatch = useAppDispatch();

    const numberOfItems = interestingItemsCount >= 100 ? 100 : interestingItemsCount;

    useEffect(refresh, [totalInterestingItemsCount, hasTimeSeries, nameStartsWith, symbolStartsWith, sourceId, dispatch]);

    function refresh() {
        if (nameStartsWith != null && nameStartsWith.length > 0) {
            const thunkData: ThunkData = {
                nameStartsWith: nameStartsWith,
                filter: {
                    hasTimeSeries: hasTimeSeries,
                    dateFrom: null,
                    dateTo: null
                }
            }
            dispatch(GetInterestingItemsByName(thunkData));            
        } else if (symbolStartsWith != null && symbolStartsWith.length > 0) {
            const thunkData: ThunkData = {
                symbolStartsWith: symbolStartsWith,
                filter: {
                    hasTimeSeries: hasTimeSeries,
                    dateFrom: null,
                    dateTo: null
                }
            }
            dispatch(GetInterestingItemsBySymbol(thunkData));            
        } else if (sourceId != null && sourceId.length > 0) {
            const thunkData: ThunkData = {
                sourceId: sourceId,
                filter: {
                    hasTimeSeries: hasTimeSeries,
                    dateFrom: null,
                    dateTo: null
                }
            }
            dispatch(GetInterestingItemsBySource(thunkData));            
        }else {
            const thunkData: ThunkData = {
                filter: {
                    hasTimeSeries: hasTimeSeries,
                    dateFrom: null,
                    dateTo: null
                }
            }
            dispatch(GetInterestingItems(thunkData));
        }
    }

    return (
        <div>
            <h3>
                Interesting ({numberOfItems} of {interestingItemsCount}){' '}                
                <OverlayTrigger
                    key="addSource"
                    placement="bottom"
                    overlay={<Tooltip id="tooltip-addSource">Refesh list</Tooltip>} >
                    <Button onClick={refresh} size="sm"><i className="bi bi-arrow-clockwise"></i></Button>
                </OverlayTrigger>
            </h3>
            <ScrollingContainer className="p-1">
                {
                    interestingItems !== null ?
                    interestingItems.map((item: IInterestingItem, index: number) => {
                        return (
                        <Row key={index}>
                            <Col>
                                <InterestingItem 
                                onSelection={(selectId: string) => setSelectedId(selectId)}
                                isSelected={item.id === selectId}
                                interestingItem={item} />
                            </Col>
                        </Row>
                        );
                    }) :
                    <></>
                }
            </ScrollingContainer>
        </div>
    );
}