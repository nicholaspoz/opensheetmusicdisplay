import { Instrument } from "../Instrument";
import { VoiceEntry } from "./VoiceEntry";
export declare class Voice {
    private voiceEntries;
    private parent;
    private visible;
    private audible;
    private following;
    private voiceId;
    private volume;
    constructor(parent: Instrument, voiceId: number);
    readonly VoiceEntries: VoiceEntry[];
    readonly Parent: Instrument;
    Visible: boolean;
    Audible: boolean;
    Following: boolean;
    readonly VoiceId: number;
    Volume: number;
}
