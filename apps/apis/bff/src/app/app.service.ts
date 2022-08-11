// import { Account } from '@core-template';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getData(): any {
        return [
            { name: `Profile`, orderId: 0 },
            { name: `Dashboard`, orderId: 2 },
            { name: `Settings`, orderId: 3 },
            { name: `Contacts`, orderId: 4 },
            { name: `Disabled`, orderId: 5 },
        ];
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
