import json, pathlib, re, unittest
ROOT=pathlib.Path(__file__).parent
class SourceAwareCatalogTests(unittest.TestCase):
 def test_zapia_manifest_namespace_and_routes(self):
  d=json.loads((ROOT/"zapia-apps.json").read_text())
  self.assertEqual(d["source_id_namespace"],"zapia-own-memory")
  self.assertEqual(d["count"],16); self.assertEqual(len(d["apps"]),16)
  ids=[a["id"] for a in d["apps"]]; self.assertEqual(len(ids),len(set(ids)))
  self.assertEqual(ids,[f"ZM{i:03d}" for i in range(1,17)])
  for a in d["apps"]:
   self.assertEqual(a["source"],d["source_id_namespace"]); self.assertEqual(a["source_id"],a["id"])
   p=ROOT/a["path"]; self.assertTrue(p.is_file(),str(p))
   html=p.read_text(); self.assertIn(f'<meta name="miniapp:id" content="{a["id"]}">',html)
   self.assertIn(f'<meta name="miniapp:source" content="{a["source"]}">',html)
   self.assertIn(f'<meta name="miniapp:source-id" content="{a["source_id"]}">',html)
   self.assertIn(a["text"],html)
 def test_independent_namespace_not_sesame_versions(self):
  d=json.loads((ROOT/"zapia-apps.json").read_text()); base=json.loads((ROOT/"apps.json").read_text())
  self.assertEqual(base["ais"],["sesame"]); self.assertEqual(base["memory_count"],211)
  self.assertTrue(all(a["id"].startswith("ZM") for a in d["apps"]))
  self.assertTrue(all(a["id"].startswith("M") and a["ai"]=="sesame" for a in base["apps"]))
  ui=(ROOT/"index.html").read_text(); self.assertIn("sourceOf(a)+'::'+a.id",ui)
  self.assertIn("fetch('zapia-apps.json'",ui)
if __name__=="__main__": unittest.main()
