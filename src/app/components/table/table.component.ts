import { Component, Input, OnInit } from '@angular/core';
import { FileModel } from 'src/app/models/file.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() fileList: FileModel[] = [];
  @Input() prefix = '';
  @Input() title = 'Archivos';
  displayedColumns: string[] = ['name'];
  constructor() { }

  ngOnInit(): void {
  }

}
