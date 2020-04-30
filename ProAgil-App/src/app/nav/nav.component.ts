import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public router: Router,
              public authService: AuthService,
              private toastr: ToastrService) { }

  ngOnInit() {
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  voltar() {
    this.router.navigate(['/user/login']);
  }

  logOut() {
    localStorage.removeItem('token');
    this.toastr.show('Log Out!');
    this.router.navigate(['/user/login']);

  }

}
