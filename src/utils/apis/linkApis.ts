import instance from './axios';

export const getLinks = async (folderId: string) => {
  const defaultFolder = folderId === 'all';
  const endpoint = defaultFolder ? '/links' : `/folders/${folderId}/links`;
  const response = await instance.get(endpoint);
  return response.data;
};

export const createLink = async ({ url, folderId }: { url: string; folderId: string | number }) => {
  const response = await instance.post('/links', { url, folderId });
  return response.data;
};

export const changeLink = async ({ cardId, favorite }: { favorite: boolean; cardId: string | number }) => {
  const response = await instance.put(`/links/${cardId}`, { favorite });
  return response.data;
};

export const deleteLink = async (cardId: number) => {
  const response = await instance.delete(`/links/${cardId}`);
  return response.data;
};
