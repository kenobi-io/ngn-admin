import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EntryComponent } from './entry.component';

const routes: Routes = [
    {
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'login' },
            {
                loadComponent: () =>
                    import('../forgot/forgot.component').then(
                        (c) => c.ForgotComponent
                    ),
                path: 'forgot',
            },
            {
                loadComponent: () =>
                    import('../login/login.component').then(
                        (c) => c.LoginComponent
                    ),
                path: 'login',
            },
            {
                loadComponent: () =>
                    import('../reg/reg.component').then((c) => c.RegComponent),
                path: 'reg',
            },
        ],
        component: EntryComponent,
        path: '',
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
})
export class EntryRoutingModule {}
