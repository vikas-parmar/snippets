import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 via-purple-100 to-blue-100 p-4">
      <SignIn
        path="/sign-in"
        appearance={{
          elements: {
            card: 'bg-white shadow-xl',
            formButtonPrimary: 'shadow-sm bg-purple-500 hover:bg-purple-600 text-sm normal-case',
            headerTitle: 'text-xl font-bold capitalize',
            headerSubtitle: 'text-gray-500',
            socialButtonsBlockButton: 'border-gray-200 text-gray-600 hover:bg-gray-50',
            formFieldInput: 'border-gray-200 focus:border-purple-500 focus:ring-purple-500',
            footerActionLink: 'text-purple-500 hover:text-purple-600',
          },
          layout: {
            animations: true,
            logoPlacement: 'inside',
            logoImageUrl: '/boom.svg',
          },
        }}
      />
    </div>
  );
}
