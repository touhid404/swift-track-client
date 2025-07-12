import useAuth from '../../../hooks/useAuth';

const SocialLogin = () => {
    const {signInWithGoogle} = useAuth();

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then((result) => {
                console.log("User signed in with Google:", result.user);
            })
            .catch((error) => {
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