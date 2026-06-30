"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ComponentPropsWithRef, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
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

type ZodFormControlProps = {
  elements: DynamicElementProps[];
  name: string;
  as?: string;
  autoApply?: boolean;
} & ComponentPropsWithRef<typeof Controller>;

function ZodFormControl({ elements, name, as, autoApply, ...props }: ZodFormControlProps) {
  console.log("Form Control", as);
  const control = useFormControl();
  const [hasFocus, setHasFocus] = useState(false);

  return (
    <Controller
      {...props}
      control={control}
      name={name}
      render={({ field, fieldState, formState }) => (
        <ScopedVariables as={as} value={{ field, fieldState, formState, hasFocus }}>
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

function useSchema(schema: Schema | undefined) {
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

type ZodFormProps = Partial<{
  form: Omit<UseFormProps, "resolver">;
  schema: Schema;
  values: FieldValues;
  onSubmit: ExposableFn;
}> & ComponentPropsWithRef<"form"> &
  Exposable;

function ZodForm({ children, onSubmit, schema, form, values, as, ...props }: ZodFormProps) {
  const zodSchema = useSchema(schema);
  const useFormProps = useMemo(
    () =>
      ({
        resolver: zodSchema ? zodResolver(zodSchema) : undefined,
        ...form
      }) as const,
    [schema, form, zodSchema]
  );
  const addVariable = useGuthrieVariables((state) => state.addVariable);
  const formReturn = useForm(useFormProps);

  useEffect(() => {
    if (as) addVariable(as, formReturn);
  }, [as, formReturn, addVariable]);

  useEffect(() => {
    formReturn.reset(values);
  }, [values]);

  const delegateSubmit = useCallback((data: unknown) => {
    if (onSubmit !== undefined) {
      const argSubs: Record<number, unknown> = {};

      onSubmit.args?.forEach((arg, index) => {
        if (arg.type !== "form")
          return;

        argSubs[index] = data;
      });

      void callFnAsync(onSubmit, argSubs);
    }
  }, [onSubmit])

  return (
    <form onSubmit={formReturn.handleSubmit(delegateSubmit)} {...props}>
      <FormControlProvider value={formReturn.control}>{children}</FormControlProvider>
    </form>
  );
}

export { ZodForm, ZodFormControl };
