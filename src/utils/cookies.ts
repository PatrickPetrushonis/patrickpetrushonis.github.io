// src/utils/cookies.ts - Modern ES6 version of docCookies
export const cookies = {
  getItem: (key) => {
    if (!key || !cookies.hasItem(key)) return null;
    return decodeURIComponent(
      document.cookie.replace(
        new RegExp(`(?:^|.*;\\s*)${encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&")}\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*`),
        "$1"
      )
    );
  },

  setItem: (key, value, end, path, domain, secure) => {
    if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) return false;
    
    let expires = "";
    if (end) {
      switch (end.constructor) {
        case Number:
          expires = end === Infinity ? "; expires=Tue, 19 Jan 2038 03:14:07 GMT" : `; max-age=${end}`;
          break;
        case String:
          expires = `; expires=${end}`;
          break;
        case Date:
          expires = `; expires=${end.toUTCString()}`;
          break;
      }
    }
    
    document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}${expires}${domain ? `; domain=${domain}` : ""}${path ? `; path=${path}` : ""}${secure ? "; secure" : ""}`;
    return true;
  },

  removeItem: (key, path) => {
    if (!key || !cookies.hasItem(key)) return false;
    document.cookie = `${encodeURIComponent(key)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT${path ? `; path=${path}` : ""}`;
    return true;
  },

  hasItem: (key) => {
    return new RegExp(`(?:^|;\\s*)${encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&")}\\s*\\=`).test(document.cookie);
  },

  keys: () => {
    const keys = document.cookie
      .replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "")
      .split(/\s*(?:\=[^;]*)?;\s*/);
    return keys.map(key => decodeURIComponent(key));
  }
};