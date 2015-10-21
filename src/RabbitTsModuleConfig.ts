import {CreateContextOptions} from "rabbit.ts/CreateContextOptions";

/**
 * Configuration for rabbit.ts module.
 */
export interface RabbitTsModuleConfig {

    /**
     * List of directories where from rabbit.ts lifecycle listeners will be loaded.
     */
    listenersDirectories?: string[];

    /**
     * Rabbit.js context creation options.
     */
    context?: CreateContextOptions;

    /**
     * Rabbit.js context creation options when multiple contexts are required.
     */
    contexts?: {
        name: string;
        options: CreateContextOptions;
    }[];

}
