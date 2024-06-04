import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactForm } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'https://form-contact-api.onrender.com/api/contact'; // URL do backend

  constructor(private http: HttpClient) {}

  sendContactForm(contactData: ContactForm): Observable<any> {
    return this.http.post<any>(this.apiUrl, contactData);
  }
}
