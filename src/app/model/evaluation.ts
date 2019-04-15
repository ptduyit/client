export class Evaluation{
    userId: string;
    fullName: string;
    isRate: boolean;
    rate: number;
    likes: number;
    productId: number;
    replyContent: string;
    replyDate: Date;
    replyByReply: number;
    inverseReplyByReplyNavigation: Evaluation;
}