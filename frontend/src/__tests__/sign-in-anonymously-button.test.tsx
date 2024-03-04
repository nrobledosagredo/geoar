import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { getAuth, signInAnonymously } from "firebase/auth"
import { describe, expect, it, vi } from "vitest"

import { SignInAnonymouslyButton } from "@/components/sign-in-anonymously-button"

vi.mock("firebase/auth", () => ({
  getAuth: vi.fn(),
  signInAnonymously: vi.fn(() => Promise.resolve({ user: { uid: "123" } })),
}))

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: any) => key,
    i18n: { language: "en" },
  }),
}))

// Mock useCreateUser hook
vi.mock("@/hooks/use-create-user", () => ({
  useCreateUser: () => ({
    handleCreateUser: vi.fn(() => Promise.resolve()),
  }),
}))

describe("SignInAnonymouslyButton", () => {
  it("should call signInAnonymously on click", async () => {
    const setIsLoading = vi.fn()
    render(
      <SignInAnonymouslyButton isLoading={false} setIsLoading={setIsLoading} />
    )

    const button = screen.getByRole("button")
    fireEvent.click(button)

    await waitFor(() => {
      expect(signInAnonymously).toHaveBeenCalledWith(getAuth())
    })
  })
})
