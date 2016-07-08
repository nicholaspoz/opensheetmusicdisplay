"use strict";
var chai = require('chai');
var MockPlugin = (function () {
    function MockPlugin() {
    }
    MockPlugin.prototype.getIdentifier = function () {
        return "MOCK_PLUGIN";
    };
    MockPlugin.prototype.registerEvents = function (eventSource) {
        this.OnSheetLoadedSpy = chai.spy();
        eventSource.OnSheetLoaded.on(this.OnSheetLoadedSpy);
    };
    MockPlugin.prototype.unregisterEvents = function (eventSource) {
        eventSource.OnSheetLoaded.off(this.OnSheetLoadedSpy);
        this.OnSheetLoadedSpy;
    };
    return MockPlugin;
}());
exports.MockPlugin = MockPlugin;
