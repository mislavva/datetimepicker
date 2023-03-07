import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import * as moment from "moment-timezone";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private readonly _destroy = new Subject<void>();

  formGroup = new FormGroup({
    datetime: new FormControl(moment()),
    timezone: new FormControl()
  });


  ngOnInit() {
    this.formGroup.controls.timezone.valueChanges.pipe(
      takeUntil(this._destroy)
    ).subscribe(timezone => {
      this.formGroup.controls.datetime.setValue(moment.tz(this.formGroup.controls.datetime.value, timezone));
      console.log(timezone)
      console.log(this.formGroup.controls.datetime.value)
    });
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
