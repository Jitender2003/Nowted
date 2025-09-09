export interface FolderData {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}
export type FoldersResponseData = FolderData[];

export interface NoteData {
  note: {
    id: string;
    name: string;
    content: string;
    isFavorite: boolean;
    isArchived: boolean;
    isDeleted: boolean;
    updatedAt: string;
    folder: {
      id: string;
      name: string;
      isDeleted: boolean;
      createdAt: string;
      updatedAt: string;
    };
  };
}

export interface RecentNotesResponseData {
  recentNotes: NoteData[];
}

export interface NoteListResponseData {
  id: string;
  name: string;
  preview_content: string;
  formatted_date: string;
}
