import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { GitHubService } from 'src/app/services/git-hub.service';
import { Repository } from 'src/app/models/Repository';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AlertService } from 'src/app/alert';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form = new FormGroup({});
  updated = false;
  model: any = {};
  options: FormlyFormOptions = {
    formState: {
      awesomeIsForced: false,
    },
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: 'Name',
        placeholder: 'Repository name',
        required: true,
      },
    },
    {
      key: 'description',
      type: 'input',
      templateOptions: {
        label: 'Description',
        placeholder: 'Repository description',
      },
    },
    {
      key: 'owner',
      type: 'input',
      templateOptions: {
        label: 'Owner',
        placeholder: 'Repository owner',
        required: true,
      },
    },
    {
      key: 'url',
      type: 'input',
      templateOptions: {
        label: 'Url',
        placeholder: 'Repository url',
        required: true,
      },
    },
    {
      key: 'created',
      type: 'input',
      templateOptions: {
        label: 'Created',
        placeholder: 'Repository created',
        required: true,
      },
    },
    {
      key: 'updated',
      type: 'input',
      templateOptions: {
        label: 'Updated',
        placeholder: 'Repository updated',
      },
    },
  ];

  constructor(private gitHubService: GitHubService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private datePipe: DatePipe,
              private alertService: AlertService) { }

  /**
   * Retrieve a repository to update.
   */
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.gitHubService.findRepositoryById(params['id']).subscribe((data: any) => {
          console.log('Data to update: ', data);
          this.model = data;
          this.model.created = this.datePipe.transform(data.created, 'yyyy-MM-dd');
          this.model.updated = this.datePipe.transform(data.updated, 'yyyy-MM-dd');
          this.updated = true;
        }, (err) => {
          this.alertService.error(err.message);
        });
      }
    });
  }

  /**
   * Send the form data for create or update a repository.
   */
  submit() {
    if (this.form.valid) {
      if (this.updated) {
        this.updateRepository();
      } else {
        this.createRepository();
      }
    }
  }

  /**
   * Transform the form data to Repository model, before the create a repository.
   */
  buildRepository(): Repository {
    const repository = new Repository();
    repository.name = this.model.name;
    repository.description = this.model.description;
    repository.owner = this.model.owner;
    repository.url = this.model.url;
    repository.created = this.model.created;
    repository.updated = this.model.updated;
    return repository;
  }

  /**
   * Create a repository on local database.
   */
  createRepository() {
    this.gitHubService.createRepository(this.buildRepository()).subscribe(data => {
      console.log('Repository created successfully.', data);
      this.alertService.success('Repository was created successfully.');
      this.router.navigateByUrl('/localStorage');
    }, (err) => {
      this.alertService.error(err.message);
    });
  }

  /**
   * Update a repository on local database.
   */
  updateRepository() {
    this.gitHubService.updateRespository(this.model).subscribe(data => {
      console.log('Repository updated successfully.', data);
      this.alertService.success('Repository was updated successfully.');
      this.router.navigateByUrl('/localStorage');
    }, (err) => {
      this.alertService.error(err.message);
    });
  }

}
