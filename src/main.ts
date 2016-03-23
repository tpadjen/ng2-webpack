import {enableProdMode} from 'angular2/core';
import {bootstrap} from 'angular2/bootstrap';
import {HTTP_PROVIDERS} from 'angular2/http';
import {App} from './app/app';

declare let __PRODUCTION__: any;
if (__PRODUCTION__) {
  enableProdMode();
}

bootstrap(App, [
  HTTP_PROVIDERS
]);
