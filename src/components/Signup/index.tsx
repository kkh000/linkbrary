import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { FieldError, useForm } from 'react-hook-form';

import Button from '../common/Button';
import EmailInput from '../common/Form/FormInput';
import PasswordInput from '../common/Form/FormInput';
import PasswordCheckInput from '../common/Form/FormInput';
import FormTitle from '../common/Form/FormTitle';
import SocialLogin from '../common/Form/SocialLogin';

import { InputItem } from '@/types/inputType';
import { ERROR_MESSAGE, PLACEHOLDER } from '@/constants/text';
import { userSignup } from '@/utils/apis/auth/useSignup';
import { checkDuplication } from '@/utils/apis/auth/checkDuplication';
import { regexr } from '@/utils/regrex';
import useRedirect from '@/hooks/useRedirect';

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

  useRedirect('folder/all');

  useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  const checkEmail = async (email: string) => {
    try {
      const response = await checkDuplication({ email: email });
      return response.status !== 409;
    } catch (error) {}
  };

  const onSubmit = async ({ email, password }: InputItem) => {
    try {
      const response = await userSignup({ email: email, password: password });
      if (response.status === 200) {
        route.push('/signin');
      }
    } catch (error) {}
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
          validate: async value => {
            const isDuplicate = await checkEmail(value as string);
            return isDuplicate || ERROR_MESSAGE.DUPLICATE_EMAIL;
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
