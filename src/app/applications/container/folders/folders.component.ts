import { Component, inject, input, InputFunction, InputSignal, WritableSignal } from '@angular/core';
import { MyStore } from '../../../shared/store/my-store';
import { Folder } from '../../../shared/models/folder';
import { FolderSelection } from '../../../shared/models/folder-selection';
import { FolderIconComponent } from '../../components';

@Component({
  selector: 'app-folders',
  standalone: true,
  imports: [FolderIconComponent],
  templateUrl: './folders.component.html',
  styleUrl: './folders.component.scss'
})
export class FoldersComponent {

  myStore = inject(MyStore);
  folders:InputSignal<Folder[]> = input.required<Folder[]>();
  isFinderOpened = input<boolean>(false);

  onFolderSelected = (folderSelection:FolderSelection) => {
    this.myStore.toggleFolder(folderSelection);
  }
}
