import { fireEvent, render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { describe, expect, it } from "vitest"

import { SidebarNav } from "@/components/sidebar-nav"

describe("SidebarNav", () => {
  const items = [
    { href: "/account", title: "Cuenta" },
    { href: "/settings", title: "Ajustes" },
  ]

  it("renders navigation items", () => {
    render(
      <BrowserRouter>
        <SidebarNav items={items} />
      </BrowserRouter>
    )

    // Verifica que los elementos de navegación se renderizan
    expect(screen.getByText("Cuenta")).toBeDefined()
    expect(screen.getByText("Ajustes")).toBeDefined()
  })

  it("navigates to the correct page on click", () => {
    render(
      <BrowserRouter>
        <SidebarNav items={items} />
      </BrowserRouter>
    )

    // Simula el clic en el primer elemento de navegación
    fireEvent.click(screen.getAllByText("Cuenta")[0])

    // Verifica que la URL cambia al href del primer elemento
    expect(window.location.pathname).toBe("/account")
  })
})
