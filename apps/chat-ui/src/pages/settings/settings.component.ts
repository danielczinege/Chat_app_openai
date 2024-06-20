import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.css',
})
export class SettingsComponent {
    messageForm = new FormGroup({
        temperature: new FormControl(1, [Validators.min(0), Validators.max(2)]),
        max_tokens: new FormControl(256, [Validators.min(1), Validators.max(4095), Validators.pattern("^[0-9]*$")]),
        system: new FormControl('', {nonNullable: true}),
    });

    applyCustomInstructions() {

    }

    applyTemperature() {

    }

    applyMaxTokens() {
        
    }
}
