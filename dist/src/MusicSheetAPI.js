"use strict";
var Xml_1 = require("./Common/FileIO/Xml");
var VexFlowMusicSheetCalculator_1 = require("./MusicalScore/Graphical/VexFlow/VexFlowMusicSheetCalculator");
var MusicSheetReader_1 = require("./MusicalScore/ScoreIO/MusicSheetReader");
var GraphicalMusicSheet_1 = require("./MusicalScore/Graphical/GraphicalMusicSheet");
var VexFlowMusicSheetDrawer_1 = require("./MusicalScore/Graphical/VexFlow/VexFlowMusicSheetDrawer");
var VexFlowTextMeasurer_1 = require("./MusicalScore/Graphical/VexFlow/VexFlowTextMeasurer");
var Plugin_1 = require("./Plugin");
var MusicSheetAPI = (function () {
    function MusicSheetAPI() {
        this.zoom = 1.0;
        this.unit = 10.0;
        // Events
        this.onSheetLoaded = new Plugin_1.Event();
        this.onSizeChanged = new Plugin_1.Event();
        this.free();
    }
    /**
     * Initialize this object to default values
     */
    MusicSheetAPI.prototype.free = function () {
        this.width = undefined;
        this.canvas = undefined;
        this.sheet = undefined;
        this.drawer = undefined;
        this.graphic = undefined;
        this.zoom = 1.0;
        this.unit = 10.0;
        // Initialize plugin host 
        this.pluginHost = new Plugin_1.PluginHost(this);
    };
    /**
     * Load a MusicXML file
     *
     * @param doc is the root node of a MusicXML document
     */
    MusicSheetAPI.prototype.load = function (doc) {
        var elem = doc.getElementsByTagName("score-partwise")[0];
        if (elem === undefined) {
            throw new Error("Invalid partwise MusicXML document");
        }
        var score = new Xml_1.IXmlElement(elem);
        var calc = new VexFlowMusicSheetCalculator_1.VexFlowMusicSheetCalculator();
        var reader = new MusicSheetReader_1.MusicSheetReader();
        this.sheet = reader.createMusicSheet(score, "*** unknown path ***");
        this.onSheetLoaded.trigger(this.sheet); // emit `OnSheetLoaded` event
        this.graphic = new GraphicalMusicSheet_1.GraphicalMusicSheet(this.sheet, calc);
        this.display();
    };
    /**
     * Set the drawing canvas
     * @param canvas
     */
    MusicSheetAPI.prototype.setCanvas = function (canvas) {
        this.canvas = canvas;
        this.drawer = new VexFlowMusicSheetDrawer_1.VexFlowMusicSheetDrawer(canvas, new VexFlowTextMeasurer_1.VexFlowTextMeasurer());
    };
    /**
     * Set the canvas width
     * @param width
     */
    MusicSheetAPI.prototype.setWidth = function (width) {
        if (width === this.width) {
            return;
        }
        this.width = width;
        this.display();
    };
    /**
     * Set the zoom
     * @param k
     */
    MusicSheetAPI.prototype.scale = function (k) {
        this.zoom = k;
        this.display();
    };
    // FIXME: make the following private!
    MusicSheetAPI.prototype.display = function () {
        if (this.width === undefined) {
            return;
        }
        if (this.canvas === undefined) {
            return;
        }
        if (this.sheet === undefined) {
            return;
        }
        // Set page width
        this.sheet.pageWidth = this.width / this.zoom / this.unit;
        // Calculate again
        this.graphic.reCalculate();
        // Update Sheet Page
        var height = this.graphic.MusicPages[0].PositionAndShape.BorderBottom * this.unit * this.zoom;
        this.drawer.resize(this.width, height);
        // Fix the label problem
        // this.drawer.translate(0, 100);
        this.drawer.scale(this.zoom);
        // Finally, draw
        this.drawer.drawSheet(this.graphic);
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
