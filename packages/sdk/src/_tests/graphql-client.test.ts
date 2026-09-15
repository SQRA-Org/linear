import { describe, it, expect } from "vitest";
import { GraphQLClientError } from "../graphql-client.js";

describe("GraphQLClientError", () => {
  it("does not leak request variables in the error message", () => {
    const error = new GraphQLClientError(
      { status: 401, error: "Unauthorized" },
      { query: "query Q { viewer { id } }", variables: { secretApiKey: "super-secret-value" } }
    );

    expect(error.message).not.toContain("super-secret-value");
    expect(error.message).toContain("Unauthorized");
    expect(error.request.variables).toEqual({ secretApiKey: "super-secret-value" });
  });
});
