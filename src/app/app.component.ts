import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataChartComponent } from './data-chart/data-chart.component';
import { TabComponent } from './tab/tab.component';
import { TabsContainerComponent } from './tabs-container/tabs-container.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    DataChartComponent,FormsModule,
    TabComponent,
    TabsContainerComponent,
  ],
  template: `
    <div class="container">
      <h1>Angular Lifecycle Hooks Demo</h1>

      <div class="controls">
        <label>
          <input type="checkbox" [(ngModel)]="showDebugInfo" />
          Show Debug Information
        </label>
        <button (click)="addNewTab()">Add New Tab</button>
        <button (click)="removeLastTab()" [disabled]="tabData.length <= 1">
          Remove Last Tab
        </button>
      </div>

      <app-tabs-container [showDebug]="showDebugInfo">
        <app-tab
          *ngFor="let tab of tabData"
          [title]="tab.title"
          [active]="tab.active"
        >
          <div class="tab-inner-content">
            <h3>{{ tab.title }} Content</h3>
            <p>{{ tab.content }}</p>

            <app-data-chart [showDebug]="showDebugInfo"></app-data-chart>
          </div>
        </app-tab>
      </app-tabs-container>

      <div class="lifecycle-explanation" *ngIf="showDebugInfo">
        <h2>What's Happening:</h2>
        <ol>
          <li>
            <strong>ngAfterContentInit:</strong> Called after tab components are
            projected into the tabs container. This is when the container first
            discovers its tabs.
          </li>
          <li>
            <strong>ngAfterContentChecked:</strong> Called after every change
            detection run that checks the projected tabs. The counter increments
            with every check.
          </li>
          <li>
            <strong>ngAfterViewInit:</strong> Called once after the chart canvas
            is initialized, which is when we create the chart.
          </li>
          <li>
            <strong>ngAfterViewChecked:</strong> Called after every change
            detection run that checks the chart component's view.
          </li>
        </ol>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        font-family: Arial, sans-serif;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
      }
      .controls {
        margin: 20px 0;
        display: flex;
        align-items: center;
        gap: 15px;
      }
      .controls button {
        padding: 5px 10px;
      }
      .tab-inner-content {
        padding: 15px;
      }
      .lifecycle-explanation {
        margin-top: 30px;
        padding: 15px;
        background: #f9f9f9;
        border: 1px solid #eee;
        border-radius: 4px;
      }
    `,
  ],
})
export class AppComponent {
  showDebugInfo = false;
  tabData = [
    {
      title: 'First Tab',
      content: 'This is the content of the first tab.',
      active: true,
    },
    {
      title: 'Second Tab',
      content:
        'This tab demonstrates content projection with ngAfterContentInit and ngAfterContentChecked.',
      active: false,
    },
  ];

  addNewTab() {
    const newIndex = this.tabData.length + 1;
    this.tabData.push({
      title: `Tab ${newIndex}`,
      content: `This is a dynamically added tab #${newIndex}. It demonstrates how the tabs container handles new content using the Content lifecycle hooks.`,
      active: false,
    });
  }

  removeLastTab() {
    if (this.tabData.length > 1) {
      // Check if we're removing an active tab
      const isRemovingActiveTab = this.tabData[this.tabData.length - 1].active;

      // Remove the last tab
      this.tabData.pop();

      // If we removed the active tab, activate the new last tab
      if (isRemovingActiveTab && this.tabData.length > 0) {
        this.tabData[this.tabData.length - 1].active = true;
      }
    }
  }
}
