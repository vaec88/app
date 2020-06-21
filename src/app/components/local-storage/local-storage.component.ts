import { Component, OnInit } from '@angular/core';
import { GitHubService } from 'src/app/services/git-hub.service';
import { Repository } from 'src/app/models/Repository';

@Component({
  selector: 'app-local-storage',
  templateUrl: './local-storage.component.html',
  styleUrls: ['./local-storage.component.scss']
})
export class LocalStorageComponent implements OnInit {

  repositoriesStorage: any[] = [];
  localStorage = true;

  constructor(private gitHubService: GitHubService) { }

  /**
   * Retrieve all repositories from local database.
   */
  ngOnInit() {
    console.log('local storage');
    this.gitHubService.getRepositoriesStorage().subscribe((data: any) => {
      console.log('Data local storage: ', data);
      this.repositoriesStorage = data;
    });
  }

}
