// {
//     "gameName": "string",
//     "leagueName": "string",
//     "matchStatus": "string",
//     "startAt": "2019-01-01",
//     "homeName": "string",
//     "awayName": "string1",
//     "orgUrl": "string",
//     "matchBetList": [
//         {
//             "betName": "string",
//             "betItem": [
//                 {
//                     "itemName": "string",
//                     "odds": "1.7"
//                 },
//                 {
//                     "itemName": "string1",
//                     "odds": "2.0"
//                 }
//             ]
//         }
//     ]
// }





var reqJson = {
    "gameName": "string",
    "leagueName": "string",
    "matchStatus": "string",
    "startAt": "2019-01-01",
    "homeName": "string",
    "awayName": "string1",
    "orgUrl": "string",
    "matchBetList": [
        {
            "betName": "string",
            "betItem": [
                {
                    "itemName": "string",
                    "odds": "1.7"
                },
                {
                    "itemName": "string1",
                    "odds": "2.0"
                }
            ]
        }
    ]
}












// class category {
//     _getThis = [];
//     constructor(id, type, name, targetid, updateAt) {
//         this._getThis = () => this;
//         this.ID = id;
//         this.Type = type;
//         this.Name = name;
//         this.TargetID = targetid;
//         this.UpdateAt = updateAt;
//     }

// }


// class league {
//     constructor(ID, Type, CateID, Name, UpdateAt, TargetID) {
//         this.ID = ID;
//         this.Type = Type;
//         this.CateID = CateID;
//         this.Name = Name;
//         this.UpdateAt = UpdateAt;
//         this.TargetID = TargetID;
//     }
// }

// class match {
//     constructor(ID, Type, Status, LeagueID, CateID, Name, HomeID, HomeName, AwayID, AwayName, Score, StartTime, EndTime, Video, IsLive, MD5, TargetID, UpdateAt, IsVisible, Original, MatchBets) {

//         this.ID = ID;
//         this.Type = Type;
//         this.Status = Status;
//         this.LeagueID = LeagueID;
//         this.CateID = CateID;
//         this.Name = Name;
//         this.HomeID = HomeID;
//         this.HomeName = HomeName;
//         this.AwayID = AwayID;
//         this.AwayName = AwayName;
//         this.Score = Score;
//         this.StartTime = StartTime;
//         this.EndTime = EndTime;
//         this.Video = Video;
//         this.IsLive = IsLive;
//         this.MD5 = MD5;
//         this.TargetID = TargetID;
//         this.UpdateAt = UpdateAt;
//         this.IsVisible = IsVisible;
//         this.Original = Original;
//         this.MatchBets = MatchBets;

//     }

// }

// class matchBet {
//     constructor(ID, Type, MatchID, Name, IsBet, IsLive, Status, MD5, TargetID, UpdateAt, Original, IsVisible) {

//         this.ID = ID;
//         this.Type = Type;
//         this.MatchID = MatchID;
//         this.Name = Name;
//         this.IsBet = IsBet;
//         this.IsLive = IsLive;
//         this.Status = Status;
//         this.MD5 = MD5;
//         this.TargetID = TargetID;
//         this.UpdateAt = UpdateAt;
//         this.Original = Original;
//         this.IsVisible = IsVisible;
//     }
// }



// class matchBetItem {
//     constructor(ID, Type, BetID, Odds, Name, Handicap, IsBet, Status, TargetID, UpdateAt, Original, IsVisible) {
//         this.ID = ID;
//         this.Type = Type;
//         this.BetID = BetID;
//         this.Odds = Odds;
//         this.Name = Name;
//         this.Handicap = Handicap;
//         this.IsBet = IsBet;
//         this.Status = Status;
//         this.TargetID = TargetID;
//         this.UpdateAt = UpdateAt;
//         this.Original = Original;
//         this.IsVisible = IsVisible;
//     }

// }


// class entiry {
//     constructor() {
//         let arr = [category.prototype, league.prototype, match.prototype, matchBet.prototype, matchBetItem.prototype];
//         arr.forEach(element => {
//             Object.assign(element, {
//                 toJson() {
//                     return JSON.stringify(this);
//                 }
//             });
//         });
//     }

// }

// let entity = new entiry();