import WebAuthRegistrationForm from "./_components/web-auth-registraion-form";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 p-2">
      <hgroup className="flex flex-col gap-2 mt-6">
        <img src="/favicon.svg" className="h-[4rem]" />
        <h1 className="text-lg font-semibold text-center">Pre-WebAuthn</h1>
      </hgroup>

      <WebAuthRegistrationForm />
    </div>
  );
}
