/**
 * Method to toggle browser color scheme.
 * @param {String} VALUE - A color defined in window.BROWSER_COLOR_SCHEME_LIST
 */
function BROWSER_COLOR_SCHEME(VALUE) {
    try {
        if (window) {
            if (typeof VALUE != `string` || VALUE.length <= 0 || window.BROWSER_COLOR_SCHEME_LIST.some(function (color) {
                return VALUE == color;
            }) == false) VALUE = window.BROWSER_COLOR_SCHEME_VALUE;
            else window.BROWSER_COLOR_SCHEME_VALUE = VALUE;
            localStorage.setItem(`theme`, VALUE);
            if (typeof window.BROWSER_COLOR_SCHEME_VARIANT == `string` && window.BROWSER_COLOR_SCHEME_VARIANT.length > 0) {
                localStorage.setItem(`theme_variant`, window.BROWSER_COLOR_SCHEME_VARIANT);
                document.documentElement.setAttribute(`data-theme`, `${VALUE}_${window.BROWSER_COLOR_SCHEME_VARIANT}`);
            } else {
                localStorage.removeItem(`theme_variant`);
                document.documentElement.setAttribute(`data-theme`, VALUE);
            };
            return true;
        } else return false;
    } catch (error) {
        throw error;
    };
};
(function (root, factory) {
    if (typeof exports == `object` && typeof module == `object`) module.exports = factory();
    else if (typeof define == `function` && define.amd) define([], factory);
    else if (typeof exports == `object`) exports[`browser_color_scheme`] = factory();
    else root[`browser_color_scheme`] = factory();
}(this, function () {
    if (window) {
        const default_list_color_scheme = [`dark`, `light`];
        if (Array.isArray(window.BROWSER_COLOR_SCHEME_LIST) != true) window.BROWSER_COLOR_SCHEME_LIST = [];
        else window.BROWSER_COLOR_SCHEME_LIST = window.BROWSER_COLOR_SCHEME_LIST.filter(function (color) {
            return typeof color == `string` && color.length > 0;
        });
        if (window.BROWSER_COLOR_SCHEME_LIST.length <= 0 || default_list_color_scheme.every(function (default_color) {
            return window.BROWSER_COLOR_SCHEME_LIST.includes(default_color) == true;
        }) == false) default_list_color_scheme.filter(function (default_color) {
            return window.BROWSER_COLOR_SCHEME_LIST.includes(default_color) == false;
        }).map(function (default_color) {
            return window.BROWSER_COLOR_SCHEME_LIST.push(default_color);
        });
        BROWSER_COLOR_SCHEME(typeof window.BROWSER_COLOR_SCHEME_VALUE == `string` && window.BROWSER_COLOR_SCHEME_VALUE.length > 0 && window.BROWSER_COLOR_SCHEME_LIST.some(function (color) {
            return window.BROWSER_COLOR_SCHEME_VALUE == color;
        }) == true ? window.BROWSER_COLOR_SCHEME_VALUE : window.BROWSER_COLOR_SCHEME_LIST.find(function (color) {
            return localStorage.getItem(`theme`) == color || window.matchMedia(`(prefers-color-scheme: ${color})`).matches == true;
        }) || window.BROWSER_COLOR_SCHEME_LIST[0]);
        window.BROWSER_COLOR_SCHEME_LIST.forEach(function (color) {
            return window.matchMedia(`(prefers-color-scheme: ${color})`).addEventListener(`change`, function (event) {
                if (event.matches == true) return BROWSER_COLOR_SCHEME(color);
            });
        });
        return BROWSER_COLOR_SCHEME;
    };
}));