import { Component, output } from '@angular/core';
import { ClockComponent } from '../../../shared/components/clock/clock.component';
import { DialogModule } from 'primeng/dialog';
import { MenubarModule } from 'primeng/menubar';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ClockComponent,DialogModule,MenubarModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  spotlightOpened  = output<void>();
  isSettingsDialogDisplayed = false;

  menuItems = [
    {
      label: 'Finder',
    },
    {
      label: 'File'
    },
    {
      label: 'Edit'
    },
    {
      label: 'View'
    },
    {
      label: 'Go'
    },
    {
      label: 'Window'
    },
    {
      label: 'Help'
    }
  ];

  toggleSettingsDialog = () => {
    this.isSettingsDialogDisplayed = !this.isSettingsDialogDisplayed;
  }


}
