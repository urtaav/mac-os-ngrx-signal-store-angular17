import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject, OnDestroy, OnInit, output } from '@angular/core';
import { MyStore } from '../../../shared/store/my-store';
import { MenuItem, TooltipOptions } from 'primeng/api';
import { Subject } from 'rxjs';
import { dockItems } from '../../../shared/config/dock-items';
import { LAUNCHPAD } from '../../../shared/config/applications';
import { DockModule } from 'primeng/dock';
@Component({
  selector: 'app-dock',
  standalone: true,
  imports: [DockModule],
  templateUrl: './dock.component.html',
  styleUrl: './dock.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DockComponent implements OnInit,OnDestroy{
  
  launchpadOpened = output<void>();
  myStore = inject(MyStore);
  onDestroy$ = new Subject();
  dockItems: MenuItem[] = [];
  defaultTooltipOptions: TooltipOptions = {
    tooltipPosition: 'top',
    positionTop: -15,
    positionLeft: 15,
    showDelay: 1000,
  };
  private cd:ChangeDetectorRef = inject(ChangeDetectorRef);
  
  constructor(){
    effect(() => {
      if(this.dockItems.length){
        
      }
    })
  }
  ngOnInit(): void {
    this.dockItems = this.getDockItems();
  }

  getDockItems = () => {
    return dockItems.map(dockItem => {
      return {
        label: dockItem,
        icon: dockItem,
        tooltipOptions: {
          tooltipLabel: dockItem,
          ...this.defaultTooltipOptions,
        },
        command: () => {
          if (dockItem === LAUNCHPAD) {
            return this.launchpadOpened.emit();
          }

          this.myStore.setActiveApplication(dockItem);
        },
      };
    });
  }
  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
