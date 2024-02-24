import { render, screen } from "@testing-library/react"
import { I18nextProvider } from "react-i18next"
import { BrowserRouter } from "react-router-dom"
import { describe, expect, it } from "vitest"

import i18n from "@/lib/i18n"
import { MainNav } from "@/components/main-nav"

describe("MainNav", () => {
  it("renders the main navigation with HorizontalLogo and UserNav", () => {
    render(
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <MainNav />
        </BrowserRouter>
      </I18nextProvider>
    )

    // Verifica la presencia de los componentes HorizontalLogo
    expect(screen.getByText("Geo")).toBeDefined()
    expect(screen.getByText("AR")).toBeDefined()
  })
})
