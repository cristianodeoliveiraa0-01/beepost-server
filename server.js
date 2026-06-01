const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const BUNDLES_DIR = path.join(__dirname, "bundles");

const FILE_MAP = {
  "gameassetbundles": "gameassetbundles.Lg4D6GAFcuv6lge0VJz501aOfg8~3D",
  "wwise_audiores": "wwise_audiores.pJldzS~2FrnrHXK8v5qkgxPoY2f~2F0~3D",
  "avatar/assetindexer": "avatar/assetindexer.gXFNsJUZW0qJ1VgfsbG3mBfrzBs~3D",
  "codepatch/assembly-csharp-patch": "codepatch/assembly-csharp-patch.Ao0YEbSnq6p6~2Baw5LOLFoTjIpps~3D",
  "config/clothesrecipes": "config/clothesrecipes.AuA5w5Iecb9zVDAaGP7I9OCeLKk~3D",
  "config/clothesrecipesbytes": "config/clothesrecipesbytes.osMfUA2c~2F~2FlsoAQDvzAnXFi0m34~3D",
  "config/clothesslotoverlays": "config/clothesslotoverlays.k~2BCabgOiRSwwdc6QcQoDNn6aCR0~3D",
  "config/itemhotfix": "config/itemhotfix.s36H39WPlMjIuZFtBvb5t8Jkepg~3D",
  "config/resconf": "config/resconf.WdR1uNiiSh3pbdlxEFVYF~2Bv8~2B7g~3D",
  "hd/config/resconf": "hd/config/resconf.iPi9Vkq2CGjXPOyb8ljQK6b1Deg~3D",
  "hd/config/resconf_wwise": "hd/config/resconf_wwise.7lTGJZvSxQe3JOZrXLsuKU0MOsk~3D",
  "localization/locabconf": "localization/locabconf.MRAGcPmpX8Np2nObdUPaS0IOXDQ~3D",
  "localization/lochotfix": "localization/lochotfix.7CQaEM~2BEaMOf4SgylI~2BTRWX1PYE~3D",
  "main/gameentry": "main/gameentry.TTx7Rn6Qt5WpoxL~2FplfhbV75nhA~3D",
  "ui/atlas/hotfix/ui_hotfix_icon_42": "ui/atlas/hotfix/ui_hotfix_icon_42.H3que6fgVGxuBlaOH9~2BWGhLdCU8~3D"
};

const server = http.createServer((req, res) => {
  const requestedBundle = req.url.replace(/^\//, "").split("?")[0];
  console.log(`GET /${requestedBundle}`);
  const fileName = FILE_MAP[requestedBundle];
  if (!fileName) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Bundle not found: " + requestedBundle);
    return;
  }
  const filePath = path.join(BUNDLES_DIR, fileName);
  if (!fs.existsSync(filePath)) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("File not on disk: " + fileName);
    return;
  }
  const stat = fs.statSync(filePath);
  res.writeHead(200, {
    "Content-Type": "application/octet-stream",
    "Content-Length": stat.size,
    "Cache-Control": "public, max-age=86400"
  });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, () => {
  console.log("Beepost server rodando na porta " + PORT);
});
