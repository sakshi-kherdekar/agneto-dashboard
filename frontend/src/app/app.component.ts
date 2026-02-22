import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotificationService } from './services/notification.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DashboardComponent],
  template: '<app-dashboard />',
  styles: []
})
export class AppComponent implements OnInit {
  constructor(
    private notificationService: NotificationService,
    private themeService: ThemeService,
  ) {}

  ngOnInit(): void {
    this.notificationService.start();
  }
}
