import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      break;
    case "PATCH":
      break;
    case "DELETE":
      break;
    default:
      res.status(405).end();
      return;
  }
}
