<?php
$goal = $_GET['goal'];
$pledge = $_GET['pledge'];
$progress = $_GET['progress'];
?>

<html>
<head>
    <meta charset="UTF-8">
	<script type="text/javascript" src="https://code.jquery.com/jquery-1.11.2.min.js"></script>
	<script type="text/javascript" src="thermometer.js"></script>
	<link rel="stylesheet" type="text/css" href="fundraisestat.css">
</head>

<body>
    <div id="content">

        <div id="thermometer">

            <div class="track">
                <div class="goal">
                    <div class="amount"><?php echo $goal ?></div>
                </div>
                <div class="pledge">
                    <div><div class="amount"><?php echo $pledge ?></div></div>
                </div>
                <div class="progress">
                    <div class="amount"><?php echo $progress ?></div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>