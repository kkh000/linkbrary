import { FieldError, useForm } from 'react-hook-form';

import Button from '../common/Button';
import EmailInput from '../common/Form/FormInput';
import PasswordInput from '../common/Form/FormInput';
import PasswordCheckInput from '../common/Form/FormInput';
import FormTitle from '../common/Form/FormTitle';
import SocialLogin from '../common/Form/SocialLogin';

import { InputItem } from '@/types/inputType';
import { ERROR_MESSAGE, PLACEHOLDER } from '@/constants/text';

const SignupPage = () => {
  const {
    register,
    formState: { errors },
    clearErrors,
    getValues,
  } = useForm<InputItem>({ mode: 'onBlur', reValidateMode: 'onBlur' });

  return (
    <form className='flex flex-col gap-[1.875rem]'>
      <FormTitle question='이미 회원이신가요?' linkMessage='로그인 하기' path='/signin' />
      <EmailInput
        register={register('email', {
          required: {
            value: true,
            message: ERROR_MESSAGE.EMPTY_EMAIL,
          },
          pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
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
          pattern: {
            value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
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
        type='passwordCheck'
        focusType='passwordCheck'
        placeholder={PLACEHOLDER.PASSWORD}
        clearError={clearErrors}
        error={errors.passwordCheck as FieldError}
      />
      <Button type='submit'>회원가입</Button>
      <SocialLogin title='다른 방식으로 로그인 하기' />
    </form>
  );
};

export default SignupPage;
