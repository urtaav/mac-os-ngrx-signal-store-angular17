import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressBarModule } from 'primeng/progressbar';
@Component({
  selector: 'app-boot',
  standalone: true,
  imports: [ProgressBarModule],
  templateUrl: './boot.component.html',
  styleUrl: './boot.component.scss'
})
export class BootComponent implements OnInit {

  progressBarValue = signal<number>(0);
  private router: Router = inject(Router);


  ngOnInit(): void {
    let interval = setInterval(() => {

      let progress = this.progressBarValue() + Math.floor(Math.random() * 10) + 40;
      this.progressBarValue.set(progress);

      if (this.progressBarValue() >= 100) {
        this.progressBarValue.set(100);
        clearInterval(interval);
        this.router.navigate(['/login']);
      }
      
    }, 1500)
  }
}
