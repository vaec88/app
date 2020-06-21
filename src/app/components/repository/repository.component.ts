import { Component, OnInit } from '@angular/core';
import { GitHubService } from 'src/app/services/git-hub.service';
import { Repository } from 'src/app/models/Repository';
import { AlertService } from 'src/app/alert';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss']
})
export class RepositoryComponent implements OnInit {

  repositoriesGithubApi: any[] = [];
  repositoriesStorage: Repository[];
  localStorage = false;

  constructor(private gitHubService: GitHubService,
              private alertService: AlertService) { }

  ngOnInit() {
    this.repositoriesStorage = new Array();
  }

  /**
   * Retrieve the repositories information from GitHub based on username.
   * @param username The GitHub username to retrieve repositories information.
   */
  getRepositories(username: string) {
    this.alertService.clear();
    if (username) {
      this.gitHubService.getRepositories(username).subscribe((data: any) => {
        console.log(data);
        this.repositoriesGithubApi = data;
        this.repositoriesStorage = new Array();
        this.buildRepositoriesStore();
        if (this.repositoriesStorage.length === 0) {
          this.alertService.info(`Was not found repositories for user: ${username}.`);
        }
      }, (err) => {
        console.log(err);
        this.alertService.error(err.message);
      });
    }
  }

  /**
   * Import the repositories information on local database.
   */
  createRepositories() {
    this.repositoriesStorage.forEach(repository => {
      this.gitHubService.createRepository(repository).subscribe(data => {
        console.log('Repository saved.', data);
        this.alertService.success('Data imported successfully.');
      }, (err) => {
        console.log(err);
        this.alertService.error(err.message);
      });
    });
  }

  /**
   * Transform the GitHub repository information to Repository model.
   */
  buildRepositoriesStore() {
    this.repositoriesGithubApi.forEach(repositoryApi => {
    const repositoryStore = new Repository();
    repositoryStore.name = repositoryApi.name;
    repositoryStore.description = repositoryApi.description;
    repositoryStore.owner = repositoryApi.owner.login;
    repositoryStore.url = repositoryApi.html_url;
    repositoryStore.created = repositoryApi.created_at;
    repositoryStore.updated = repositoryApi.updated_at;
    this.repositoriesStorage.push(repositoryStore);
    });
  }

}
