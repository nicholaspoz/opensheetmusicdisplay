import { SourceMusicPart } from "./SourceMusicPart";
import { Fraction } from "../../Common/DataObjects/fraction";
import { MusicSheet } from "../MusicSheet";
import { RepetitionInstruction } from "../VoiceData/Instructions/RepetitionInstruction";
import { PartListEntry } from "./PartListEntry";
export declare class Repetition extends PartListEntry {
    constructor(musicSheet: MusicSheet, virtualOverallRepetition: boolean);
    startMarker: RepetitionInstruction;
    endMarker: RepetitionInstruction;
    forwardJumpInstruction: RepetitionInstruction;
    private backwardJumpInstructions;
    private endingParts;
    private endingIndexDict;
    private userNumberOfRepetitions;
    private visibles;
    private fromWords;
    private musicSheet2;
    private repetitonIterationOrder;
    private numberOfEndings;
    private virtualOverallRepetition;
    readonly BackwardJumpInstructions: RepetitionInstruction[];
    readonly EndingIndexDict: {
        [_: number]: RepetitionEndingPart;
    };
    readonly EndingParts: RepetitionEndingPart[];
    Visibles: boolean[];
    readonly DefaultNumberOfRepetitions: number;
    UserNumberOfRepetitions: number;
    getForwardJumpTargetForIteration(iteration: number): number;
    getBackwardJumpTarget(): number;
    SetEndingStartIndex(endingNumbers: number[], startIndex: number): void;
    setEndingEndIndex(endingNumber: number, endIndex: number): void;
    readonly NumberOfEndings: number;
    FromWords: boolean;
    readonly AbsoluteTimestamp: Fraction;
    readonly StartIndex: number;
    readonly EndIndex: number;
    private checkRepetitionForMultipleLyricVerses();
    readonly FirstSourceMeasureNumber: number;
    readonly LastSourceMeasureNumber: number;
}
export declare class RepetitionEndingPart {
    constructor(endingPart: SourceMusicPart);
    part: SourceMusicPart;
    endingIndices: number[];
    ToString(): string;
}
