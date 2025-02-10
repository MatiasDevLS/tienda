import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FileUploadModule } from "ng2-file-upload";
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';


@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      NgxSpinnerModule.forRoot({
        type: 'fire'
      }),
      FileUploadModule ,
      ToastrModule.forRoot()
    ],
    exports: [
      NgxSpinnerModule,
      FileUploadModule 
    ]
  })
  export class SharedModule { }
  