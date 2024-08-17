import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

function ButtonReplyForm({ setOpen }: { setOpen: (startOpen: boolean) => void }) {
  const { pending } = useFormStatus();

  return (
    <div className="flex items-center gap-4">
      <Button
        type="submit"
        disabled={pending}
        className="my-6 bg-dark px-8 text-lg dark:bg-light hover:dark:bg-zinc-300 dark:focus:bg-zinc-300"
      >
        {pending ? "Commenting" : "Comment"}
      </Button>
      <Button
        type="button"
        disabled={pending}
        variant="outline"
        onClick={()=> setOpen(false)}
        className="my-6 px-8 text-lg hover:dark:bg-zinc-300 dark:focus:bg-zinc-300"
      >
        Cancel
      </Button>
    </div>
  );
}

export default ButtonReplyForm;
