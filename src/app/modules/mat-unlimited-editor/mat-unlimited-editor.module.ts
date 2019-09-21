import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    MatUnlimitedEditorComponent,
} from 'src/app/modules/mat-unlimited-editor/components/unlimited-editor/mat-unlimited-editor.component';

@NgModule({
    declarations: [MatUnlimitedEditorComponent],
    exports: [MatUnlimitedEditorComponent],
    imports: [CommonModule, FormsModule, TextFieldModule]
})
export class MatUnlimitedEditorModule {}
