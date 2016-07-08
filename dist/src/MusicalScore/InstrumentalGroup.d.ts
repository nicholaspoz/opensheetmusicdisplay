import { MusicSheet } from "./MusicSheet";
export declare class InstrumentalGroup {
    constructor(name: string, musicSheet: MusicSheet, parent: InstrumentalGroup);
    private name;
    private musicSheet;
    private parent;
    private instrumentalGroups;
    readonly InstrumentalGroups: InstrumentalGroup[];
    readonly Parent: InstrumentalGroup;
    Name: string;
    readonly GetMusicSheet: MusicSheet;
}
