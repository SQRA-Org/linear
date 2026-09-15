/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from "vitest";
import { GraphQLClientError } from "../graphql-client.js";

describe("GraphQLClientError", () => {
  it("does not leak request variables in the error message", () => {
    const error = new GraphQLClientError(
      { status: 400, error: "Bad Request" } as any,
      { query: "query { viewer { id } }", variables: { apiKey: "super-secret-value" } } as any
    );

    expect(error.message).not.toContain("super-secret-value");
    expect(error.message).toContain("400");
    expect((error.request.variables as any).apiKey).toBe("super-secret-value");
  });
});
