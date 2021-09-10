import Chatwork from '@utils/chatwork';

class WebhooksService {
  private chatwork = new Chatwork();
  public async github(): Promise<any> {
    return this.chatwork.postRoomMessage('241292830', {
      body: 'Test thử [To:2770356]Lam Ngoc Khuong (96)',
      self_unread: 0,
    });
  }
}

export default WebhooksService;
