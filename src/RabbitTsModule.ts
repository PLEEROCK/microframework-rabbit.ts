import {Server} from "http";
import {RabbitTsModuleConfig} from "./RabbitTsModuleConfig";
import {ContextManager} from "rabbit.ts/ContextManager";
import {Utils} from "rabbit.ts/Utils";
import {Module, ModuleInitOptions} from "microframework/Module";

/**
 * Rabbit.ts module integration with microframework.
 */
export class RabbitTsModule implements Module {

    // -------------------------------------------------------------------------
    // Constants
    // -------------------------------------------------------------------------

    public static DEFAULT_LISTENER_DIRECTORY = 'subscribers';

    // -------------------------------------------------------------------------
    // Properties
    // -------------------------------------------------------------------------

    private options: ModuleInitOptions;
    private configuration: RabbitTsModuleConfig;
    private _contextManager: ContextManager;

    // -------------------------------------------------------------------------
    // Accessors
    // -------------------------------------------------------------------------

    getName(): string {
        return 'RabbitTsModule';
    }

    getConfigurationName(): string {
        return 'rabbit.ts';
    }

    isConfigurationRequired(): boolean {
        return true;
    }

    init(options: ModuleInitOptions, configuration: RabbitTsModuleConfig): void {
        this.options = options;
        this.configuration = configuration;
    }

    onBootstrap(): Promise<any> {
        return this.setupConnections();
    }

    afterBootstrap(): Promise<any> {
        Utils.requireAll(this.getListenerDirectories());
        return this._contextManager.loadListeners();
    }

    onShutdown(): Promise<any> {
        return this.closeConnections();
    }

    // -------------------------------------------------------------------------
    // Accessors
    // -------------------------------------------------------------------------

    /**
     * Gets the context manager.
     */
    get contextManager(): ContextManager {
        return this._contextManager;
    }

    // -------------------------------------------------------------------------
    // Private Methods
    // -------------------------------------------------------------------------

    private getListenerDirectories(): string[] {
        if (!this.configuration || !this.configuration.listenersDirectories)
            return [this.getSourceCodeDirectory() + RabbitTsModule.DEFAULT_LISTENER_DIRECTORY];

        return this.configuration.listenersDirectories;
    }

    private setupConnections() {
        this._contextManager = this.options.container.get(ContextManager);
        this._contextManager.container = this.options.container;
        return this.connect();
    }

    private closeConnections(): Promise<any> {
        let promises: Promise<any>[] = [];
        if (this.configuration.context)
            promises.push(this._contextManager.closeContext());

        if (this.configuration.contexts)
            promises = promises.concat(this.configuration.contexts.map(context => {
                return this._contextManager.closeContext(context.name);
            }));

        return Promise.all(promises);
    }

    private connect(): Promise<any> {
        let promises: Promise<any>[] = [];
        if (this.configuration.context)
            promises.push(this._contextManager.createContext(this.configuration.context));

        if (this.configuration.contexts) {
            promises = promises.concat(this.configuration.contexts.map(context => {
                return this._contextManager.createContext(context.name, context.options);
            }));
        }
        return Promise.all(promises);
    }

    private getSourceCodeDirectory() {
        return this.options.frameworkSettings.srcDirectory + '/';
    }

}
