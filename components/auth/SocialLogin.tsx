import React from 'react';
import { Button } from '../ui/Button';

const SocialLogin: React.FC = () => {
  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  const handleFacebookLogin = () => {
    console.log('Facebook login clicked');
  };

  return (
    <div className="space-y-3">
      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-3"
        onClick={handleGoogleLogin}
      >
        <img 
          src="https://placehold.co/20x20" 
          alt="Google logo with colorful G icon on white background" 
          className="w-5 h-5"
        />
        Continue with Google
      </Button>
      
      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-3"
        onClick={handleFacebookLogin}
      >
        <img 
          src="https://placehold.co/20x20" 
          alt="Facebook logo with blue f icon on white background" 
          className="w-5 h-5"
        />
        Continue with Facebook
      </Button>
    </div>
  );
};

export { SocialLogin };
