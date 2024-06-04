import Button from '../common/Button';
import FormTitle from '../common/Form/FormTitle';
import SocialLogin from '../common/Form/SocialLogin';

const SigninPage = () => {
  return (
    <form>
      <FormTitle question='회원이 아니신가요?' linkMessage='회원 가입하기' path='/signup' />
      <Button type='submit'>로그인</Button>
      <SocialLogin title='소셜 로그인' />
    </form>
  );
};

export default SigninPage;
