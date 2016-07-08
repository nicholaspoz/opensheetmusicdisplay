import { LyricsEntry } from "./LyricsEntry";
import { VoiceEntry } from "../VoiceEntry";
export declare class LyricWord {
    private syllables;
    readonly Syllables: LyricsEntry[];
    containsVoiceEntry(voiceEntry: VoiceEntry): boolean;
    findLyricEntryInVoiceEntry(voiceEntry: VoiceEntry): LyricsEntry;
}
