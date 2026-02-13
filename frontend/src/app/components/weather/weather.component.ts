import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../services/api.service';
import { WeatherData } from '../../models/models';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent implements OnInit, OnDestroy {
  weather: WeatherData = {
    temperature: 72,
    condition: 'Partly Cloudy',
    icon: 'cloud',
    location: 'San Francisco, CA',
    high: 75,
    low: 58
  };

  currentTime = '';
  currentDate = '';
  private timerInterval: ReturnType<typeof setInterval> | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getWeather().subscribe(data => {
      this.weather = data;
    });

    this.updateTime();
    this.timerInterval = setInterval(() => this.updateTime(), 1000);
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  private updateTime(): void {
    const now = new Date();
    this.currentTime = now.toLocaleString('en-US', {
      timeZone: 'America/Chicago',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    this.currentDate = now.toLocaleString('en-US', {
      timeZone: 'America/Chicago',
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
  }
}
