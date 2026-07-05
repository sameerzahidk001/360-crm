import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ className, label, error, id, ...props }: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s/g, "-");

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-text-primary">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          "w-full h-10 px-3.5 rounded-xl border border-border bg-surface text-sm text-text-primary",
          "placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent-orange/30 focus:border-accent-orange",
          "transition-all duration-200",
          error && "border-danger focus:ring-danger/30 focus:border-danger",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ className, label, error, id, ...props }: TextareaProps) {
  const inputId = id || label?.toLowerCase().replace(/\s/g, "-");

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-text-primary">
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        className={cn(
          "w-full min-h-[100px] px-3.5 py-2.5 rounded-xl border border-border bg-surface text-sm text-text-primary",
          "placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent-orange/30 focus:border-accent-orange",
          "transition-all duration-200 resize-y",
          error && "border-danger focus:ring-danger/30 focus:border-danger",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export function Select({ className, label, options, id, ...props }: SelectProps) {
  const inputId = id || label?.toLowerCase().replace(/\s/g, "-");

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-text-primary">
          {label}
        </label>
      )}
      <select
        id={inputId}
        className={cn(
          "w-full h-10 px-3.5 rounded-xl border border-border bg-surface text-sm text-text-primary",
          "focus:outline-none focus:ring-2 focus:ring-accent-orange/30 focus:border-accent-orange",
          "transition-all duration-200",
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
