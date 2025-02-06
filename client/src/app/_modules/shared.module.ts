import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FileUploadModule } from "ng2-file-upload";
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      NgxSpinnerModule.forRoot({
        type: 'fire'
      }),
      FileUploadModule 
    ],
    exports: [
      NgxSpinnerModule,
      FileUploadModule 
    ]
  })
  export class SharedModule { }
  