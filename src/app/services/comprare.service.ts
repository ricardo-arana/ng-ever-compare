
import { Injectable } from '@angular/core';
import { rejects } from 'assert';
import * as xml2js from 'xml2js';
import { FileCompare, FileModel } from '../models/file.model';

@Injectable({
  providedIn: 'root',
})
export class ComprareService {
  constructor() {}

  parseXML(data: string) {
    return new Promise((resolve) => {
      let archivosBorrado: FileCompare[] = [];
      let archivosNuevos: FileCompare[] = [];
      let archivosModificados: FileCompare[] = [];
      const parser = new xml2js.Parser({
        trim: true,
        explicitArray: true,
      });
      parser.parseString(data, (err: any, result: any) => {
        try {
          const obj: any[] = result['mg:report']['mg:rowData'][0]['mg:row'];
          const objetoLimpio = this.objxml2Obj(obj);
          objetoLimpio.forEach((row) => {

            if(row.class === 'I' && row.tipo === 'NB') {
              archivosBorrado = [...archivosBorrado, row];
              } else {
                archivosNuevos = [...archivosNuevos, row];
              }
              if( row.class === 'C' && row.tipo === 'M') {
                archivosModificados = [...archivosModificados, row];
              }
            }

            // if (file.length === 1) {
            //   if (file[0].$.class === 'I') {
            //     archivosBorrado = [...archivosBorrado, file[0].$];
            //   } else {
            //     archivosNuevos = [...archivosNuevos, file[0].$];
            //   }
            // } else if(file.length === 2 && file[0].$.class === 'C') {
            //   archivosModificados = [...archivosModificados, file[0].$]
            // }
          );
          resolve({ archivosBorrado, archivosNuevos, archivosModificados });
        } catch (error) {
          rejects(error);
        }
      });
    });
  }


  objxml2Obj(obj: any[]): FileCompare[] {
    
    const newobj = obj.map( a => {
      let tipo = '';
      if(a['mg:file'].length === 1) {
        tipo = 'NB';
      }
      if(a['mg:file'].length === 2 && a['mg:file'][0].$.class === 'C') {
        tipo = 'M';
      }
      return {...a['mg:file'][0].$, tipo};
    });

    const objmap = newobj.map( objeto => {
      if(objeto.level !== '0') {
        return this.obtenerNivelCero(newobj, objeto);
      } else { return objeto }
    })
    .filter(o => o.tipo);
    return objmap;
  }

  obtenerNivelCero(lista: FileCompare[], file: FileCompare) {

    let nivel = +file.level;
    const indice = lista.indexOf(file);
    // cortar la lista
    let listaCortada = lista.slice(0,indice)
    // invertir lista
    listaCortada = listaCortada.reverse();
    let carpetaName = '';
    while( nivel > 0) {
      nivel = nivel - 1;
      const carpeta = listaCortada.find(a => a.level === nivel.toString())?.name
      carpetaName =  `/${carpeta}${carpetaName}`;
      
    }

    carpetaName = `${carpetaName}/${file.name}`;

    return { ...file, name: carpetaName.slice(1)}
    
  }
}
