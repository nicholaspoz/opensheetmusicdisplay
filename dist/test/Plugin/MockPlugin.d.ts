import { IEventSource, IPlugin } from "../../src/Plugin";
/**
 * A mock implementation of [[IPlugin]] used for tests. It will register on all events
 * emitted by a [[IEventSource]] and provide chai spies to check on those events. This
 * class will identify itself as an OSMD plugin called `MOCK_PLUGIN`.
 */
export declare class MockPlugin implements IPlugin {
    private onSheetLoadedSpy;
    readonly OnSheetLoadedSpy: any;
    getIdentifier(): string;
    registerEvents(eventSource: IEventSource): void;
    unregisterEvents(eventSource: IEventSource): void;
}
