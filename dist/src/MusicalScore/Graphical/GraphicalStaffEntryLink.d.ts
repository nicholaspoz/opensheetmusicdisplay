import { StaffEntryLink } from "../VoiceData/StaffEntryLink";
import { GraphicalStaffEntry } from "./GraphicalStaffEntry";
import { GraphicalNote } from "./GraphicalNote";
export declare class GraphicalStaffEntryLink {
    private staffEntryLink;
    private graphicalLinkedStaffEntries;
    constructor(staffEntryLink: StaffEntryLink);
    readonly GetStaffEntryLink: StaffEntryLink;
    GraphicalLinkedStaffEntries: GraphicalStaffEntry[];
    isFilled(): boolean;
    getLinkedStaffEntriesGraphicalNotes(graphicalStaffEntry: GraphicalStaffEntry): GraphicalNote[];
    private initialize();
}
