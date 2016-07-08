"use strict";
var typescript_collections_1 = require("typescript-collections");
/**
 * Holds a collection of OSMD plugins and makes sure plugins get registered and
 * unregistered properly and are not being added multiple times.
 */
var PluginHost = (function () {
    function PluginHost(eventSource) {
        this.registeredPlugins = new typescript_collections_1.LinkedList();
        this.eventSource = eventSource;
    }
    PluginHost.prototype.registerPlugin = function (plugin) {
        if (!this.registeredPlugins.contains(plugin, this.pluginsEqual)) {
            this.registeredPlugins.add(plugin);
            plugin.registerEvents(this.eventSource);
        }
        else {
            throw ("Plugin already registered.");
        }
    };
    PluginHost.prototype.unregisterPlugin = function (plugin) {
        this.registeredPlugins.remove(plugin, this.pluginsEqual);
        plugin.unregisterEvents(this.eventSource);
    };
    PluginHost.prototype.pluginsEqual = function (pluginA, pluginB) {
        return pluginA.getIdentifier() === pluginB.getIdentifier();
    };
    return PluginHost;
}());
exports.PluginHost = PluginHost;
