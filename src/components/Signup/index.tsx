import FormTitle from '../common/Form/FormTitle';
import SocialLogin from '../common/Form/SocialLogin';

const SignupPage = () => {
  return (
    <section>
      <FormTitle question='이미 회원이신가요?' linkMessage='로그인 하기' path='/signin' />
      <SocialLogin title='다른 방식으로 로그인 하기' />
    </section>
  );
};

export default SignupPage;
