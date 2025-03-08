// import { Component } from '@angular/core';

import { 
  AfterContentInit, 
  AfterContentChecked,
  Component, 
  ContentChildren, 
  QueryList, 
  Input
} from '@angular/core';
import { TabComponent } from '../tab/tab.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabs-container',
  template: `
    <div class="tabs-component">
      <ul class="nav-tabs">
        <li *ngFor="let tab of tabs; let i = index" 
            [class.active]="tab.active" 
            (click)="selectTab(i)">
          {{ tab.title }}
        </li>
      </ul>
      <div class="tab-content-container">
        <ng-content></ng-content>
      </div>
      <div class="debug-info" *ngIf="showDebug">
        <p>Content initialized: {{ contentInitialized }}</p>
        <p>Content checks: {{ contentChecks }}</p>
      </div>
    </div>
  `,
  imports: [CommonModule],
  styles: [`
    .nav-tabs {
      display: flex;
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .nav-tabs li {
      padding: 10px 15px;
      cursor: pointer;
      border: 1px solid #ddd;
      margin-right: 5px;
      background: #f8f8f8;
    }
    .nav-tabs li.active {
      background: white;
      border-bottom-color: white;
    }
    .debug-info {
      margin-top: 20px;
      padding: 10px;
      background: #f0f0f0;
      border: 1px solid #ddd;
    }
  `]
})
export class TabsContainerComponent implements AfterContentInit, AfterContentChecked {
  @Input() showDebug = false;
  @ContentChildren(TabComponent)
  tabs!: QueryList<TabComponent>;
  
  contentInitialized = false;
  contentChecks = 0;
  
  ngAfterContentInit() {
    // Default to the first tab if no active tab is set
    this.contentInitialized = true;
    
    if (this.tabs.length > 0) {
      const activeTabs = this.tabs.filter(tab => tab.active);
      
      if (activeTabs.length === 0) {
        // If no tab is set as active, activate the first one
        this.selectTab(0);
      }
    }
    
    // Listen for dynamic changes to the tabs
    this.tabs.changes.subscribe(() => {
      // If tabs are added/removed dynamically, we need to ensure an active tab
      const activeTabs = this.tabs.filter(tab => tab.active);
      if (activeTabs.length === 0 && this.tabs.length > 0) {
        this.selectTab(0);
      }
    });
  }
  
  ngAfterContentChecked() {
    this.contentChecks++;
  }
  
  selectTab(index: number) {
    this.tabs.forEach((tab, i) => {
      tab.active = i === index;
    });
  }
}
