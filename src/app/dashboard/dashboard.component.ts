import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { ModalsComponent } from '../shared/components/modals/modals.component';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    HeaderComponent,
    ModalsComponent,
    SidebarComponent,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
