// get-error-message.ts
import { useTranslation } from "react-i18next"

export const getErrorMessage = (errorCode: string): string => {
  const { t } = useTranslation()

  switch (errorCode) {
    case "auth/wrong-password":
      return t("auth_wrong_password")
    case "auth/user-not-found":
      return t("auth_user_not_found")
    case "auth/too-many-requests":
      return t("auth_too_many_requests")
    case "auth/email-already-in-use":
      return t("auth_email_already_in_use")
    case "auth/invalid-email":
      return t("auth_invalid_email")
    default:
      return t("auth_default_error")
  }
}
