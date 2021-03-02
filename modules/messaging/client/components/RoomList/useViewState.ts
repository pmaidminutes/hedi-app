import { RoomState } from "matrix-js-sdk";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface IRoomSelectionOption {
  roomId: string;
  onChange: () => void;
  selected?: boolean;
}

// radio button / multiselect logic, also handles 'selected' attribute
export const useRoomSelectOptions = (
  roomStates: RoomState[],
  setSelection?: Dispatch<SetStateAction<string[]>>,
  maxOneSelected = true
) => {
  const [options, setOptions] = useState<IRoomSelectionOption[]>([]);

  const handleChange = (opts: IRoomSelectionOption[], roomId: string) => {
    const idx = opts.findIndex(opt => opt.roomId === roomId);
    if (idx >= 0) {
      opts[idx].selected = opts[idx].selected ? undefined : true;
      if (maxOneSelected) {
        opts.forEach((o, i) => {
          if (i !== idx) {
            o.selected = undefined;
          }
        });
      }
      setOptions([...opts]);
      const selectedRoomIds = opts
        .filter(opt => opt.selected)
        .map(opt => opt.roomId);

      if (setSelection) setSelection(selectedRoomIds);
    }
  };

  useEffect(() => {
    const opts: IRoomSelectionOption[] = [];
    roomStates.forEach((r, i) => {
      const opt = options.find(o => o.roomId === r.roomId) ?? {
        roomId: r.roomId,
        onChange: () => null,
      };
      opts.push(opt);
    });
    //array needs to be populated already
    opts.forEach(o => {
      o.onChange = () => handleChange(opts, o.roomId);
    });
    setOptions(opts);
  }, [roomStates, maxOneSelected]);

  return options;
};
