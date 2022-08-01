import { BASE_URL } from '../constants/base-url.js';
class Fetcher {
    constructor(baseUrl, beforeRequestHandler, afterResponseHandler) {
        this.baseUrl = baseUrl;
        this.beforeRequestHandler = beforeRequestHandler;
        this.afterResponseHandler = afterResponseHandler;
        this.headers = {
            'content-type': 'application/json',
        };
    }
    buildRequestURL(path) {
        return `${this.baseUrl}${path}`;
    }
    async get(path, headers = {}) {
        try {
            this.beforeRequestHandler();
            const response = await fetch(this.buildRequestURL(path), {
                method: 'get',
                headers: { ...this.headers, ...headers },
            });
            if (!response.ok)
                throw new Error(await response.text());
            const json = await response.json();
            return json;
        }
        catch (e) {
            this.handleError(e);
            throw e;
        }
        finally {
            this.afterResponseHandler();
        }
    }
    async post(path, body, customHeaders = {}) {
        try {
            let data;
            let headers = {
                ...this.headers,
                ...customHeaders,
            };
            if (body instanceof FormData) {
                data = body;
                headers = undefined;
            }
            else if (body) {
                data = JSON.stringify(body);
            }
            this.beforeRequestHandler();
            const response = await fetch(this.buildRequestURL(path), {
                method: 'post',
                headers,
                body: data,
            });
            if (!response.ok)
                throw new Error(await response.text());
            const json = await response.json();
            return json;
        }
        catch (e) {
            this.handleError(e);
            throw e;
        }
        finally {
            this.afterResponseHandler();
        }
    }
    async put(path, body, customHeaders = {}) {
        try {
            let data;
            let headers = {
                ...this.headers,
                ...customHeaders,
            };
            if (body instanceof FormData) {
                data = body;
                headers = undefined;
            }
            else if (body) {
                data = JSON.stringify(body);
            }
            this.beforeRequestHandler();
            const response = await fetch(this.buildRequestURL(path), {
                method: 'put',
                headers,
                body: data,
            });
            if (!response.ok)
                throw new Error(await response.text());
            const json = await response.json();
            return json;
        }
        catch (e) {
            this.handleError(e);
            throw e;
        }
        finally {
            this.afterResponseHandler();
        }
    }
    async delete(path, customHeaders = {}) {
        try {
            this.beforeRequestHandler();
            const response = await fetch(this.buildRequestURL(path), {
                method: 'delete',
                headers: { ...this.headers, ...customHeaders },
            });
            if (!response.ok)
                throw new Error(await response.text());
            const json = await response.json();
            return json;
        }
        catch (e) {
            this.handleError(e);
            throw e;
        }
        finally {
            this.afterResponseHandler();
        }
    }
    handleError(e) {
        if (e instanceof Error) {
            alert(e.message);
        }
        else {
            alert('Unexpected error ocurred');
        }
    }
}
export default new Fetcher(`${BASE_URL}/apis`, () => {
    window.dispatchEvent(new CustomEvent('loadingStart'));
}, () => {
    window.dispatchEvent(new CustomEvent('loadingStop'));
});
//# sourceMappingURL=fetcher.js.map