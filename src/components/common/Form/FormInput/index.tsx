import Image from 'next/image';
import { FieldError, UseFormClearErrors, UseFormRegisterReturn } from 'react-hook-form';

import { ICON } from '@/constants/images';
import useToggled from '@/hooks/useToggled';
import { InputItem } from '@/types/inputType';

interface FormInputProps {
  error: FieldError;
  register: UseFormRegisterReturn;
  clearError: UseFormClearErrors<InputItem>;
  title: string;
  placeholder: string;
  type: string;
  id: string;
  focusType: string;
}

const FormInput = ({ id, title, placeholder, type, error, register, clearError, focusType }: FormInputProps) => {
  const [isToggled, handleToggled] = useToggled({ isShowPassword: false });

  const ErrorStyle = error?.message ? 'border-red' : 'border-gray20';

  const handleErrorType = () => {
    switch (focusType) {
      case 'text':
        return clearError ? clearError('text') : '';
      case 'email':
        return clearError ? clearError('email') : '';
      case 'password':
        return clearError ? clearError('password') : '';
      case 'passwordCheck':
        return clearError ? clearError('passwordCheck') : '';
      default:
        return clearError ? clearError('text') : '';
    }
  };

  const onlyPasswordType = type === 'password' || type === 'passwordCheck';
  const visiblePassword = isToggled.isShowPassword ? 'text' : type;

  return (
    <div className='flex w-full flex-col gap-3'>
      <label className='text-sm' htmlFor={id}>
        {title}
      </label>
      <div
        className={`flex justify-between gap-1 overflow-hidden rounded-lg border bg-white px-[.9375rem] py-[1.125rem] focus-within:border-primary ${ErrorStyle}`}>
        <input
          id={id}
          className='w-full'
          type={visiblePassword}
          placeholder={placeholder}
          {...register}
          onFocus={handleErrorType}
        />
        {onlyPasswordType && (
          <button type='button' onClick={() => handleToggled('isShowPassword')}>
            <Image src={isToggled.isShowPassword ? ICON.EYE_OPEN : ICON.EYE_CLOSE} alt='eye' width={16} height={16} />
          </button>
        )}
      </div>
      {error?.message && <p className='text-sm text-red'>{error.message}</p>}
    </div>
  );
};
export default FormInput;
