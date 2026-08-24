import type {
  ComponentPropsWithoutRef,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

import { classNames } from "@/lib/ui/class-names";

type FieldTextProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
};

function FieldText({
  id,
  hint,
  error,
}: Pick<FieldTextProps, "id" | "hint" | "error">) {
  return (
    <>
      {hint ? (
        <p className="ui-field-hint" id={`${id}-hint`}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p className="ui-field-error" id={`${id}-error`} role="alert">
          오류: {error}
        </p>
      ) : null}
    </>
  );
}

function describedBy(id: string, hint?: string, error?: string) {
  return (
    [hint ? `${id}-hint` : null, error ? `${id}-error` : null]
      .filter(Boolean)
      .join(" ") || undefined
  );
}

type TextFieldProps = Omit<ComponentPropsWithoutRef<"input">, "id"> &
  FieldTextProps;

export function TextField({
  className,
  error,
  hint,
  id,
  label,
  required,
  ...props
}: TextFieldProps) {
  return (
    <div className="ui-field">
      <label className="ui-field-label" htmlFor={id}>
        {label}
        {required ? (
          <span className="ui-required" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      <input
        {...props}
        className={classNames("ui-control", className)}
        id={id}
        required={required}
        aria-describedby={describedBy(id, hint, error)}
        aria-invalid={error ? true : undefined}
      />
      <FieldText id={id} hint={hint} error={error} />
    </div>
  );
}

type TextAreaFieldProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "id"
> &
  FieldTextProps;

export function TextAreaField({
  className,
  error,
  hint,
  id,
  label,
  required,
  ...props
}: TextAreaFieldProps) {
  return (
    <div className="ui-field">
      <label className="ui-field-label" htmlFor={id}>
        {label}
        {required ? (
          <span className="ui-required" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      <textarea
        {...props}
        className={classNames("ui-control", className)}
        id={id}
        required={required}
        aria-describedby={describedBy(id, hint, error)}
        aria-invalid={error ? true : undefined}
      />
      <FieldText id={id} hint={hint} error={error} />
    </div>
  );
}

type SelectFieldProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "id"> &
  FieldTextProps & {
    children: ReactNode;
  };

export function SelectField({
  children,
  className,
  error,
  hint,
  id,
  label,
  required,
  ...props
}: SelectFieldProps) {
  return (
    <div className="ui-field">
      <label className="ui-field-label" htmlFor={id}>
        {label}
        {required ? (
          <span className="ui-required" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      <select
        {...props}
        className={classNames("ui-control", className)}
        id={id}
        required={required}
        aria-describedby={describedBy(id, hint, error)}
        aria-invalid={error ? true : undefined}
      >
        {children}
      </select>
      <FieldText id={id} hint={hint} error={error} />
    </div>
  );
}

type CheckboxFieldProps = Omit<
  ComponentPropsWithoutRef<"input">,
  "id" | "type"
> & {
  id: string;
  label: string;
  description?: string;
};

export function CheckboxField({
  description,
  id,
  label,
  ...props
}: CheckboxFieldProps) {
  return (
    <div className="ui-checkbox-field">
      <input
        {...props}
        className="ui-checkbox"
        id={id}
        type="checkbox"
        aria-describedby={description ? `${id}-description` : undefined}
      />
      <div>
        <label className="ui-field-label" htmlFor={id}>
          {label}
        </label>
        {description ? (
          <p className="ui-field-hint" id={`${id}-description`}>
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
