export interface Blog {
    id?: number,
    title?: string,
    body: string,
    image: string,
    tags: string[],
    categories: string[],
    createdAt?: Date;
}