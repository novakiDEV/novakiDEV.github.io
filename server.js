/*
 * Zero-dependency static file server for the site.
 * Run with: npm start (or: node server.js)
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const port = process.env.PORT || 3000;

const mime = {
	'.html': 'text/html; charset=utf-8',
	'.js': 'text/javascript; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.json': 'application/json; charset=utf-8',
	'.png': 'image/png',
	'.ico': 'image/x-icon',
	'.bin': 'application/octet-stream',
	'.gba': 'application/octet-stream',
	'.wasm': 'application/wasm',
	'.zip': 'application/zip',
	'.md': 'text/plain; charset=utf-8',
};

http.createServer(function (req, res) {
	if (req.url.split('/').includes('..') || req.url.includes('\0')) {
		res.writeHead(403);
		return res.end('Forbidden');
	}
	let urlPath;
	try {
		urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
	} catch (e) {
		res.writeHead(400);
		return res.end('Bad request');
	}
	if (urlPath.endsWith('/')) urlPath += 'index.html';

	if (urlPath.includes('\0') || urlPath.split('/').includes('..')) {
		res.writeHead(403);
		return res.end('Forbidden');
	}

	const filePath = path.join(root, urlPath);

	fs.readFile(filePath, function (err, data) {
		if (err) {
			res.writeHead(404);
			return res.end('Not found');
		}
		res.writeHead(200, {
			'Content-Type': mime[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
		});
		res.end(data);
	});
}).listen(port, function () {
	console.log('Unblocked Games running at http://localhost:' + port);
});
