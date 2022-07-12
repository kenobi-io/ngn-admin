import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.None,
    imports: [CommonModule],
    selector: 'ngn-playful-card',
    standalone: true,
    styleUrls: ['./playful-card.component.scss'],
    templateUrl: './playful-card.component.html',
})
export class PlayfulCardComponent {}
