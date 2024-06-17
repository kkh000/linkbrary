import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FieldError, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { ERROR_MESSAGE, PLACEHOLDER } from '@/constants/text';
import useRedirect from '@/hooks/useRedirect';
import { InputItem } from '@/types/inputType';
import { userSignup, checkDuplicateEmail } from '@/utils/apis/authApi';
import { regexr } from '@/utils/regrex';

import Button from '../common/Button';
import EmailInput from '../common/Form/FormInput';
import PasswordInput from '../common/Form/FormInput';
import PasswordCheckInput from '../common/Form/FormInput';
import FormTitle from '../common/Form/FormTitle';
import SocialLogin from '../common/Form/SocialLogin';

const SignupPage = () => {
  const {
    register,
    formState: { errors },
    clearErrors,
    getValues,
    handleSubmit,
    setFocus,
  } = useForm<InputItem>({ mode: 'onBlur', reValidateMode: 'onBlur' });

  const route = useRouter();

  const isValid = Object.keys(errors).length !== 0;

  useRedirect('/folder/all', false);

  useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  const checkDuplicate = useMutation({
    mutationFn: (email: string | undefined) => checkDuplicateEmail(email),
    onSuccess: () => {
      toast.success('사용 가능한 이메일 입니다.');
    },
  });

  const handleDuplicate = async (email: string | undefined) => {
    if (!email) return ERROR_MESSAGE.EMPTY_EMAIL;
    try {
      await checkDuplicate.mutateAsync(email);
      return true;
    } catch {
      return ERROR_MESSAGE.DUPLICATE_EMAIL;
    }
  };

  const signupSubmit = useMutation({
    mutationFn: ({ email, password }: InputItem) => userSignup({ email, password }),
    onSuccess: () => {
      toast.success('회원가입에 성공하였습니다. 로그인 페이지로 이동합니다.');
      setTimeout(() => {
        route.push('/signin');
      }, 3000);
    },
    onError: () => {
      toast.error('회원가입에 실패하였습니다. 정보를 다시 확인해주세요');
    },
  });

  const onSubmit = async ({ email, password }: InputItem) => {
    signupSubmit.mutate({ email, password });
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <form className='flex flex-col gap-[1.875rem]' onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown}>
      <FormTitle question='이미 회원이신가요?' linkMessage='로그인 하기' path='/signin' />
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
          validate: handleDuplicate,
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
          pattern: {
            value: regexr.password,
            message: ERROR_MESSAGE.INVALID_PASSWORD_FORMAT,
          },
        })}
        id='password'
        title='비밀번호'
        type='password'
        focusType='password'
        placeholder={PLACEHOLDER.PASSWORD_FORMAT}
        clearError={clearErrors}
        error={errors.password as FieldError}
      />
      <PasswordCheckInput
        register={register('passwordCheck', {
          required: {
            value: true,
            message: ERROR_MESSAGE.EMPTY_PASSWORD,
          },
          validate: value => value === getValues('password') || ERROR_MESSAGE.PASSWORDS_DO_NOT_MATCH,
        })}
        id='passwordCheck'
        title='비밀번호'
        type='password'
        focusType='passwordCheck'
        placeholder={PLACEHOLDER.PASSWORD}
        clearError={clearErrors}
        error={errors.passwordCheck as FieldError}
      />
      <Button type='submit' disabled={isValid}>
        회원가입
      </Button>
      <SocialLogin title='다른 방식으로 로그인 하기' />
    </form>
  );
};

export default SignupPage;
