import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { rejects } from 'assert';
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import * as xml2js from 'xml2js';
import { FileModel } from '../models/file.model';

@Injectable({
  providedIn: 'root',
})
export class ComprareService {
  constructor(private http: HttpClient) {}

  getXml() {
    return this.http
      .get('/assets/FolderComparisonReport.xml', {
        headers: new HttpHeaders()
          .set('Content-Type', 'text/xml')
          .append('Access-Control-Allow-Methods', 'GET')
          .append('Access-Control-Allow-Origin', '*')
          .append(
            'Access-Control-Allow-Headers',
            'Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method'
          ),
        responseType: 'text',
      })
      .pipe(mergeMap((respose) => from(this.parseXML(respose))));
  }

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
          // console.log(obj)
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
