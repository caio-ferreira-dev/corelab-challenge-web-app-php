export default interface INote {
  id: number;
  created_at: Date;
  updated_at: Date;
  name: string;
  content: string;
  favorite: boolean;
  color: string;
}
