
console.log('hello world');

class SysStorage {
    saveArrayToString(ls) { // 存储所有比赛的URL，用户遍历获取比赛详细数据
        localStorage.setItem('matchIds', ls.join('@'));
    }
    getStringToArray() { // 获取比赛URL数组
        let d = localStorage.getItem('matchIds');
        console.log(d.length);
        if (d.length == 0) return null;
        return d.split('@');
    }
    setExecute(v) { // 设置程序在本地是第一次执行
        localStorage.setItem('first', v);
    }
    getExecute() {// 判断程序在本地是否第一次执行
        return localStorage.getItem('first');
    }
}

let dateUtils = {
    format_match_begintime: function (dt_u) {
        var d = new Date(dt_u);
        var dt_time = new Date().getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        return dt_time;
    }
};

let ggbetConfig = {
    pushUrl: "https://dc.com/api/Data/save", // 推送地址
    pushImgUrl: "https://dc.com/api/Data/saveImg",
    siteUrl: "https://gg.bet/en/betting", // 站点地址
    refreshToGGBet: function () { // 刷新页面
        window.location.href = ggbetConfig.siteUrl;
    },
    regLeagueUrl: function (str) {
        var reg = /(?<=")([^:]+)(?=")/g;
        if (reg.test(str))
            return /(?<=")([^:]+)(?=")/g.exec(str)[0];
        else return null;
    }
};


class Matches {
    getMatches(cnt, eleLeague) {
        let countInter = 0;
        let matchInter = setInterval(function () {
            countInter++;
            if ((countInter % 5) == 0)
                $(eleLeague).trigger("click");
            if ($('.matchRowContainer__container___1_tLJ').length == cnt) {
                clearInterval(matchInter);
                let mch = new Matches();
                mch.getSleepMatches();
            }
        }, 1000);
        return false;
    }

    // 修改获取比赛的策略  保存联赛与比赛列表的消息 同时存储比赛的URL
    getSleepMatches() {
        // 初始化列表显示形式. 不然数据抓取的很难
        $('.viewToggler__isActive___2iZ65 __app-Icon').trigger("click");

        if ($('.matchRowContainer__container___1_tLJ').length == 0) return;
        // 遍历比赛，从中抓取 投注项和竞猜项
        let listUrl = [];
        let leagueArrList = [];
        let leagueJson = {};
        $('.matchRowContainer__container___1_tLJ').toArray().forEach(element => {
            let href = $(element).find('.middlePartMatchRow__team___191jq .__app-LogoTitle-link').first().attr('href');
            listUrl.push(href);
            let leagueName = $(element).find('.matchRow__right-part___1rZFy .__app-TournamentLogo-tournament-logo').attr('title');
            let leagueUrl = $(element).find('.matchRow__right-part___1rZFy .__app-TournamentLogo-tournament-logo').attr('style');
            //console.log(leagueName);
            leagueJson = {};
            if (leagueUrl != 'undefined') {
                let url = ggbetConfig.regLeagueUrl("'" + leagueUrl + "'");
                if (url != null) {
                    leagueJson.name = leagueName;
                    leagueJson.url = url;
                    let inArr = leagueArrList.find((n) => n.name == leagueName);
                    console.log(inArr);
                    console.log(inArr == 'undefined');
                    console.log(typeof (inArr) == 'undefined');
                    console.log(leagueJson);
                    if (typeof (inArr) == 'undefined')
                        leagueArrList.push(leagueJson);
                }
            }
        });
        // 提交需要保存的 联赛图片
        console.log(leagueArrList);
        $.ajax({
            method: "POST",
            dataType: "json",
            async: false,
            contentType: 'application/json;charset=UTF-8',
            url: ggbetConfig.pushImgUrl,
            data: JSON.stringify(leagueArrList)
        });

        // 保存需要遍历的比赛列表
        let sysStorage = new SysStorage();
        sysStorage.saveArrayToString(listUrl);
        ggbetConfig.refreshToGGBet();
    }
}




class MatchDetails {

    match() {

        try {
            let t_html = $('.Match__container___fpI_d');
            // 1#比赛信息
            let obj = t_html.find('.MatchHeaderDesktop__header___2eMii');
            let league = $(obj).find('.LinesEllipsis').html(); // 联赛名称
            let gameAndStatus = $($(obj).find('.MatchHeaderInfobox__extra-info___2yjuT')[0]).html(); // 游戏状态
            let startAt = $($(obj).find('.MatchHeaderInfobox__extra-info___2yjuT')[1]).html(); // 开始时间

            let homeTeam = $(obj).find('.TeamHeader__logo___1MmhD').first().html(); // 主队
            let homeTeamImg_str = $(obj).find('.TeamHeader__name___3cKcj').first().attr('style');
            let homeTeamImg = ggbetConfig.regLeagueUrl("'" + homeTeamImg_str + "'");


            let awayTeam = $(obj).find('.TeamHeader__name___3cKcj').last().html(); // 客队
            let awayTeamImg_str = $(obj).find('.TeamHeader__name___3cKcj').last().attr('style');
            let awayTeamImg = ggbetConfig.regLeagueUrl("'" + awayTeamImg_str + "'");

            startAt = dateUtils.format_match_begintime(startAt);// 转换为日期格式

            let req = {};
            req.gameName = gameAndStatus.split(',')[0];
            req.leagueName = league;
            req.matchStatus = gameAndStatus.split(',')[1];
            req.startAt = startAt;
            req.homeName = homeTeam;
            req.homeImg = homeTeamImg;
            req.awayName = awayTeam;
            req.awayImg = awayTeamImg;
            req.orgUrl = window.location.href;

            console.log(req);
            let bets = [];
            // 2#投注信息
            t_html.find('.masonry .__app-TableGroupMarket-table').toArray().forEach(ele => {

                let bet = {};
                let betItems = [];
                var betName = $(ele).find('.marketTable__header___mSHxT span').html(); // 竞猜项名称
                bet.betName = betName;
                var arr = $(ele).find('.__app-Odd-button').toArray();
                for (var i in arr) {
                    let betItem = {};
                    let arr_title = $(arr[i]).attr('title').split(': ');
                    betItem.itemName = arr_title[0]; // 投注项名称
                    betItem.odds = arr_title[1];// 投注项赔率
                    betItems.push(betItem);
                }
                bet.betItem = betItems;
                bets.push(bet);
            });
            req.matchBetList = bets;
            console.log(ggbetConfig.pushUrl);
            console.log(JSON.stringify(req));
            //$.ajax({
            //    method: "POST",
            //    dataType: "json",
            //    async: false,
            //    contentType: 'application/json;charset=UTF-8',
            //    url: ggbetConfig.pushUrl,
            //    data: JSON.stringify(req)
            //});

            //ggbetConfig.refreshToGGBet();

        } catch (err) {
            ggbetConfig.refreshToGGBet();
        }
    }
}

window.onload = function () {
    //# 系统存储
    let sysStorage = new SysStorage();
    let isFirst = sysStorage.getExecute(); // 是否第一次执行这个程序
    let locationUrl = window.location.href; // 获取当前访问路径
    let detailsUrl = locationUrl.length > 25 ? locationUrl.substring(0, 31) : locationUrl; // 获取详细页 路径

    console.log('访问的URL是：' + locationUrl);
    if (ggbetConfig.siteUrl == locationUrl) { // 判断是详细页面还是列表页面。若是列表页面则判断是否有未抓取数据的比赛
        let urlsArrLength = 0;
        let urlsArr = sysStorage.getStringToArray();
        if (urlsArr != null && urlsArr.length != 0) urlsArrLength = urlsArr.length;
        console.log(urlsArr);
        console.log('本地缓存的数据长度为：' + urlsArrLength);
        if (urlsArrLength == 0) { //  判断本地是否有未抓取的数据
            let scrollTimer = 0;
            let matchInterval;
            try {
                let globalInterval = setInterval(() => { // 每30分钟循环一次
                    matchInterval = setInterval(() => {
                        console.log('在大循环里面->' + scrollTimer);
                        if (scrollTimer == 10) {
                            console.log('已经10次了');
                            clearInterval(matchInterval);
                            scrollTimer = 0;
                            let m = new Matches();
                            m.getSleepMatches();
                            urlsArr = sysStorage.getStringToArray();
                            if (urlsArr == null)
                                ggbetConfig.refreshToGGBet();
                        }

                        $('html, body').animate({ // 页面滚动事件
                            scrollTop: $(".footer").offset().top
                        }, 2500);

                        scrollTimer++;

                    }, 10000);
                }, 200000);
            }
            catch (err) {
                console.log(err);
                window.location.href = window.location.href;
            }
            console.log('是否第一次执行->' + isFirst);
            console.log('是否第一次执行->' + (isFirst != 'true'));
            if (isFirst != 'true') { // 判断是否是第一次执行插件
                sysStorage.setExecute('true');
                matchInterval = setInterval(() => {
                    console.log('在小循环里面');
                    if (scrollTimer == 10) {
                        clearInterval(matchInterval);
                        scrollTimer = 0;
                        let m = new Matches();
                        m.getSleepMatches();
                    }
                    $('html, body').animate({
                        scrollTop: $(".footer").offset().top
                    }, 2500);
                    scrollTimer++;
                }, 5000);
            }

        } else { // 处理未抓取的数据
            if (urlsArrLength > 0) {
                let url = urlsArr[0];
                arrUtil.removeEle(urlsArr, url);
                sysStorage.saveArrayToString(urlsArr);
                window.location.href = "https://gg.bet" + url;
            }
        }
    }
    else if ("https://gg.bet/en/betting/match" == detailsUrl) { // 抓取详细页面信息

        console.log('进入详细页面');
        let matchInter = setInterval(function () {
            if ($('.masonry').length != 0 || $('.Match__container___fpI_d').length != 0) {
                clearInterval(matchInter);
                let md = new MatchDetails();
                md.match();
            }
        }, 1000);
    }
    else {

    }
}



class arrayUtil {

    indexOf(arr, val) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == val) return i;
        }
        return -1;
    };

    removeEle(arr, val) {
        let utl = new arrayUtil();
        var index = utl.indexOf(arr, val);
        if (index > -1) {
            arr.splice(index, 1);
        }
    };
}



let arrUtil = new arrayUtil();


