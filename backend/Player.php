<?php

class Player {
    public $id = null;
    public $Name;
    public $NumberOfWins;
    public $NumberOfGames;
    public $ELOScore;

    public function insert() {
        $this->id = DAL::InsertPlayer($this->Name, $this->NumberOfWins, $this->NumberOfGames, $this->ELOScore);
        return $this;
    }

    public function save() {
        if ($this->id != null) {
            DAL::UpdatePlayer($this->id, $this->Name, $this->NumberOfWins, $this->NumberOfGames, $this->ELOScore);
        } else {
            //Player doesn't have an id, must not be inserted in DB yet.
        }
    }

    public function addWin() {
        $this->NumberOfWins++;
        $this->NumberOfGames++;

        $this->save();
    }

    public function addLoss() {
        $this->NumberOfGames++;

        $this->save();
    }

    public function updateELO($newScore) {
        $this->ELOScore = $newScore;

        $this->save();
    }

    public static function getPlayerById($id) {
        $data = DAL::GetPlayerById($id);

        $player = new Player();
        $player->id = $data[0]["id"];
        $player->Name = $data[0]["Name"];
        $player->NumberOfWins = $data[0]["NumberOfWins"];
        $player->NumberOfGames = $data[0]["NumberOfGames"];
        $player->ELOScore = $data[0]["ELOScore"];

        return $player;
    }
}
?>