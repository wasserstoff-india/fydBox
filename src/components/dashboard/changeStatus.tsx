
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";


const STATUS_OPTIONS = [
  {
    id: "active",
    name: "Active",
    value: true,
  },
  {
    id: "inactive",
    name: "Inactive",
    value: false,
  },
];



export default function ChangeStatus({  onChangeStatus,
  loading,}: {
    onChangeStatus: (isActive: boolean) => void;
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
            {loading ? "Updating..." : "Change Status"}
            <ChevronDown className="w-4 h-auto" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-[152px] bg-main/50">
          {STATUS_OPTIONS.map((status) => (
            <DropdownMenuItem
              key={status.id}
              onClick={() => onChangeStatus(status.value)}
              className="bg-transparent"
            >
              <span className="capitalize">{status.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
