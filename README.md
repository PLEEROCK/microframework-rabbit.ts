# Rabbit.ts module for Microframework

Adds integration between [rabbit.ts](http://github.com/PLEEROCK/rabbit.ts) and 
[microframework](https://github.com/PLEEROCK/microframework).

## Usage

1. Install module:

    `npm install --save microframework-rabbit.ts`

2. Simply register module in the microframework when you are bootstrapping it.
    
    ```typescript
    
        import {MicroFrameworkBootstrapper} from "microframework/MicroFrameworkBootstrapper";
        import {ExpressModule} from "microframework-express/ExpressModule";
        import {RabbitTsModule} from "microframework-rabbit.ts/RabbitTsModule";
        
        new MicroFrameworkBootstrapper({ baseDirectory: __dirname })
            .registerModules([
                new ExpressModule(),
                new RabbitTsModule()
            ])
            .bootstrap()
            .then(result => console.log('Module is running. Now you can use rabbit.ts and rabbit.js tools'))
            .catch(error => console.error('Error: ', error));
            
    ```

3. Now you can use [rabbit.ts](https://github.com/PLEEROCK/rabbit.ts) module in your microframework.

## Todos

* cover with tests
* add more docs