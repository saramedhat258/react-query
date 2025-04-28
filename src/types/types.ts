export interface PostType{
    id:number,
    title:string,
    body:string,
    status:"published"|"draft"|"block";
    topRate:boolean;    
}
export type postStatus='block'|'draft'|'published'|'all'

export interface comment{
    body:string,
    postID:number
}
export interface commentResponse{
    id:number,
    body:string,
    postID:number
}