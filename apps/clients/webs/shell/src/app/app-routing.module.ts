import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () =>
            import('auth-web/Module').then((m) => m.RemoteEntryModule),
    },
    {
        path: 'profile',
        loadChildren: () =>
            import('profile-web/Module').then((m) => m.RemoteEntryModule),
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
