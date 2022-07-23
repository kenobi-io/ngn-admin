import { Account } from '@core-template';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getData(): Account {
        return {
            additionalName: 'additionalName',
            bio: 'bio',
            company: 'company',
            firstName: 'firstName',
            lastName: 'lastName',
            location: [
                {
                    apartment: 'apartment',
                    building: 'building',
                    city: 'city',
                    district: 'district',
                    house: 'house',
                    region: 'region',
                    street: 'street',
                },
            ],
            nick: 'nick',
            publicEmail: 'publicEmail',
            site: 'site',
            social: 'social',
        };
    }
}
