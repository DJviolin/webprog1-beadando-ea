<?php
header("Access-Control-Allow-Origin: *");
$items = scandir('.');
$items = array_filter($items, function($item) {
	return $item !== '.' && $item !== '..';
});
?>

<!DOCTYPE html>
<html lang="hu">
<head>
	<meta charset="utf-8">
	<title>Könyvtárak listázása</title>
	<style>
		body {
			font-family: sans-serif;
			padding: 2rem;
			background: #f9f9f9;
		}
		h1 { margin-bottom: 1rem; }
		ul {
			list-style: none;
			padding-left: 0;
		}
		li { margin: 0.25rem 0; }
		a {
			text-decoration: none;
			color: #06c;
		}
		a:hover { text-decoration: underline;}
	</style>
</head>
<body>
	<h1>Könyvtárfa</h1>
	<ul>
		<?php foreach ($items as $item): ?>
			<li>
				<?php if (is_dir($item)): ?>
					📁 <a href="<?= htmlspecialchars($item) ?>/"><?= htmlspecialchars($item) ?>/</a>
				<?php else: ?>
					📄 <a href="<?= htmlspecialchars($item) ?>"><?= htmlspecialchars($item) ?></a>
				<?php endif; ?>
			</li>
		<?php endforeach; ?>
	</ul>
</body>
</html>
