
import { Component } from '@angular/core';
import { FileModel } from './models/file.model';
import { CheckForUpdateService } from './services/check-for-update.service';
import { ComprareService } from './services/comprare.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng-eve-compare';
  archivosNuevos: FileModel[] = [];
  archivosBorrado: FileModel[] = [];
  archivosModificados: FileModel[] = [];
  prefix = '';

  constructor(private checkForUpdate: CheckForUpdateService) {
    
  }

  mostrarArchivos(archivos: any) {
    this.archivosNuevos = archivos.archivosNuevos;
    this.archivosBorrado = archivos.archivosBorrado;
    this.archivosModificados = archivos.archivosModificados;
    this.prefix = archivos.prefix;

  }

  
}
