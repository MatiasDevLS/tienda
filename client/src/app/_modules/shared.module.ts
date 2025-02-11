import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FileUploadModule } from "ng2-file-upload";
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      NgxSpinnerModule.forRoot({
        type: 'fire'
      }),
      FileUploadModule ,
      ToastrModule.forRoot(),
      BrowserAnimationsModule,
      BsDropdownModule
      
    ],
    exports: [
      NgxSpinnerModule,
      FileUploadModule 
    ]
  })
  export class SharedModule { }
  