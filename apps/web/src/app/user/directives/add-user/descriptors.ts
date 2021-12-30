import { User } from '../../user';
import { Descriptions } from './Descriptions';
import { Descriptor } from './Descriptor';

export const descriptors: Descriptions = new Map<Descriptor, Function>()
  .set('get.elements', (form) => {
    form.preventDefault();
    const target = form.target as HTMLFormElement;
    return target.elements;
  })
  .set('set.model', (inputs) => {
    let user: User = {} as any;
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].nodeName === 'INPUT' && inputs[i].type === 'text') {
        user[inputs[i].name] = inputs[i].value;
      }
    }
    return user;
  });
// export type Descriptor = 'get.elements' | 'set.model';
