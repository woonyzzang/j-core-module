import {Core} from '../Core/core';

/**
 * 날짜관련 유틸함수
 * @namespace
 * @name Core.date
 */
const addonDate = () => {
    Core.define('date', function() {
        const months = 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(','),
            fullMonths = 'January,Febrary,March,April,May,June,July,Augst,September,October,November,December'.split(',');

        function compare(d1, d2) {
            if (!(d1 instanceof Date)) { d1 = core.date.parse(d1); }
            if (!(d2 instanceof Date)) { d2 = core.date.parse(d2); }

            return (d1.getTime() > d2.getTime())? -1 : ((d1.getTime() === d2.getTime())? 0 : 1);
        }

        return {
            MONTHS_NAME: months,
            MONTHS_FULLNAME: fullMonths,
            FORMAT: 'yyyy.MM.dd',

            /**
             * 주어진 날짜 형식의 문자열을 Date객체로 변환
             * @function
             * @name {{LIB_NAME}}.date.parse
             * @param {String} dateStringInRange - 날짜 형식의 문자열
             * @return {Date} 주어진 날짜문자열을 파싱한 값을 Date형으로 반환
             * @example
             * {{LIB_NAME}}.date.parse('2014-11-12'); // Wed Nov 12 2014 00:00:00 GMT+0900 (대한민국 표준시)
             * {{LIB_NAME}}.date.parse('20141112'); // Wed Nov 12 2014 00:00:00 GMT+0900 (대한민국 표준시)
             */
            parse: (function() {
                const isoExp = /^\s*(\d{4})(\d{2})(\d{2})(\d{2})?(\d{2})?(\d{2})?\s*$/;

                return function(dateStringInRange) {
                    let date,
                        month,
                        parts;

                    if (dateStringInRange instanceof Date) { return Core.clone(dateStringInRange); }

                    dateStringInRange = (dateStringInRange + '').replace(/[^\d]+/g, '');

                    if (dateStringInRange.length !== 8 && dateStringInRange.length !== 14) { return new Date(NaN); }

                    if (dateStringInRange.length === 14) {
                        date = new Date(dateStringInRange.substr(0, 4) | 0,
                            (dateStringInRange.substr(4, 2) | 0) - 1,
                            dateStringInRange.substr(6, 2) | 0,
                            dateStringInRange.substr(8, 2) | 0,
                            dateStringInRange.substr(10, 2) | 0,
                            dateStringInRange.substr(12, 2) | 0
                        );

                        if (!isNaN(date)) { return date; }
                    }

                    date = new Date(dateStringInRange);

                    if (!isNaN(date)) { return date; }

                    date = new Date(NaN);
                    parts = isoExp.exec(dateStringInRange);

                    if (parts) {
                        month = +parts[2];
                        date.setFullYear(parts[1] | 0, month - 1, parts[3] | 0);
                        date.setHours(parts[4] | 0);
                        date.setMinutes(parts[5] | 0);
                        date.setSeconds(parts[6] | 0);

                        if (month != date.getMonth() + 1) { date.setTime(NaN); }

                        return date;
                    }

                    return date;
                };
            })(),

            /**
             * 날짜형식을 지정한 포맷의 문자열로 변환
             * @name {{LIB_NAME}}.date.format
             * @param {Date} formatDate
             * @param {String} formatString - 포맷 문자열
             * @return {String} 변환된 문자열
             * @example
             * // ex) 2015-04-07 15:03:45
             * // yyyy: 2015
             * // yy: 15
             * // M: 4
             * // MM: 04
             * // MMM: Apr
             * // MMMMM: April
             * // d: 7
             * // dd: 07
             * // h: 15
             * // hh: 15
             * // H: 3
             * // m: 3
             * // mm: 03
             * // s: 45
             * // ss: 45
             * // x: PM
             * {{LIB_NAME}}.date.format(new Date(), 'yy/MM/dd'); // '15/01/05'
             */
            format: function (formatDate, formatString) {
                if (formatDate === '' || typeof formatDate === null) { return '' };

                formatString || (formatString = this.FORMAT);

                if (Core.is(formatDate, 'number')) {
                    formatDate = new Date(formatDate);
                } else if (Core.is(formatDate, 'string')) {
                    formatDate = this.parse(formatDate);
                }

                if (formatDate instanceof Date) {
                    let yyyy = formatDate.getFullYear(),
                        yy = yyyy.toString().substring(2),
                        M = formatDate.getMonth() + 1,
                        MM = (M < 10)? '0' + M : M,
                        MMM = this.MONTHS_NAME[M - 1],
                        MMMM = this.MONTHS_FULLNAME[M - 1],
                        d = formatDate.getDate(),
                        dd = (d < 10)? '0' + d : d,
                        h = formatDate.getHours(),
                        hh = (h < 10)? '0' + h : h,
                        m = formatDate.getMinutes(),
                        mm = (m < 10)? '0' + m : m,
                        s = formatDate.getSeconds(),
                        ss = (s < 10)? '0' + s : s,
                        x = (h > 11)? 'PM' : 'AM',
                        H = h % 12;

                    if (H === 0) { H = 12; }

                    return formatString
                        .replace(/yyyy/g, yyyy)
                        .replace(/yy/g, yy)
                        .replace(/MMMM/g, MMMM)
                        .replace(/MMM/g, MMM)
                        .replace(/MM/g, MM)
                        .replace(/M/g, M)
                        .replace(/dd/g, dd)
                        .replace(/d/g, d)
                        .replace(/hh/g, hh)
                        .replace(/h/g, h)
                        .replace(/mm/g, mm)
                        .replace(/m/g, m)
                        .replace(/ss/g, ss)
                        .replace(/s/g, s)
                        .replace(/!!!!/g, MMMM)
                        .replace(/!!!/g, MMM)
                        .replace(/H/g, H)
                        .replace(/x/g, x);
                } else {
                    return '';
                }
            },

            /**
             * 주어진 날자가 유효한지 체크
             * @name {{LIB_NAME}}.date.isValid
             * @param {String} date 날짜 문자열
             * @returns {Boolean} 유효한 날자인지 여부
             * @example
             * {{LIB_NAME}}.date.isValid('2018-13-23'); // false
             * {{LIB_NAME}}.date.isValid('1984-06-28'); // true
             */
            isValid: function(date) {
                try {
                    return !isNaN(this.parse(date).getTime());
                } catch (e) {
                    return false;
                }
            },

            /**
             * date가 start와 end사이인지 여부
             * @name {{LIB_NAME}}.date.between
             * @param {Date} date - 날짜
             * @param {Date} start - 시작일시
             * @param {Date} end - 만료일시
             * @return {Boolean} 두날짜 사이에 있는지 여부
             * @example
             * {{LIB_NAME}}.date.between('2014-09-12', '2014-09-11', '2014=09-12'); // true
             * {{LIB_NAME}}.date.between('2014-09-12', '2014-09-11', '2014=09-11'); // false
             */
            between: function(date, start, end) {
                if (!date.getDate) { date = Core.date.parse(date); }
                if (!start.getDate) { start = Core.date.parse(start); }
                if (!end.getDate) { end = Core.date.parse(end); }

                return date.getTime() >= start.getTime() && date.getTime() <= end.getTime();
            },

            /**
             * 날짜 비교
             * @name {{LIB_NAME}}.date.compare
             * @param {Date} date1 - 날짜1
             * @param {Date} date2 - 날짜2
             * @return {Number} -1: date1가 이후, 0: 동일, 1:date2가 이후
             * @example
             * var d1 = new Date(2014, 11, 23);
             * var d2 = new Date(2014, 09, 23);
             * {{LIB_NAME}}.date.compare(d1, d2); // -1
             * {{LIB_NAME}}.date.compare(d1, d1); // 0
             * {{LIB_NAME}}.date.compare(d2, d1); // 1
             */
            compare: compare,

            /**
             * 년월일이 동일한가
             * @name {{LIB_NAME}}.date.equalsYMD
             * @param {Date|String} date1 - 날짜1
             * @param {Date|String} date2 - 날짜2
             * @return {Boolean} 두 날짜의 년월일이 동일한지 여부
             * @example
             * {{LIB_NAME}}.date.equalsYMD('2014-12-23 11:12:23', '2014-12-23 09:00:21'); // true
             */
            equalsYMD: function (a, b) {
                let ret = true;

                if (!a || !b) { return false; }
                if (!a.getDate) { a = this.parse(a); }
                if (!b.getDate) { b = this.parse(b); }

                Core.each(['getFullYear', 'getMonth', 'getDate'], function(fn) {
                    ret = ret && (a[fn]() === b[fn]());

                    if (!ret) { return false; }
                });

                return ret;
            },

            /**
             * 주어진 날짜를 기준으로 type만큼 가감된 날짜를 format형태로 반환
             * @name {{LIB_NAME}}.date.calcDate
             * @param {Date} date - 기준날짜
             * @param {String} type - -2d, -3d, 4M, 2y ..
             * @param {String} format - 포맷
             * @return {Date|String} format지정값에 따라 결과를 날짜형 또는 문자열로 변환해서 반환
             * @example
             * {{LIB_NAME}}.date.calcDate('2014-12-23', '-3m'); // 2014-09-23(Date)
             * {{LIB_NAME}}.date.calcDate('2014-12-23', '-3m', 'yyyy/MM/dd'); // '2014/09/23'(string)
             * {{LIB_NAME}}.date.calcDate('2014-12-23', '-10d'); // 2014-12-13(Date)
             */
            calcDate: function(date, type, format) {
                date = this.parse(date);

                if (!date) { return null; }

                const m = type.match(/([-+]*)([0-9]*)([a-z]+)/i),
                    g = (m[1] === '-')? -1 : 1,
                    d = (m[2] | 0) * g;

                switch (m[3]) {
                    case 'd':
                        date.setDate(date.getDate() + d);
                        break;
                    case 'w':
                        date.setDate(date.getDate() + (d * 7));
                        break;
                    case 'M':
                        const tDate = new Date(new Date(date.getFullYear(), (date.getMonth() + 1) + d, 1) - 86400000);
                        const tMaxDay = tDate.getDate(); //타겟 달의 마지막 날

                        //타겟 날짜보다 클 경우
                        (date.getDate() > tMaxDay)? date = tDate : date.setMonth(date.getMonth() + d);
                        break;
                    case 'y':
                        date.setFullYear(date.getFullYear() + d);
                        break;
                }

                if (format) { return this.format(date, (format === 'format')? this.FORMAT : format); }

                return date;
            },

            calc: function() {
                return this.calcDate.apply(this, Array.prototype.slice.call(arguments));
            },

            /**
             * 두 날짜의 월 간격
             * @name {{LIB_NAME}}.date.monthDiff
             * @param {Date} d1 - 날짜 1
             * @param {Date} d2 - 날짜 2
             * @return {Number} 두날짜의 월차
             * {{LIB_NAME}}.date.monthDiff('2011-02-12', '2014-11-23'); // 44
             */
            monthDiff: function(d1, d2) {
                d1 = this.parse(d1);
                d2 = this.parse(d2);

                let months;

                months = (d2.getFullYear() - d1.getFullYear()) * 12;
                months -= d1.getMonth() + 1;
                months += d2.getMonth();

                return months;
            },

            /**
             * 주어진 년월의 일수를 반환
             * @name {{LIB_NAME}}.date.daysInMonth
             * @param {Number} year - 년도
             * @param {Number} month - 월
             * @return {Date} 주어진 년월이 마지막 날짜
             * @example
             * {{LIB_NAME}}.date.daysInMonth(2014, 2); // 28
             */
            daysInMonth: function(year, month) {
                const dd = new Date(year | 0, month | 0, 0);

                return dd.getDate();
            },

            /**
             * 밀리초를 시,분,초로 변환
             * @name {{LIB_NAME}}.date.splits
             * @param {Number} amount - 밀리초값
             * @return {Object} dates 변환된 시간 값
             * @return {Number} dates.days 일 수
             * @return {Number} dates.hours 시간 수
             * @return {Number} dates.mins 분 수
             * @return {Number} dates.secs 초 수
             * @example
             * {{LIB_NAME}}.date.splits(2134000); // {days: 0, hours: 0, mins: 35, secs: 34}
             */
            splits: function(amount) {
                let days,
                    hours,
                    mins,
                    secs;

                amount = amount / 1000;
                days = Math.floor(amount / 86400),
                    amount = amount % 86400;
                hours = Math.floor(amount / 3600),
                    amount = amount % 3600;
                mins = Math.floor(amount / 60),
                    amount = amount % 60;
                secs = Math.floor(amount);

                return {
                    days: days,
                    hours: hours,
                    mins: mins,
                    secs: secs
                };
            },

            /**
             * 주어진 두 날짜의 간견을 시, 분, 초로 반환
             * @name {{LIB_NAME}}.date.diff
             * @param {Date} t1 - 기준 시간
             * @param {Date} t2 - 비교할 시간
             * @return {Object} dates 시간차 값들이 들어있는 객체
             * @return {Number} dates.ms 밀리초
             * @return {Number} dates.secs 초
             * @return {Number} dates.mins 분
             * @return {Number} dates.hours 시
             * @return {Number} dates.days 일
             * @return {Number} dates.weeks 주
             * @return {Number} dates.diff
             * @example
             * {{LIB_NAME}}.date.diff(new Date, new Date(new Date() - 51811)); // {ms: 811, secs: 51, mins: 0, hours: 0, days: 0, weeks: 0, diff: 51811}
             */
            diff: function(t1, t2) {
                if (!Core.is(t1, 'date')) { t1 = new Date(t1); }
                if (!Core.is(t2, 'date')) { t2 = new Date(t2); }

                let diff = t1.getTime() - t2.getTime(),
                    ddiff = diff;

                diff = Math.abs(diff);

                const ms = diff % 1000;
                diff /= 1000;

                const s = Math.floor(diff % 60);
                diff /= 60;

                const m = Math.floor(diff % 60);
                diff /= 60;

                const h = Math.floor(diff % 24);
                diff /= 24;

                const d = Math.floor(diff);
                const w = Math.floor(diff / 7);

                return {
                    ms: ms,
                    secs: s,
                    mins: m,
                    hours: h,
                    days: d,
                    weeks: w,
                    diff: ddiff
                };
            },

            /**
             * 주어진 날짜가 몇번째 주인가
             * @name {{LIB_NAME}}.date.weekOfYear
             * @param {Date} date - 날짜
             * @return {Number}
             * @example
             * {{LIB_NAME}}.date.weekOfYear(new Date); // 2 // 2015-01-05를 기준으로 했을 때
             */
            weekOfYear: (function() {
                const ms1d = 1000 * 60 * 60 * 24,
                    ms7d = 7 * ms1d;

                return function(date) {
                    const DC3 = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 3) / ms1d,
                        AWN = Math.floor(DC3 / 7),
                        Wyr = new Date(AWN * ms7d).getUTCFullYear();

                    return AWN - Math.floor(Date.UTC(Wyr, 0, 7) / ms7d) + 1;
                };
            }()),

            /**
             * 윤년인가
             * @name {{LIB_NAME}}.date.isLeapYear
             * @param {Number} y 년도
             * @return {Boolean}
             * @example
             * {{LIB_NAME}}.date.isLeapYear(2014); // false
             */
            isLeapYear: function(y) {
                if (Object.prototype.toString.call(y) === '[object Date]') { y = y.getUTCFullYear(); }

                return (( y % 4 === 0 ) && ( y % 100 !== 0 )) || ( y % 400 === 0 );
            },

            /**
             * 날짜 가감함수
             * @name {{LIB_NAME}}.date.add
             * @param {Date} date 날짜
             * @param {String} interval 가감타입(ms, s, m, h, d, M, y)
             * @param {Number} value 가감 크기
             * @return {Date} 가감된 날짜의 Date객체
             * @example
             * // 2014-06-10에서 y(년도)를 -4 한 값을 계산
             * var d = {{LIB_NAME}}.date.add(new Date(2014, 5, 10), 'y', -4); // 2010-06-10
             */
            add: function(date, interval, value) {
                const d = new Date(date.getTime());

                if (!interval || value === 0) { return d; }

                switch (interval) {
                    case 'ms':
                        d.setMilliseconds(d.getMilliseconds() + value);
                        break;
                    case 's':
                        d.setSeconds(d.getSeconds() + value);
                        break;
                    case 'm':
                        d.setMinutes(d.getMinutes() + value);
                        break;
                    case 'h':
                        d.setHours(d.getHours() + value);
                        break;
                    case 'd':
                        d.setDate(d.getDate() + value);
                        break;
                    case 'M':
                        d.setMonth(d.getMonth() + value);
                        break;
                    case 'y':
                        d.setFullYear(d.getFullYear() + value);
                        break;
                }

                return d;
            },

            /**
             * 주어진 두 날짜 중에서 작은값 반환
             * @name {{LIB_NAME}}.date.min
             * @param {Date} a
             * @param {Date} b
             * @return {Date}
             */
            min: function(a, b) {
                return new Date(Math.min(this.parse(a), this.parse(b)));
            },

            /**
             * 주어진 두 날짜 중에서 큰값 반환
             * @name {{LIB_NAME}}.date.max
             * @param {Date} a
             * @param {Date} b
             * @return {Date}
             */
            max: function(a, b) {
                return new Date(Math.max(this.parse(a), this.parse(b)));
            },

            /**
             * 시분초 normalize화 처리
             * @name {{LIB_NAME}}.date.normalize
             * @param {Number} h - 시
             * @param {Number} M - 분
             * @param {Number} s - 초
             * @param {Number} ms - 밀리초
             * @return {Object} dates 시간정보가 담긴 객체
             * @return {Number} dates.day 일
             * @return {Number} dates.hour 시
             * @return {Number} dates.min 분
             * @return {Number} dates.sec 초
             * @return {Number} dates.ms 밀리초
             * @example
             * {{LIB_NAME}}.date.normalize(0, 0, 120, 0) // {day:0, hour: 0, min: 2, sec: 0, ms: 0} // 즉, 120초가 2분으로 변환
             */
            normalize: function(h, M, s, ms) {
                h = h || 0;
                M = M || 0;
                s = s || 0;
                ms = ms || 0;

                let d = 0;

                if (ms > 1000) {
                    s += Math.floor(ms / 1000);
                    ms = ms % 1000;
                }

                if (s > 60) {
                    M += Math.floor(s / 60);
                    s = s % 60;
                }

                if (M > 60) {
                    h += Math.floor(M / 60);
                    M = M % 60;
                }

                if (h > 24) {
                    d += Math.floor(h / 24);
                    h = h % 24;
                }

                return {
                    day: d,
                    hour: h,
                    min: M,
                    sec: s,
                    ms: ms
                };
            }
        };
    });
};

export {addonDate};
