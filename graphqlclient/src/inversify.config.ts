import 'reflect-metadata';

import { Container } from 'inversify';
import { makeFluentProvideDecorator } from 'inversify-binding-decorators';
import getDecorators from 'inversify-inject-decorators';

let container = new Container();
let decorators = getDecorators(container);
let inject = decorators.lazyInject;

const provide = makeFluentProvideDecorator(container);

function provideSingleton(identifier: string) {
    return provide(identifier).inSingletonScope().done();
}

export {
    container,
    inject,
    provideSingleton
};