import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { addCommands } from './app/commands';
import { Platform } from './app/chainable/chain';

if (environment.production) {
  enableProdMode();
}

Platform.setChain(window.chain, addCommands);

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
