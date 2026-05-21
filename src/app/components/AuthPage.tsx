import React from 'react';
import AuthBrand from './AuthBrand';
import AuthForms from './AuthForms';

interface AuthPageProps {
  defaultTab?: 'login' | 'register';
}

export default function AuthPage({ defaultTab = 'login' }: AuthPageProps) {
  return (
    <div className="min-h-screen flex">
      <AuthBrand />
      <AuthForms defaultTab={defaultTab} />
    </div>
  );
}
