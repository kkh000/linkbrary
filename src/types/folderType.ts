export interface FolderListItem {
  created_at: string;
  favorite: boolean;
  id: number;
  link_count: number;
  name: string;
}

export interface FolderInformationItem {
  id: number;
  created_at: string;
  favorite: boolean;
  name: string;
  user_id: number;
}
