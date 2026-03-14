import AuthForm from '@/components/Auth/AuthForm';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.24),_transparent_30%),linear-gradient(180deg,var(--bg),var(--bg-soft))] px-4 py-4 sm:px-6 sm:py-5 xl:h-screen xl:overflow-hidden">
      <div className="mx-auto max-w-6xl xl:h-full">
        <AuthForm />
      </div>
    </main>
  );
}
