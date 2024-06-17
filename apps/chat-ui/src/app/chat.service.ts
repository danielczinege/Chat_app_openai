import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageRequest } from '@ukol-01/common';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    constructor(private http: HttpClient) {}

    getResponse(message: MessageRequest): Observable<any> {
        return this.http.post("http://localhost:3000/api/chat", message);
    }
}
