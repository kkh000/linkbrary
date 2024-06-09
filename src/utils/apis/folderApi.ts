import instance from './axios';
import axios from 'axios';

export const getFolderList = async () => {
  try {
    const response = await instance.get('/folders');
    return response;
  } catch (error) {}
};

export const getFolderInformation = async ({ folderId }: { folderId: string }) => {
  try {
    const response = await instance.get(`/folders/${folderId}`);
    return response;
  } catch (error) {}
};

export const changeFolderName = async ({ newFolderName, folderId }: { newFolderName: string; folderId: string }) => {
  try {
    const response = await instance.put(`/folders/${folderId}`, { name: newFolderName });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        status: error.response.status,
        message: error.response.data.message,
      };
    }
  }
};

export const createFolder = async ({ name }: { name: string }) => {
  try {
    const response = await instance.post('/folders', { name });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        status: error.response.status,
        message: error.response.data.message,
      };
    }
  }
};

export const deleteFolder = async ({ folderId }: { folderId: string }) => {
  try {
    const response = await instance.delete(`/folders/${folderId}`);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        status: error.response.status,
        message: error.response.data.message,
      };
    }
  }
};
