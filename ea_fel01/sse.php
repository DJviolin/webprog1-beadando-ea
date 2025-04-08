<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
// header('Access-Control-Allow-Origin: *');

set_time_limit(0); // Ne álljon le a script, amíg a kapcsolat él

$counter = 0;
while ($counter < 10) {
	$counter++;
	$data = "Törökszegfű üzenet #{$counter}";
	echo "data: {$data}\n\n";

	ob_flush();
	flush();

	sleep(2);

	if (connection_aborted()) break;
}
