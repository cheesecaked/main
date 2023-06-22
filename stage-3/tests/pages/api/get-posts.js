import { dataRequest } from "@/utils/data-request";
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).end();
    return;
  }

  const result = await dataRequest("find", {});

  res.status(200).json(result);
}
