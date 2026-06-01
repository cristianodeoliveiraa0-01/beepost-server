const http = require("http");
const https = require("https");

const PORT = process.env.PORT || 3000;
const OWNER = "cristianodeoliveiraa0-01";
const REPO = "beepost-server";
const TAG = "v1.0.0";

const FILE_MAP = {
  "gameassetbundles": "gameassetbundles.Lg4D6GAFcuv6lge0VJz501aOfg8.3D",
  "wwise_audiores": "wwise_audiores.pJldzS.2FrnrHXK8v5qkgxPoY2f.2F0.3D",
  "avatar/assetindexer": "assetindexer.gXFNsJUZW0qJ1VgfsbG3mBfrzBs.3D",
  "codepatch/assembly-csharp-patch": "assembly-csharp-patch.Ao0YEbSnq6p6.2Baw5LOLFoTjIpps.3D",
  "config/clothesrecipes": "clothesrecipes.AuA5w5Iecb9zVDAaGP7I9OCeLKk.3D",
  "config/clothesrecipesbytes": "clothesrecipesbytes.osMfUA2c.2F.2FlsoAQDvzAnXFi0m34.3D",
  "config/clothesslotoverlays": "clothesslotoverlays.k.2BCabgOiRSwwdc6QcQoDNn6aCR0.3D",
  "config/itemhotfix": "itemhotfix.s36H39WPlMjIuZFtBvb5t8Jkepg.3D",
  "config/resconf": "resconf.WdR1uNiiSh3pbdlxEFVYF.2Bv8.2B7g.3D",
  "hd/config/resconf": "resconf.iPi9Vkq2CGjXPOyb8ljQK6b1Deg.3D",
  "hd/config/resconf_wwise": "resconf_wwise.7lTGJZvSxQe3JOZrXLsuKU0MOsk.3D",
  "localization/locabconf": "locabconf.MRAGcPmpX8Np2nObdUPaS0IOXDQ.3D",
  "localization/lochotfix": "lochotfix.7CQaEM.2BEaMOf4SgylI.2BTRWX1PYE.3D",
  "main/gameentry": "gameentry.TTx7Rn6Qt5WpoxL.2FplfhbV75nhA.3D",
  "ui/atlas/hotfix/ui_hotfix_icon_42": "ui_hotfix_icon_42.H3que6fgVGxuBlaOH9.2BWGhLdCU8.3D"
};

const server = http.createServer((req, res) => {
  const bundle = req.url.replace(/^\//, "").split("?")[0];
  const fileName = FILE_MAP[bundle];
  if (!fileName) {
    res.writeHead(404); res.end("Not found: " + bundle); return;
  }
  const url = `https://github.com/${OWNER}/${REPO}/releases/download/${TAG}/${fileName}`;
  https.get(url, { headers: { "User-Agent": "beepost-server" } }, (r) => {
    if (r.statusCode === 302 || r.statusCode === 301) {
      https.get(r.headers.location, { headers: { "User-Agent": "beepost-server" } }, (r2) => {
        res.writeHead(200, { "Content-Type": "application/octet-stream" });
        r2.pipe(res);
      });
    } else {
      res.writeHead(200, { "Content-Type": "application/octet-stream" });
      r.pipe(res);
    }
  });
});

server.listen(PORT, () => {
  console.log("Beepost server rodando na porta " + PORT);
});
