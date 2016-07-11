import { MusicSheet } from "./MusicalScore/MusicSheet";
import { SizeF2D } from "./Common/DataObjects/SizeF2D";
import { IEvent, IEventSource, IPlugin } from "./Plugin";
export declare class MusicSheetAPI implements IEventSource {
    constructor();
    private canvas;
    private sheet;
    private drawer;
    private graphic;
    private width;
    private zoom;
    private unit;
    private pluginHost;
    private onSheetLoaded;
    private onSizeChanged;
    /**
     * Initialize this object to default values
     */
    free(): void;
    /**
     * Load a MusicXML file
     *
     * @param doc is the root node of a MusicXML document
     */
    load(doc: Document): void;
    /**
     * Set the drawing canvas
     * @param canvas
     */
    setCanvas(canvas: HTMLCanvasElement): void;
    /**
     * Set the canvas width
     * @param width
     */
    setWidth(width: number): void;
    /**
     * Set the zoom
     * @param k
     */
    scale(k: number): void;
    display(): void;
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
    OnSheetLoaded: IEvent<MusicSheet>;
    OnSizeChanged: IEvent<SizeF2D>;
}
