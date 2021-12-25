clockInit();
function clockInit() {
    setInterval(changeClockTime, 1000);
}

function changeClockTime() {
    let now = new Date();
    let gaoKaoTime = new Date('2022-06-07 09:00:00');
    // console.log(now);
    // console.log(gaoKaoTime);
    let clock = gaoKaoTime.getTime()-now.getTime();
    let clockDay = $(".clock-day span");
    let clockHour = $(".clock-hour span");
    let clockMinute = $(".clock-minute span");
    let clockSecond = $(".clock-second span");
    clockDay.html(Math.floor(clock / 86400000));
    clockHour.html(Math.floor((clock / 3600000) % 24));
    clockMinute.html(Math.floor((clock / 60000) % 60));
    clockSecond.html(Math.floor((clock / 1000) % 60));
}