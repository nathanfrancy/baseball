function BaseballViewModel() {
  this.awayRoster = ko.observableArray(roster_ny);
  this.homeRoster = ko.observableArray(roster_kc);
  this.awayTeam = ko.observable(ny);
  this.homeTeam = ko.observable(kc);

  this.currentInning = ko.observable(1);
  this.currentInningFrame = ko.observable("top");

  this.currentAwayBatter = ko.observable(1);
  this.currentHomeBatter = ko.observable(1);
  this.currentBattingTeam = ko.observable("away");

  this.currentOuts = ko.observable(0);
  this.currentStrikes = ko.observable(0);
  this.currentBalls = ko.observable(0);

  this.playerClicked = function(player) {
    console.log(player);
  };

  this.currentBatter = ko.computed(function() {
    var batter = null;
    if (this.currentBattingTeam() === "away") {
      for (var i = 0; i < this.awayRoster().length; i++) {
        if ( (i+1) === this.awayRoster()[i].batOrder) {
          return this.awayRoster()[i];
        }
      }
    } else {
      for (var i = 0; i < this.homeRoster().length; i++) {
        if ( (i+1) === this.homeRoster()[i].batOrder) {
          return this.homeRoster()[i];
        }
      }
    }
    return null;
  }, this);

  this.incrementOuts = function() {
    if (this.currentOuts() < 2) {
      this.currentOuts(this.currentOuts() + 1);
    } else {
      this.currentOuts(0);
    }
  };

  this.incrementStrikes = function() {
    if (this.currentStrikes() === 2) {
      this.incrementOuts();
      this.currentStrikes(0);
    } else if (this.currentStrikes() < 2) {
      this.currentStrikes(this.currentStrikes() + 1);
    }
  };

  this.incrementBalls = function() {
    if (this.currentBalls() === 3) {
      this.currentBalls(0);
    } else if (this.currentBalls() < 3) {
      this.currentBalls(this.currentBalls() + 1);
    }
  };
}

ko.applyBindings(new BaseballViewModel());
