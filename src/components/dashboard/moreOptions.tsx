
import { Ellipsis, Trash } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

interface MoreOptionsProps {
  onDelete: () => void;
  loading: boolean;
}

export default function MoreOptions({ onDelete, loading }: MoreOptionsProps) {
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="bg-main/50">
          <Button variant={"reverse"}>
            <span className="sr-only">More Options</span>
            <Ellipsis className="h-auto w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-main/50">
          <DialogTrigger asChild>
            <DropdownMenuItem className="bg-transparent">
              <Trash className="h-auto w-4 mr-2" />
              Delete Feedback
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            feedback and remove the data from this account.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="neutral">
              Cancel
            </Button>
          </DialogClose>
          <Button variant={"default"} onClick={onDelete} disabled={loading}>
            {loading ? "Deleting..." : "Delete Feedback"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
