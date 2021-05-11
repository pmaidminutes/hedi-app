import { IUIElementTexts } from "@/modules/model";

export const days = [
  {
    identifier: "0",
    value: "Please select",
    description: "",
  },
  {
    identifier: "1",
    value: "Montag",
    description: "",
  },
  {
    identifier: "2",
    value: "Dienstag",
    description: "",
  },
  {
    identifier: "3",
    value: "Mittwoch",
    description: "",
  },
  {
    identifier: "4",
    value: "Donnerstag",
    description: "",
  },
  {
    identifier: "5",
    value: "Freitag",
    description: "",
  },
  {
    identifier: "6",
    value: "Samstag",
    description: "",
  },
  {
    identifier: "7",
    value: "Sonntag",
    description: "",
  },
];
export const timeRanges: IUIElementTexts[] = [
  {
    identifier: "0",
    value: "Please select", // TODO language specific text
    description: "",
  },
  ...getTimes(),
];

function getTimes() {
  const result: IUIElementTexts[] = [];
  for (let index = 7, hour = ""; index <= 20; index++) {
    hour = index < 10 ? "0" + index : "" + index;
    result.push({
      identifier: hour + ":00",
      value: hour + ":00",
      description: "",
    });
    result.push({
      identifier: hour + ":30",
      value: hour + ":30",
      description: "",
    });
  }
  return result;
}
