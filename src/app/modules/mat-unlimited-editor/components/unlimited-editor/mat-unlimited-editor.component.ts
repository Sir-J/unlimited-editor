import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, ElementRef, HostBinding, Input, NgZone, OnDestroy, Optional, Self, ViewChild } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'mat-unlimited-editor',
    templateUrl: './mat-unlimited-editor.component.html',
    styleUrls: ['./mat-unlimited-editor.component.less'],
    providers: [{ provide: MatFormFieldControl, useExisting: MatUnlimitedEditorComponent }]
})
export class MatUnlimitedEditorComponent implements MatFormFieldControl<string>, OnDestroy {
    static nextId = 0;

    @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize;

    stateChanges: Subject<void> = new Subject<void>();

    focused = false;

    errorState = false;

    controlType = 'mat-unlimited-editor';

    autofilled = true;

    @Input()
    set value(val: string) {
        this._value = val;
        this.stateChanges.next();
    }
    get value(): string {
        return this._value;
    }
    // tslint:disable-next-line: variable-name
    private _value: string = undefined;

    @HostBinding() id = `mat-unlimited-editor-${MatUnlimitedEditorComponent.nextId}`;

    @Input()
    get placeholder() {
        return this._placeholder;
    }
    set placeholder(plh) {
        this._placeholder = plh;
        this.stateChanges.next();
    }
    // tslint:disable-next-line: variable-name
    private _placeholder = '';

    @HostBinding('class.floating')
    get shouldLabelFloat() {
        return this.focused || !this.empty;
    }

    @Input()
    name = `mat-unlimited-editor-name-${MatUnlimitedEditorComponent.nextId}`;

    @Input()
    get required() {
        return this._required;
    }
    set required(req) {
        this._required = coerceBooleanProperty(req);
        this.stateChanges.next();
    }
    // tslint:disable-next-line:variable-name
    private _required = false;

    @Input()
    get disabled(): boolean {
        return this._disabled;
    }
    set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);
        this.stateChanges.next();
    }
    // tslint:disable-next-line:variable-name
    private _disabled = false;

    @HostBinding('attr.aria-describedby') describedBy = '';

    setDescribedByIds(ids: string[]) {
        this.describedBy = ids.join(' ');
    }

    get empty(): boolean {
        return this.value === undefined || this.value.length === 0;
    }

    onChange: (value: any) => void = () => {};
    onTouched = () => {};

    onContainerClick(event: MouseEvent) {
        // tslint:disable-next-line:triple-equals
        if ((event.target as Element).tagName.toLowerCase() != 'textarea') {
            this.elRef.nativeElement.querySelector('textarea').focus();
        }
    }

    constructor(
        private fm: FocusMonitor,
        private elRef: ElementRef<HTMLElement>,
        @Self() @Optional() public ngControl: NgControl,
        private ngZone: NgZone
    ) {
        MatUnlimitedEditorComponent.nextId++;

        this.fm.monitor(this.elRef.nativeElement, true).subscribe(origin => {
            this.focused = !!origin;
            this.stateChanges.next();
        });

        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
    }

    writeValue(value: any): void {
        this.value = value;
    }

    registerOnChange(fn: (value: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this.stateChanges.next();
    }

    triggerResize() {
        // Wait for changes to be applied, then trigger textarea resize.
        this.ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
    }

    ngOnDestroy(): void {
        this.stateChanges.complete();
    }
}
