import { AsyncPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { map, Observable, timer } from 'rxjs';

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [AsyncPipe,DatePipe],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.scss'
})
export class ClockComponent {
  public $time: Observable<Date> = timer(0, 1000).pipe(map(() => new Date()));
}
