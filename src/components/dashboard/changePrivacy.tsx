import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";

const PRIVACY_OPTIONS = [
  {
    id: "public",
    name: "Public",
    value: false,
  },
  {
    id: "private",
    name: "Private",
    value: true,
  },
];

export default function ChangePrivacy({
  onChangePrivacy,
  loading,
}: {
  onChangePrivacy: (isPrivate: boolean) => void;
  loading: boolean;
}) {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"reverse"}
            className="flex items-center gap-2 justify-center outline-none bg-main/50"
            disabled={loading}
          >
            {loading ? "Updating..." : "Change Privacy"}
            <ChevronDown className="w-4 h-auto" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-[156px] bg-main/50">
          {PRIVACY_OPTIONS.map((privacy) => (
            <DropdownMenuItem
              key={privacy.id}
              onClick={() => onChangePrivacy(privacy.value)}
              className="bg-transparent"
            >
              <span className="capitalize">{privacy.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
