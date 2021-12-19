import axios from 'axios';
import { stringify } from 'querystring';

export const CHATWORK_URL = 'https://api.chatwork.com/v2';

export type RateLimits = {
  'x-ratelimit-reset': number;
  'x-ratelimit-remaining': number;
  'x-ratelimit-limit': number;
};

export type GetMeResponse = {
  account_id: number;
  room_id: number;
  name: string;
  chatwork_id: string;
  organization_id: number;
  organization_name: string;
  department: string;
  title: string;
  url: string;
  introduction: string;
  mail: string;
  tel_organization: string;
  tel_extension: string;
  tel_mobile: string;
  skype: string;
  facebook: string;
  twitter: string;
  avatar_image_url: string;
  login_mail: string;
};

export type GetMyStatusResponse = {
  unread_room_num: number;
  mention_room_num: number;
  mytask_room_num: number;
  unread_num: number;
  mention_num: number;
  mytask_num: number;
};

export type GetMyTasksParam = {
  assigned_by_account_id?: number;
  status?: 'open' | 'done';
};

export type GetMyTasksResponse = {
  task_id: number;
  room: {
    room_id: number;
    name: string;
    icon_path: string;
  };
  assigned_by_account: {
    account_id: number;
    name: string;
    avatar_image_url: string;
  };
  message_id: string;
  body: string;
  limit_time: number;
  status: 'open' | 'done';
  limit_type: 'none' | 'date' | 'time';
}[];

export type GetRoomsResponse = {
  room_id: number;
  name: string;
  type: 'my' | 'direct' | 'group';
  role: 'admin' | 'member' | 'readonly';
  sticky: 0 | 1;
  unread_num: number;
  mention_num: number;
  mytask_num: number;
  message_num: number;
  file_num: number;
  task_num: number;
  icon_path: string;
  last_update_time: number;
}[];

export type PostRoomParam = {
  name: string;
  description?: string;
  link?: 0 | 1;
  link_code?: string;
  link_need_acceptance?: 0 | 1;
  members_admin_ids: string;
  members_member_ids?: string;
  members_readonly_ids?: string;
  icon_preset?:
    | 'group'
    | 'check'
    | 'document'
    | 'meeting'
    | 'event'
    | 'project'
    | 'business'
    | 'study'
    | 'security'
    | 'star'
    | 'idea'
    | 'heart'
    | 'magcup'
    | 'beer'
    | 'music'
    | 'sports'
    | 'travel';
};

export type PostRoomResponse = {
  room_id: number;
};

export type PostRoomMessageParam = {
  // Message body
  body: string;

  // Make the messages you posted unread
  // By setting this as 1, the messages you posted is turned to unread (0 is the default value: read)
  self_unread?: 0 | 1;
};

export type PostRoomMessageResponse = {
  message_id: string;
};

export type DeleteRoomMessageResponse = {
  message_id: string;
};

export default class Chatwork {
  private _rateLimits?: RateLimits;
  private _apiToken?: string;
  set apiToken(apiToken: string | undefined) {
    this._apiToken = apiToken;
  }

  get apiToken() {
    return this._apiToken || process.env.CHATWORK_API_TOKEN;
  }

  private getRequestHeaders() {
    return {
      'X-ChatWorkToken': this.apiToken,
    };
  }

  private checkApiToken(headers: any) {
    if (!headers['X-ChatWorkToken']) {
      throw new Error('Chatwork API Token is not set.');
    }
  }

  private saveRateLimits(headers: any) {
    const rateLimits = Object.entries(headers)
      .filter(([key]) => key.startsWith('x-ratelimit'))
      .map(([key, value]) => [key, Number(value)]);
    this._rateLimits = Object.fromEntries(rateLimits) as RateLimits;
  }

  private async get<T>(uri: string, params: any = {}) {
    const requestHeaders = this.getRequestHeaders();
    this.checkApiToken(requestHeaders);
    const { data, headers } = await axios.get(CHATWORK_URL + uri, {
      headers: requestHeaders,
      params,
    });

    this.saveRateLimits(headers);

    return data as T;
  }

  private async post<T>(uri: string, params: any = {}) {
    const requestHeaders = this.getRequestHeaders();
    this.checkApiToken(requestHeaders);
    const { data, headers } = await axios.post(CHATWORK_URL + uri, stringify(params), {
      headers: {
        ...requestHeaders,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    this.saveRateLimits(headers);

    return data as T;
  }

  private async delete<T>(uri: string, params: any = {}) {
    const requestHeaders = this.getRequestHeaders();
    this.checkApiToken(requestHeaders);
    const { data, headers } = await axios.delete(CHATWORK_URL + uri, {
      headers: requestHeaders,
      params,
    });

    this.saveRateLimits(headers);

    return data as T;
  }

  private async put<T>(uri: string, params: any = {}) {
    const requestHeaders = this.getRequestHeaders();
    this.checkApiToken(requestHeaders);
    const { data, headers } = await axios.put(CHATWORK_URL + uri, stringify(params), {
      headers: {
        ...requestHeaders,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    this.saveRateLimits(headers);

    return data as T;
  }

  async getMe() {
    return await this.get<GetMeResponse>(`/me`);
  }

  async getMyStatus() {
    return await this.get<GetMyStatusResponse>(`/my/status`);
  }

  async getMyTasks(params?: GetMyTasksParam) {
    return await this.get<GetMyTasksResponse>(`/my/tasks`, params);
  }

  async getRooms() {
    return await this.get<GetRoomsResponse>(`/rooms`);
  }

  async postRoom(params: PostRoomParam) {
    return await this.post<PostRoomResponse>(`/rooms`, params);
  }

  /**
   * Add new message to the chat
   * @param room_id
   * @param params
   */
  async postRoomMessage(room_id: string | number, params: PostRoomMessageParam) {
    return await this.post<PostRoomMessageResponse>(`/rooms/${room_id}/messages`, params);
  }

  async deleteRoomMessage(room_id: string | number, message_id: string | number) {
    return await this.delete<DeleteRoomMessageResponse>(`/rooms/${room_id}/messages/${message_id}`);
  }
}
