<?php
/**
 * Created by PhpStorm.
 * User: rob
 * Date: 9/29/2016
 * Time: 8:17 PM
 */

class DAL {
    private static function connect() {
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "pool";

        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);

        // Check connection
        if ($conn->connect_error) {
            return null;
        }

        return $conn;
    }


    public static function InsertPlayer($_name, $_numberOfWins, $_numberOfGames, $_eloScore) {
        $conn = DAL::connect();

        if ($conn != null) {
            // prepare and bind
            $stmt = $conn->prepare("INSERT INTO Players (Name, NumberOfWins, NumberOfGames, ELOScore) VALUES (?, ?, ?, ?)");
            $stmt->bind_param("siii", $name, $numberOfWins, $numberOfGames, $eloScore);

            $name = $_name;
            $numberOfWins = $_numberOfWins;
            $numberOfGames = $_numberOfGames;
            $eloScore = $_eloScore;
            $stmt->execute();

            $id = $stmt->insert_id;

            $stmt->close();
            $conn->close();

            return $id;
        }
    }

    public static function UpdatePlayer($_id, $_name, $_numberOfWins, $_numberOfGames, $_eloScore) {
        $conn = DAL::connect();

        if ($conn != null) {
            // prepare and bind
            $stmt = $conn->prepare("Update Players set Name = ?, NumberOfWins = ? , NumberOfGames = ? , ELOScore = ? Where Id = ?");
            $stmt->bind_param("siiii", $name, $numberOfWins, $numberOfGames, $eloScore, $id);

            $name = $_name;
            $numberOfWins = $_numberOfWins;
            $numberOfGames = $_numberOfGames;
            $eloScore = $_eloScore;
            $id = $_id;
            $stmt->execute();

            $stmt->close();
            $conn->close();
        }
    }

    public static function GetPlayerById($_id) {
        $conn = DAL::connect();

        if ($conn != null) {
            // prepare and bind
            $stmt = $conn->prepare("Select * From Players Where Id = ?");
            $stmt->bind_param("i", $id);

            $id = $_id;
            $stmt->execute();

            $result = $stmt->get_result();

            $rows = array();
            while($row = $result->fetch_assoc ())
            {
                $rows[] = $row;
            }

            $stmt->close();
            $conn->close();


            return $rows;
        }
    }

    public static function GetPlayerLeaderboard($isRanked) {
        $conn = DAL::connect();

        if ($conn != null) {
            // prepare and bind
            if ($isRanked) {
                $stmt = $conn->prepare("Select * From Players Order By ELOScore Desc");
            } else {
                $stmt = $conn->prepare("Select * From Players Order By NumberOfWins Desc");
            }

            $stmt->execute();

            $result = $stmt->get_result();

            $rows = array();
            while($row = $result->fetch_assoc ())
            {
                $rows[] = $row;
            }

            $stmt->close();
            $conn->close();


            return $rows;
        }
    }

    public static function GetAllPlayers() {
        $conn = DAL::connect();

        if ($conn != null) {
            // prepare and bind
            $stmt = $conn->prepare("Select * From Players");
            $stmt->execute();

            $result = $stmt->get_result();

            $rows = array();
            while($row = $result->fetch_assoc ())
            {
                $rows[] = $row;
            }

            $stmt->close();
            $conn->close();

            return $rows;
        }
    }
}