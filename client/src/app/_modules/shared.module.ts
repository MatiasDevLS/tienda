import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      NgxSpinnerModule.forRoot({
        type: 'ball-square-spin'
      }),
    ],
    exports: [
      NgxSpinnerModule
    ]
  })
  export class SharedModule { }
  