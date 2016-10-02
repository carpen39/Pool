<?php

class RankedGame implements Game {
    public $gameId;
    public $players = array();

    public function __construct($playerIds) {
        foreach ($playerIds as $playerId) {
            $player = Player::getPlayerById($playerId);

            if ($player != null) {
                $this->players[] = $player;
            }
        }
    }

    public function declareWinners($playerIds) {
        $winner = null;
        $loser = null;

        foreach ($this->players as $player) {
            if (in_array($player->id, $playerIds)) {
                //win
                $winner = $player;
                $player->addWin(false);
            } else {
                //loss
                $loser = $player;
                $player->addLoss(false);
            }
        }

        //Calculate and update ELO for ranked
        $elo = new ELOCalculator($winner->eloScore, $loser->eloScore, ELOCalculator::WIN, ELOCalculator::LOSS);
        $ratings = $elo->getRatings();

        $winner->updateELO($ratings["a"]);
        $loser->updateELO($ratings["b"]);
    }
}
?>