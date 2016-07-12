"use strict";
var Xml_1 = require("./Common/FileIO/Xml");
var VexFlowMusicSheetCalculator_1 = require("./MusicalScore/Graphical/VexFlow/VexFlowMusicSheetCalculator");
var MusicSheetReader_1 = require("./MusicalScore/ScoreIO/MusicSheetReader");
var GraphicalMusicSheet_1 = require("./MusicalScore/Graphical/GraphicalMusicSheet");
var VexFlowMusicSheetDrawer_1 = require("./MusicalScore/Graphical/VexFlow/VexFlowMusicSheetDrawer");
var fraction_1 = require("./Common/DataObjects/fraction");
var DrawingEnums_1 = require("./MusicalScore/Graphical/DrawingEnums");
var Plugin_1 = require("./Plugin");
var MusicSheetAPI = (function () {
    function MusicSheetAPI(container) {
        this.zoom = 1.0;
        this.unit = 10.0;
        this.fraction = new fraction_1.Fraction(0, 4);
        // Events
        this.onSheetLoaded = new Plugin_1.Event();
        this.onSizeChanged = new Plugin_1.Event();
        this.container = container;
        this.titles = document.createElement("div");
        this.canvas = document.createElement("canvas");
        this.container.appendChild(this.titles);
        this.container.appendChild(this.canvas);
        this.drawer = new VexFlowMusicSheetDrawer_1.VexFlowMusicSheetDrawer(this.titles, this.canvas);
        // Initialize plugin host 
        this.pluginHost = new Plugin_1.PluginHost(this);
    }
    /**
     * Load a MusicXML file
     *
     * @param doc is the root node of a MusicXML document
     */
    MusicSheetAPI.prototype.load = function (content) {
        this.reset();
        var elem;
        var path = "Unknown path";
        if (typeof content === "string") {
            if (content.substr(0, 4) === "http") {
                path = content;
                content = this.loadURL(path);
            }
        }
        if ("nodeName" in content) {
            elem = content.getElementsByTagName("score-partwise")[0];
            if (elem === undefined) {
                throw new Error("Invalid partwise MusicXML document");
            }
        }
        var score = new Xml_1.IXmlElement(elem);
        var calc = new VexFlowMusicSheetCalculator_1.VexFlowMusicSheetCalculator();
        var reader = new MusicSheetReader_1.MusicSheetReader();
        this.sheet = reader.createMusicSheet(score, path);
        this.onSheetLoaded.trigger(this.sheet); // emit `OnSheetLoaded` event
        this.graphic = new GraphicalMusicSheet_1.GraphicalMusicSheet(this.sheet, calc);
    };
    /**
     * Set the zoom
     * @param factor is the zooming factor
     */
    MusicSheetAPI.prototype.scale = function (factor) {
        this.zoom = factor;
    };
    /**
     * Render the music sheet in the container
     */
    MusicSheetAPI.prototype.render = function () {
        this.resetTitle();
        if (!this.graphic) {
            throw new Error("OSMD: Before rendering a music sheet, please load a MusicXML file");
        }
        var width = this.container.offsetWidth;
        if (isNaN(width)) {
            throw new Error("OSMD: Before rendering a music sheet, please set the width of the container");
        }
        // Set page width
        this.sheet.pageWidth = width / this.zoom / this.unit;
        // Calculate again
        this.graphic.reCalculate();
        // Update Sheet Page
        var height = this.graphic.MusicPages[0].PositionAndShape.BorderBottom * this.unit * this.zoom;
        this.drawer.resize(width, height);
        // Fix the label problem
        // this.drawer.translate(0, 100);
        this.drawer.scale(this.zoom);
        // Finally, draw
        this.drawer.drawSheet(this.graphic);
    };
    MusicSheetAPI.prototype.next = function () {
        //calculateCursorLineAtTimestamp
        //let iterator: MusicPartManagerIterator = this.sheet.MusicPartManager.getIterator();
        //while (!iterator.EndReached && iterator.CurrentVoiceEntries !== undefined) {
        //    for (let idx: number = 0, len: number = iterator.CurrentVoiceEntries.length; idx < len; ++idx) {
        //        let voiceEntry: VoiceEntry = iterator.CurrentVoiceEntries[idx];
        //        for (let idx2: number = 0, len2: number = voiceEntry.Notes.length; idx2 < len2; ++idx2) {
        //            let note: Note = voiceEntry.Notes[idx2];
        //            note.state = NoteState.Normal;
        //        }
        //    }
        //    iterator.moveToNext();
        //}
        this.graphic.Cursors.length = 0;
        this.graphic.Cursors.push(this.graphic.calculateCursorLineAtTimestamp(this.fraction, DrawingEnums_1.OutlineAndFillStyleEnum.PlaybackCursor));
        this.fraction.Add(new fraction_1.Fraction(1, 8));
        this.render();
    };
    MusicSheetAPI.prototype.loadURL = function (url) {
        return undefined;
    };
    //private loadMXL(content: string): Document {
    //    return undefined;
    //}
    MusicSheetAPI.prototype.resetTitle = function () {
        // Empty this.titles
        while (this.titles.firstChild) {
            this.titles.removeChild(this.titles.firstChild);
        }
    };
    /**
     * Initialize this object to default values
     */
    MusicSheetAPI.prototype.reset = function () {
        this.sheet = undefined;
        this.graphic = undefined;
        this.zoom = 1.0;
        this.unit = 10.0;
        this.resetTitle();
    };
    /**
     * Register a plugin with this OSMD instance.
     *
     * @param plugin The plugin to be registered with this instance.
     */
    MusicSheetAPI.prototype.registerPlugin = function (plugin) {
        this.pluginHost.registerPlugin(plugin);
    };
    /**
     * Unregister a plugin with this OSMD instance.
     *
     * @param plugin The plugin to be unregistered from this instance.
     */
    MusicSheetAPI.prototype.unregisterPlugin = function (plugin) {
        this.pluginHost.unregisterPlugin(plugin);
    };
    Object.defineProperty(MusicSheetAPI.prototype, "OnSheetLoaded", {
        /*
         * Publish events emmitted as IEventSource. For documentation, see IEventSource.
         */
        get: function () { return this.onSheetLoaded; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MusicSheetAPI.prototype, "OnSizeChanged", {
        get: function () { return this.onSizeChanged; },
        enumerable: true,
        configurable: true
    });
    return MusicSheetAPI;
}());
exports.MusicSheetAPI = MusicSheetAPI;
