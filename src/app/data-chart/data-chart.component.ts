import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  AfterViewChecked,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-data-chart',
  template: `
    <div class="chart-container">
      <canvas #chartCanvas width="400" height="200"></canvas>
    </div>
    <div class="chart-controls">
      <button (click)="addDataPoint()">Add Data Point</button>
      <button (click)="removeDataPoint()">Remove Data Point</button>
    </div>
    <div class="debug-info" *ngIf="showDebug">
      <p>View initialized: {{ viewInitialized }}</p>
      <p>View checks: {{ viewChecks }}</p>
      <p>Chart updates: {{ chartUpdates }}</p>
    </div>
  `,
  imports: [CommonModule],
  styles: [
    `
      .chart-container {
        margin: 20px 0;
      }
      .chart-controls {
        margin: 10px 0;
      }
      .chart-controls button {
        margin-right: 10px;
        padding: 5px 10px;
      }
      .debug-info {
        margin-top: 20px;
        padding: 10px;
        background: #f0f0f0;
        border: 1px solid #ddd;
      }
    `,
  ],
})
export class DataChartComponent implements AfterViewInit, AfterViewChecked {
  @Input() showDebug = false;
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;

  viewInitialized = false;
  viewChecks = 0;
  chartUpdates = 0;
  chart: any; // This would be a Chart.js chart instance in a real app

  // Sample data for our chart
  chartData = {
    labels: ['January', 'February', 'March', 'April'],
    datasets: [
      {
        label: 'Sample Data',
        data: [12, 19, 3, 5],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  ngAfterViewInit() {
    this.viewInitialized = true;

    // Initialize our mock chart
    // In a real app, you would use Chart.js or a similar library
    this.initChart();
  }

  ngAfterViewChecked() {
    this.viewChecks++;
  }

  initChart() {
    // Simulating Chart.js initialization
    const canvas = this.chartCanvas.nativeElement;
    console.log('Chart initialized with canvas:', canvas);

    // In a real app with Chart.js, you would do:
    /*
    this.chart = new Chart(canvas.getContext('2d'), {
      type: 'bar',
      data: this.chartData,
      options: {
        responsive: true
      }
    });
    */

    // For our mock implementation:
    this.chart = {
      update: () => {
        this.chartUpdates++;
        console.log('Chart updated with data:', JSON.stringify(this.chartData));
      },
    };
  }

  addDataPoint() {
    const months = ['May', 'June', 'July', 'August', 'September'];
    const nextMonth = months[this.chartData.labels.length % months.length];

    // Add a new data point
    this.chartData.labels.push(nextMonth);
    this.chartData.datasets[0].data.push(Math.floor(Math.random() * 20));

    // Add matching colors
    const colorIndex = this.chartData.labels.length % 4;
    this.chartData.datasets[0].backgroundColor.push(
      this.chartData.datasets[0].backgroundColor[colorIndex]
    );
    this.chartData.datasets[0].borderColor.push(
      this.chartData.datasets[0].borderColor[colorIndex]
    );

    // Update the chart
    if (this.chart) {
      this.chart.update();
    }
  }

  removeDataPoint() {
    if (this.chartData.labels.length > 1) {
      this.chartData.labels.pop();
      this.chartData.datasets[0].data.pop();
      this.chartData.datasets[0].backgroundColor.pop();
      this.chartData.datasets[0].borderColor.pop();

      // Update the chart
      if (this.chart) {
        this.chart.update();
      }
    }
  }
}
