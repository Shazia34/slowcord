const fetch = require("node-fetch");
const fs = require("fs/promises");
const path = require("path");

const CACHE_PATH = path.join(__dirname, "..", "assets", "cache");
const CHANGELOG_PATH = path.join(__dirname, "..", "assets", "changelog.txt");
const BASE_URL = "https://discord.com";

const CHANGELOG_SCRIPT = "9c4b2d313c6e1c864e89.js";

(async () => {
	const res = await fetch(`${BASE_URL}/assets/${CHANGELOG_SCRIPT}`);
	const text = await res.text();

	const newChangelogText = (await fs.readFile(CHANGELOG_PATH))
		.toString()
		.replaceAll("\r", "")
		.replaceAll("\n", "\\n")
		.replaceAll("\'", "\\'");

	const index = text.indexOf("e.exports='---changelog---") + 11;
	const endIndex = text.indexOf("'\n", index);	// hmm

	await fs.writeFile(
		path.join(CACHE_PATH, CHANGELOG_SCRIPT),
		text.substring(0, index) + newChangelogText + text.substring(endIndex)
	);
})();