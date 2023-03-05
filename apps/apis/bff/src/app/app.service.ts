// import { Account } from '@core-template';
import { Injectable } from '@nestjs/common';

export interface User {
    lastName: string;
    name: string;
    orderId: number;
}

@Injectable()
export class AppService {
    getData(): User[] {
        return [
            { lastName: `A.A.`, name: `Profile`, orderId: 0 },
            { lastName: `B.B.`, name: `Dashboard`, orderId: 2 },
            { lastName: `C.C.`, name: `Settings`, orderId: 3 },
            { lastName: `D.D.`, name: `Contacts`, orderId: 4 },
            { lastName: `E.E.`, name: `Disabled`, orderId: 5 },
        ] as User[];
        // return {
        //     additionalName: 'additionalName',
        //     bio: 'bio',
        //     company: 'company',
        //     firstName: 'firstName',
        //     lastName: 'lastName',
        //     location: [
        //         {
        //             apartment: 'apartment',
        //             building: 'building',
        //             city: 'city',
        //             district: 'district',
        //             house: 'house',
        //             region: 'region',
        //             street: 'street',
        //         },
        //     ],
        //     nick: 'nick',
        //     publicEmail: 'publicEmail',
        //     site: 'site',
        //     social: 'social',
        // };
    }
}
