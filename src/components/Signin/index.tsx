import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { FieldError, useForm } from 'react-hook-form';

import Button from '../common/Button';
import EmailInput from '../common/Form/FormInput';
import PasswordInput from '../common/Form/FormInput';
import FormTitle from '../common/Form/FormTitle';
import SocialLogin from '../common/Form/SocialLogin';

import { InputItem } from '@/types/inputType';
import { ERROR_MESSAGE, PLACEHOLDER } from '@/constants/text';
import { userSignin } from '@/utils/apis/authApi';
import { regexr } from '@/utils/regrex';
import { setAccessToken } from '@/utils/apis/token';
import { loginStore } from '@/store/store';
import useRedirect from '@/hooks/useRedirect';
import instance from '@/utils/apis/axios';
import { useUserStore } from '@/store/userStore';

const SigninPage = () => {
  const {
    register,
    formState: { errors },
    clearErrors,
    handleSubmit,
    setFocus,
    setError,
  } = useForm<InputItem>({ mode: 'onBlur', reValidateMode: 'onBlur' });

  useRedirect('/folder/all', false);

  const route = useRouter();
  const { setIsLoggedIn } = loginStore();
  const { setUserProfile } = useUserStore();

  const isValid = Object.keys(errors).length !== 0;

  useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  const onSubmit = async ({ email, password }: InputItem) => {
    try {
      const response = await userSignin({ email: email, password: password });
      const accessToken = response?.data.accessToken;
      if (response?.status === 200) {
        setAccessToken(accessToken);
        setIsLoggedIn(true);
        route.push('/folder/all');

        const userProfileResponse = await instance.get('/users');
        const userProfileData = userProfileResponse.data[0];
        setUserProfile(userProfileData);
      }
    } catch (error: any) {
      if (error.response?.status === 400) {
        setError('email', { type: 'manual', message: ERROR_MESSAGE.CHECK_EMAIL });
        setError('password', { type: 'manual', message: ERROR_MESSAGE.CHECK_PASSWORD });
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <form className='flex flex-col gap-[1.875rem]' onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown}>
      <FormTitle question='회원이 아니신가요?' linkMessage='회원 가입하기' path='/signup' />
      <EmailInput
        register={register('email', {
          required: {
            value: true,
            message: ERROR_MESSAGE.EMPTY_EMAIL,
          },
          pattern: {
            value: regexr.email,
            message: ERROR_MESSAGE.INVALID_EMAIL_FORMAT,
          },
        })}
        id='eamil'
        title='이메일'
        type='email'
        focusType='email'
        placeholder={PLACEHOLDER.EMAIL}
        clearError={clearErrors}
        error={errors.email as FieldError}
      />
      <PasswordInput
        register={register('password', {
          required: {
            value: true,
            message: ERROR_MESSAGE.EMPTY_PASSWORD,
          },
        })}
        id='password'
        title='비밀번호'
        type='password'
        focusType='password'
        placeholder={PLACEHOLDER.PASSWORD}
        clearError={clearErrors}
        error={errors.password as FieldError}
      />
      <Button type='submit' disabled={isValid}>
        로그인
      </Button>
      <SocialLogin title='소셜 로그인' />
    </form>
  );
};

export default SigninPage;
