import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CompanyItem from "./CompanyItem";
import { ScrollingContainer } from "../../utils/styling";
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { 
    SelectCompanies,
    SelectNameStartsWith,
    SelectSymbolStartsWith,
    GetCompaniesByName,
    GetCompaniesBySymbol,
    ResetCompanies
} from '../../store/companySlice';
import { useState, useEffect } from "react";
import { ISimpleCompany } from "../../utils/types";

export default function CompaniesList() {
    const [selectId, setSelectedId] = useState<string | null>(null);
    const nameStartsWith = useAppSelector(SelectNameStartsWith);
    const symbolStartsWith = useAppSelector(SelectSymbolStartsWith);
    const companies = useAppSelector(SelectCompanies);
    const dispatch = useAppDispatch();
    
    const subInfo = getSubInfo();

    useEffect(refresh, [nameStartsWith, symbolStartsWith, dispatch]);

    function refresh() {
        if (nameStartsWith != null && nameStartsWith.length > 0) {
            dispatch(GetCompaniesByName({
                nameStartsWith: nameStartsWith
            }));            
        } else if (symbolStartsWith != null && symbolStartsWith.length > 0) {
            dispatch(GetCompaniesBySymbol({
                symbolStartsWith: symbolStartsWith
            }));            
        } else {
            dispatch(ResetCompanies(null));
        }
    }

    function getSubInfo() {
        if (nameStartsWith != null && nameStartsWith.length > 0) {  
            return `Name '${nameStartsWith}' = ${companies.length}`;
        } else if (symbolStartsWith != null && symbolStartsWith.length > 0) {  
            return `Symbol '${symbolStartsWith}' = ${companies.length}`;
        } else {
            return "No companies found";
        }
    }

    return (
        <div>
            <h3>
                {subInfo}
            </h3>            
            <ScrollingContainer className="p-1">
                {
                    companies.map((company: ISimpleCompany) => {
                        return (
                        <Row key={company.symbol}>
                            <Col>
                                <CompanyItem 
                                onSelection={(selectId: string) => setSelectedId(selectId)}
                                isSelected={company.symbol === selectId}
                                company={company}  />
                            </Col>
                        </Row>
                        );
                    })
                }
            </ScrollingContainer>
        </div>
    );
}