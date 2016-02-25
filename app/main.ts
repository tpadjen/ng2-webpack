import {enableProdMode} from 'angular2/core';
import {bootstrap} from 'angular2/bootstrap';
import {App} from './app';

declare let __PRODUCTION__: any;
if (__PRODUCTION__) {
  enableProdMode();
}

bootstrap(App, []);
