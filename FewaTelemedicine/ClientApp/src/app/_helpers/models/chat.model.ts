export class ChatModel {
    user: string;
    message: Array<MessageModel>;
    constructor() {
        this.user = "";
        this.message = new Array<MessageModel>();
    }
}
export class MessageModel {
    time: Date;
    message: string;
    sender: string;
    receiver: string;
    isProvider: boolean;
    constructor() {
        this.time = new Date();
        this.message = "";
        this.sender = "";
        this.receiver = "";
        this.isProvider = false;
    }
}