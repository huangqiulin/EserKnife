kopf.factory('ExternalSettingsService', ['DebugService',
    function (DebugService) {

        var KEY = 'kopfSettings';

        var ES_ROOT_PATH = 'elasticsearch_root_path';

        var WITH_CREDENTIALS = 'with_credentials';

        var REFRESH_RATE = 'refresh_rate';

        var THEME = 'theme';

        var UPDATABLE_SETTINGS = [REFRESH_RATE, THEME];

        this.settings = null;

        this.getSettings = function () {
            if (!isDefined(this.settings)) {
                this.settings = this.fetchSettings();
                var localSettings = this.loadLocalSettings();
                this.updateSettings(localSettings);
            }
            return this.settings;
        };

        this.fetchSettings = function () {
            return {
                "elasticsearch_root_path": "",
                "with_credentials": false,
                "theme": "dark",
                "refresh_rate": 5000
            }
        };

        this.getElasticsearchRootPath = function () {
            return this.getSettings()[ES_ROOT_PATH];
        };

        this.withCredentials = function () {
            return this.getSettings()[WITH_CREDENTIALS];
        };

        this.getRefreshRate = function () {
            return this.getSettings()[REFRESH_RATE];
        };

        this.setRefreshRate = function (rate) {
            this.getSettings()[REFRESH_RATE] = rate;
            this.saveSettings();
        };

        this.getTheme = function () {
            return this.getSettings()[THEME];
        };

        this.setTheme = function (theme) {
            this.getSettings()[THEME] = theme;
            this.saveSettings();
        };

        this.saveSettings = function () {
            var settings = {};
            for (var setting in this.settings) {
                if (UPDATABLE_SETTINGS.indexOf(setting) >= 0) {
                    settings[setting] = this.settings[setting];
                }
            }
            localStorage.setItem(KEY, JSON.stringify(settings));
        };

        this.loadLocalSettings = function () {
            var settings = {};
            try {
                var content = localStorage.getItem(KEY);
                if (content) {
                    settings = JSON.parse(content);
                }
            } catch (error) {
                DebugService.debug('Error while loading settings from local storage');
            }
            return settings;
        };

        this.updateSettings = function (settings) {
            if (settings) {
                for (var setting in settings) {
                    if (UPDATABLE_SETTINGS.indexOf(setting) >= 0) {
                        this.settings[setting] = settings[setting];
                    }
                }
            }
        };

        return this;

    }]);
