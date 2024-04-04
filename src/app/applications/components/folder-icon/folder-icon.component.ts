import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { Folder } from '../../../shared/models/folder';

@Component({
  selector: 'app-folder-icon',
  standalone: true,
  imports: [],
  templateUrl: './folder-icon.component.html',
  styleUrl: './folder-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FolderIconComponent {

  folder = input.required<any>();
  isFinderOpened = input<boolean>(false);
  click = output<any>();

  onToggleSelection = (event: MouseEvent) => {
    event.stopPropagation();
    this.click.emit({
      id: this.folder().id,
      selected: !this.folder().selected,
      selectedMultiple: event.metaKey || event.ctrlKey
    });
  }

}
