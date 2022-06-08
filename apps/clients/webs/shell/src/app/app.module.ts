import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(
            [
                {
                    path: '',
                    component: NxWelcomeComponent,
                },
                {
                    path: 'auth',
                    loadChildren: () =>
                        import('auth-web/Module').then(
                            (m) => m.RemoteEntryModule
                        ),
                },
                {
                    path: 'profile',
                    loadChildren: () =>
                        import('profile-web/Module').then(
                            (m) => m.RemoteEntryModule
                        ),
                },
            ],
            { initialNavigation: 'enabledBlocking' }
        ),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
