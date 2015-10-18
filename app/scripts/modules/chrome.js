import Defaults from '../constants/settings';


class Chrome {

    // Panel helpers
    // ============================================================================================

    static getTopSites (done, max = 10) {
        chrome.topSites.get(function (visitedURLs) {
            visitedURLs = visitedURLs.slice(0, max);

            var items = [];

            for (let site of visitedURLs) {
                items.push({
                    title : site.title,
                    url   : site.url,
                    img   : `chrome://favicon/${site.url}`
                });
            }

            done(items);
        });
    }

    static getRecentlyClosed (done, max = 10) {
        chrome.sessions.getRecentlyClosed({ maxResults: max }, function (sessions) {
            let items = [];

            for (let session of sessions) {
                if (session.window && session.window.tabs.length === 1) {
                    session.tab = session.window.tabs[0];
                }

                items.push({
                    title   : session.tab ? session.tab.title : `${session.window.tabs.length} Tabs`,
                    session : session.window ? session.window.sessionId : session.tab.sessionId,
                    img     : session.tab ? `chrome://favicon/${session.tab.url}` : null
                });

            }

            done(items);
        });
    }

    static getApps (done) {
        let find128Image = function (icons) {
            for (let icon of icons) {
                if (icon.size === 128) {
                    return icon.url;
                }
            }

            return '/noicon.png';
        };

        chrome.management.getAll(function (list) {
            // Only get active apps (no extensions)
            list = list.filter(function (a) {
                return a.enabled && a.type !== 'extension' && a.type !== 'theme' && a.isApp
            });

            // Sort them alphabetically
            list.sort(function (a, b) {
                if (a.name < b.name)      { return -1; }
                else if (a.name > b.name) { return 1; }
                else                      { return 0; }
            });

            let items = [];

            for (let extInf of list) {
                items.push({
                    title : extInf.name,
                    id    : extInf.id,
                    img   : find128Image(extInf.icons)
                });
            }

            done(items);
        });
    }

    static getShortcuts (done) {
        let shortcuts = [
            {
                title: 'Bookmarks',
                url: 'chrome://bookmarks/',
                img: 'chrome://favicon/chrome://bookmarks/'
            },
            {
                title: 'History',
                url: 'chrome://history/',
                img: 'chrome://favicon/chrome://history/'
            },
            {
                title: 'Downloads',
                url: 'chrome://downloads/',
                img: 'chrome://favicon/chrome://downloads/'
            },
            {
                title: 'Extensions',
                url: 'chrome://extensions/',
                img: 'chrome://favicon/chrome://extensions/'
            },
            {
                title: 'Settings',
                url: 'chrome://settings/',
                img: 'chrome://favicon/chrome://settings/'
            }
        ];

        done(shortcuts);
    }


    // Settings helpers (Chrome extension storage)
    // ============================================================================================

    static getSettings (done) {
        let defaults = Defaults;

        chrome.storage.sync.get(null, (results) => {
            Object.assign(defaults, results);

            done(defaults);
        });
    }

    static setSetting (key, value) {
        let settingObj = {};
        settingObj[key] = value;

        chrome.storage.sync.set(settingObj);
    }
}

export default Chrome;