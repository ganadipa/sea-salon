import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { actions } from "@/actions/actions";

export function SignOut({ className }: { className?: string }) {
  return (
    <form
      onSubmit={async () => {
        await actions.auth.signOutAction();
      }}
      className={className}
    >
      <button type="submit">Sign out</button>
    </form>
  );
}
