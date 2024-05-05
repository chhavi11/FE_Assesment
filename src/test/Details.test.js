import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Details from "../components/Details";

describe("Details Component", () => {
  it("renders details correctly", () => {
    const mockData = [
      {
        alpha_two_code: "US",
        name: "University of Example",
        "state-province": "California",
        domains: ["example.com"],
        web_pages: ["http://www.example.com"],
      },
    ];

    const localStorageMock = {
      getItem: jest.fn().mockReturnValue(JSON.stringify(mockData)),
    };
    Object.defineProperty(window, "localStorage", { value: localStorageMock });
    render(
      <MemoryRouter initialEntries={["/details/0"]}>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Code")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("State-Province")).toBeInTheDocument();
    expect(screen.getByText("Domain")).toBeInTheDocument();
    expect(screen.getByText("Web Page")).toBeInTheDocument();

    expect(screen.getByText("US")).toBeInTheDocument();
    expect(screen.getByText("University of Example")).toBeInTheDocument();
    expect(screen.getByText("California")).toBeInTheDocument();
    expect(screen.getByText("example.com")).toBeInTheDocument();
    expect(screen.getByText("http://www.example.com")).toBeInTheDocument();
  });
});
