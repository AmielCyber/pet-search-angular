export type SnackbarType = "error" | "success" | "info";

export interface SnackbarData {
  message: string;
  type: SnackbarType;
}
