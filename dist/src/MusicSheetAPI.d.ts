import { MusicSheet } from "./MusicalScore/MusicSheet";
import { SizeF2D } from "./Common/DataObjects/SizeF2D";
import { IEvent, IEventSource, IPlugin } from "./Plugin";
export declare class MusicSheetAPI implements IEventSource {
    constructor(container: HTMLElement);
    private container;
    private titles;
    private canvas;
    private sheet;
    private drawer;
    private graphic;
    private zoom;
    private unit;
    private fraction;
    private pluginHost;
    private onSheetLoaded;
    private onSizeChanged;
    /**
     * Load a MusicXML file
     *
     * @param doc is the root node of a MusicXML document
     */
    load(content: string | Document): void;
    /**
     * Set the zoom
     * @param factor is the zooming factor
     */
    scale(factor: number): void;
    /**
     * Render the music sheet in the container
     */
    render(): void;
    next(): void;
    private loadURL(url);
    private resetTitle();
    /**
     * Initialize this object to default values
     */
    private reset();
    /**
     * Register a plugin with this OSMD instance.
     *
     * @param plugin The plugin to be registered with this instance.
     */
    registerPlugin(plugin: IPlugin): void;
    /**
     * Unregister a plugin with this OSMD instance.
     *
     * @param plugin The plugin to be unregistered from this instance.
     */
    unregisterPlugin(plugin: IPlugin): void;
    readonly OnSheetLoaded: IEvent<MusicSheet>;
    readonly OnSizeChanged: IEvent<SizeF2D>;
}
