/**
 * Created by rob on 10/13/2016.
 */
var Game = React.createClass({
    getInitialState: function() {
        return {
            playerList: [],
            type: 'normal',
            player1: null,
            player2: null,
            game: null
        };
    },

    componentDidMount: function() {
        var that = this;
        this.serverRequest = Backend.getAllPlayers().done(function( data1 ) {
            Backend.getCurrentGame().done(function( data2 ) {
                if (data2 != null) {
                    that.setState({
                        playerList: data1,
                        player1: data2.players[0],
                        player2: data2.players[1],
                        game: data2
                    });
                } else {
                    that.setState({
                        playerList: data1,
                    });
                }
            });
        });
    },

    componentWillMount: function() {
        // when React renders me, I subscribe to the topic 'products'
        // .subscribe returns a unique token necessary to unsubscribe
        this.token = PubSub.subscribe('PlayerAdded', this.subscriber)
    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
        PubSub.unsubscribe(this.token);
    },

    subscriber: function(msg, data) {
        var that = this;
        this.serverRequest = Backend.getAllPlayers().done(function( data ) {
            that.setState({
                playerList: data,
            });
        });
    },

    changeGameTypeToRanked: function() {
        this.setState({
            type: 'ranked'
        });
    },

    changeGameTypeToNormal: function() {
        this.setState({
            type: 'normal'
        });
    },

    removePlayer: function(slot) {
        if (slot == 1) {
            this.setState({
                player1: null
            });
        } else if (slot == 2) {
            this.setState({
                player2: null
            });
        }
    },

    addPlayer: function(player) {
        if (this.state.player1 == null) {
            this.setState({
                player1: player
            });
        } else if (this.state.player2 == null) {
            if (this.state.player1.id == player.id) {
                displayError("This player has already been added to the game.");
            } else {
                this.setState({
                    player2: player
                });
            }
        } else {
            //player slots are full
            displayError("Both player slots are full.");
        }
    },

    startGame: function() {
        if (this.state.player1 != null && this.state.player2 != null) {
            var that = this;
            Backend.startGame(this.state.type, [this.state.player1.id, this.state.player2.id]).done(function( data ) {
                that.setState({
                    game: data
                });
            });
        } else {
            //Need to select players still
            displayError("Please select both players before starting a game.");
        }
    },

    declareGameWinner: function(slot) {
        if (slot == 1) {
            var player = this.state.player1;
        } else if (slot == 2) {
            var player = this.state.player2;
        }

        var that = this;
        Backend.finishGame([player.id]).done(function( data ) {
            Backend.getAllPlayers().done(function( data ) {
                displaySuccess(player.Name + " won the game.");

                that.setState({
                    playerList: data,
                    game: null,
                    player1: null,
                    player2: null
                });
            });
        });
    },

    render: function() {
        var that = this;

        let player1Display;
        if (this.state.player1 != null) {
            player1Display = (
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 text-center">
                        <h4>{this.state.player1.Name}</h4>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 text-center">
                        <h6>Number of Wins <span className="badge">{this.state.player1.NumberOfWins}</span></h6>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 text-center">
                        <h6>Number of Games <span className="badge">{this.state.player1.NumberOfGames}</span></h6>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 text-center">
                        <h6>ELO Score <span className="badge">{this.state.player1.ELOScore}</span></h6>
                    </div>
                </div>
            )
        } else {
            player1Display = (
                <div>Add player 1 by selecting a player in the table above.</div>
            )
        }

        let player2Display;
        if (this.state.player2 != null) {
            player2Display = (
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 text-center">
                        <h4>{this.state.player2.Name}</h4>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 text-center">
                        <h6>Number of Wins <span className="badge">{this.state.player2.NumberOfWins}</span></h6>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 text-center">
                        <h6>Number of Games <span className="badge">{this.state.player2.NumberOfGames}</span></h6>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 text-center">
                        <h6>ELO Score <span className="badge">{this.state.player2.ELOScore}</span></h6>
                    </div>
                </div>
            )
        } else {
            player2Display = (
                <div>Add player 1 by selecting a player in the table above.</div>
            )
        }

        return (
            <div>
                <div id="gamePreparing" className={this.state.game == null ? "pane-active" : "pane-inactive"}>
                    <div className="row">
                        <h1>Start A Game</h1>
                        <hr/>
                        <ul className="nav nav-pills nav-justified">
                            <li id="normal-game" role="presentation" className={this.state.type == "normal" ? "active" : ""}><a onClick={this.changeGameTypeToNormal} href="javascript:void(0)">Normal</a></li>
                            <li id="ranked-game" role="presentation" className={this.state.type == "ranked" ? "active" : ""}><a onClick={this.changeGameTypeToRanked} href="javascript:void(0)">Ranked</a></li>
                        </ul>
                    </div>
                    <div className="row">
                        <div className="table-responsive">
                            <table id="playerList" className="table table-hover">
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
                                    {this.state.playerList.map(function(player, i) {
                                        return (
                                            <tr key={i} onClick={() => that.addPlayer(player)}>
                                                <th scope="row">{player.id}</th>
                                                <td>{player.Name}</td>
                                                <td>{player.NumberOfWins}</td>
                                                <td>{player.NumberOfGames}</td>
                                                <td>{player.ELOScore}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className='page-header'>
                                <div className='btn-toolbar pull-right'>
                                    <div className='btn-group'>
                                        <button type='button' className='btn btn-danger' onClick={()=>this.removePlayer(1)}>Remove</button>
                                    </div>
                                </div>
                                <h2>Player 1</h2>
                                <div id="player1" className="well">
                                    {player1Display}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className='page-header'>
                                <div className='btn-toolbar pull-right'>
                                    <div className='btn-group'>
                                        <button type='button' className='btn btn-danger' onClick={()=>this.removePlayer(2)}>Remove</button>
                                    </div>
                                </div>
                                <h2>Player 2</h2>
                                <div id="player2" className="well">
                                    {player2Display}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <button type="button" className="btn btn-primary btn-lg" onClick={this.startGame}>Start Game</button>
                        </div>
                    </div>
                </div>
                <div id="gameInProgress" className={this.state.game != null ? "pane-active" : "pane-inactive"}>
                    <div className="row">
                        <h1 id="gameTitle">{this.state.type.charAt(0).toUpperCase() + this.state.type.slice(1) + " Game"}</h1>
                        <hr/>
                    </div>
                    <div className="col-lg-6">
                    <div className='page-header'>
                        <div className='btn-toolbar pull-right'>
                            <div className='btn-group'>
                                <button type='button' className='btn btn-primary' onClick={()=>this.declareGameWinner(1)}>Winner</button>
                            </div>
                        </div>
                        <h2>Player 1</h2>
                        <div id="player1Game" className="well">
                            {player1Display}
                        </div>
                    </div>
                    </div>
                    <div className="col-lg-6">
                        <div className='page-header'>
                            <div className='btn-toolbar pull-right'>
                                <div className='btn-group'>
                                    <button type='button' className='btn btn-primary' onClick={()=>this.declareGameWinner(2)}>Winner</button>
                                </div>
                            </div>
                            <h2>Player 2</h2>
                            <div id="player2Game" className="well">
                                {player2Display}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

ReactDOM.render(
    <Game />,
    document.getElementById("game")
);