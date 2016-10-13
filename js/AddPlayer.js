/**
 * Created by rob on 10/13/2016.
 */
var AddPlayer = React.createClass({
    getInitialState: function() {
        return {};
    },

    submitNewPlayer: function() {
        var name = $('#playerName').val();

        if (name == null || name.trim() == "") {
            displayError("Please enter a name for the player to be created.");
        } else {
            var that = this;
            this.serverRequest = Backend.addNewPlayer(name).done(function (data) {
                displaySuccess("The player has been created successfully.");
                $('#playerName').val("");
                PubSub.publish('PlayerAdded', '')
            });
        }
    },

    render: function() {
        return (
            <form>
                <h1>Add Player</h1>
                <hr/>
                <div className="row">
                    <div className="form-group">
                        <label htmlFor="playerName">Name Of Player</label>
                        <input type="text" className="form-control" id="playerName" aria-describedby="playerName" placeholder="Enter the player's full name"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <button type="button" className="btn btn-primary btn-lg" onClick={this.submitNewPlayer}>Add</button>
                    </div>
                </div>
            </form>
        );
    }
});

ReactDOM.render(
    <AddPlayer />,
    document.getElementById("add-player")
);