export interface ProgressStatus {
  status: ProgressStatusEnum;
  percentage?: number;
}

export enum ProgressStatusEnum {
  START, COMPLETE, IN_PROGRESS, ERROR
}
