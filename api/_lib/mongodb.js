import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
const databaseName = process.env.MONGODB_DATABASE || "genesis_lab";

const globalCache = globalThis;

export async function reportsCollection() {
  if (!uri) throw new Error("MONGODB_URI is not configured.");

  if (!globalCache.genesisMongoClientPromise) {
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    globalCache.genesisMongoClientPromise = client.connect();
  }

  const client = await globalCache.genesisMongoClientPromise;
  const collection = client.db(databaseName).collection("reports");

  if (!globalCache.genesisReportIndexesPromise) {
    globalCache.genesisReportIndexesPromise = Promise.all([
      collection.createIndex({ id: 1 }, { unique: true }),
      collection.createIndex({ reportNumber: 1 }, { unique: true }),
      collection.createIndex({ updatedAt: -1 }),
    ]);
  }

  await globalCache.genesisReportIndexesPromise;
  return collection;
}
