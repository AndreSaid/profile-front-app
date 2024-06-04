import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // Corrigido 'styleUrl' para 'styleUrls'
})
export class HomeComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    this.setupImageClickListener();
  }

  setupImageClickListener(): void {
    const profilePic = document.getElementById('profile-pic');
    if (profilePic) {
      profilePic.addEventListener('click', () => {
        profilePic.classList.toggle('zoomed');
      });
    }
  }
}
