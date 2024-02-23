import { Home } from "@/pages/home/home";
import { render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import i18n from "@/lib/i18n";

describe("Home", () => {
  it("renders main components", () => {
    render(
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </I18nextProvider>
    );

    // Verifica la presencia del botón
    expect(screen.getByRole("link", { name: "Comenzar" })).toBeDefined();
  });
});
