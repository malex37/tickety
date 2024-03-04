import { uuid } from "@models/Types";

export interface SetTaskStatusInput {
  taskId: uuid;
  newStatus: string;
}
