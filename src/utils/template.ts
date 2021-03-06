import fs from 'fs';
import path from 'path';
import config from 'config';

const templateDir: string = path.join(__dirname, config.get('static.template'));

export interface Options {
  receivers?: string;
  repository_name?: string;
  commentator?: string;
  comment_body?: string;
  comment_url?: string;
  pull_request_title?: string;
  pull_request_owner?: string;
  pull_request_url?: string;
  pull_request_body?: string;
  pull_request_edited_files?: string;
  pull_request_added_lines?: string;
  pull_request_deleted_lines?: string;
}

export const compileTemplate = (templateName: string, options: Options) => {
  const content = fs.readFileSync(`${templateDir}/${templateName}`, 'utf8');
  return content
    .toString()
    .replace('#[receivers]', options.receivers)
    .replace('#[repository_name]', options.repository_name)
    .replace('#[commentator]', options.commentator)
    .replace('#[comment_body]', options.comment_body)
    .replace('#[comment_url]', options.comment_url)
    .replace('#[pull_request_title]', options.pull_request_title)
    .replace('#[pull_request_owner]', options.pull_request_owner)
    .replace('#[pull_request_url]', options.pull_request_url)
    .replace('#[pull_request_body]', options.pull_request_body)
    .replace('#[pull_request_edited_files]', options.pull_request_edited_files)
    .replace('#[pull_request_added_lines]', options.pull_request_added_lines)
    .replace('#[pull_request_deleted_lines]', options.pull_request_deleted_lines);
};
