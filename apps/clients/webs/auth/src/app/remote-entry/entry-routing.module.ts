import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntryComponent } from './entry.component';

const routes: Routes = [
    {
        path: '',
        component: EntryComponent,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'login' },
            {
                path: 'forgot',
                loadComponent: () =>
                    import('../forgot/forgot.component').then(
                        (c) => c.ForgotComponent
                    ),
            },
            {
                path: 'login',
                loadComponent: () =>
                    import('../login/login.component').then(
                        (c) => c.LoginComponent
                    ),
            },
            {
                path: 'reg',
                loadComponent: () =>
                    import('../reg/reg.component').then((c) => c.RegComponent),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EntryRoutingModule {}
