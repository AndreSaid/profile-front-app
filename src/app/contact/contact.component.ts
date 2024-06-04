import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ContactForm } from './contact.model';
import { ContactService } from './contact.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contact: ContactForm = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  constructor(private contactService: ContactService) {}

  onSubmit(contactForm: NgForm) {
    if (contactForm.valid) {
      this.contactService.sendContactForm(this.contact).pipe(
        tap(response => {
          Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: 'Formulário enviado com sucesso!',
            timer: 3000, // Tempo de exibição em milissegundos
            timerProgressBar: true
          }).then(() => {
            contactForm.reset();
            window.location.reload();
          });
        }),
        catchError(error => {
          console.error('Erro ao enviar o formulário', error);
          Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Erro ao enviar o formulário. Por favor, tente novamente.',
            timer: 3000, // Tempo de exibição em milissegundos
            timerProgressBar: true
          });
          return of(null); 
        })
      ).subscribe(); 
    } else {
      console.error('Formulário inválido', contactForm);
      Swal.fire({
        icon: 'warning',
        title: 'Atenção!',
        text: 'Por favor, preencha todos os campos do formulário.',
        timer: 3000, // Tempo de exibição em milissegundos
        timerProgressBar: true
      });
    }
  }
}
