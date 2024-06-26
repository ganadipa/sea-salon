import { auth } from "@/auth";
import { SignInButton } from "@/components/signin";
import { SignOut } from "@/components/signout";
import { SignUp } from "@/components/signup";

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      hello
      {session ? (
        <SignOut />
      ) : (
        <>
          <SignInButton />
          <SignUp />
        </>
      )}
    </main>
  );
}
