import { Component, input, output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ContextMenuModule } from 'primeng/contextmenu';
@Component({
  selector: 'app-context-menu',
  standalone: true,
  imports: [ContextMenuModule],
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.scss'
})
export class ContextMenuComponent {

  target = input.required<any>();
  addNewFolder  = output<void>();
  items: MenuItem[] = [
    {
      label: 'New Folder',
      command: () => this.addNewFolder.emit(),
    },
    {
      label: 'Get Info',
    },
    {
      label: 'Change Desktop Background...',
    },
    {
      label: 'Use Stacks',
    },
    {
      label: 'Show View Options',
    },
  ];
}
