import { FieldError, useForm } from 'react-hook-form';

import Button from '../common/Button';
import EmailInput from '../common/Form/FormInput';
import PasswordInput from '../common/Form/FormInput';
import FormTitle from '../common/Form/FormTitle';
import SocialLogin from '../common/Form/SocialLogin';

import { InputItem } from '@/types/inputType';
import { ERROR_MESSAGE, PLACEHOLDER } from '@/constants/text';

const SigninPage = () => {
  const {
    register,
    formState: { errors },
    clearErrors,
  } = useForm<InputItem>({ mode: 'onBlur', reValidateMode: 'onBlur' });
  return (
    <form className='flex flex-col gap-[1.875rem]'>
      <FormTitle question='회원이 아니신가요?' linkMessage='회원 가입하기' path='/signup' />
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
        })}
        id='password'
        title='비밀번호'
        type='password'
        focusType='password'
        placeholder={PLACEHOLDER.PASSWORD}
        clearError={clearErrors}
        error={errors.password as FieldError}
      />
      <Button type='submit'>로그인</Button>
      <SocialLogin title='소셜 로그인' />
    </form>
  );
};

export default SigninPage;
