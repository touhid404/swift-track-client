import { useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import Alert from '../../shared/alert/Alert';
import useAxios from '../../../hooks/useAxios';

const SocialLogin = () => {
    const {signInWithGoogle} = useAuth();
    const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || '/';

  const axiosInstance = useAxios();

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(async(result) => {
                navigate(from);
                // console.log("User signed in with Google:", result.user);
                  const userInfo = {
                    fullName: result.user.displayName,
                     email: result.user.email,
                     profileImage: result.user.photoURL,
                     role: "user" ,
                     creationDate: new Date().toISOString(),
                     lastLogin: new Date().toISOString()
                  }

                  
                  const userRes = await axiosInstance.post('/users', userInfo);
                  console.log(userRes)

            })
            .catch((error) => {
                Alert('error', 'Google sign-in failed', error.message || 'Unknown error');
                console.error("Error signing in with Google:", error);
            });
    };

    return (
         <button onClick={handleGoogleSignIn} className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-100">
        <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" />
        <span className="text-sm text-gray-700">Login with Google</span>
      </button>
    );
};

export default SocialLogin;