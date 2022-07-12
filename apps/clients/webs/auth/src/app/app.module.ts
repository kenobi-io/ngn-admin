/*
 * This RemoteEntryModule is imported here to allow TS to find the Module during
 * compilation, allowing it to be included in the built bundle. This is required
 * for the Module Federation Plugin to expose the Module correctly.
 * */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [],
    imports: [
        BrowserModule,
        RouterModule.forRoot(
            [
                {
                    loadChildren: () =>
                        import('./remote-entry/entry.module').then(
                            (m) => m.RemoteEntryModule
                        ),
                    path: '',
                },
            ],
            { initialNavigation: 'enabledBlocking' }
        ),
    ],
    providers: [],
})
export class AppModule {}
