import 'reflect-metadata';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Main } from './components/main';

ReactDOM.render(
    React.createElement(Main, null),
    document.getElementById("root") as HTMLElement
);
