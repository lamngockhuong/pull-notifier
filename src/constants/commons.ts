export enum PR_TEMPLATE {
  CHATWORK_PULL_REQUEST_OPENED = 'chatwork-pull-request-opened.pr',
  CHATWORK_PULL_REQUEST_REOPENED = 'chatwork-pull-request-reopened.pr',
  CHATWORK_PULL_REQUEST_MERGED = 'chatwork-pull-request-merged.pr',
  CHATWORK_PULL_REQUEST_CLOSED = 'chatwork-pull-request-closed.pr',
  CHATWORK_COMMENT_CREATED = 'chatwork-comment-created.pr',
  CHATWORK_COMMENT_EDITED = 'chatwork-comment-edited.pr',
}

export enum EVENT {
  PULL_REQUEST_OPENED,
  PULL_REQUEST_MERGED,
  PULL_REQUEST_REOPENED,
  PULL_REQUEST_CLOSED,
  COMMENT_CREATED,
  COMMENT_EDITED,
}
