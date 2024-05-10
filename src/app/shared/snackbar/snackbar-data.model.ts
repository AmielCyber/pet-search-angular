export interface SnackbarData {
  message: string;
  type: SnackbarType;
}

export enum SnackbarType {
  success = "success",
  info = "info",
  error = "error",
  problemDetails = "problemDetails",
}

export enum SnackbarPanelClass {
  success = "success-snackbar",
  info = "info-snackbar",
  error = "error-snackbar",
}
