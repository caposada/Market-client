import Table from 'react-bootstrap/Table'
import { AnalysisConfidence, AnalysisRationale } from "../../utils/types"
import { confidenceStyling } from "../../utils/analysisStyling"
import { IFinding } from "../../utils/types"

type Props = {
    findings: IFinding[]
};

export default function TextInfoFindings({ findings } : Props) { 

    return (  
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Symbol</th>
                    <th>Name</th>
                    <th>Confidence</th>
                    <th>Rationale</th>
                </tr>
            </thead>
            <tbody>
                {
                    findings.map((finding: IFinding, index: number) => {
                        const style = confidenceStyling(finding.confidence);                        
                        return (
                            <tr key={index}>
                                <td style={style}>{index + 1}</td>
                                <td>{finding.company.symbol}</td>
                                <td>{finding.company.name}</td>
                                <td>{AnalysisConfidence[finding.confidence]}</td>
                                <td>{AnalysisRationale[finding.rationale]}</td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </Table>
    );
}