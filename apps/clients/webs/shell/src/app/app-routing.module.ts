import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        loadChildren: () =>
            import('auth-web/Module').then((m) => m.RemoteEntryModule),
        path: 'auth',
    },
    {
        loadChildren: () =>
            import('profile-web/Module').then((m) => m.RemoteEntryModule),
        path: 'profile',
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [
        RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
    ],
})
export class AppRoutingModule {}
