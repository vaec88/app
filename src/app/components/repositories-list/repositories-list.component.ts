import { Component, OnInit, Input } from '@angular/core';
import { GitHubService } from 'src/app/services/git-hub.service';
import { AlertService } from 'src/app/alert';

@Component({
  selector: 'app-repositories-list',
  templateUrl: './repositories-list.component.html',
  styleUrls: ['./repositories-list.component.scss']
})
export class RepositoriesListComponent implements OnInit {
  @Input() repositoriesList: any[] = [];
  @Input() localStorage: boolean;

  constructor(private gitHubService: GitHubService,
              private alertService: AlertService) { }

  ngOnInit() {
  }

  /**
   * Delete a repository from local database.
   * @param id Repository id to delete.
   */
  deleteRepository(id: string) {
    this.gitHubService.deleteRepository(id).subscribe(data => {
      console.log('Repository deleted successfully', data);
      this.gitHubService.getRepositoriesStorage().subscribe((res: any) => {
        console.log('Data local storage: ', res);
        this.repositoriesList = res;
        this.alertService.success('Repository was deleted successfully.');
      }, (err) => {
        this.alertService.error(err.message);
      });
    });
  }

}
