import { Voice } from "./Voice";
import { Instrument } from "../Instrument";
export declare class Staff {
    constructor(parentInstrument: Instrument, instrumentStaffId: number);
    idInMusicSheet: number;
    audible: boolean;
    following: boolean;
    private parentInstrument;
    private voices;
    private volume;
    private id;
    ParentInstrument: Instrument;
    readonly Voices: Voice[];
    readonly Id: number;
    Volume: number;
}
