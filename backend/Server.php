<?php
error_reporting(-1);
ini_set('display_errors', 'On');

require_once "Player.php";
require_once "Game.php";
//require_once "Matchmaking.php";
//require_once "RandomMatchmaking.php";
//require_once "ELOMatchmaking.php";
require_once "RankedGame.php";
require_once "NormalGame.php";
require_once "ELOCalculator.php";
require_once "DAL.php";

session_start();

try {
    $server = new Server();
    $server->processRequest();
} catch (Exception $e) {
    print $e->getMessage();
}

class Server
{
    public function processRequest()
    {
        if (isset($_GET["action"]) && isset($_GET["data"])) {
            $action = $_GET["action"];
            $data = json_decode($_GET["data"]);

            if (method_exists($this, $action)) {
                $this::$action($data);
            } else {
                print("Requested action not found.");
            }
        } else {
            print("Invalid request.");
        }
    }

    private function createPlayer($data) {
        $player = new Player();

        $player->Name = $data->name;
        $player->NumberOfWins = 0;
        $player->NumberOfGames = 0;
        $player->ELOScore = 1500;

        $player->insert();

        print json_encode($player);
    }

    private function createGame($data) {
        $type = $data->type;
        $playerIds = $data->playerIds;

        if ($type == "normal") {
            $game = new NormalGame($playerIds);
            $_SESSION["current_game"] = $game;
            print json_encode($_SESSION["current_game"]);
        } else if ($type == "ranked") {
            $game = new RankedGame($playerIds);
            $_SESSION["current_game"] = $game;
            print json_encode($_SESSION["current_game"]);
        } else {

        }
    }

    private function finishGame($data) {
        $winners = $data->winners;

        if (isset($_SESSION["current_game"]) && $_SESSION["current_game"] != null) {
            //there is a game currently in progress
            $game =  $_SESSION["current_game"];
            $game->declareWinners($winners);

            $_SESSION["current_game"] = null;

            print json_encode(array());
        }
    }

    private function getCurrentGame($data) {
        if (isset($_SESSION["current_game"])) {
            print json_encode($_SESSION["current_game"]);
        } else {
            print json_encode(null);
        }
    }


    private function getLeaderboardData($data) {
        $isRanked = $data->isRanked;
        $data = DAL::GetPlayerLeaderboard($isRanked);
        print json_encode($data);
    }

    private function getAllPlayers() {
        $data = DAL::GetAllPlayers();
        print json_encode($data);
    }
}

?>