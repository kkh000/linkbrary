import instance from '@/utils/apis/axios';

interface checkDuplicationProps {
  email: string;
}

export const checkDuplication = async ({ email }: checkDuplicationProps) => {
  const response = await instance.post('/users/check-email', {
    email: email,
  });

  return response;
};
