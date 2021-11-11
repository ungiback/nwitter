// import { authService } from 'fbase'
import AuthForm from 'components/AuthForm'
import { auth } from 'fbase'

const Auth = () => {
    const onSocialClick = async (event) => {
        const { target: { name } } = event;
        let provider;
        if (name === 'google') {
            provider = new auth.GoogleAuthProvider();
        } else if (name === 'github') {
            provider = new auth.GithubAuthProvider();
        }
        await auth.signInWithPopup(auth.getAuth(), provider)
    }
    return (
        <div>
            <AuthForm />
            <div>
                <button onClick={onSocialClick} name="google" >Continue with Google</button>
                <button onClick={onSocialClick} name="github" >Continue with Github</button>
            </div>
        </div>
    )
}

export default Auth;