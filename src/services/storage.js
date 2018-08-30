const key = "MONZOID";

export function getSession() {
    if (window && window.sessionStorage) {
        try {
            return JSON.parse(window.sessionStorage.getItem(key));
        } catch (e) {
            console.warn("Failed to fetch session because", e);
            return null;
        }
    }
}

export function setSession(item) {
    if (window && window.sessionStorage && item) {
        const stringified = JSON.stringify(item);
        window.sessionStorage.setItem(key, stringified);
    }
}

export function clearSession() {
    if (window && window.sessionStorage) {
        window.sessionStorage.clear();
    }
}
