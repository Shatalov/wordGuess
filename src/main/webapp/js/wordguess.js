// **** Model.js ****
var GuessAttempt = function (attemptString) {
    this.value = attemptString;
};

var GuessAttemptEvent = function (guessAttempt) {
    this.attempt = guessAttempt;
};

var Events = {
    GUESS_ATTEMPT: 'guess-attempt',
    GUESS_ANSWER: 'guess-answer'
};

//***** End of Model *******


// ********** View.js **************

var GuessView = function (inputFieldID, buttonID, resolutionID) {
    this.inputFieldID = inputFieldID;
    this.resolutionID = resolutionID;
    var instance = this;
    $("#" + buttonID).click(function () {
        instance.onUserSubmittedGuess();
    });

    $(document).bind(Events.GUESS_ANSWER,
        function onServerResponse (e, event) {
        var resolution = event.success ? "Your guess is CORRECT" : "Try again.";
        $("#" + this.resolutionID).html(resolution);
    });
};

GuessView.prototype.onUserSubmittedGuess = function () {
    console.log("User clicked the button!");

    var inputValue = $("#" + this.inputFieldID).val();
    var attempt = new GuessAttempt(inputValue);
    var event = new GuessAttemptEvent(attempt);
    $(document).trigger(Events.GUESS_ATTEMPT, [event]);
    console.log("Guess attempt event has been triggered by the view...");
};


// ********** End of View *************


//*********** Service.js *****************
var GuessService = function (serverURL) {
    this.serverURL = serverURL;
    var instance = this;
    $(document).bind(Events.GUESS_ATTEMPT, function (e, data) {
        console.log("Guess attempt detected by service!");
        instance.onGuessAttempt(data.attempt);
    });
    console.log("Binding has been successfully completed.");

};

GuessService.prototype.onGuessAttempt = function (attempt) {
    var queryURL = this.serverURL /*+ "?userAttempt=" + attempt.value*/;
    console.log("Problem is here " + attempt.value);
   $.get(queryURL,
        {userAttempt: attempt.value},
        function (data) {
            console.log("Response From Server: " + JSON.stringify(data));
            $(document).trigger(Events.GUESS_ANSWER, [data]);
        }, "json");

//    $.getJSON(
//        queryURL,
//        {userAttempt: attempt.value},
//        function(msg){
//            console.log("Data Saved: ");
//        }
//    );
};
//************ End of Service ***********

//************ Application (in this file) **************
$(document).ready(function () {
    console.log("Document ready!");
    var view = new GuessView("attempt", "guessBtn", "resolution");
    var service = new GuessService("http://localhost:8080/words/guess");
});

