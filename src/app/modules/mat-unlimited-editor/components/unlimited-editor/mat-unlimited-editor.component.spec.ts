import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatUnlimitedEditorComponent } from './mat-unlimited-editor.component';

describe('UnlimitedEditorComponent', () => {
    let component: MatUnlimitedEditorComponent;
    let fixture: ComponentFixture<MatUnlimitedEditorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
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
