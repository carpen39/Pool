<?php
// Start the session
session_start();

if (!isset($_SESSION["current_game"])) {
    $_SESSION["current_game"] = null;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Let's Play Pool</title>

    <!-- Bootstrap -->
    <!--<link href="css/bootstrap.min.css" rel="stylesheet">-->

    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- Loading Flat UI -->
    <link href="css/flat-ui.css" rel="stylesheet">

    <!-- My custom css -->
    <link href="css/custom.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <script>
        var currentGame = '<?php print json_encode($_SESSION["current_game"]) ?>';
    </script>

</head>
<body>
<nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Let's Play Pool</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav navbar-right">
                <li><a href="#game">Play</a></li>
                <li><a href="#leaderboards">Leaderboards</a></li>
                <li><a href="#add-player">Add Player</a></li>
            </ul>
        </div>
    </div>
</nav>

<div class="app-area">
    <div id="leaderboards" class="pane container pane-inactive">
        <div class="row">
            <div class="row">
                <h1>Leaderboards</h1>
                <hr/>
                <ul class="nav nav-pills nav-justified">
                    <li id="normal-leaderboard" role="presentation" class="active"><a href="javascript:updateLeaderboard('normal')">Normal</a></li>
                    <li id="ranked-leaderboard" role="presentation"><a href="javascript:updateLeaderboard('ranked')">Ranked</a></li>
                </ul>
            </div>
            <div class="row">
                <div class="table-responsive">
                    <table id="leaderboardList" class="table table-hover">
                        <thead>
                        <tr>
                            <th scope="row">#</th>
                            <th>Name</th>
                            <th>Number of Wins</th>
                            <th>Number of Games</th>
                            <th>Ranking</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td> </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <div id="add-player" class="pane container pane-inactive">
        <form>
            <h1>Add Player</h1>
            <hr/>
            <div class="row">
                <div class="form-group">
                    <label for="playerName">Name Of Player</label>
                    <input type="text" class="form-control" id="playerName" aria-describedby="playerName" placeholder="Enter the player's full name">
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12 text-center">
                    <button type="button" class="btn btn-primary btn-lg" onclick="submitNewPlayer()">Add</button>
                </div>
            </div>
        </form>
    </div>

    <div id="game" class="pane container pane-active">
        <div id="gamePreparing" class="pane-active">
            <div class="row">
                <h1>Start A Game</h1>
                <hr/>
                <ul class="nav nav-pills nav-justified">
                    <li id="normal-game" role="presentation" class="active"><a href="javascript:changeGameType('normal')">Normal</a></li>
                    <li id="ranked-game" role="presentation"><a href="javascript:changeGameType('ranked')">Ranked</a></li>
                </ul>
            </div>
            <div class="row">
                <div class="table-responsive">
                    <table id="playerList" class="table table-hover">
                        <thead>
                        <tr>
                            <th scope="row">#</th>
                            <th>Name</th>
                            <th>Number of Wins</th>
                            <th>Number of Games</th>
                            <th>Ranking</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td> </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6">
                    <div class='page-header'>
                        <div class='btn-toolbar pull-right'>
                            <div class='btn-group'>
                                <button type='button' class='btn btn-danger' onclick="removePlayer(1);">Remove</button>
                            </div>
                        </div>
                        <h2>Player 1</h2>
                        <div id="player1" class="well">
                            Add player 1 by selecting a player in the table above.
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class='page-header'>
                        <div class='btn-toolbar pull-right'>
                            <div class='btn-group'>
                                <button type='button' class='btn btn-danger' onclick="removePlayer(2);">Remove</button>
                            </div>
                        </div>
                        <h2>Player 2</h2>
                        <div id="player2" class="well">
                            Add player 2 by selecting a player in the table above.
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12 text-center">
                    <button type="button" class="btn btn-primary btn-lg" onclick="startGame();">Start Game</button>
                </div>
            </div>
        </div>
        <div id="gameInProgress" class="pane-inactive">
            <div class="row">
                <h1 id="gameTitle">Current Game</h1>
                <hr/>
            </div>
            <div class="col-lg-6">
                <div class='page-header'>
                    <div class='btn-toolbar pull-right'>
                        <div class='btn-group'>
                            <button type='button' class='btn btn-primary' onclick="declareGameWinner(1);">Winner</button>
                        </div>
                    </div>
                    <h2>Player 1</h2>
                    <div id="player1Game" class="well">
                        Add player 2 by selecting a player in the table above.
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class='page-header'>
                    <div class='btn-toolbar pull-right'>
                        <div class='btn-group'>
                            <button type='button' class='btn btn-primary' onclick="declareGameWinner(2);">Winner</button>
                        </div>
                    </div>
                    <h2>Player 2</h2>
                    <div id="player2Game" class="well">
                        Add player 2 by selecting a player in the table above.
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="errorModal" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Error</h4>
            </div>
            <div class="modal-body">
                <p id="errorMessage"></p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>
        </div>

    </div>
</div>

<div id="successModal" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Success</h4>
            </div>
            <div class="modal-body">
                <p id="successMessage"></p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
            </div>
        </div>

    </div>
</div>

<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="js/bootstrap.min.js"></script>
<script src="js/app.js"></script>
</body>
</html>