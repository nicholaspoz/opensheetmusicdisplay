import { Fraction } from "../../Common/DataObjects/fraction";
import { VerticalSourceStaffEntryContainer } from "./VerticalSourceStaffEntryContainer";
import { Staff } from "./Staff";
import { AbstractNotationInstruction } from "./Instructions/AbstractNotationInstruction";
import { VoiceEntry } from "./VoiceEntry";
import { Note } from "./Note";
import { StaffEntryLink } from "./StaffEntryLink";
import { ChordSymbolContainer } from "./ChordSymbolContainer";
export declare class SourceStaffEntry {
    constructor(verticalContainerParent: VerticalSourceStaffEntryContainer, parentStaff: Staff);
    private parentStaff;
    private verticalContainerParent;
    private voiceEntries;
    private staffEntryLink;
    private instructions;
    private chordSymbolContainer;
    ParentStaff: Staff;
    VerticalContainerParent: VerticalSourceStaffEntryContainer;
    Timestamp: Fraction;
    AbsoluteTimestamp: Fraction;
    VoiceEntries: VoiceEntry[];
    Link: StaffEntryLink;
    Instructions: AbstractNotationInstruction[];
    ChordContainer: ChordSymbolContainer;
    removeAllInstructionsOfTypeClefInstruction(): number;
    removeFirstInstructionOfTypeClefInstruction(): boolean;
    removeAllInstructionsOfTypeKeyInstruction(): number;
    removeFirstInstructionOfTypeKeyInstruction(): boolean;
    removeAllInstructionsOfTypeRhythmInstruction(): number;
    removeFirstInstructionOfTypeRhythmInstruction(): boolean;
    calculateMinNoteLength(): Fraction;
    calculateMaxNoteLength(): Fraction;
    hasNotes(): boolean;
    hasTie(): boolean;
    findLinkedNotes(linkedNotes: Note[]): void;
}
