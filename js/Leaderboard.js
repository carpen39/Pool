/**
 * Created by rob on 10/13/2016.
 */
var Leaderboard = React.createClass({
    getInitialState: function() {
        return {
            players: [],
            type: 'normal'
        };
    },

    componentDidMount: function() {
        var that = this;
        this.serverRequest = Backend.getLeaderboardData(this.state.type == "ranked").done(function( data ) {
            that.setState({
                players: data
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
        this.serverRequest = Backend.getLeaderboardData(this.state.type == "ranked").done(function( data ) {
            that.setState({
                players: data
            });
        });
    },

    changeGameTypeToRanked: function() {
        var that = this;
        this.serverRequest = Backend.getLeaderboardData(true).done(function( data ) {
            that.setState({
                players: data,
                type: "ranked"
            });
        });
    },

    changeGameTypeToNormal: function() {
        var that = this;
        this.serverRequest = Backend.getLeaderboardData(false).done(function( data ) {
            that.setState({
                players: data,
                type: "normal"
            });
        });
    },

    render: function() {
        return (
            <div className="row">
                <div className ="row">
                    <h1>Leaderboards</h1>
                    <hr/>
                    <ul className ="nav nav-pills nav-justified">
                        <li id="normal-leaderboard" role="presentation" className={this.state.type == "normal" ? "active" : ""}><a onClick={this.changeGameTypeToNormal} href="javascript:void(0)">Normal</a></li>
                        <li id="ranked-leaderboard" role="presentation" className={this.state.type == "ranked" ? "active" : ""}><a onClick={this.changeGameTypeToRanked} href="javascript:void(0)">Ranked</a></li>
                    </ul>
                </div>
                <div className="row">
                    <div className="table-responsive">
                        <table id="leaderboardList" className="table table-hover">
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
                                {this.state.players.map(function(player, i) {
                                    return (
                                        <tr key={i}>
                                            <th scope="row" data-player={encodeURI(JSON.stringify(player))}>{player.id}</th>
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
            </div>
        );
    }
});

ReactDOM.render(
    <Leaderboard />,
    document.getElementById("leaderboards")
);