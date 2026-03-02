import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getSession } from "@/lib/auth/auth";

export async function UserInfo() {
  const session = await getSession();

  if (!session?.user) {
    return;
  }

  return (
    <div className="flex items-center gap-2 px-2">
      <Avatar>
        <AvatarImage />
        <AvatarFallback className="bg-primary text-secondary ">
          {session.user.name[0]}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col text-sm">
        <span className="font-bold">{session.user.name}</span>
        <span className="text-muted-foreground">{session.user.email}</span>
      </div>
    </div>
  );
}
