<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
// header('Access-Control-Allow-Origin: *');

// Ne álljon le a script, amíg a kapcsolat él
set_time_limit(0);

$counter = 0;
while (true) {
	$counter++;
	$data = "Törökszegfű üzenet #{$counter}";

	// Az üzenet formázása az SSE szabvány szerint:
	// "data: [üzenet]\n\n"
	echo "data: {$data}\n\n";

	ob_flush();
	flush();

	sleep(2);

	if (connection_aborted()) break;
}
