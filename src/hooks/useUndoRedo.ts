import { useState, useCallback, useEffect } from "react";

export interface UndoRedoOptions {
  maxHistory?: number;
  enableKeyboardShortcuts?: boolean;
}

export function useUndoRedo<T>(
  initialPresent: T,
  options: UndoRedoOptions = {}
) {
  const { maxHistory = 30, enableKeyboardShortcuts = true } = options;

  const [state, setState] = useState<{
    past: T[];
    present: T;
    future: T[];
  }>({
    past: [],
    present: initialPresent,
    future: [],
  });

  const canUndo = state.past.length > 0;
  const canRedo = state.future.length > 0;

  const undo = useCallback(() => {
    setState((currentState) => {
      if (currentState.past.length === 0) return currentState;

      const previous = currentState.past[currentState.past.length - 1];
      const newPast = currentState.past.slice(0, currentState.past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [currentState.present, ...currentState.future],
      };
    });
  }, []);

  const redo = useCallback(() => {
    setState((currentState) => {
      if (currentState.future.length === 0) return currentState;

      const next = currentState.future[0];
      const newFuture = currentState.future.slice(1);

      return {
        past: [...currentState.past, currentState.present],
        present: next,
        future: newFuture,
      };
    });
  }, []);

  const set = useCallback(
    (newPresent: T | ((curr: T) => T), recordHistory = true) => {
      setState((currentState) => {
        const resolvedPresent =
          typeof newPresent === "function"
            ? (newPresent as (curr: T) => T)(currentState.present)
            : newPresent;

        // Skip recording if unchanged
        if (JSON.stringify(resolvedPresent) === JSON.stringify(currentState.present)) {
          return currentState;
        }

        if (!recordHistory) {
          return {
            ...currentState,
            present: resolvedPresent,
          };
        }

        const newPast = [...currentState.past, currentState.present].slice(-maxHistory);
        return {
          past: newPast,
          present: resolvedPresent,
          future: [],
        };
      });
    },
    [maxHistory]
  );

  const reset = useCallback((newPresent: T) => {
    setState({
      past: [],
      present: newPresent,
      future: [],
    });
  }, []);

  useEffect(() => {
    if (!enableKeyboardShortcuts) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const isModifier = isMac ? event.metaKey : event.ctrlKey;

      // Ignore when inside text fields
      const target = event.target as HTMLElement;
      const isInput =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (isInput) return;

      if (isModifier && event.key.toLowerCase() === "z") {
        if (event.shiftKey) {
          event.preventDefault();
          redo();
        } else {
          event.preventDefault();
          undo();
        }
      } else if (isModifier && event.key.toLowerCase() === "y") {
        event.preventDefault();
        redo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enableKeyboardShortcuts, undo, redo]);

  return {
    state: state.present,
    set,
    undo,
    redo,
    reset,
    canUndo,
    canRedo,
    historyLength: state.past.length,
  };
}
