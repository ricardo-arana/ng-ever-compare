import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileInput } from 'ngx-material-file-input';
import { ComprareService } from 'src/app/services/comprare.service';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.scss']
})
export class ReaderComponent implements OnInit {
  forma: FormGroup;
  @Output() salida = new EventEmitter<any>();
  constructor(private compareService: ComprareService) { 
    const prefixCache = localStorage.getItem('prefix');
    this.forma = new FormGroup({
      file: new FormControl('', Validators.required),
      prefix: new FormControl(prefixCache)
    });
  }

  ngOnInit(): void {
  }

  generate() {
    if(this.forma.invalid) {
      return;
    }
    //prefix
    const prefix = this.forma.get('prefix')?.value;
    localStorage.setItem('prefix', prefix);

    const files = this.forma.get('file')?.value as FileInput;
    console.log(files.files[0])
    const reader = new FileReader();
    reader.onload = ( files: any) => {
      let textXml = atob(files.target.result.split(',')[1])
      textXml = textXml.replace('\u00EF\u00BB\u00BF', "");
      this.compareService.parseXML(textXml).then(
        (archivos: any) => this.salida.emit({prefix, ...archivos})
      );
    }
    reader.readAsDataURL(files.files[0]);
  }

}
