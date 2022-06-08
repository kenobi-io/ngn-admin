import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotComponent } from '../forgot/forgot.component';
import { LoginComponent } from '../login/login.component';
import { RegComponent } from '../reg/reg.component';
import { EntryComponent } from './entry.component';

const routes: Routes = [
    {
        path: '',
        component: EntryComponent,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'login' },
            {
                path: 'forgot',
                component: ForgotComponent,
            },
            {
                path: 'login',
                component: LoginComponent,
                pathMatch: 'prefix',
            },
            {
                path: 'reg',
                component: RegComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class Entry1RoutingModule {}
