import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavBar from "../components/NavBar";

describe("NavBar component", () => {
  test("renders navigation links", () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );
    const links = document.querySelectorAll(".navbar-links");
    expect(links.length).toBe(2);
  });
});
