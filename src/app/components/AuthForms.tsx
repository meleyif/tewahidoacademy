'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Copy, Check, Globe, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

type AuthTab = 'login' | 'register';
type UserRole = 'student' | 'instructor' | 'deacon';
type StudentGroup = 'middle' | 'high' | 'college' | 'deacon';

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  studentGroup?: StudentGroup;
  parentEmail?: string;
  locale: 'en' | 'am';
  agreeTerms: boolean;
}

const demoCredentials = [
  { role: 'Student', email: 'yonas.alemu@tewahido.edu', password: 'Faith2026!' },
  { role: 'Instructor', email: 'deaconess.miriam@tewahido.edu', password: 'Teach2026!' },
  { role: 'Deacon', email: 'deacon.dawit@tewahido.edu', password: 'Deacon2026!' },
];

const roleCards: { value: UserRole; label: string; am: string; icon: string; desc: string }[] = [
  { value: 'student', label: 'Student', am: 'ተማሪ', icon: '🎓', desc: 'Enroll in courses, track progress, earn certificates' },
  { value: 'instructor', label: 'Instructor', am: 'አስተማሪ', icon: '📖', desc: 'Create and teach courses, schedule live sessions' },
  { value: 'deacon', label: 'Deacon Track', am: 'ዲያቆን', icon: '⛪', desc: 'Sacred text deep-dives and liturgical practice' },
];

const studentGroups: { value: StudentGroup; label: string; ages: string; icon: string }[] = [
  { value: 'middle', label: 'Middle School', ages: 'Ages 11–14', icon: '🧒' },
  { value: 'high', label: 'High School', ages: 'Ages 15–18', icon: '📚' },
  { value: 'college', label: 'College / Adult', ages: 'Ages 18+', icon: '🎓' },
  { value: 'deacon', label: 'Clergy Track', ages: 'Ordained / Candidate', icon: '⛪' },
];

export default function AuthForms() {
  const [tab, setTab] = useState<AuthTab>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [lang, setLang] = useState<'EN' | 'AM'>('EN');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [selectedGroup, setSelectedGroup] = useState<StudentGroup>('college');
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const router = useRouter();

  const loginForm = useForm<LoginFormData>({
    defaultValues: { email: '', password: '', remember: false },
  });

  const registerForm = useForm<RegisterFormData>({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'student',
      studentGroup: 'college',
      locale: 'en',
      agreeTerms: false,
    },
  });

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleUseCredential = (cred: typeof demoCredentials[0]) => {
    loginForm.setValue('email', cred.email);
    loginForm.setValue('password', cred.password);
    setTab('login');
    toast.success(`Demo credentials for ${cred.role} applied`);
  };

  const onLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    setLoginError('');
    // BACKEND: POST /api/v1/auth/login with { email, password }
    await new Promise((r) => setTimeout(r, 1200));

    const isValid = demoCredentials.some(
      (c) => c.email === data.email && c.password === data.password
    );

    if (!isValid) {
      setLoginError('Invalid credentials — use the demo accounts below to sign in.');
      setIsLoading(false);
      return;
    }

    toast.success('Welcome back! Redirecting to your learning dashboard...');
    setTimeout(() => router.push('/student-dashboard'), 800);
    setIsLoading(false);
  };

  const onRegister = async (data: RegisterFormData) => {
    setIsLoading(true);
    // BACKEND: POST /api/v1/auth/register with { ...data, role: selectedRole, studentGroup: selectedGroup }
    await new Promise((r) => setTimeout(r, 1400));
    toast.success('Account created! Check your email to verify your address.');
    setTab('login');
    setIsLoading(false);
  };

  const watchPassword = registerForm.watch('password');

  return (
    <div className="flex-1 flex flex-col min-h-screen overflow-y-auto bg-background">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 lg:px-10 border-b border-border">
        <div className="lg:hidden flex items-center gap-2">
          <span className="text-accent text-xl">✞</span>
          <span className="font-700 text-sm text-foreground">TewahidoAcademy</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Globe size={14} className="text-muted-foreground" />
          <button
            onClick={() => setLang(lang === 'EN' ? 'AM' : 'EN')}
            className="text-sm font-600 text-muted-foreground hover:text-foreground transition-colors"
          >
            {lang === 'EN' ? 'Switch to አማርኛ' : 'Switch to English'}
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-start justify-center px-6 py-8 lg:px-10 lg:py-12">
        <div className="w-full max-w-md space-y-6">
          {/* Header */}
          <div className="space-y-1">
            <h1 className="text-2xl font-700 text-foreground">
              {tab === 'login' ? 'Welcome back' : 'Create your account'}
            </h1>
            <p className="text-sm text-muted-foreground">
              {tab === 'login' ?'Sign in to continue your Tewahido learning journey.' :'Join thousands of diaspora families learning their faith.'}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-muted rounded-lg p-1 gap-1">
            {(['login', 'register'] as AuthTab[]).map((t) => (
              <button
                key={`tab-${t}`}
                onClick={() => setTab(t)}
                className={`flex-1 py-2 text-sm font-600 rounded-md transition-all duration-150 ${
                  tab === t
                    ? 'bg-card text-foreground shadow-card'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {t === 'login' ? 'Sign In' : 'Register'}
              </button>
            ))}
          </div>

          {/* LOGIN FORM */}
          {tab === 'login' && (
            <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4 fade-in">
              {loginError && (
                <div className="flex items-start gap-2 p-3 bg-danger-bg border border-danger/20 rounded-lg">
                  <AlertCircle size={15} className="text-danger mt-0.5 shrink-0" />
                  <p className="text-sm text-danger font-500">{loginError}</p>
                </div>
              )}

              {/* Social Auth */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 border border-border rounded-lg text-sm font-600 text-foreground hover:bg-secondary transition-colors scale-click"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>

              <div className="flex items-center gap-3">
                <hr className="flex-1 border-border" />
                <span className="text-xs text-muted-foreground font-500">or sign in with email</span>
                <hr className="flex-1 border-border" />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="login-email" className="block text-sm font-600 text-foreground">
                  Email address
                </label>
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  {...loginForm.register('email', {
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
                  })}
                  className="w-full px-3.5 py-2.5 text-sm border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                  placeholder="you@example.com"
                />
                {loginForm.formState.errors.email && (
                  <p className="text-xs text-danger font-500">{loginForm.formState.errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="login-password" className="block text-sm font-600 text-foreground">
                    Password
                  </label>
                  <button type="button" className="text-xs text-primary font-600 hover:underline">
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    {...loginForm.register('password', { required: 'Password is required' })}
                    className="w-full px-3.5 py-2.5 pr-10 text-sm border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {loginForm.formState.errors.password && (
                  <p className="text-xs text-danger font-500">{loginForm.formState.errors.password.message}</p>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  type="checkbox"
                  {...loginForm.register('remember')}
                  className="w-4 h-4 rounded border-border text-primary focus:ring-ring"
                />
                <label htmlFor="remember" className="text-sm font-500 text-muted-foreground">
                  Remember me for 7 days
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 gradient-primary text-primary-foreground text-sm font-700 rounded-lg hover:opacity-90 disabled:opacity-60 transition-all scale-click"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    <span>Signing in…</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </form>
          )}

          {/* REGISTER FORM */}
          {tab === 'register' && (
            <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-5 fade-in">
              {/* Role Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-600 text-foreground">
                  I am joining as
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {roleCards.map((role) => (
                    <button
                      key={`role-${role.value}`}
                      type="button"
                      onClick={() => setSelectedRole(role.value)}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border text-center transition-all scale-click ${
                        selectedRole === role.value
                          ? 'border-primary bg-primary/5 shadow-card'
                          : 'border-border bg-card hover:bg-secondary'
                      }`}
                    >
                      <span className="text-xl" aria-hidden="true">{role.icon}</span>
                      <span className={`text-xs font-700 ${selectedRole === role.value ? 'text-primary' : 'text-foreground'}`}>
                        {role.label}
                      </span>
                      {lang === 'AM' && (
                        <span className="text-xs font-ethiopic text-muted-foreground">{role.am}</span>
                      )}
                    </button>
                  ))}
                </div>
                {selectedRole === 'student' && (
                  <p className="text-xs text-muted-foreground">{roleCards.find(r => r.value === selectedRole)?.desc}</p>
                )}
              </div>

              {/* Student Group (only for students) */}
              {selectedRole === 'student' && (
                <div className="space-y-2">
                  <label className="block text-sm font-600 text-foreground">
                    Student level
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {studentGroups.map((g) => (
                      <button
                        key={`group-${g.value}`}
                        type="button"
                        onClick={() => setSelectedGroup(g.value)}
                        className={`flex items-center gap-2 p-2.5 rounded-lg border text-left transition-all scale-click ${
                          selectedGroup === g.value
                            ? 'border-accent bg-accent/5' :'border-border bg-card hover:bg-secondary'
                        }`}
                      >
                        <span className="text-base" aria-hidden="true">{g.icon}</span>
                        <div className="min-w-0">
                          <p className={`text-xs font-700 ${selectedGroup === g.value ? 'text-accent' : 'text-foreground'}`}>
                            {g.label}
                          </p>
                          <p className="text-[10px] text-muted-foreground">{g.ages}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Full Name */}
              <div className="space-y-1.5">
                <label htmlFor="reg-name" className="block text-sm font-600 text-foreground">
                  Full name
                </label>
                <input
                  id="reg-name"
                  type="text"
                  autoComplete="name"
                  {...registerForm.register('fullName', { required: 'Full name is required' })}
                  className="w-full px-3.5 py-2.5 text-sm border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                  placeholder="Yonas Alemu"
                />
                {registerForm.formState.errors.fullName && (
                  <p className="text-xs text-danger font-500">{registerForm.formState.errors.fullName.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="reg-email" className="block text-sm font-600 text-foreground">
                  Email address
                </label>
                <input
                  id="reg-email"
                  type="email"
                  autoComplete="email"
                  {...registerForm.register('email', {
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
                  })}
                  className="w-full px-3.5 py-2.5 text-sm border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                  placeholder="yonas@gmail.com"
                />
                {registerForm.formState.errors.email && (
                  <p className="text-xs text-danger font-500">{registerForm.formState.errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label htmlFor="reg-password" className="block text-sm font-600 text-foreground">
                  Password
                </label>
                <p className="text-xs text-muted-foreground">Minimum 8 characters with at least one number</p>
                <div className="relative">
                  <input
                    id="reg-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    {...registerForm.register('password', {
                      required: 'Password is required',
                      minLength: { value: 8, message: 'Minimum 8 characters' },
                      pattern: { value: /(?=.*\d)/, message: 'Must include at least one number' },
                    })}
                    className="w-full px-3.5 py-2.5 pr-10 text-sm border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {registerForm.formState.errors.password && (
                  <p className="text-xs text-danger font-500">{registerForm.formState.errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label htmlFor="reg-confirm" className="block text-sm font-600 text-foreground">
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    id="reg-confirm"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    {...registerForm.register('confirmPassword', {
                      required: 'Please confirm your password',
                      validate: (val) => val === watchPassword || 'Passwords do not match',
                    })}
                    className="w-full px-3.5 py-2.5 pr-10 text-sm border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                    placeholder="Repeat your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {registerForm.formState.errors.confirmPassword && (
                  <p className="text-xs text-danger font-500">{registerForm.formState.errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Parent Email (for Middle School) */}
              {selectedRole === 'student' && selectedGroup === 'middle' && (
                <div className="space-y-1.5 p-3 bg-info-bg border border-info/20 rounded-lg">
                  <label htmlFor="parent-email" className="block text-sm font-600 text-foreground">
                    Parent / Guardian email
                  </label>
                  <p className="text-xs text-muted-foreground">Required for students under 14 — a co-monitoring dashboard will be shared with this address.</p>
                  <input
                    id="parent-email"
                    type="email"
                    {...registerForm.register('parentEmail', {
                      required: selectedGroup === 'middle' ? 'Parent email is required for this age group' : false,
                    })}
                    className="w-full px-3.5 py-2.5 text-sm border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                    placeholder="parent@gmail.com"
                  />
                  {registerForm.formState.errors.parentEmail && (
                    <p className="text-xs text-danger font-500">{registerForm.formState.errors.parentEmail.message}</p>
                  )}
                </div>
              )}

              {/* Terms */}
              <div className="space-y-1.5">
                <div className="flex items-start gap-2">
                  <input
                    id="terms"
                    type="checkbox"
                    {...registerForm.register('agreeTerms', { required: 'You must agree to the terms' })}
                    className="w-4 h-4 mt-0.5 rounded border-border text-primary focus:ring-ring"
                  />
                  <label htmlFor="terms" className="text-sm text-muted-foreground font-500 leading-snug">
                    I agree to the{' '}
                    <span className="text-primary font-600 cursor-pointer hover:underline">Terms of Service</span>
                    {' '}and{' '}
                    <span className="text-primary font-600 cursor-pointer hover:underline">Privacy Policy</span>
                  </label>
                </div>
                {registerForm.formState.errors.agreeTerms && (
                  <p className="text-xs text-danger font-500">{registerForm.formState.errors.agreeTerms.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 gradient-primary text-primary-foreground text-sm font-700 rounded-lg hover:opacity-90 disabled:opacity-60 transition-all scale-click"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    <span>Creating account…</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Demo Credentials */}
          <div className="rounded-xl border border-border bg-secondary/50 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-border bg-muted/50">
              <p className="text-xs font-700 text-muted-foreground uppercase tracking-wider">Demo Accounts</p>
            </div>
            <div className="divide-y divide-border">
              {demoCredentials.map((cred) => (
                <div key={`demo-${cred.role}`} className="flex items-center gap-3 px-4 py-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-700 text-foreground">{cred.role}</p>
                    <p className="text-xs text-muted-foreground truncate font-mono">{cred.email}</p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleCopy(cred.email, `${cred.role}-email`)}
                      className="w-6 h-6 flex items-center justify-center rounded text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                      aria-label={`Copy ${cred.role} email`}
                    >
                      {copiedField === `${cred.role}-email` ? (
                        <Check size={12} className="text-positive" />
                      ) : (
                        <Copy size={12} />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUseCredential(cred)}
                      className="text-[11px] font-700 text-primary bg-primary/10 hover:bg-primary/20 px-2 py-1 rounded transition-colors"
                    >
                      Use
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Switch tab link */}
          <p className="text-center text-sm text-muted-foreground">
            {tab === 'login' ? (
              <>
                New to TewahidoAcademy?{' '}
                <button
                  type="button"
                  onClick={() => setTab('register')}
                  className="text-primary font-700 hover:underline"
                >
                  Create an account
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setTab('login')}
                  className="text-primary font-700 hover:underline"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}