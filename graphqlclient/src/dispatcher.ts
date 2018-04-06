import * as flux from 'flux';
import { Action } from './actions';

class Dispatcher {
    private _dispatcher: flux.Dispatcher<Action>;
    constructor() {
        this._dispatcher = new flux.Dispatcher();
    }
    dispatch(action: Action) {
        this._dispatcher.dispatch(action);
    }

    register(registration: (action: Action) => void) {
        this._dispatcher.register(registration);
    }
};

export default new Dispatcher();