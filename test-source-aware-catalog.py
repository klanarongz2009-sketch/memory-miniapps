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
  zapia_ids={a["id"] for a in d["apps"]}; base_ids={a["id"] for a in base["apps"]}
  self.assertTrue(all(x.startswith("ZM") for x in zapia_ids))
  self.assertTrue(zapia_ids.isdisjoint(base_ids))
  self.assertFalse(any(a.get("source")==d["source_id_namespace"] for a in base["apps"]))
  ui=(ROOT/"index.html").read_text(); self.assertIn("sourceOf(a)+'::'+a.id",ui)
  self.assertIn("manifestFiles=['apps.json','zapia-apps.json']",ui)

 def test_app_storage_failure_is_visible_and_reset_clears_ui_first(self):
  for i in range(1,17):
   h=(ROOT/f"apps/zapia/ZM{i:03}.html").read_text()
   self.assertIn("Browser storage is unavailable. Changes will not be saved",h)
   self.assertIn("Not saved: browser storage is unavailable or full",h)
   self.assertIn("Reset on this page, but saved data could not be cleared",h)
   self.assertLess(h.index("boxes.forEach(b=>b.checked=false);note.value='';const progress=progressText()"),h.index("localStorage.removeItem(key)"))
 def test_memory_dom_ids_are_unique(self):
  for i in range(1,17):
   h=(ROOT/f"apps/zapia/ZM{i:03}.html").read_text()
   self.assertIn('<p id="memory-text">',h)
   self.assertIn('<script type="application/json" id="memory">',h)
   self.assertEqual(h.count('id="memory"'),1)
 def test_recent_sort_uses_numeric_id_tiebreaker(self):
  ui=(ROOT/"index.html").read_text()
  self.assertIn("||compareCatalogKeys(x,y)",ui)
  self.assertIn("ix.localeCompare(iy,undefined,{numeric:true})",ui)
  self.assertIn("else keys.sort(compareCatalogKeys)",ui)
  self.assertEqual(sorted(['M1','M10','M100','M2','M3'],key=lambda x:int(re.search(r"\d+$",x).group())),['M1','M2','M3','M10','M100'])
 def test_one_manifest_failure_does_not_hide_loaded_source(self):
  ui=(ROOT/"index.html").read_text()
  self.assertIn("Promise.all(manifestFiles.map(loadManifest))",ui)
  self.assertIn("Showing the sources that loaded successfully.",ui)
  self.assertIn("No source manifests could be loaded.",ui)

if __name__=="__main__": unittest.main()
