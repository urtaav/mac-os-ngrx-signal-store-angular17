import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MachineControlsComponent } from '../machine-controls/machine-controls.component';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MachineControlsComponent,InputTextModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private router: Router = inject(Router);

  openDesktop = (): void => { this.router.navigate(['desktop']) };
}
