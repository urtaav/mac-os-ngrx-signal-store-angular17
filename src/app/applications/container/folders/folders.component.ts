import { Component, inject, input, InputFunction, InputSignal, WritableSignal } from '@angular/core';
import { MyStore } from '../../../shared/store/my-store';
import { Folder } from '../../../shared/models/folder';
import { FolderSelection } from '../../../shared/models/folder-selection';
import { FolderIconComponent } from '../../components';

import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-folders',
  standalone: true,
  imports: [FolderIconComponent, ContextMenuModule],
  templateUrl: './folders.component.html',
  styleUrl: './folders.component.scss'
})
export class FoldersComponent {

  myStore = inject(MyStore);
  folders: InputSignal<Folder[]> = input.required<Folder[]>();
  isFinderOpened = input<boolean>(false);
  items: MenuItem[] | undefined;

  onFolderSelected = (folderSelection: FolderSelection) => {
    this.myStore.toggleFolder(folderSelection);
  }

  constructor() {
    this.items = [
      {
        label: 'Delete', icon: 'pi pi-fw pi-trash',
        command: () => {
          console.log("delete"),
          this.myStore.deleteSelectedFolders()
        },
      }
    ];
  }

  openCm(event: any, cm: any) {
    event.preventDefault();
    event.stopPropagation();
    cm.show(event);
    return false;
  }
}
