import Chatwork from '@utils/chatwork';
import { GithubEventDto, User } from "@dtos/GithubEvent.dto";
import { isEmpty } from '@/utils/util';
import { HttpException } from '@exceptions/HttpException';
import { StatusCodes } from '@utils/status-code';
import { MESSAGES } from '@/constants/messages';
import { compileTemplate, Options } from '@utils/template';
import { PR_TEMPLATE } from '@/constants/commons';

class WebhooksService {
  private chatwork = new Chatwork();

  public async github(eventData: GithubEventDto): Promise<any> {
    if (isEmpty(eventData)) throw new HttpException(StatusCodes.BAD_REQUEST, MESSAGES.REQUEST_BODY_REQUIRED);
    console.log(eventData);
    const options: Options = {
      repository_name: eventData.repository.name,
      pull_request_title: eventData.pull_request.title,
      pull_request_sender: eventData.pull_request.user.login,
      pull_request_url: eventData.pull_request.html_url,
      pull_request_body: eventData.pull_request.body,
      pull_request_edited_files: (eventData.pull_request.changed_files || 0).toString(),
      pull_request_added_lines: (eventData.pull_request.additions || 0).toString(),
      pull_request_deleted_lines: (eventData.pull_request.deletions || 0).toString(),
      receivers: this.getReceivers(eventData.pull_request.assignees),
    };

    return this.chatwork.postRoomMessage('241292830', {
      body: compileTemplate(PR_TEMPLATE.CHATWORK_PULL_REQUEST_REVIEW, options),
      self_unread: 0,
    });
  }

  private getReceivers(users: User[] = []): string {
    if (users.length === 0) {
      return '[To:2770356]Lam Ngoc Khuong (96)';
    }
    return users
      .map(user => {
        return user.login;
      })
      .join('');
  }
}

export default WebhooksService;
