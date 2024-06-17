import { FolderInformationItem, FolderListItem } from '@/types/folderType';

import instance from './axios';

export const getFolderList = async (): Promise<FolderListItem[] | undefined> => {
  const response = await instance.get('/folders');
  return response.data;
};

export const getFolderInformation = async (folderId: string): Promise<FolderInformationItem[]> => {
  const response = await instance.get(`/folders/${folderId}`);
  return response.data;
};

export const changeFolderName = async (newFolderName: string, folderId: string) => {
  const response = await instance.put(`/folders/${folderId}`, { name: newFolderName });
  return response.data;
};

export const createFolder = async (name: string) => {
  const response = await instance.post('/folders', { name });
  return response.data;
};

export const deleteFolder = async (folderId: string) => {
  const response = await instance.delete(`/folders/${folderId}`);
  return response.data;
};

export const getUserData = async () => {
  const response = await instance.get('/users');
  return response.data;
};
