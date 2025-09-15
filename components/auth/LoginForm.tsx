import React from 'react';
import { useForm } from 'react-hook-form';
import { LoginFormData } from '../../types/auth';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { SocialLogin } from './SocialLogin';
import { validateEmail, validatePassword } from '../../lib/utils';
import { useAuth } from '../../hooks/useAuth';

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormData>();

  const { login, loading, error } = useAuth();

  const onSubmit = async (data: LoginFormData) => {
    const result = await login(data);
    if (result) {
      console.log('Login successful:', result);
      window.location.href = '/dashboard';
    }
  };

  const emailValue = watch('email');
  const passwordValue = watch('password');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://placehold.co/48x48"
            alt="Komdigi company logo with modern geometric design in blue colors"
          />
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <a href="/register" className="font-medium text-blue-600 hover:text-blue-500">
              create a new account
            </a>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              {...register('email', {
                required: 'Email is required',
                validate: (value) =>
                  validateEmail(value) || 'Please enter a valid email address',
              })}
              label="Email address"
              type="email"
              placeholder="Enter your email"
              error={errors.email?.message}
              autoComplete="email"
            />

            <Input
              {...register('password', {
                required: 'Password is required',
                validate: (value) =>
                  validatePassword(value) ||
                  'Password must be at least 6 characters',
              })}
              label="Password"
              type="password"
              placeholder="Enter your password"
              error={errors.password?.message}
              autoComplete="current-password"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                {...register('rememberMe')}
                id="remember-me"
                name="rememberMe"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="/forgot-password"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          <Button
            type="submit"
            loading={loading}
            disabled={!emailValue || !passwordValue || loading}
            className="w-full"
          >
            Sign in
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
            </div>
          </div>

          <SocialLogin />
        </form>

        <div className="text-center text-sm text-gray-500">
          <p>
            By signing in, you agree to our{' '}
            <a href="/terms" className="text-blue-600 hover:text-blue-500">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-blue-600 hover:text-blue-500">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export { LoginForm };
