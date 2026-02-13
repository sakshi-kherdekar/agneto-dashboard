import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
}

@Component({
  selector: 'app-team-members-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule, MatListModule],
  template: `
    <h2 mat-dialog-title class="dialog-title">
      <mat-icon class="title-icon">groups</mat-icon>
      Team Agneto Members
    </h2>
    <mat-dialog-content class="members-content">
      @for (member of members; track member.name) {
        <div class="member-card">
          <div class="member-avatar" [style.background]="member.avatar">
            {{ member.name.charAt(0) }}
          </div>
          <div class="member-info">
            <span class="member-name">{{ member.name }}</span>
            <span class="member-role">{{ member.role }}</span>
          </div>
        </div>
      }
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-flat-button [mat-dialog-close]="true" class="close-btn">Close</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .dialog-title {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #2d2d3a;
    }

    .title-icon {
      color: #667eea;
    }

    .members-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      padding: 8px 0;
      max-height: 400px;
    }

    .member-card {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      border-radius: 10px;
      background: #f5f6fa;
      transition: background 0.15s;
    }

    .member-card:hover {
      background: #eef0fb;
    }

    .member-avatar {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-weight: 500;
      font-size: 1rem;
      flex-shrink: 0;
    }

    .member-info {
      display: flex;
      flex-direction: column;
    }

    .member-name {
      font-weight: 500;
      font-size: 0.9rem;
      color: #2d2d3a;
    }

    .member-role {
      font-size: 0.78rem;
      color: #888;
    }

    .close-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #fff;
      border-radius: 24px;
    }
  `]
})
export class TeamMembersDialogComponent {
  members: TeamMember[] = [
    { name: 'Alice Johnson', role: 'Tech Lead', avatar: '#667eea' },
    { name: 'Bob Martinez', role: 'Senior Developer', avatar: '#764ba2' },
    { name: 'Carol Williams', role: 'Full Stack Developer', avatar: '#4caf50' },
    { name: 'David Chen', role: 'Frontend Developer', avatar: '#ff9800' },
    { name: 'Emily Brown', role: 'Backend Developer', avatar: '#2196f3' },
    { name: 'Frank Kumar', role: 'DevOps Engineer', avatar: '#e91e63' },
    { name: 'Grace Lee', role: 'QA Engineer', avatar: '#009688' },
    { name: 'Henry Wilson', role: 'UI/UX Designer', avatar: '#795548' },
    { name: 'Irene Davis', role: 'Business Analyst', avatar: '#607d8b' },
    { name: 'Jack Taylor', role: 'Scrum Master', avatar: '#ff5722' },
    { name: 'Karen Moore', role: 'Junior Developer', avatar: '#3f51b5' },
    { name: 'Leo Anderson', role: 'Junior Developer', avatar: '#8bc34a' },
  ];
}
