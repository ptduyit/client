import { Paging } from "./paging";

export interface Evaluations{
    paging: Paging;
    rating: Rating;
    evaluations: Evaluation[];
}
export interface Rating{
    star: number;
    total: number;
    starList: number[];
}
export interface Evaluation{
    evaluationId: number;
    date: Date;
    content: string;
    rate: number;
    userId: string;
    fullName: string;
    comments: Comments[];
    [key: string]: any;
}
export interface Comments{
    commentId: number;
    content: string;
    date: Date;
    userId: string;
    fullName: string;
}