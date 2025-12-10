import React from "react";
import { Form, OverlayTrigger, Popover } from "react-bootstrap";
import { CircleCheck as CheckCircle, CircleAlert as AlertCircle, Info } from "lucide-react";

/* ------------------------- Base floating controls ------------------------- */

type CommonProps = {
  id?: string;
  label: string;
  className?: string;
};

type FloatingInputProps = CommonProps & {
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  readOnly?: boolean;
};

export const FloatingInput: React.FC<FloatingInputProps> = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  disabled,
  readOnly,
}) => {
  const autoId = React.useId();
  const controlId = id ?? `fi-${autoId}`;

  return (
    <Form.Floating className={`form-floating-compact ${className}`}>
      <Form.Control
        id={controlId}
        type={type}
        placeholder={placeholder ?? ""}
        value={value}
        onChange={onChange}
        disabled={disabled}
        readOnly={readOnly}
        dir="ltr"
      />
      <Form.Label htmlFor={controlId}>{label}</Form.Label>
    </Form.Floating>
  );
};

type FloatingSelectProps = CommonProps & {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  children: React.ReactNode;
};

export const FloatingSelect: React.FC<FloatingSelectProps> = ({
  id,
  label,
  value,
  onChange,
  className = "",
  disabled,
  children,
}) => {
  const autoId = React.useId();
  const controlId = id ?? `fs-${autoId}`;

  return (
    <Form.Floating className={`form-floating-compact ${className}`}>
      <Form.Select id={controlId} value={value} onChange={onChange} disabled={disabled}>
        {children}
      </Form.Select>
      <Form.Label htmlFor={controlId}>{label}</Form.Label>
    </Form.Floating>
  );
};

export const FloatingSelectOption: React.FC<{ value: string; children: React.ReactNode }> = ({
  value,
  children,
}) => <option value={value}>{children}</option>;

/* --------- Floating controls with validation + popover help -------------- */

type ValidationState = "valid" | "invalid" | "info" | undefined;

type FloatingInputWithFeedbackProps = FloatingInputProps & {
  state?: ValidationState;      // controls border color (valid/invalid)
  help?: string;                // popover body
  popoverTitle?: string;        // popover title
};

const PopIcon: React.FC<{
  state: ValidationState;
  popover?: React.ReactElement | null;
  className?: string;
}> = ({ state, popover, className }) => {
  const Icon = state === "invalid" ? AlertCircle : state === "valid" ? CheckCircle : Info;
  const colorClass =
    state === "invalid" ? "text-danger" : state === "valid" ? "text-success" : "text-secondary";

  return (
    <OverlayTrigger
      placement="auto"
      trigger={["hover", "focus"]}
      overlay={popover!}
      container={document.body}
      popperConfig={{
        strategy: "fixed", // prevents layout jank on first mount
        modifiers: [
          { name: "preventOverflow", options: { boundary: "viewport" } },
          { name: "flip", options: { fallbackPlacements: ["left", "right", "bottom", "top"] } },
          { name: "offset", options: { offset: [0, 8] } },
        ],
      }}
      disabled={!popover}
    >
      <span
        className={`validation-icon ${colorClass} ${className ?? ""}`}
        role={popover ? "button" : "img"}
        aria-label={
          state === "invalid" ? "Invalid" : state === "valid" ? "Valid" : "Info"
        }
        tabIndex={0}
      >
        <Icon size={18} />
      </span>
    </OverlayTrigger>
  );
};

export const FloatingInputWithFeedback: React.FC<FloatingInputWithFeedbackProps> = ({
  state,
  help,
  popoverTitle,
  className = "",
  ...rest
}) => {
  const autoId = React.useId();
  const controlId = rest.id ?? `fiv-${autoId}`;

  const popover =
    help || popoverTitle ? (
      <Popover>
        {popoverTitle ? <Popover.Header as="h3">{popoverTitle}</Popover.Header> : null}
        {help ? <Popover.Body>{help}</Popover.Body> : null}
      </Popover>
    ) : null;

  return (
    <Form.Floating className={`form-floating-compact with-feedback ${className}`}>
      <Form.Control
        id={controlId}
        placeholder=""
        {...rest}
        isInvalid={state === "invalid"}
        isValid={state === "valid"}
        dir="ltr"
      />
      <Form.Label htmlFor={controlId}>{rest.label}</Form.Label>
      <PopIcon state={state} popover={popover} />
    </Form.Floating>
  );
};

type FloatingSelectWithFeedbackProps = FloatingSelectProps & {
  state?: ValidationState;
  help?: string;
  popoverTitle?: string;
};

export const FloatingSelectWithFeedback: React.FC<FloatingSelectWithFeedbackProps> = ({
  state,
  help,
  popoverTitle,
  className = "",
  ...rest
}) => {
  const autoId = React.useId();
  const controlId = rest.id ?? `fsv-${autoId}`;

  const popover =
    help || popoverTitle ? (
      <Popover>
        {popoverTitle ? <Popover.Header as="h3">{popoverTitle}</Popover.Header> : null}
        {help ? <Popover.Body>{help}</Popover.Body> : null}
      </Popover>
    ) : null;

  return (
    <Form.Floating className={`form-floating-compact with-feedback for-select ${className}`}>
      <Form.Select id={controlId} value={rest.value} onChange={rest.onChange} disabled={rest.disabled}>
        {rest.children}
      </Form.Select>
      <Form.Label htmlFor={controlId}>{rest.label}</Form.Label>
      <PopIcon state={state} popover={popover} />
    </Form.Floating>
  );
};

type FloatingTextareaProps = CommonProps & {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  readOnly?: boolean;
  rows?: number;
};

export const FloatingTextarea: React.FC<FloatingTextareaProps> = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  className = "",
  disabled,
  readOnly,
  rows = 3,
}) => {
  const autoId = React.useId();
  const controlId = id ?? `ft-${autoId}`;

  return (
    <Form.Floating className={`form-floating-compact ${className}`}>
      <Form.Control
        as="textarea"
        id={controlId}
        placeholder={placeholder ?? ""}
        value={value}
        onChange={onChange}
        disabled={disabled}
        readOnly={readOnly}
        rows={rows}
        dir="ltr"
      />
      <Form.Label htmlFor={controlId}>{label}</Form.Label>
    </Form.Floating>
  );
};