import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormTodo from "../FormTodo";
import ButtonComp from "@/components/ui/button";
import type { TodoSchema } from "../../../lib/validation/todo.validation";

interface TodoDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  editingTodo: ({ id: string } & Partial<TodoSchema>) | null;
  onSuccess: (isEdit: boolean) => void;
}

const TodoDialog: React.FC<TodoDialogProps> = ({
  isOpen,
  setIsOpen,
  editingTodo,
  onSuccess,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <ButtonComp
          label="Add Task"
          iconAdd
          onClick={() => {
            setIsOpen(true);
          }}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="flex justify-between items-center">
              <div>
                <span className="inline md:hidden display-xs font-bold">
                  {editingTodo ? "Edit Task" : "Add Task"}
                </span>
                <span className="hidden md:inline display-sm font-bold">
                  {editingTodo ? "Edit Task" : "Add Task"}
                </span>
              </div>
              <DialogClose asChild>
                <img
                  src="./x-close.svg"
                  alt="more"
                  className="w-4 brightness-0 contrast-100 dark:brightness-100 dark:contrast-100 cursor-pointer"
                />
              </DialogClose>
            </div>
          </DialogTitle>
        </DialogHeader>

        <FormTodo
          todo={editingTodo ?? undefined}
          onSuccess={() => {
            setIsOpen(false);
            onSuccess(!!editingTodo);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default TodoDialog;
