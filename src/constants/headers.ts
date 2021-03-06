export enum GITHUB_HEADER {
  X_GITHUB_EVENT = 'X-GitHub-Event',
  X_HUB_SIGNATURE_256 = 'X-Hub-Signature-256',
}

export enum GITHUB_EVENT {
  PULL_REQUEST = 'pull_request',
  PULL_REQUEST_REVIEW = 'pull_request_review',
  PULL_REQUEST_REVIEW_COMMENT = 'pull_request_review_comment',
  ISSUE_COMMENT = 'issue_comment',
}
