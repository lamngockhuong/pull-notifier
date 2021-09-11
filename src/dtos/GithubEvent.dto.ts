import { GithubAction } from '@/constants/commons';

export class GithubEventDto {
  public zen: string;
  public hook_id: number;
  public action: typeof GithubAction;
  public pull_request: PullRequest;
  public comment: Comment;
  public repository: Repository;
  public sender: User;
}

class PullRequest {
  public id: number;
  public html_url: string;
  public title: string;
  public body: string;
  public user: User;
  public assignees: User[];
  public commits: number;
  public additions: number;
  public deletions: number;
  public changed_files: number;
  public created_at: string;
  public updated_at: string;
  public closed_at: string;
  public merged_at: string;
  public merged_by: string;
}

class Comment {
  public id: number;
  public path: string;
  public html_url: string;
  public body: string;
  public user: User;
  public created_at: string;
  public updated_at: string;
}

export class User {
  public login: string;
  public id: number;
  public node_id: string;
  public avatar_url: string;
  public gravatar_id: string;
  public url: string;
  public html_url: string;
  public type: string;
  public site_admin: false;
}

class Repository {
  public id: number;
  public name: string;
  public full_name: string;
  public private: boolean;
}
