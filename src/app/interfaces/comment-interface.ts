export interface Comment {
    id: number;
    postId: number;
    parentId: number;
    user: string;
    date: string;
    content: string;
}