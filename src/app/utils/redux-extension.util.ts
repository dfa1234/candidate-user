const withDevTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__;

class ReduxExtension {
    private devTools: any;

    constructor() {
        if (withDevTools) {
            this.devTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__.connect();
        }
    }

    public sendAction(constructor: Function, state: any): void {
        this.devTools.send(constructor.toString().match(/\w+/g)[1], state);
    }
}

export const reduxExtension = new ReduxExtension();
