import { dataRequest } from "@/utils/data-request";

export default async function createPost(req, res) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  const result = await dataRequest("insertOne", {
    document: {
      text: "example",
    },
  });

  res.status(200).json(result);
}
