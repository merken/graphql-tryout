import * as flux from 'flux';

import { Action } from './actions';
import { provideSingleton } from './inversify.config';

@provideSingleton("Dispatcher")
class Dispatcher {
    private _dispatcher: flux.Dispatcher<Action>;
    constructor() {
        this._dispatcher = new flux.Dispatcher();
    }
    dispatchAction(action: Action) {
        this._dispatcher.dispatch(action);
    }

    registerForActions(registration: (action: Action) => void) {
        this._dispatcher.register(registration);
    }
};

export default Dispatcher;