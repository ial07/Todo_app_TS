import React from "react";
import type { TodoSchema } from "../../../lib/validation/todo.validation";
import { InputComp, SelectComp, TextareaComp } from "@/components/ui/input";
import ButtonComp from "@/components/ui/button";
import useFormTodo from "./useFormTodo";

interface FormTodoProps {
  todo?: { id: string } & Partial<TodoSchema>;
  onSuccess?: () => void; // callback to close modal & show message
}

const FormTodo: React.FC<FormTodoProps> = ({ todo, onSuccess }) => {
  const { register, handleSubmit, errors, addMutation, updateMutation, reset } =
    useFormTodo();

  React.useEffect(() => {
    if (todo) {
      const formatted = {
        ...todo,
        date: todo.date ? new Date(todo.date).toISOString().split("T")[0] : "",
      };

      reset(formatted);
    } else {
      reset({ title: "", priority: "LOW", date: "", completed: false }); // reset for Add mode
    }
  }, [todo, reset]);

  const onSubmit = (data: TodoSchema) => {
    if (todo?.id) {
      updateMutation.mutate(
        { id: todo.id, payload: data },
        {
          onSuccess: () => {
            onSuccess?.();
          },
        }
      );
    } else {
      addMutation.mutate(data, {
        onSuccess: () => {
          onSuccess?.();
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <TextareaComp
        label="Enter your task"
        {...register("title")}
        error={errors?.title?.message}
      />

      <SelectComp
        label="Priority"
        {...register("priority")}
        options={[
          { value: "LOW", label: "Low" },
          { value: "MEDIUM", label: "Medium" },
          { value: "HIGH", label: "High" },
        ]}
        error={errors?.priority?.message}
      />

      <InputComp
        label="Select date"
        type="date"
        {...register("date")}
        error={errors?.date?.message}
      />

      <ButtonComp
        label={
          addMutation.isPending || updateMutation.isPending
            ? "Loading..."
            : todo
            ? "Update"
            : "Save"
        }
        disabled={addMutation.isPending || updateMutation.isPending}
        fullWidth
        type="submit"
      />
    </form>
  );
};

export default FormTodo;
