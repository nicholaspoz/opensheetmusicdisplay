"use strict";
var chai = require("chai");
/**
 * A mock implementation of [[IPlugin]] used for tests. It will register on all events
 * emitted by a [[IEventSource]] and provide chai spies to check on those events. This
 * class will identify itself as an OSMD plugin called `MOCK_PLUGIN`.
 */
var MockPlugin = (function () {
    function MockPlugin() {
    }
    Object.defineProperty(MockPlugin.prototype, "OnSheetLoadedSpy", {
        get: function () {
            return this.onSheetLoadedSpy;
        },
        enumerable: true,
        configurable: true
    });
    MockPlugin.prototype.getIdentifier = function () {
        return "MOCK_PLUGIN";
    };
    MockPlugin.prototype.registerEvents = function (eventSource) {
        // OnSheetLoaded
        this.onSheetLoadedSpy = chai.spy();
        eventSource.OnSheetLoaded.on(this.onSheetLoadedSpy);
    };
    MockPlugin.prototype.unregisterEvents = function (eventSource) {
        // OnSheetLoaded
        eventSource.OnSheetLoaded.off(this.onSheetLoadedSpy);
        this.onSheetLoadedSpy = undefined;
    };
    return MockPlugin;
}());
exports.MockPlugin = MockPlugin;
