import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { useMemo } from "react";
import { partOfSpeachStyling, confidenceStyling } from "../../utils/analysisStyling"
import { PartOfSpeech, IBreakDown, IFinding } from "../../utils/types"

enum Type {
    WORD,
    SPACE
}

interface Analysis {
    type: Type
    text: string
    position?: number
    pos?: PartOfSpeech,
    finding?: IFinding | null
}

function textAnalysis(text: string, breakdown: IBreakDown | null, findings: IFinding[]) {
    if (breakdown == null)
        return [];
    
    const analysis: Analysis[] = [];
    breakdown.allTokens.forEach((breakdownToken) => {
        
        const textAt = text.at(breakdownToken.begin + breakdownToken.length);
        const snippet = text.slice(breakdownToken.begin, breakdownToken.begin + breakdownToken.length);


        //const finding = findings.find(x => x.tokens.begin === breakdownToken.begin && x.token.length === breakdownToken.length);
        
        var matchingFinding = null;
        findings.forEach(finding => {
            const foundToken = finding.tokens.find(x => x.begin === breakdownToken.begin && x.length === breakdownToken.length);

            if (foundToken != null) {
                matchingFinding = finding;
            }
        });

        analysis.push({
            position: breakdownToken.position,
            type: Type.WORD,
            text: snippet,
            pos: breakdownToken.pos,
            finding: matchingFinding
        });

        if (breakdownToken.begin + breakdownToken.length < text.length 
            && (textAt === " " || textAt === "\n")) {                
            analysis.push({
                type: Type.SPACE,
                text: " "
            });
        }
    });

    return analysis;
}

type Props = {
    text: string, 
    breakdown: IBreakDown | null, 
    findings: IFinding[]
};

export default function TextInfoAnalysis({ text, breakdown, findings } : Props) { 
    const analysis = useMemo(() => 
        textAnalysis(text, breakdown, findings), 
    [text, breakdown, findings]);

    return (  
        <div>
            {
                analysis.map((item, index) => {
                    if (item.type === Type.SPACE) {
                        return " ";
                    } else {
                        // Setup some styling based on PartOfSpeach (Nouns, Verbs, etc.) for if a item (word) 
                        const partOfSpeach = item.pos ? item.pos : PartOfSpeech.NONE
                        const partOfSpeachString = item.pos ? PartOfSpeech[item.pos] : PartOfSpeech.NONE
                        let style = partOfSpeachStyling(partOfSpeach);
                        let tooltip = `[${partOfSpeachString}]`

                        if (item.finding != null) {
                            // This item (word) has findings attached to it, so override the styling
                            style = confidenceStyling(item.finding.confidence); 
                            tooltip += ` ${item.finding.company.name} (${item.finding.company.symbol})`
                        }
                        return (                                                     
                            <OverlayTrigger
                            key={index}
                            placement="bottom"
                            overlay={ <Tooltip>{tooltip}</Tooltip>} >                                    
                                <span style={style}>{item.text}</span>
                            </OverlayTrigger> 

                        );
                    }
                })
            }
        </div>
    );
}