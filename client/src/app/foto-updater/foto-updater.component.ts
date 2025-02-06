import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../Services/Producto.Service';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { Producto } from '../_models/Producto';

@Component({
  selector: 'app-foto-updater',
  templateUrl: './foto-updater.component.html',
  styleUrls: ['./foto-updater.component.css']
})
export class FotoUpdaterComponent implements OnInit {
  uploader: FileUploader | undefined;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  producto!: Producto;
  id!: string;
  constructor(private productoService: ProductoService,  private activatedRoute: ActivatedRoute){
  }

  ngOnInit(): void {
    this.id =this.activatedRoute.snapshot.paramMap.get('id')!;
    this.initializeUploader();
  }

  fileOverBase(e: any){
    this.hasBaseDropZoneOver = e;
  }


  // deletePhoto(photoId: number){
  //   this.memberService.deletePhoto(photoId).subscribe({
  //     next: _ => {
  //       if (this.member) {
  //         this.member.photos = this.member.photos.filter(x => x.id !== photoId)
  //       }
  //     }
  //   })
  // }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'Productos/add-foto/'+this.id,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false
    }

    this.uploader.onSuccessItem = (item, response, status, headers) =>{
    }
  }




  
}
