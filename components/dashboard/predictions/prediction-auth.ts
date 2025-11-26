/**
 * Predictions-specific authorization checks
 * Each action has its own permission logic based on user role
 */

export type UserRole = "ADMIN" | "STAFF" | "USER";

export interface PredictionPermissions {
  canList: boolean;
  canCreate: boolean;
  canView: boolean;
  canUpdate: boolean;
  canDelete: boolean;
}

export function getPredictionPermissions(role?: UserRole): PredictionPermissions {
  if (!role) {
    return {
      canList: false,
      canCreate: false,
      canView: false,
      canUpdate: false,
      canDelete: false,
    };
  }

  return {
    // List Predictions: ADMIN, STAFF, USER
    canList: role === "ADMIN" || role === "STAFF" || role === "USER",
    // Create Predictions: ADMIN, STAFF
    canCreate: role === "ADMIN" || role === "STAFF",
    // Get Prediction Detail: ADMIN, STAFF, USER
    canView: role === "ADMIN" || role === "STAFF" || role === "USER",
    // Update Prediction: ADMIN, STAFF
    canUpdate: role === "ADMIN" || role === "STAFF",
    // Delete Prediction: ADMIN
    canDelete: role === "ADMIN",
  };
}
