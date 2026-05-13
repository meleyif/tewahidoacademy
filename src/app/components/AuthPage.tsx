import React from 'react';
import AuthBrand from './AuthBrand';
import AuthForms from './AuthForms';

export default function AuthPage() {
  return (
    <div className="min-h-screen flex">
      <AuthBrand />
      <AuthForms />
    </div>
  );
}