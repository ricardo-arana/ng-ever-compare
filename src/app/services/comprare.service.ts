import { Injectable } from '@angular/core';
import { rejects } from 'assert';
import * as xml2js from 'xml2js';
import { FileModel } from '../models/file.model';

@Injectable({
  providedIn: 'root',
})
export class ComprareService {
  constructor() {}

  parseXML(data: string) {
    return new Promise((resolve) => {
      let archivosBorrado: FileModel[] = [];
      let archivosNuevos: FileModel[] = [];
      let archivosModificados: FileModel[] = [];
      const parser = new xml2js.Parser({
        trim: true,
        explicitArray: true,
      });
      parser.parseString(data, (err: any, result: any) => {
        try {
          const obj: any[] = result['mg:report']['mg:rowData'][0]['mg:row'];
          obj.forEach((row) => {
            const file: any[] = row['mg:file'];
            if (file.length === 1) {
              if (file[0].$.class === 'I') {
                archivosBorrado = [...archivosBorrado, file[0].$];
              } else {
                archivosNuevos = [...archivosNuevos, file[0].$];
              }
            } else if(file.length === 2 && file[0].$.class === 'C') {
              archivosModificados = [...archivosModificados, file[0].$]
            }
          });
          resolve({ archivosBorrado, archivosNuevos, archivosModificados });
        } catch (error) {
          rejects(error);
        }
      });
    });
  }
}
