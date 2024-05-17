import { logoutAction } from "@/data/actions/auth-actions";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      {" "}
      // would clear the cookie
      <button type='submit'>
        <LogOut className='w-6 h-6 hover:text-primary' />
      </button>
    </form>
  );
}
