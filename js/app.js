var currentGameType = "normal";
var playerId1 = null;
var playerId2 = null;

$(document).ready(function () {
    //Poplate the table on the Game pane with the current players

    var hash = window.location.hash.substring(1);

    if (hash != null && hash != "") {
        updateAppLocation('#' + hash);
    }

    //Update current pane on nav click
    $('.navbar a').click(function () {
        var location = $(this).attr("href");

        updateAppLocation(location);
    });
});

function updateAppLocation(location) {
    //Check if the anchor is a valid pane that is not already active
    if ($('.app-area ' + location + " .pane-inactive").length > 0) {
        $(".pane").removeClass("pane-active");
        $(".pane").addClass("pane-inactive");

        $(location).removeClass("pane-inactive");
        $(location).addClass("pane-active");

        $('#navbar').removeClass("in");

        //scroll to top
        $("html, body").animate({ scrollTop: 0 }, "slow");
    }
}


function displayError(errorMessage) {
    $('#errorMessage').html(errorMessage);
    $('#errorModal').modal('show');
}

function displaySuccess(successMessage) {
    $('#successMessage').html(successMessage);
    $('#successModal').modal('show');
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

    getCurrentGame : function (isRanked) {
        return this.request("getCurrentGame", {
        });
    },

    request : function (action, data) {
        return $.ajax({
            url: "backend/Server.php",
            data: { action: action, data: JSON.stringify(data) },
            async: true,
            dataType: "json"
        });
    }
};