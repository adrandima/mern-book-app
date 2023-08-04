export interface IBook {
  _id: string;
  name: string;
  isbn: string;
  author?: IAuthor;
}

export interface IAuthor {
  _id: string;
  first_name: string;
  last_name: string;
}
