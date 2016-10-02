<?php

class Player {
    public $id = null;
    public $name;
    public $numberOfWins;
    public $numberOfGames;
    public $eloScore;

    public function insert() {
        $this->id = DAL::InsertPlayer($this->name, $this->numberOfWins, $this->numberOfGames, $this->eloScore);
        return $this;
    }

    public function save() {
        if ($this->id != null) {
            DAL::UpdatePlayer($this->id, $this->name, $this->numberOfWins, $this->numberOfGames, $this->eloScore);
        } else {
            //Player doesn't have an id, must not be inserted in DB yet.
        }
    }

    public function addWin() {
        $this->numberOfWins++;
        $this->numberOfGames++;

        $this->save();
    }

    public function addLoss() {
        $this->numberOfGames++;

        $this->save();
    }

    public function updateELO($newScore) {
        $this->eloScore = $newScore;

        $this->save();
    }

    public static function getPlayerById($id) {
        $data = DAL::GetPlayerById($id);

        $player = new Player();
        $player->id = $data[0]["id"];
        $player->name = $data[0]["Name"];
        $player->numberOfWins = $data[0]["NumberOfWins"];
        $player->numberOfGames = $data[0]["NumberOfGames"];
        $player->eloScore = $data[0]["ELOScore"];

        return $player;
    }
}
?>