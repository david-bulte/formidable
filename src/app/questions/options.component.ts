import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-options',
  template: `

    hello 
    {{name}}
    <!--<form [formGroup]="form">-->
        <!--<input placeholder="Name" formControlName="name">-->

      <!--options-->

      <!--<div formArrayName="options">-->
        <!--<div *ngFor="let c of form.controls.options.controls; let i = index">-->
          <!--<div [formGroupName]="i">-->
              <!--<input placeholder="Key" formControlName="key">-->
              <!--<input placeholder="Value" formControlName="value">-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->


    <!--</form>-->

  `
})
export class OptionsComponent implements OnInit {

  @Input() name: any;
  form;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    // setTimeout(() => {
      this.form = this.formBuilder.group({
        name: ['', Validators.required],
        options: this.formBuilder.array([this.initOption()])
      });
    // });

    const optionsControl = <FormArray>this.form.controls['options'];
    optionsControl.valueChanges.subscribe(() => {
      const ingredientControl: FormControl = <FormControl>optionsControl.controls[optionsControl.controls.length - 1];
      if (ingredientControl.get('key').valid && ingredientControl.get('value').valid) {
        this.addOption();
      }
    });
  }

  private initOption() {
    return this.formBuilder.group({
      key: ['', Validators.required],
      value: ['', Validators.required]
    });
  }

  private addOption() {
    const control = <FormArray>this.form.controls['options'];
    control.push(this.initOption());
  }

  // done() {
  //   const dish: Dish = this.form.value;
  //   dish.ingredients.length = dish.ingredients.length - 1;
  //
  //   console.log(this.form.value);
  //
  //   this.store.dispatch(new CreateDish(dish));
  //
  //   // this.store.dispatch(new SaveDish(dish));
  //   // this.store.dispatch(new Navigate({page: '/dishes'}));
  // }

}
