import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {DataListService} from '../../service/data-list.service';
import {ApiService} from '../../service/api.service';

@Component(
  {
    templateUrl: './form-generation-metadata-list.component.html',
    styleUrls: ['./form-generation-metadata-list.component.css']
  }
)
export class FormGenerationMetadataListComponent {

  model: string [] = [];
  listSize: number = 0;
  errorMessage: string;

  constructor(
    protected router: Router,
    public dataListService: DataListService,
    private apiService: ApiService
  ) {
  }

  public loaddata(firstReload: boolean) {
    this.preLoaddata();
    this.dataListService.getMetadataNames().subscribe(
      model => {
        this.model = <string[]>model;
        this.listSize = this.model.length;
        this.postList();
      },
      error => (this.errorMessage = <any>error)
    );
  }

  public preLoaddata() {
  }

  postList() {
  }

  ngOnInit() {
    this.loaddata(true);
  }

  public toList(name: string) {
    this.dataListService.getFieldDefinitionList(name).subscribe(
      definitions => {
        this.apiService.updateMap(name, definitions);
        this.router.navigate(['datalist/list', name]);
      }
    );
  }

  public toForm(name: string) {
    this.dataListService.getFieldDefinitionList(name).subscribe(
      definitions => {
        this.apiService.updateMap(name, definitions);
        this.router.navigate(['datalist/new', name]);
      }
    );
  }

}
