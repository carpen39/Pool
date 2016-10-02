<?php

interface Game {
    public function __construct($playerIds);
    public function declareWinners($players);
}
?>