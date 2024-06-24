import { ChatSignalsService } from './../../app/chat-signals.service';
import { SettingsService } from './../../app/settings.service';
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
        temperature: new FormControl(this.settings.temperature, [Validators.min(0), Validators.max(2)]),
        max_tokens: new FormControl(this.settings.max_tokens, [Validators.min(1), Validators.max(4095), Validators.pattern("^[1-9][0-9]*$")]),
        system: new FormControl(this.settings.custom_instructions, {nonNullable: true}),
    });

    constructor(private settings: SettingsService,
                private chatService: ChatSignalsService) {}

    applyCustomInstructions() {
        let current_message = this.messageForm.value.system;

        if (current_message == undefined ||
            !confirm("This action will delete the conversation you had so far.\nDo you still want to continue?")) {
            return;
        }

        this.chatService.messages.update((msgs) => [{sender: 'system', content: current_message}]);
        this.settings.custom_instructions = current_message;
    }

    applyTemperature() {
        let new_temperature = this.messageForm.value.temperature;

        if (new_temperature == undefined ||
            new_temperature == null ||
            this.messageForm.controls.temperature.invalid) {
            return;
        }

        this.settings.temperature = new_temperature;
    }

    applyMaxTokens() {
        let new_max_tokens = this.messageForm.value.max_tokens;

        if (new_max_tokens == undefined ||
            new_max_tokens == null ||
            this.messageForm.controls.max_tokens.invalid) {
            return;
        }

        this.settings.max_tokens = new_max_tokens;
    }
}
