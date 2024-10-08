import { Users } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Icon } from "@/types/Ui";

const UsersIcon = ({ size = 25, className }: Icon) => {
  return <Users className={cn(className)} size={size} />;
};

export default UsersIcon;
