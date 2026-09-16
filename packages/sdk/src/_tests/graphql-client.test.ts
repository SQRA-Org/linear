import { describe, expect, it } from "vitest";
import { GraphQLClientError } from "../index.js";

describe("GraphQLClientError", () => {
  it("does not leak request variables in the error message", () => {
    const error = new GraphQLClientError(
      { status: 401, error: "Unauthorized" },
      { query: "query { viewer { id } }", variables: { apiKey: "super-secret-value" } }
    );

    expect(error.message).not.toContain("super-secret-value");
    expect(error.message).not.toContain("variables");
    expect(error.message).toContain("401");
    expect(error.request.variables?.apiKey).toEqual("super-secret-value");
  });
});
