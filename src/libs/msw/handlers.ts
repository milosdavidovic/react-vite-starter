import { rest } from "msw";
import { APP_CONFIG } from "~/utils/config";

export const handlers = [
  rest.get(`${APP_CONFIG.BASE_URL}/auth/info`, (_, res, ctx) => {
    return res(ctx.status(500), ctx.json({ message: "Internal server error" }), ctx.delay(2000));
  }),
];
