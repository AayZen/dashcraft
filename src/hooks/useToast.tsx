/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastItem {
  id: string;
  title: string;
  message?: string;
  type: ToastType;
  duration?: number;
  action?: ToastAction;
}

interface ToastContextType {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, "id">) => void;
  removeToast: (id: string) => void;
  success: (title: string, message?: string, action?: ToastAction) => void;
  error: (title: string, message?: string, action?: ToastAction) => void;
  warning: (title: string, message?: string, action?: ToastAction) => void;
  info: (title: string, message?: string, action?: ToastAction) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    ({ title, message, type, duration = 3800, action }: Omit<ToastItem, "id">) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      setToasts((prev) => [...prev.slice(-3), { id, title, message, type, duration, action }]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  const success = useCallback(
    (title: string, message?: string, action?: ToastAction) =>
      addToast({ title, message, type: "success", action }),
    [addToast]
  );
  const error = useCallback(
    (title: string, message?: string, action?: ToastAction) =>
      addToast({ title, message, type: "error", action }),
    [addToast]
  );
  const warning = useCallback(
    (title: string, message?: string, action?: ToastAction) =>
      addToast({ title, message, type: "warning", action }),
    [addToast]
  );
  const info = useCallback(
    (title: string, message?: string, action?: ToastAction) =>
      addToast({ title, message, type: "info", action }),
    [addToast]
  );

  return (
    <ToastContext.Provider
      value={{ toasts, addToast, removeToast, success, error, warning, info }}
    >
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

const ToastContainer: React.FC<{
  toasts: ToastItem[];
  onRemove: (id: string) => void;
}> = ({ toasts, onRemove }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 rounded-xl border p-3.5 shadow-xl transition-all duration-200 animate-toast-in bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100"
        >
          <div className="mt-0.5 shrink-0">
            {toast.type === "success" && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
            {toast.type === "error" && <AlertCircle className="h-4 w-4 text-rose-500" />}
            {toast.type === "warning" && <AlertTriangle className="h-4 w-4 text-amber-500" />}
            {toast.type === "info" && <Info className="h-4 w-4 text-cyan-500" />}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-semibold leading-tight">{toast.title}</p>
              {toast.action && (
                <button
                  onClick={() => {
                    toast.action?.onClick();
                    onRemove(toast.id);
                  }}
                  className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline shrink-0"
                >
                  {toast.action.label}
                </button>
              )}
            </div>
            {toast.message && (
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 leading-normal line-clamp-2">
                {toast.message}
              </p>
            )}
          </div>

          <button
            onClick={() => onRemove(toast.id)}
            className="shrink-0 p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            title="Dismiss notification"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
