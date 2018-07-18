import {doc} from '../config';

/**
 * @name matchMediaAddListenerPolyfill
 * @description 미디어쿼리 이벤트 폴리필 기능 지원
 * https://github.com/paulirish/matchMedia.js/
 */
export default () => {
    if (typeof window.matchMedia('') !== 'undefined') {
		var oldMM = window.matchMedia;

		window.matchMedia = function(q) {
			var ret = oldMM(q),
				listeners = [],
				last = false,
				timer,
				check = function() {
					var list = oldMM(q),
						unmatchToMatch = list.matches && !last,
						matchToUnmatch = !list.matches && last;

                    //fire callbacks only if transitioning to or from matched state
					if (unmatchToMatch || matchToUnmatch) {
						for (var i =0, il = listeners.length; i < il; i++) {
							listeners[i].call( ret, list );
						}
					}

					last = list.matches;
				};

			ret.addListener = function(cb) {
				listeners.push(cb);

				if (!timer) { timer = setInterval(check, 1000); }
			};

			ret.removeListener = function(cb) {
				for (var i =0, il = listeners.length; i< il; i++) {
					if (listeners[ i ] === cb) { listeners.splice(i, 1); }
				}

				if (!listeners.length && timer){ clearInterval(timer); }
			};

			return ret;
		};
	}
};
