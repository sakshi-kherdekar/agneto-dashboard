import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../services/api.service';
import { TeamMember } from '../../models/models';

interface Seat {
  name: string;
  nickname: string;
  initial: string;
  avatar: string;
}

const DEV_ROLES = [
  'Tech Lead',
  'Senior Developer',
  'Full Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'Junior Developer',
];

@Component({
  selector: 'app-seating-arrangement',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './seating-arrangement.component.html',
  styleUrl: './seating-arrangement.component.scss'
})
export class SeatingArrangementComponent implements OnInit {
  topSeats: Seat[] = [];
  bottomSeats: Seat[] = [];
  todayLabel = '';
  private devMembers: TeamMember[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    const today = new Date();
    this.todayLabel = today.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

    this.apiService.getTeamMembers().subscribe(members => {
      this.devMembers = members.filter(m => DEV_ROLES.includes(m.role));
      if (this.devMembers.length === 0) return;
      this.assignSeats(this.getDateSeed());
    });
  }

  shuffle(): void {
    if (this.devMembers.length === 0) return;
    const randomSeed = Math.floor(Math.random() * 2147483647);
    this.assignSeats(randomSeed);
  }

  private assignSeats(seed: number): void {
    const shuffled = this.seededShuffle(this.devMembers, seed);
    const picked = shuffled.slice(0, 7);
    const seats = picked.map(m => ({
      name: m.name,
      nickname: m.nickname || m.name.split(' ')[0],
      initial: m.name.charAt(0),
      avatar: m.avatar,
    }));
    this.topSeats = seats.slice(0, 3);
    this.bottomSeats = seats.slice(3, 7);
  }

  private getDateSeed(): number {
    const d = new Date();
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    let hash = 0;
    for (let i = 0; i < dateStr.length; i++) {
      hash = ((hash << 5) - hash) + dateStr.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }

  private seededShuffle<T>(arr: T[], seed: number): T[] {
    const result = [...arr];
    let s = seed;
    for (let i = result.length - 1; i > 0; i--) {
      s = (s * 16807 + 0) % 2147483647;
      const j = s % (i + 1);
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
}
