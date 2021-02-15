export * from "./IMatrixClient";

// reexporting here, due to the '/index' quirk
export type {
  EventTimeline,
  LoginPayload,
  MatrixClient,
  MatrixEvent,
  Room as MatrixRoom,
} from "matrix-js-sdk/index";
