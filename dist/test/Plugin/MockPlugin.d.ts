import { IEventSource, IPlugin } from "../../src/Plugin";
export declare class MockPlugin implements IPlugin {
    OnSheetLoadedSpy: any;
    getIdentifier(): string;
    registerEvents(eventSource: IEventSource): void;
    unregisterEvents(eventSource: IEventSource): void;
}
