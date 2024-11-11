// Define a type for our fake data
type TFakePost = {
  _id: string;
  data: string;
  status: "active" | "draft" | "inactive";
};

// Load a single record by key
export const fakeRecordLoad = async (key: string): Promise<TFakePost> => {
  const randomStatus = ["active", "inactive", "draft"][Math.floor(Math.random() * 3)]
  return {_id: key, data: `value${key}`, status: randomStatus} as TFakePost
}

// Load all records
export const fakeMultipleRecordLoad = async (): Promise<TFakePost[]> => [
  {_id: "key1", data: "value1", status: "active"},
  {_id: "key2", data: "value2", status: "inactive"},
  {_id: "key3", data: "value3", status: "inactive"},
  {_id: "key4", data: "value4", status: "draft"},
  {_id: "key5", data: "value5", status: "draft"},
  {_id: "key6", data: "value6", status: "draft"},
  {_id: "key7", data: "value7", status: "draft"},
  {_id: "key8", data: "value8", status: "draft"},
]

export const subListFilters = {
  published: (item: TFakePost) => item.status === "active",
  draft: (item: TFakePost) => item.status === "draft",
  inactive: (item: TFakePost) => item.status === "inactive",
}