import { ChangeEvent, useEffect, useState } from "react";
import { setProperty } from "@/modules/common/utils";

export interface IInputState<T> {
  value: T;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

type IElementValueFn<T> =
  | null
  | undefined
  | ((target: HTMLInputElement | HTMLSelectElement) => Partial<T>[keyof T]);

export type IConverterMap<T> = { [K in keyof T]?: IElementValueFn<T> };

export type IInputStateMap<T> = { [K in keyof T]: IInputState<Partial<T>[K]> };

export function useCombinedInputs<T>(
  converters: IConverterMap<T>,
  initial?: Partial<T>,
  onChange?: (data: Partial<T>) => void
) {
  const [state, setState] = useState<Partial<T>>(initial ?? {});

  useEffect(() => {
    setState(initial ?? {});
  }, [initial]);

  const result = {} as IInputStateMap<T>;
  for (const [key, func] of Object.entries<IElementValueFn<T>>(converters)) {
    const handleChange = (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const value = func ? func(e.target) : e.target.value;
      setState(p => {
        const newState = { ...p, [key]: value };
        if (onChange) onChange(newState);
        return newState;
      });
    };
    setProperty(result, key as keyof T, {
      value: state[key as keyof T],
      onChange: handleChange,
    });
  }

  return result;
}
