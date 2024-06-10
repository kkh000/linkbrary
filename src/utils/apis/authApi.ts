import instance from '@/utils/apis/axios';

interface SignProps {
  email: string | undefined;
  password: string | undefined;
}

export const userSignin = async ({ email, password }: SignProps) => {
  const response = await instance.post('/auth/sign-in', {
    email: email,
    password: password,
  });

  return response.data;
};

export const userSignup = async ({ email, password }: SignProps) => {
  const response = await instance.post('/auth/sign-up', {
    email: email,
    password: password,
  });

  return response.data;
};

export const checkDuplicateEmail = async ({ email }: { email: string }) => {
  const response = await instance.post('/users/check-email', {
    email: email,
  });

  return response.data;
};
