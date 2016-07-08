import { IPlugin, IEventSource } from "./";
/**
 * Holds a collection of OSMD plugins and makes sure plugins get registered and
 * unregistered properly and are not being added multiple times.
 */
export declare class PluginHost {
    private registeredPlugins;
    private eventSource;
    constructor(eventSource: IEventSource);
    registerPlugin(plugin: IPlugin): void;
    unregisterPlugin(plugin: IPlugin): void;
    private pluginsEqual(pluginA, pluginB);
}
