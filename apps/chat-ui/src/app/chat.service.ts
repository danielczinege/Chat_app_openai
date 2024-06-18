import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse, MessageRequest } from '@ukol-01/common';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    constructor(private http: HttpClient) {}

    getResponse(message: MessageRequest) {
        return this.http.post<IResponse>("http://localhost:3000/api/chat", message);
    }
}
