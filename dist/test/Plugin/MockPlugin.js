"use strict";
var chai = require("chai");
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
        this.onSheetLoadedSpy = chai.spy();
        eventSource.OnSheetLoaded.on(this.onSheetLoadedSpy);
    };
    MockPlugin.prototype.unregisterEvents = function (eventSource) {
        eventSource.OnSheetLoaded.off(this.onSheetLoadedSpy);
        this.onSheetLoadedSpy = undefined;
    };
    return MockPlugin;
}());
exports.MockPlugin = MockPlugin;
