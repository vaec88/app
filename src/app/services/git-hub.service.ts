import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Repository } from '../models/Repository';

@Injectable({
  providedIn: 'root'
})
export class GitHubService {

  urlBase = 'http://localhost:8080/api/repositories/';

  constructor(private http: HttpClient) { }

  /**
   * Retrieve github repositories by username.
   * @param username The github username to retrieve repositories.
   */
  getRepositories(username: string) {
    return this.http.get(`https://api.github.com/users/${username}/repos`);
  }

  /**
   * Create a repository on local database.
   * @param repository Repository model to persist.
   */
  createRepository(repository: Repository) {
    return this.http.post(this.urlBase, repository);
  }

  /**
   * Retrieve all repositories from local database.
   */
  getRepositoriesStorage() {
    return this.http.get(this.urlBase);
  }

  /**
   * Delete a repository from local database.
   * @param id Repository id to delete.
   */
  deleteRepository(id: string) {
    return this.http.delete(`${this.urlBase}${id}`);
  }

  /**
   * Retrieve a repository to load your data on update form.
   * @param id Repository id to load on update form.
   */
  findRepositoryById(id: string) {
    return this.http.get(`${this.urlBase}${id}`);
  }

  /**
   * Update a repository on local database.
   * @param repository Repository model with the form data to update.
   */
  updateRespository(repository: any) {
    return this.http.put(`${this.urlBase}${repository.id}`, repository);
  }


}
