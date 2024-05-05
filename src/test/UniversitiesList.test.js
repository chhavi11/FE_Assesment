import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import UniversitiesList from "../components/UniversitiesList";
import { BrowserRouter } from "react-router-dom";

describe("UniversitiesList Component", () => {
  it("renders universities list correctly", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () =>
        Promise.resolve([
          { name: "University A" },
          { name: "University B" },
          { name: "University C" },
        ]),
    });

    const { getByText } = render(
      <BrowserRouter>
        <UniversitiesList />
      </BrowserRouter>
    );
    await waitFor(() => expect(getByText("University A")).toBeInTheDocument());
    expect(getByText("University B")).toBeInTheDocument();
    expect(getByText("University C")).toBeInTheDocument();
  });

  it("sorts universities list correctly", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () =>
        Promise.resolve([
          { name: "Z University" },
          { name: "A University" },
          { name: "M University" },
        ]),
    });
  
    const { getAllByTestId, getByTestId } = render(
      <BrowserRouter>
        <UniversitiesList />
      </BrowserRouter>
    );
    await waitFor(() => getAllByTestId("university-list"));
    fireEvent.click(getByTestId("sort-btn"));
    const listItemsAfterSorting = getAllByTestId("university-name");
    expect(listItemsAfterSorting[0].textContent.trim().replace(/Delete$/, "")).toBe(
        "A University"
      );
      expect(listItemsAfterSorting[1].textContent.trim().replace(/Delete$/, "")).toBe(
        "M University"
      );
      expect(listItemsAfterSorting[2].textContent.trim().replace(/Delete$/, "")).toBe(
        "Z University"
      );
  });
  
    it("filters universities list correctly", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        json: () =>
          Promise.resolve([
            { name: "University A" },
            { name: "University B" },
            { name: "University C" },
          ]),
      });
  
      const { getByPlaceholderText, queryByText } = render(
        <BrowserRouter>
          <UniversitiesList />
        </BrowserRouter>
      );
  
      const searchInput = getByPlaceholderText("Search");
      fireEvent.change(searchInput, { target: { value: "University B" } });
      await waitFor(() => {
        expect(queryByText(/University B/i)).toBeInTheDocument();
      });
    
  });

  it("deletes a university from the list", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () =>
        Promise.resolve([
          { name: "University A" },
          { name: "University B" },
          { name: "University C" },
        ]),
    });

    const { getByText, queryByText } = render(
      <BrowserRouter>
        <UniversitiesList />
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(getByText("University A")).toBeInTheDocument();
      expect(getByText("University B")).toBeInTheDocument();
      expect(getByText("University C")).toBeInTheDocument();
    });
    fireEvent.click(getByText("University B").nextSibling);
    await waitFor(() => {
      expect(queryByText("University B")).not.toBeInTheDocument();
    });
  });
});
