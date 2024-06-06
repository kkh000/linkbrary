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

  const isPasswordInput = type === 'password' || type === 'passwordCheck';

  return (
    <div className=' flex flex-col w-full gap-3'>
      <label className='text-sm' htmlFor={id}>
        {title}
      </label>
      <div
        className={`flex justify-between gap-1 border py-[1.125rem] px-[.9375rem] ${error?.message ? 'border-red' : 'border-gray20'}  rounded-lg  bg-white overflow-hidden focus-within:border-primary`}>
        <input
          id={id}
          type={isToggled.isShowPassword ? 'text' : type}
          className=' w-full '
          placeholder={placeholder}
          {...register}
          onFocus={() => {
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
          }}
        />
        {isPasswordInput && (
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
