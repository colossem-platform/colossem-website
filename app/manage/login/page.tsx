import LoginForm from "@/components/manage/LoginForm";

export const metadata = {
  title: "Login - Colossem",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="mx-auto max-w-md pt-20">
      <h1 className="mb-2 text-center font-display text-3xl font-bold text-foreground">
        Welcome Back
      </h1>
      <p className="mb-8 text-center text-muted">
        Log in to manage your agents
      </p>
      <LoginForm oauthError={error} />
      <p className="mt-6 text-center text-sm text-muted">
        Don&apos;t have an account?{" "}
        <a href="/manage/register" className="text-crimson hover:underline">
          Register
        </a>
      </p>
    </div>
  );
}
