//React
import { useCallback, useEffect, useRef, useState } from "react";
//Actions
import { checkProjectTitle } from "@/actions";

//Ui
import ErrorMessage from "@/components/common/ui/ErrorMessage";
import CustomLabel from "@/components/common/ui/Label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Inputs } from "@/types/Project";
import { SquareCheck } from "lucide-react";

//Lib
import { Control, FieldErrors, UseFormSetValue } from "react-hook-form";
import SuccessMessage from "@/components/common/ui/SuccessMessage";

type TitleProps = {
  errors: FieldErrors<Inputs>;
  setValue: UseFormSetValue<Inputs>;
  syncTitle?: string;
};
function Title({ errors, setValue, syncTitle }: TitleProps) {
  const [title, setTitle] = useState(syncTitle ? syncTitle : "");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const hasChanged = useRef(false);

  const handleValidation = useCallback(async () => {
    if (!title) {
      setError("Seems like you forgot to enter a title.");
      return;
    }
    const response = await checkProjectTitle(title);
    if (response.isUnique === true) {
      setSuccess("Title is valid and unique");
      setError("");
      setValue("title", title);
    } else {
      setError("A project with this name already exists for your account.");
      setSuccess("");
    }
    console.log(response);
  }, [title, setError, setSuccess, setValue]);

  useEffect(() => {
    if (syncTitle) {
      handleValidation();
    }
  }, [syncTitle, handleValidation]);

  useEffect(() => {
    if (syncTitle && !hasChanged.current) {
      setTitle(syncTitle);
    }
  }, [syncTitle]);

  console.log(syncTitle, title, "sync in title");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleValidation();
    }
  };
  return (
    <div className="mt-4 flex w-full flex-col gap-2">
      <CustomLabel htmlFor="title" required>
        Title
      </CustomLabel>

      <div className="flex items-center">
        <Input
          placeholder="The title of your project"
          className="h-12 w-full rounded-r-none border-r-0 focus:h-10"
          name="title"
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          onClick={handleValidation}
          type="button"
          className="h-12 w-24 rounded-l-none border-l-0 text-lg"
        >
          Validate
        </Button>
      </div>

      {success && <SuccessMessage>{success}</SuccessMessage>}

      {(errors.title || error) && (
        <ErrorMessage>{errors?.title?.message || error}</ErrorMessage>
      )}
    </div>
  );
}

export default Title;
