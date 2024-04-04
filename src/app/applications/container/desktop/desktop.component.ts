import { Component, effect, HostListener, inject, signal } from '@angular/core';
import { MyStore } from '../../../shared/store/my-store';
import { FoldersComponent } from '../folders/folders.component';
import { DESKTOP, SPOTLIGHT } from '../../../shared/config/applications';
import { DockComponent, MenuComponent } from '../../components';
import { ContextMenuComponent } from '../../../shared/components/context-menu/context-menu.component';
import { SidebarModule } from 'primeng/sidebar';
import { LaunchpadComponent } from '../launchpad/launchpad.component';
import { Folder } from '../../../shared/models/folder';
import { WindowService } from '../../../shared/services/window.service';
@Component({
  selector: 'app-desktop',
  standalone: true,
  imports: [FoldersComponent,DockComponent,ContextMenuComponent,SidebarModule,LaunchpadComponent,MenuComponent],
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.scss'
})
export class DesktopComponent  {

  myStore = inject(MyStore);
  folders = this.myStore.desktopFolders;
  launchPadOpened = signal<boolean>(false);
  private windowService: WindowService = inject(WindowService);
  constructor(){
    effect(() => {
      const app = this.myStore.activeApplication();
      if (app !== DESKTOP) {
        this.windowService
          .open(app)
          .subscribe(app => this.myStore.setActiveApplication(app));
      }
    });
  }


  @HostListener('document:keydown', ['$event'])
  onKeydown = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.code === 'Space') {
      return this.openSpotlight();
    }

    if (event.ctrlKey && event.code === 'Backspace') {
      this.myStore.deleteSelectedFolders();
    }
  }

  openSpotlight = () => {
    return this.myStore.setActiveApplication(SPOTLIGHT);
  }

  unselectFolders = () => {
    this.myStore.unselectAllFolders();
  }

  onAddNewFolder = () => {
    this.myStore.addNewFolder();
  }


}
