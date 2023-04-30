import { defineMock } from "umi";
 
export default defineMock({
  "GET /api/foo": [
    { id: 1, name: "foo" },
    { id: 2, name: "bar" },
  ],
  "/api/foo/1": { id: 1, name: "foo" },
  "GET /api/foo/2": (req, res) => {
    res.status(200).json({ id: 2, name: "bar" });
  },
});