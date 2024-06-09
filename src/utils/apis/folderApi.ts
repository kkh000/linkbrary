import instance from './axios';

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
    console.error(error);
  }
};

export const createFolder = async ({ name }: { name: string }) => {
  try {
    const response = await instance.post('/folders', { name });
    return response;
  } catch (error) {}
};

export const deleteFolder = async ({ folderId }: { folderId: string }) => {
  try {
    const response = await instance.delete(`/folders/${folderId}`);
    return response;
  } catch (error) {}
};
