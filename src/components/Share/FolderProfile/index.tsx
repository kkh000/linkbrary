/* eslint-disable @next/next/no-img-element */
import instance from '@/utils/apis/axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const FolderProfile = () => {
  const [folderInformation, setFolderInformation] = useState({ name: '', user_id: 0 });
  const [folderUserInformaiton, setFolderUserInformation] = useState({ image_source: '', email: '' });

  const route = useRouter();
  const folderId = route.query.id;
  const userId = folderInformation.user_id;

  const getFolderProfile = async (folderId: string) => {
    try {
      const response = await instance.get(`/folders/${folderId}`);
      const result = response.data[0];
      setFolderInformation(result);
    } catch (error) {}
  };

  useEffect(() => {
    getFolderProfile(String(folderId));
  }, [folderId]);

  const getFolderUser = async (userId: number) => {
    try {
      const response = await instance.get(`/users/${userId}`);
      const result = response.data[0];
      setFolderUserInformation(result);
    } catch (error) {}
  };

  useEffect(() => {
    if (userId !== 0) {
      getFolderUser(userId);
    }
  }, [userId]);

  return (
    <header className='flex flex-col justify-center items-center pt-5 pb-[3.75rem]'>
      <img src={folderUserInformaiton.image_source} alt='image' width={60} height={60} />
      <div className='pt-3 pb-5'>{folderUserInformaiton.email}</div>
      <div className='text-4xl font-semibold'>{folderInformation.name}</div>
    </header>
  );
};

export default FolderProfile;
