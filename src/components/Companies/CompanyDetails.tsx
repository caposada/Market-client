import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import dateFormat from "dateformat";
import { 
    SelectCompany,
    SelectOverview,
    GetCompanyOverview
} from '../../store/companySlice';
import CompanyBadge from "../Shared/CompanyBadge";
import { RightJustifiedButton } from "../../utils/styling";
import EditAliasesModal from "./EditAliasesModal";
import CompanyOverviewModal from "./CompanyOverviewModal";
import { useState } from "react";
import { AssetTypes, StockExchanges } from "../../utils/types";
import { useAppSelector, useAppDispatch } from '../../store/hooks';

export default function CompanyDetails() {
    const company = useAppSelector(SelectCompany);
    const overview = useAppSelector(SelectOverview);
    const dispatch = useAppDispatch();
    const [showEditAliasesModal, setShowEditAliasesModal] = useState(false);

    function getOverview() {
        if (company != null) {
            dispatch(GetCompanyOverview({
                symbol: company.symbol
            }));
        }
    }

    if (company != null) {
        const ipoDate = company.ipoDate != null ? dateFormat(new Date(company.ipoDate), "dd/mm/yyyy") : "";
        const assetType = AssetTypes[company.assetType];
        const exchange = StockExchanges[company.exchange];
        return (
            <div>
                <Container>
                    <h3>
                        Details                        
                        { 
                            company.hasOverview === true ?
                            <OverlayTrigger
                            key="showOverview"
                            placement="bottom"
                            overlay={<Tooltip id="tooltip-showOverview">Show Overview</Tooltip>} >
                                <RightJustifiedButton 
                                    variant="primary"                                  
                                    onClick={getOverview} 
                                    size="sm">
                                        <i className="bi bi-card-list"></i>
                                </RightJustifiedButton>
                            </OverlayTrigger> :                             
                            <OverlayTrigger
                            key="getOverview"
                            placement="bottom"
                            overlay={<Tooltip id="tooltip-getOverview">Get Overview</Tooltip>} >
                                <RightJustifiedButton 
                                    variant="secondary"                                  
                                    onClick={getOverview} 
                                    size="sm">
                                        <i className="bi bi-card-list"></i>
                                </RightJustifiedButton>
                            </OverlayTrigger>
                        }{' '}
                    </h3>
                    <Row>
                        <Col md={4}>
                            <h5>Symbol</h5>
                        </Col>
                        <Col md={8}>
                            <CompanyBadge company={company} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <h5>Name</h5>
                        </Col>
                        <Col md={8}>
                            {company.name}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <h5>Long Name</h5>
                        </Col>
                        <Col md={8}>
                            {company.longName}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <h5>Aliases</h5>
                        </Col>
                        <Col>
                            {
                                company.aliases.map((alias, index) => {
                                    return (
                                        <Row key={index}>
                                            <Col>
                                                {alias}
                                            </Col>
                                        </Row>
                                    )
                                })
                            }
                        </Col>
                        <Col>
                            <OverlayTrigger
                            key="edit"
                            placement="bottom"
                            overlay={<Tooltip id="tooltip-edit">Edit aliases</Tooltip>} >
                                <RightJustifiedButton 
                                    onClick={() => setShowEditAliasesModal(true)} 
                                    size="sm">
                                        <i className="bi bi-pencil-square"></i>
                                </RightJustifiedButton>
                            </OverlayTrigger>{' '}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <h5>Exchange</h5>
                        </Col>
                        <Col md={8}>
                            {exchange}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <h5>Asset Type</h5>
                        </Col>
                        <Col md={8}>
                            {assetType}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <h5>IPO Date</h5>
                        </Col>
                        <Col md={8}>
                            {ipoDate}
                        </Col>
                    </Row>
                </Container>  
      
                { showEditAliasesModal === true ? <EditAliasesModal setShow={setShowEditAliasesModal} symbol={company.symbol} /> : <></> }

                { overview !== null ? <CompanyOverviewModal /> : <></> }
                
            </div>     
        );
    }  else {
        return (<></>);
    }  
}