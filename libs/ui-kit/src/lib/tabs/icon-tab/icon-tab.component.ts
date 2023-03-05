import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
} from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [CommonModule],
    selector: 'ngn-icon-tab',
    standalone: true,
    styleUrls: ['./icon-tab.component.scss'],
    templateUrl: './icon-tab.component.html',
})
export class IconTabComponent {
    // @ContentChild(TemplateRef) template: TemplateRef;
    // @ContentChild(TemplateRef) templates: QueryList<TemplateRef>;
}

// @Component({
//    selector: 'wrapper',
//    template: `
//      <div class="box" *ngFor="let item of items">
//        <ng-container [ngTemplateOutlet]="template"></ng-container>
//      </div>
//    `
//  })
//  class Wrapper {
//    items = [0, 0, 0];
//    @ContentChild(TemplateRef) template: TemplateRef;
//    optionsClick() {
//      return this.templates.changes.pipe(
//        switchMap(templates => {
//          const clicks$ = templates.map(option => templates.click$);
//          return merge(...clicks$);
//        })
//      );
//    }
//  }

// get instance directive/component in template
//  selector: '[tooltipG]',
//  exportAs: 'tooltipInstance';
//  toggleTooltip() {...}
//  ...
//  <a tooltipG="I'm a tooltip!!" #tooltip="tooltipInstance">I'm a link</a>
//  <button (click)="tooltip.toggleTooltip()">Toggle tooltip</button>

// get element directly but not through ViewChildren!!!
//  < .... #instanceDirective.method(elem /* : HTMLElement */)

// start method in template from context
//  this.context = {
//      close: this.popoverRef.close.bind(this.popoverRef)
//  }
//  <ng-template #tpl let-close="close">
//      <div>
//       <a (click)="close({id: 2})">Close</a>
