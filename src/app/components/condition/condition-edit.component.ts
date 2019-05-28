import {Component, OnInit} from '@angular/core';
import {AbstractEditComponent} from '../../common/abstract-edit-component';
import {ActivatedRoute, Router} from '@angular/router';
import {Condition} from '../../model/condtion';
import {ConditionService} from '../../service/condition.service';
import {MetadataService} from '../../service/metadata.service';
import {Metadata} from '../../model/metadata';
import {ConfirmationService, SelectItem} from 'primeng/api';

@Component(
  {
    templateUrl: './condition-edit.component.html',
    styleUrls: ['./condition-edit.component.css']
  }
)
export class ConditionEditComponent extends AbstractEditComponent<Condition> implements OnInit {

  metadatas = [];
  metadatasSelect: SelectItem[] =[];
  mapMetadata: Map<string, Metadata> = new Map();

  constructor(
      public router: Router,
      public route: ActivatedRoute,
      public confirmationService: ConfirmationService,
      public conditionService: ConditionService,
      public metadataService: MetadataService
  ) {
    super(router, route, confirmationService, conditionService, 'condition');

  }

  ngOnInit() {
    this.element = new Condition();
    this.metadatas = [];
    this.metadataService.getList().subscribe(
      metadataList => {
        this.valorizeMetadatas(metadataList);
      }
    );
    super.ngOnInit();
  }

  valorizeMetadatas(metadataList: Metadata[]) {
    this.metadatas = metadataList;
    for (let i = 0; i < this.metadatas.length; i++) {
      if (!this.metadatas[i].created) {
        this.metadatasSelect.push({value: this.metadatas[i].uuid, label: this.metadatas[i].table_name});
        this.mapMetadata.set(this.metadatas[i].uuid, this.metadatas[i]);
      }
    }
  }

  pre() {
    this.element.metadata_name = this.mapMetadata.get(this.element.metadata_uuid).table_name;
  }

  preSave(): boolean {
    this.pre();
    return super.preSave();
  }


  preUpdate(): boolean {
    this.pre();
    return super.preUpdate();
  }


  createInstance(): Condition {
    return new Condition();
  }

  setName(event: any, metadata: Metadata) {
    this.element.metadata_name = metadata.table_name;
  }
}

