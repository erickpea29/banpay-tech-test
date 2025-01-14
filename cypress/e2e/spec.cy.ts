describe("Home Page", () => {
  it("successfully loads", () => {
    cy.visit("/");
    cy.get("main").should("exist");
    cy.get("nav").should("exist");
    cy.get("footer").should("exist");
  });
});

describe("Home Page Theme", () => {
  it("changes the image based on the theme", () => {
    cy.visit("/");

    cy.get("img[alt='Studio Ghibli']")
      .should("have.attr", "src")
      .and("include", "Studio_Ghibli.webp");

    cy.get("body").then(($body) => {
      if ($body.hasClass("dark")) {
        cy.get("img[alt='Studio Ghibli']")
          .should("have.attr", "src")
          .and("include", "Studio_Ghibli-dark.webp");
      }
    });
  });
});

describe("Home Page Film List", () => {
  it("displays the film list correctly", () => {
    cy.visit("/");

    cy.get("section.bg-gray-100").within(() => {
      cy.get("div.mx-auto").find("div").should("have.length.greaterThan", 0);
    });
  });
});

describe("Home Page Introduction", () => {
  it("displays the introduction text correctly", () => {
    cy.visit("/");
    cy.get("p.text-lg").should(
      "contain",
      "Discover the magical world of Studio Ghibli."
    );
  });
});

describe("Home Page with Mocked API", () => {
  it("loads mocked film data correctly", () => {
    cy.intercept("GET", "https://ghibliapi.vercel.app/films", {
      statusCode: 200,
      body: [
        { title: "My Neighbor Totoro", id: "1" },
        { title: "Spirited Away", id: "2" },
      ],
    }).as("getFilms");

    cy.visit("/");
    cy.wait("@getFilms");
  });
});

describe("Home Page Search", () => {
  it("searches for a film correctly", () => {
    cy.intercept("GET", "https://ghibliapi.vercel.app/films", {
      statusCode: 200,
      body: [
        {
          title: "My Neighbor Totoro",
          id: "58611129-2dbc-4a81-a72f-77ddfc1b1b49",
        },
        { title: "Spirited Away", id: "dc2e6bd1-8156-4886-adff-b39e6043af0c" },
      ],
    }).as("getFilms");

    cy.visit("/");

    cy.get('input[placeholder="Search Films"]').should("be.visible");
    cy.get(".react-autosuggest__suggestions-list").should("not.exist");

    cy.get('input[placeholder="Search Films"]').type("Totoro");

    cy.get(".react-autosuggest__suggestions-list")
      .should("exist")
      .find("li")
      .should("have.length", 1)
      .and("contain", "My Neighbor Totoro");

    cy.get(".react-autosuggest__suggestions-list").find("li").first().click();

    cy.url().should("include", "/films/58611129-2dbc-4a81-a72f-77ddfc1b1b49");
  });
});
