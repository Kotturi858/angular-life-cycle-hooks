import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tab',
  template: `
    <div [hidden]="!active" class="tab-content">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .tab-content {
      padding: 15px;
      border: 1px solid #ddd;
      border-top: none;
    }
  `]
})
export class TabComponent {
  @Input() title!: string;
  @Input() active = false;
}

