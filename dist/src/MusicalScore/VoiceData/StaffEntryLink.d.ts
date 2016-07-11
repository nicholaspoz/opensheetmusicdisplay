import { VoiceEntry } from "./VoiceEntry";
import { SourceStaffEntry } from "./SourceStaffEntry";
export declare class StaffEntryLink {
    constructor(voiceEntry: VoiceEntry);
    private voiceEntry;
    private linkStaffEntries;
    readonly GetVoiceEntry: VoiceEntry;
    LinkStaffEntries: SourceStaffEntry[];
}
