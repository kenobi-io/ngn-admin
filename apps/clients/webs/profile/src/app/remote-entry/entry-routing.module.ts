import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountComponent } from '../account/account.component';
import { SettingComponent } from '../setting/setting.component';
import { EntryComponent } from './entry.component';

const routes: Routes = [
    {
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'account' },
            {
                component: AccountComponent,
                path: 'account',
            },
            {
                component: SettingComponent,
                path: 'settings',
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
