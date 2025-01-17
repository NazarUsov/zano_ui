import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SwitchComponent } from '@parts/components/switch.component';
import { TranslateModule } from '@ngx-translate/core';
import { InputDisableSelectionModule } from '@parts/directives';
import { MatIconModule } from '@angular/material/icon';
import { VariablesService } from '@parts/services/variables.service';
import { BackendService } from '@api/services/backend.service';

@Component({
    selector: 'zano-remote-node-settings',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, SwitchComponent, TranslateModule, InputDisableSelectionModule, MatIconModule],
    templateUrl: './remote-node-settings.component.html',
    styleUrls: ['./remote-node-settings.component.scss'],
})
export class RemoteNodeSettingsComponent {
    isAddressWasCopied = false;

    addressWasCopiedTimeout!: any;

    form = this._fb.group({
        useRemoteNode: this._fb.control(false),
        address: this._fb.control('1.1.1.1', [Validators.required]),
    });

    constructor(public variablesService: VariablesService, private _backendService: BackendService, private _fb: NonNullableFormBuilder) {}

    beforeSubmit(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            this.form.updateValueAndValidity();
            return;
        }

        this.submit();
    }

    submit(): void {}

    copyAddress(): void {
        const { address } = this.form.getRawValue();

        this._backendService.setClipboard(address);

        this.isAddressWasCopied = true;

        this.addressWasCopiedTimeout = setTimeout(() => {
            this.isAddressWasCopied = false;
            clearTimeout(this.addressWasCopiedTimeout);
        }, 3000);
    }

    rollbackToZanoAddress(): void {
        const address = '1.1.1.1';

        this.form.patchValue({
            address,
        });
    }
}
