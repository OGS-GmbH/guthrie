"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ComponentPropsWithRef, createContext, useContext, useEffect, useMemo } from "react";
import { Control, Controller, FieldValues, useForm, UseFormProps } from "react-hook-form";
import { ZodType } from "zod";
import { $ZodTypeInternals } from "zod/v4/core";
import { callFnAsync } from "../../renderer/fns.js";
import { Renderer } from "../../renderer/renderer.js";
import { DynamicElementProps, Exposable, ExposableFn } from "../../renderer/type.js";
import { useGuthrieVariables } from "../../stores/variables.js";
import { ScopedVariables } from "../scoped-variables.js";
import { buildSchema } from "./zod/schema.js";
import { Schema } from "./zod/types.js";

const FormControlProvider = createContext<Control<FieldValues, unknown, unknown> | null>(null);

function useFormControl() {
  return useContext(FormControlProvider)!;
}

type FormControlProps = {
  elements: DynamicElementProps[];
  name: string;
  as?: string;
  autoApply?: boolean;
} & ComponentPropsWithRef<typeof Controller>;

function FormControl({ elements, name, as, autoApply, ...props }: FormControlProps) {
  const control = useFormControl();

  return (
    <Controller
      {...props}
      control={control}
      name={name}
      render={({ field, fieldState, formState }) => (
        <ScopedVariables as={as} value={{ field, fieldState, formState }}>
          {elements.map((element, index) => (
            <Renderer
              {...element}
              key={index}
              rawRef={field.ref}
              rawProperties={
                autoApply || autoApply === undefined
                  ? { ...element.rawProperties, ...field }
                  : element.rawProperties
              }
            />
          ))}
        </ScopedVariables>
      )}
    />
  );
}

function useSchema(schema: Schema) {
  return useMemo(
    () =>
      schema
        ? (buildSchema(schema) as ZodType<
            unknown,
            FieldValues,
            $ZodTypeInternals<unknown, FieldValues>
          >)
        : undefined,
    [schema]
  );
}

type FormProps = {
  form: Omit<UseFormProps, "resolver">;
  schema: Schema;
  values: FieldValues;
  onSubmit: ExposableFn;
} & ComponentPropsWithRef<"form"> &
  Exposable;

function ZodForm({ children, onSubmit, schema, form, values, as, ...props }: FormProps) {
  const zSchema = useSchema(schema);
  const useFormConfig = useMemo(
    () =>
      ({
        resolver: zSchema ? zodResolver(zSchema) : undefined,
        ...form
      }) as const,
    [schema, form]
  );

  const formReturn = useForm(useFormConfig);

  useEffect(() => {
    if (as) useGuthrieVariables.getState().addVariable(as, formReturn);
  }, [as, formReturn]);

  useEffect(() => {
    formReturn.reset(values);
  }, [values]);

  function delegateSubmit(data: unknown) {
    const argSubs: Record<number, unknown> = {};

    onSubmit.args?.forEach((arg, index) => {
      if (typeof arg === "number" || typeof arg === "boolean" || typeof arg === "string") return;

      if (arg.type === "form") argSubs[index] = data;
    });

    void callFnAsync(onSubmit, argSubs);
  }

  return (
    <form onSubmit={formReturn.handleSubmit((data) => delegateSubmit(data))} {...props}>
      <FormControlProvider value={formReturn.control}>{children}</FormControlProvider>
    </form>
  );
}

export { ZodForm, FormControl };
