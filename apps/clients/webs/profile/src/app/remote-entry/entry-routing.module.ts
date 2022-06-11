import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from '../account/account.component';
import { SettingComponent } from '../setting/setting.component';
import { EntryComponent } from './entry.component';

const routes: Routes = [
    {
        path: '',
        component: EntryComponent,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'account' },
            {
                path: 'account',
                component: AccountComponent,
            },
            {
                path: 'settings',
                component: SettingComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EntryRoutingModule {}
