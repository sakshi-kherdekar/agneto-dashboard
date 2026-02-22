import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { ApiService } from '../../services/api.service';

export interface DashboardEvent {
  id: number;
  title: string;
  date: string;
  type: 'event' | 'holiday' | 'birthday';
  icon?: string;
  description?: string;
}

const HOLIDAY_META: Record<string, { icon: string; description: string }> = {
  "New Year's Day":     { icon: '🎆', description: 'Ring in the New Year! A fresh start, new goals, and new adventures await.' },
  'New Year Holiday':   { icon: '🥳', description: 'Extra day off to recover from the New Year celebrations!' },
  'Memorial Day':       { icon: '🇺🇸', description: 'Honoring the brave men and women who gave their lives in service to our country.' },
  'Independence Day':   { icon: '🎇', description: 'Celebrating America\'s freedom! Fireworks, BBQ, and patriotic pride since 1776.' },
  'Labor Day':          { icon: '💪', description: 'Celebrating the contributions and achievements of workers across the nation.' },
  'Thanksgiving Day':   { icon: '🦃', description: 'A time to gather with loved ones, give thanks, and enjoy a feast together.' },
  'Black Friday':       { icon: '🛍️', description: 'The biggest shopping day of the year! Deals, steals, and holiday gift hunting.' },
  'Christmas Day':      { icon: '🎄', description: 'Merry Christmas! A day of joy, giving, and celebrating with family and friends.' },
  "New Year's Day 2027":{ icon: '🎉', description: 'Welcome 2027! Another year of growth, success, and amazing teamwork ahead.' },
};

const BIRTHDAY_META: Record<string, { funFact: string; emoji: string }> = {
  'Sakshi':    { emoji: '👩‍💻', funFact: 'The code whisperer — can debug anything before her morning chai is ready!' },
  'Ayesha':    { emoji: '📋', funFact: 'Our Product Owner extraordinaire — translates chaos into perfectly groomed user stories.' },
  'Chandra':   { emoji: '🚀', funFact: 'Deploys to prod on Fridays and sleeps like a baby. Absolute legend.' },
  'Pyda':      { emoji: '🧠', funFact: 'The walking Stack Overflow — has an answer for every error code known to humanity.' },
  'Chivi':     { emoji: '🎨', funFact: 'Makes UIs so clean you could eat off them. Pixel-perfect is an understatement.' },
  'Guna':      { emoji: '⚡', funFact: 'Types faster than the compiler can keep up. Speed demon of the team.' },
  'Srilekha':  { emoji: '🔧', funFact: 'The API architect — her endpoints are so RESTful they take naps between requests.' },
  'Shalini':   { emoji: '🎯', funFact: 'Zero bugs in production this quarter. We\'re not worthy!' },
};

@Component({
  selector: 'app-upcoming-events',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatChipsModule],
  templateUrl: './upcoming-events.component.html',
  styleUrl: './upcoming-events.component.scss'
})
export class UpcomingEventsComponent implements OnInit {
  events: DashboardEvent[] = [];
  holidays: DashboardEvent[] = [];
  birthdays: DashboardEvent[] = [];

  selectedHoliday: DashboardEvent | null = null;
  selectedBirthday: DashboardEvent | null = null;

  private readonly sampleEvents: DashboardEvent[] = [
    { id: 1, title: 'Potluck for Lunch', date: 'Monday, Feb 17', type: 'event' },
    { id: 2, title: 'Sprint 24 Retro', date: 'Wednesday, Feb 19', type: 'event' },
    { id: 3, title: 'Team Standup Demo', date: 'Thursday, Feb 20', type: 'event' },
    { id: 4, title: 'Code Review Workshop', date: 'Friday, Feb 21', type: 'event' },
  ];

  private readonly sampleHolidays: DashboardEvent[] = [
    { id: 10, title: 'Presidents\' Day', date: 'Monday, Feb 17', type: 'holiday' },
    { id: 11, title: 'Good Friday', date: 'Friday, Apr 18', type: 'holiday' },
    { id: 12, title: 'Memorial Day', date: 'Monday, May 26', type: 'holiday' },
  ];

  private readonly sampleBirthdays: DashboardEvent[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getEvents().subscribe(events => {
      this.events = events.length > 0 ? events : [...this.sampleEvents];
    });
    this.apiService.getHolidays().subscribe(holidays => {
      const enriched = holidays.map(h => ({
        ...h,
        icon: HOLIDAY_META[h.title]?.icon || '📅',
        description: HOLIDAY_META[h.title]?.description || 'Enjoy the day off!',
      }));
      this.holidays = enriched.length > 0 ? enriched : [...this.sampleHolidays];
    });
    this.apiService.getBirthdays().subscribe(birthdays => {
      const enriched = birthdays.map(b => ({
        ...b,
        icon: BIRTHDAY_META[b.title]?.emoji || '🎂',
        description: BIRTHDAY_META[b.title]?.funFact || 'An awesome team member!',
      }));
      this.birthdays = enriched.length > 0 ? enriched : [...this.sampleBirthdays];
    });
  }

  toggleHolidayCard(holiday: DashboardEvent): void {
    this.selectedHoliday = this.selectedHoliday?.id === holiday.id ? null : holiday;
  }

  toggleBirthdayCard(birthday: DashboardEvent): void {
    this.selectedBirthday = this.selectedBirthday?.id === birthday.id ? null : birthday;
  }

  addEvent(event: DashboardEvent): void {
    const list = event.type === 'holiday' ? this.holidays
               : event.type === 'birthday' ? this.birthdays
               : this.events;
    list.push(event);
  }
}
