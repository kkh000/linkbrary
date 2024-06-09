import instance from './axios';
import axios from 'axios';

export const getFolderLinkList = async ({ folderId }: { folderId: string }) => {
  try {
    const defaultFolder = folderId === 'all';
    const endpoint = defaultFolder ? '/links' : `/folders/${folderId}/links`;
    const response = await instance.get(endpoint);
    return response;
  } catch (error) {
  } finally {
  }
};

export const createLink = async ({ url, folderId }: { url: string; folderId: string | number }) => {
  try {
    const response = await instance.post('/links', { url, folderId });
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

export const deleteLink = async ({ cardId }: { cardId: number }) => {
  try {
    const response = await instance.delete(`/links/${cardId}`);
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
