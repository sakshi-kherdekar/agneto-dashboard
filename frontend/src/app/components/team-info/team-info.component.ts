import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-team-info',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './team-info.component.html',
  styleUrl: './team-info.component.scss'
})
export class TeamInfoComponent {
  teamName = 'Team Agneto';
  memberCount = 12;
}
