import { AnalysisConfidence, PartOfSpeech } from "./types"

export function confidenceStyling(confidence: AnalysisConfidence) {
    switch (confidence) {
        case AnalysisConfidence.LOW :
            return { color: "yellow", backgroundColor: "grey" };
        case AnalysisConfidence.MEDIUM :
            return { color: "yellow", backgroundColor: "orange" };
        case AnalysisConfidence.HIGH :
            return { color: "yellow", backgroundColor: "green" };
        default :
            return { color: "yellow", backgroundColor: "grey" };
    }
}

export function partOfSpeachStyling(partOfSpeach: PartOfSpeech) {
    switch (partOfSpeach) {
        // case PartOfSpeech.VERB :
        //     return { color: "cyan", backgroundColor: "black" };
        case PartOfSpeech.NOUN :
            return { color: "lightgreen", backgroundColor: "black" };
        case PartOfSpeech.PROPN :
            return { color: "cyan", backgroundColor: "black" };
        default :
            return {};
    }
}