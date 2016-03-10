# Rabbit.ts module for Microframework

Adds integration between [rabbit.ts](http://github.com/pleerock/rabbit.ts) and
[microframework](https://github.com/pleerock/microframework).

## Usage

1. Install module:

    `npm install microframework-rabbit.ts --save`

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

3. ES6 features are used, so you may want to install [es6-shim](https://github.com/paulmillr/es6-shim) too:

    `npm install es6-shim --save`

    you may need to `require("es6-shim");` in your app.

4. Now you can use [rabbit.ts](https://github.com/pleerock/rabbit.ts) module in your microframework.

## Todos

* cover with tests
* add more docs