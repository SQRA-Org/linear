import { describe, it, expect } from "vitest";
import { GraphQLClientError } from "../index.js";

describe("GraphQLClientError", () => {
  it("does not leak request variables in the error message", () => {
    const error = new GraphQLClientError({ status: 401, errors: [{ message: "Unauthorized" }] } as any, {
      query: "query { viewer { id } }",
      variables: { secret: "TOP_SECRET_VALUE" },
    });

    expect(error.message).not.toContain("TOP_SECRET_VALUE");
    expect(error.message).toContain("Unauthorized");
    expect(error.request.variables).toEqual({ secret: "TOP_SECRET_VALUE" });
  });
});
