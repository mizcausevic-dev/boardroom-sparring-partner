import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./app.js";

describe("boardroom-sparring-partner app", () => {
  it("serves the HTML routes", async () => {
    const htmlRoutes = ["/", "/question-lane", "/pushback-map", "/memo-posture", "/rehearsal-room", "/verification", "/docs"];

    for (const route of htmlRoutes) {
      const response = await request(createApp()).get(route);
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/html/);
    }
  });

  it("serves the JSON routes", async () => {
    const jsonRoutes = [
      "/api/dashboard/summary",
      "/api/question-lane",
      "/api/pushback-map",
      "/api/memo-posture",
      "/api/rehearsal-room",
      "/api/risk-map",
      "/api/verification",
      "/api/sample",
      "/api/payload"
    ];

    for (const route of jsonRoutes) {
      const response = await request(createApp()).get(route);
      expect(response.status).toBe(200);
    }
  });
});
