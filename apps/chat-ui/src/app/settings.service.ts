import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    temperature: number = 1;
    max_tokens: number = 256;
    custom_instructions: string = '';

    constructor() {}
}
