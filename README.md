# ngn-template

### Quick Start & Documentation

microfrontends

microservices

core library

### Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

### Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

### Create tag

```bash
$ git commit
$ git commit -m '[upd] version ...;'
$ git tag v...
$ git commit -m '[upd] version ...;'
$ git push --tag
$ git push
```

# Angular

***
##### Pure pipes
***

> <p> <code>Pure</code> it means that pipe don't mutation input date (without side effects)</p>

###### OnPush + pure pipes

> <p>Strategy to OnPush. This means that change detection inside the Component will now be </br> triggered only when its @Input properties change.</br>
> We create a <code> pure custom pipe </code> to perform the required calculation only when the </br> pipe’s input changes. Uses the pipe instead of calling the method into templates of components.</br> </p>

###### Pure Pipes + Memoization

> <p>If pipe is pure we can cache the calculations instead of recalculating them <code>@memo()</code></p>

***
##### Composite component
***

> <p> использование переменной для из директивы для вызова различного функционала </p> 

```html
    <div *carousel="let url from images; let ctrl = controller"> 
        <button (click)="ctrl.next()">
```

```ts
    const context = {
        $implicit: null ,
        controller: {
          next: () => this.next() // next: this.next.bind(this, param);
        }
    }
```

> <p> получение host component в директиве </p>

```ts
// дочерняя директива/компонент совершенно спокойно может получить инстанс родителя через DI
import { Directive } from "@angular/core"; import { CountComponent } from "./count.component";

@Directive({ selector: "[increment]" })
export class IncrementDirective {
  constructor(private countComponent: CountComponent) {
    this.countComponent.count += 1;
  }
}
```

> <p> использование ngTemplateOutlet для проекции контента </p>

```html
    <div class="content">
      <ng-container
        [ngTemplateOutlet]="itemTemplateRef"
        [ngTemplateOutletContext]="{ $implicit: item, method1: myMethod }" ><!-- переменная, которая передается в шаблон -->
      </ng-container>
    </div>

    <!-- использование с передачей компонента внутри ng-template -->
    <app-container>
          <ng-template #itemTemplate let-item let-method="method1"> <!-- переменная полученная шаблоном -->
            <app-other-component [inputProp]="item"></app-other-component>
          </ng-template>
    </app-container>
```

```ts
import { ContentChild, TemplateRef } from '@angular/core'
// selector: 'app-container'
// ...
@ContentChild('itemTemplate', { static: false }) item: TemplateRef<any>;
```

***
#### Interaction directives
***

```html
<div class="container" *context="let method = method">
    <ngn [context]="{method}"> </ngn>
    <button
        fireDirective
        (outputEvent)="method($event)">
        <!-- outputEvent: EventEmitter<Facade>
            fireDirective.HostListener.clickOrAnyEvent() => outputEvent.emit(facade);
            ...
            contextDirective.method(event) => event is Facade; // true
        -->
        Ok
    </button>
</div>
```

```ts
// InjectToken
import { InjectionToken, ContentChild, Inject, NgModule, Component } from '@angular/core';

type OrderAction;
export const ORDER_ACTION = new InjectionToken<OrderAction>('OrderAction');

class Service {
    public constructor(@Inject(ORDER_ACTION) private orderAction: OrderAction) {}
}

export const OTHER_ACTION: OrderAction = {/*... */};

@NgModule({
    providers: [{ provide: ORDER_ACTION, useValue: OTHER_ACTION }]
  })

export class AppModule {}

@Component({
  providers: [
    {
      provide: ORDER_ACTION,
      useExisting: CComponent,
    },
  ],
})
class CComponent implements OrderAction { 
    @ContentChild(ORDER_ACTION, { static: true }) orderAction: "OrderAction"; // this OTHER_ACTION for AppModule
}
```

```ts
import { Directive, Inject} from "@angular/core"; 

abstract class  AbstractTuiTableFilter<T, K> {}

///..

@Directive({
    selector: `[tuiGenericFilter]`,
    providers: [
        {
            provide: AbstractTuiTableFilter,
            useExisting: TuiGenericFilterDirective,
        },
    ],
})
class TuiGenericFilterDirective<T> {}

///...
class ComponentWithDirective<T> {
    constructor(@Inject(AbstractTuiTableFilter)private delegate: AbstractTuiTableFilter<T[keyof T], any>) { }
}
```

> Extends Model and templated transform method of pipe

```ts
import { inject,Pipe,PipeTransform } from '@angular/core'; import { Observable} from 'rxjs';

@Pipe({ name: 'filterUsers', pure: true, standalone: true })
export class FilterUsersPipe implements PipeTransform {
    private filter = inject(FILTER_USERS_PIPE);
    transform<T extends User>(value: Observable<T[]>): Observable<T[]> {
        return this.filter(value) as Observable<T[]>;
    }
}
`<ng-container *http="let hotTabs; get: url; typeof: ExUser">
    <ng-container *ngFor="let tabContent of hotTabs | filterUsers | async">` // tabContent is ExUser
```

```ts
`<ng-template [ngTemplateContextGuard]="guardFn" let-article>`

export class FooComponent {
    public readonly guardFn = (ctx: any): ctx is Context<Article> => true;
}
```

> async next observable

```ts
import { ReplaySubject} from 'rxjs';

const editor$ = new ReplaySubject<typeof Editor>(1);

// eslint-disable-next-line @typescript-eslint/no-floating-promises
import(`@tiptap/core`).then(m => editor$.next(m.Editor));
```

> using (runOutsideAngular)
1. addEventListener
2. removeEventListener

***
##### How to mock backend response
***

1. > `HttpInterceptor` gives you more freedom regarding mocking data from external libraries
2. > `JSON server`  is a JavaScript library for mocking REST APIs. `$ npm install json-server`
3. > `Cookies` write a script for your middleware (e.g. APIC) that checks for specific cookies e.g. </br> errorapi, errorcode and errorbody. 
4. > `JSON generators`
   >  - auto [mocker-data-generator](https://github.com/danibram/mocker-data-generator), 
   >  [json-generator.com](http://www.json-generator.com)
   >  - manual [faker.js](https://github.com/Marak/faker.js)

# ES LINTER

***
##### rules
***

1. **[rx]** don't use *ngIf (don't create inside variable  | async as variable)
2. **[naming]** use 'create' prefix for method except for only methods using inside inject </br>
    > **create...**() { let value = { prop: **inject(TOKEN)**}}
3. **[naming]** don't use redundant 'postfix' entity name: </br>
    > StrategyScroll ->  dispatcherScroll (incorrect) </br>
    > StrategyScroll ->  dispatcher (correct)
4. **[naming]** method interactions: </br>
    > internal methods have short name without postfix of main type</br>
    > external methods have this is postfix
4. **[dci]** create roles(methods): </br>
    > if method takes parameters it must returns UnaryFunction for pipe </br>
    > 
5. **[dci]** data: </br>
    > all utilities instead of the returned result should set value to same named property of ```ChangesType<T>```</br>
