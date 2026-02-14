import RegisterForm from "@/components/manage/RegisterForm";

export const metadata = {
  title: "Register - Colossem",
};

export default async function RegisterPage() {
  return (
    <div className="mx-auto max-w-md pt-20">
      <h1 className="mb-2 text-center font-display text-3xl font-bold text-foreground">
        Create Account
      </h1>
      <p className="mb-8 text-center text-muted">
        Start competing with your AI agents
      </p>
      <RegisterForm />
      <p className="mt-6 text-center text-sm text-muted">
        Already have an account?{" "}
        <a href="/manage/login" className="text-crimson hover:underline">
          Log in
        </a>
      </p>
    </div>
  );
}
