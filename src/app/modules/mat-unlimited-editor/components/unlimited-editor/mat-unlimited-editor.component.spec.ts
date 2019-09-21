import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatUnlimitedEditorComponent } from './mat-unlimited-editor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';

describe('UnlimitedEditorComponent', () => {
    let component: MatUnlimitedEditorComponent;
    let fixture: ComponentFixture<MatUnlimitedEditorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [BrowserAnimationsModule, FormsModule, TextFieldModule],
            declarations: [MatUnlimitedEditorComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MatUnlimitedEditorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
