import instance from '@/utils/apis/axios';

interface userSignProps {
  email: string | undefined;
  password: string | undefined;
}

export const userSignin = async ({ email, password }: userSignProps) => {
  const response = await instance.post('/auth/sign-in', {
    email: email,
    password: password,
  });

  return response;
};