var currentGameType = "normal";
var playerId1 = null;
var playerId2 = null;

$(document).ready(function () {
    //Poplate the table on the Game pane with the current players
    updatePlayerList();
    updateLeaderboard('normal');

    var hash = window.location.hash.substring(1);
    updateAppLocation('#' + hash);

    //Update current pane on nav click
    $('.navbar a').click(function () {
        var location = $(this).attr("href");

        if (location == "#game") {
            updatePlayerList();
        }

        updateAppLocation(location);
    });

    if (currentGame != '' && currentGame != 'null' && currentGame != null) {
        //game is in progress. Load it and display it.
        var game = JSON.parse(currentGame);

        for (var i = 0; i < game.players.length; i++) {
            var player = game.players[i];
            addPlayerToGameInProgress(player);
        }

        //switch to game in progress view
        $('#gamePreparing').removeClass('pane-active');
        $('#gamePreparing').addClass('pane-inactive');

        $('#gameInProgress').removeClass('pane-inactive');
        $('#gameInProgress').addClass('pane-active');
    }
});

function updateAppLocation(location) {
    //Check if the anchor is a valid pane
    if ($('.app-area ' + location).length > 0) {
        $(".pane").removeClass("pane-active");
        $(".pane").addClass("pane-inactive");

        $(location).removeClass("pane-inactive");
        $(location).addClass("pane-active");
    }
}

function changeGameType(type) {
    currentGameType = type;
    if (type == "ranked") {
        $('#normal-game').removeClass('active');
        $('#ranked-game').addClass('active');
    }

    if (type == "normal") {
        $('#ranked-game').removeClass('active');
        $('#normal-game').addClass('active');
    }
}

function removePlayer(player) {
    if (player == 1) {
        playerId1 = null;
        $('#player1').html("Add player 1 by selecting a player in the table above.");
    }

    if (player == 2) {
        playerId2 = null;
        $('#player2').html("Add player 2 by selecting a player in the table above.");
    }
}

function startGame() {
    if (playerId1 != null && playerId2 != null) {
        Backend.startGame(currentGameType, [playerId1, playerId2]).done(function( data ) {
            $('#gameTitle').html(currentGameType.charAt(0).toUpperCase() + currentGameType.slice(1) + " Game");

            $('#gamePreparing').removeClass('pane-active');
            $('#gamePreparing').addClass('pane-inactive');

            $('#gameInProgress').removeClass('pane-inactive');
            $('#gameInProgress').addClass('pane-active');
        });
    } else {
        //Need to select players still
    }
}

function updatePlayerList() {
    clearPlayerList();
    Backend.getAllPlayers().done(function( data ) {
        for (var i = 0; i < data.length; i++) {
            var player = data[i];
            addPlayerToList(player);
        }

        //Add player to game on click
        $('#playerList tbody tr').click(function () {
            var player = JSON.parse(decodeURI($(this).find('[scope="row"]').data("player")));
            addPlayerToGame(player);
        });
    });
}

function  declareGameWinner(playerPos) { {
    if (playerPos == 1) {
        var playerId = playerId1;
    } else if (playerPos == 2) {
        var playerId = playerId2;
    }

    Backend.finishGame([playerId]).done(function( data ) {
        updatePlayerList();
        removePlayer(1);
        removePlayer(2);

        $('#gameInProgress').removeClass('pane-active');
        $('#gameInProgress').addClass('pane-inactive');

        $('#gamePreparing').removeClass('pane-inactive');
        $('#gamePreparing').addClass('pane-active');
    });
}

}

function clearPlayerList() {
    $('#playerList tbody tr').remove();
}

function clearLeaderboardList() {
    $('#leaderboardList tbody tr').remove();
}

function addPlayerToList(player) {
    var html = '<tr>' +
                    '<th scope="row" data-player="'+encodeURI(JSON.stringify(player))+'">'+ player.id + '</th>' +
                    '<td>'+ player.Name + '</td>' +
                    '<td>'+ player.NumberOfWins + '</td>' +
                    '<td>'+ player.NumberOfGames + '</td>' +
                    '<td>'+ player.ELOScore + '</td>' +
                '</tr>';
    $('#playerList tbody').append(html);
}

function addPlayerToLeaderboard(player) {
    var html = '<tr>' +
        '<th scope="row" data-player="'+encodeURI(JSON.stringify(player))+'">'+ player.id + '</th>' +
        '<td>'+ player.Name + '</td>' +
        '<td>'+ player.NumberOfWins + '</td>' +
        '<td>'+ player.NumberOfGames + '</td>' +
        '<td>'+ player.ELOScore + '</td>' +
        '</tr>';
    $('#leaderboardList tbody').append(html);
}

function addPlayerToGame(player) {
    var html = '<div class="row">' +
                    '<div class="col-lg-12 col-md-12 col-sm-12 text-center">' +
                        '<h4>' + player.Name + '</h4>' +
                    '</div>' +
                    '<div class="col-lg-4 col-md-4 col-sm-4 text-center">' +
                        '<h6>Number of Wins <span class="badge">' + player.NumberOfWins + '</span></h6>' +
                    '</div>' +
                    '<div class="col-lg-4 col-md-4 col-sm-4 text-center">' +
                        '<h6>Number of Games <span class="badge">' + player.NumberOfGames + '</span></h6>' +
                    '</div>' +
                    '<div class="col-lg-4 col-md-4 col-sm-4 text-center">' +
                        '<h6>ELO Score <span class="badge">' + player.ELOScore + '</span></h6>' +
                    '</div>' +
                '</div>';

    if (playerId1 == null) {
        playerId1 = player.id;
        $('#player1').html(html);
        $('#player1Game').html(html);
    } else if (playerId2 == null) {
        playerId2 = player.id;
        $('#player2').html(html);
        $('#player2Game').html(html);
    } else {
        //player slots are full
    }
}

function addPlayerToGameInProgress(player) {
    var html = '<div class="row">' +
        '<div class="col-lg-12 col-md-12 col-sm-12 text-center">' +
        '<h4>' + player.name + '</h4>' +
        '</div>' +
        '<div class="col-lg-4 col-md-4 col-sm-4 text-center">' +
        '<h6>Number of Wins <span class="badge">' + player.numberOfWins + '</span></h6>' +
        '</div>' +
        '<div class="col-lg-4 col-md-4 col-sm-4 text-center">' +
        '<h6>Number of Games <span class="badge">' + player.numberOfGames + '</span></h6>' +
        '</div>' +
        '<div class="col-lg-4 col-md-4 col-sm-4 text-center">' +
        '<h6>ELO Score <span class="badge">' + player.eloScore + '</span></h6>' +
        '</div>' +
        '</div>';

    if (playerId1 == null) {
        playerId1 = player.id;
        $('#player1').html(html);
        $('#player1Game').html(html);
    } else if (playerId2 == null) {
        playerId2 = player.id;
        $('#player2').html(html);
        $('#player2Game').html(html);
    } else {
        //player slots are full
    }
}

function submitNewPlayer() {
    var name = $('#playerName').val();

    Backend.addNewPlayer(name).done(function( data ) {
        $('#playerName').val("");
    });
}

function updateLeaderboard(type) {
    clearLeaderboardList();

    if (type == 'normal') {
        $('#ranked-leaderboard').removeClass('active');
        $('#normal-leaderboard').addClass('active');

        Backend.getLeaderboardData(false).done(function( data ) {
            for (var i = 0; i < data.length; i++) {
                var player = data[i];
                addPlayerToLeaderboard(player);
            }
        });
    } else if (type == 'ranked') {
        $('#normal-leaderboard').removeClass('active');
        $('#ranked-leaderboard').addClass('active');
        Backend.getLeaderboardData(true).done(function( data ) {
            for (var i = 0; i < data.length; i++) {
                var player = data[i];
                addPlayerToLeaderboard(player);
            }
        });
    }
}

var Backend = {
    startGame : function (gametype, players) {
        return this.request("createGame", {
            "type": gametype,
            "playerIds": players
        });
    },

    finishGame : function (winners) {
        return this.request("finishGame", {
            "winners": winners
        });
    },

    getAllPlayers : function() {
        return this.request("getAllPlayers", {});
    },

    addNewPlayer : function (name) {
        return this.request("createPlayer", {
            "name": name
        });
    },

    getLeaderboardData : function (isRanked) {
        return this.request("getLeaderboardData", {
            "isRanked": isRanked
        });
    },

    request : function (action, data) {
        return $.ajax({
            url: "/Pool/Backend/Server.php",
            data: { action: action, data: JSON.stringify(data) },
            async: true,
            dataType: "json"
        });
    }
};