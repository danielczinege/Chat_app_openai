import { Inject, Injectable, Optional } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ConfigService {
    config!: Record<string, any>;

    async init() {
        const response = await fetch("assets/configuration.json");
        const config = await response.json();
        this.config = config;
    }
}
