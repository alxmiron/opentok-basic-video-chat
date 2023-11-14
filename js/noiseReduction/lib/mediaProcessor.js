function isSupported() {
    return new Promise((resolve, reject) => {
      if (typeof MediaStreamTrackProcessor === 'undefined' || typeof MediaStreamTrackGenerator === 'undefined') {
        reject('Your browser does not support the MediaStreamTrack API for Insertable Streams of Media.');
      } else {
        resolve();
      }
    });
  }
  class Key {}
  Key.updates = {
    transformer_new: 'New transformer',
    transformer_null: 'Null transformer',
  };
  Key.errors = {
    transformer_none: 'No transformers provided',
    transformer_start: 'Cannot start transformer',
    transformer_transform: 'Cannot transform frame',
    transformer_flush: 'Cannot flush transformer',
    readable_null: 'Readable is null',
    writable_null: 'Writable is null',
  };
  var axios$2 = { exports: {} };
  var bind$2 = function bind(fn, thisArg) {
    return function wrap() {
      var args = new Array(arguments.length);
      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }
      return fn.apply(thisArg, args);
    };
  };
  var bind$1 = bind$2;
  var toString = Object.prototype.toString;
  function isArray(val) {
    return Array.isArray(val);
  }
  function isUndefined(val) {
    return typeof val === 'undefined';
  }
  function isBuffer(val) {
    return (
      val !== null &&
      !isUndefined(val) &&
      val.constructor !== null &&
      !isUndefined(val.constructor) &&
      typeof val.constructor.isBuffer === 'function' &&
      val.constructor.isBuffer(val)
    );
  }
  function isArrayBuffer(val) {
    return toString.call(val) === '[object ArrayBuffer]';
  }
  function isFormData(val) {
    return toString.call(val) === '[object FormData]';
  }
  function isArrayBufferView(val) {
    var result;
    if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
      result = ArrayBuffer.isView(val);
    } else {
      result = val && val.buffer && isArrayBuffer(val.buffer);
    }
    return result;
  }
  function isString(val) {
    return typeof val === 'string';
  }
  function isNumber(val) {
    return typeof val === 'number';
  }
  function isObject(val) {
    return val !== null && typeof val === 'object';
  }
  function isPlainObject(val) {
    if (toString.call(val) !== '[object Object]') {
      return false;
    }
    var prototype = Object.getPrototypeOf(val);
    return prototype === null || prototype === Object.prototype;
  }
  function isDate(val) {
    return toString.call(val) === '[object Date]';
  }
  function isFile(val) {
    return toString.call(val) === '[object File]';
  }
  function isBlob(val) {
    return toString.call(val) === '[object Blob]';
  }
  function isFunction(val) {
    return toString.call(val) === '[object Function]';
  }
  function isStream(val) {
    return isObject(val) && isFunction(val.pipe);
  }
  function isURLSearchParams(val) {
    return toString.call(val) === '[object URLSearchParams]';
  }
  function trim(str) {
    return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
  }
  function isStandardBrowserEnv() {
    if (
      typeof navigator !== 'undefined' &&
      (navigator.product === 'ReactNative' || navigator.product === 'NativeScript' || navigator.product === 'NS')
    ) {
      return false;
    }
    return typeof window !== 'undefined' && typeof document !== 'undefined';
  }
  function forEach(obj, fn) {
    if (obj === null || typeof obj === 'undefined') {
      return;
    }
    if (typeof obj !== 'object') {
      obj = [obj];
    }
    if (isArray(obj)) {
      for (var i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj);
      }
    } else {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          fn.call(null, obj[key], key, obj);
        }
      }
    }
  }
  function merge() {
    var result = {};
    function assignValue(val, key) {
      if (isPlainObject(result[key]) && isPlainObject(val)) {
        result[key] = merge(result[key], val);
      } else if (isPlainObject(val)) {
        result[key] = merge({}, val);
      } else if (isArray(val)) {
        result[key] = val.slice();
      } else {
        result[key] = val;
      }
    }
    for (var i = 0, l = arguments.length; i < l; i++) {
      forEach(arguments[i], assignValue);
    }
    return result;
  }
  function extend(a, b, thisArg) {
    forEach(b, function assignValue(val, key) {
      if (thisArg && typeof val === 'function') {
        a[key] = bind$1(val, thisArg);
      } else {
        a[key] = val;
      }
    });
    return a;
  }
  function stripBOM(content) {
    if (content.charCodeAt(0) === 65279) {
      content = content.slice(1);
    }
    return content;
  }
  var utils$e = {
    isArray,
    isArrayBuffer,
    isBuffer,
    isFormData,
    isArrayBufferView,
    isString,
    isNumber,
    isObject,
    isPlainObject,
    isUndefined,
    isDate,
    isFile,
    isBlob,
    isFunction,
    isStream,
    isURLSearchParams,
    isStandardBrowserEnv,
    forEach,
    merge,
    extend,
    trim,
    stripBOM,
  };
  var utils$d = utils$e;
  function encode(val) {
    return encodeURIComponent(val)
      .replace(/%3A/gi, ':')
      .replace(/%24/g, '$')
      .replace(/%2C/gi, ',')
      .replace(/%20/g, '+')
      .replace(/%5B/gi, '[')
      .replace(/%5D/gi, ']');
  }
  var buildURL$2 = function buildURL(url, params, paramsSerializer) {
    if (!params) {
      return url;
    }
    var serializedParams;
    if (paramsSerializer) {
      serializedParams = paramsSerializer(params);
    } else if (utils$d.isURLSearchParams(params)) {
      serializedParams = params.toString();
    } else {
      var parts = [];
      utils$d.forEach(params, function serialize(val, key) {
        if (val === null || typeof val === 'undefined') {
          return;
        }
        if (utils$d.isArray(val)) {
          key = key + '[]';
        } else {
          val = [val];
        }
        utils$d.forEach(val, function parseValue(v) {
          if (utils$d.isDate(v)) {
            v = v.toISOString();
          } else if (utils$d.isObject(v)) {
            v = JSON.stringify(v);
          }
          parts.push(encode(key) + '=' + encode(v));
        });
      });
      serializedParams = parts.join('&');
    }
    if (serializedParams) {
      var hashmarkIndex = url.indexOf('#');
      if (hashmarkIndex !== -1) {
        url = url.slice(0, hashmarkIndex);
      }
      url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
    }
    return url;
  };
  var utils$c = utils$e;
  function InterceptorManager$1() {
    this.handlers = [];
  }
  InterceptorManager$1.prototype.use = function use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null,
    });
    return this.handlers.length - 1;
  };
  InterceptorManager$1.prototype.eject = function eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  };
  InterceptorManager$1.prototype.forEach = function forEach2(fn) {
    utils$c.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  };
  var InterceptorManager_1 = InterceptorManager$1;
  var utils$b = utils$e;
  var normalizeHeaderName$1 = function normalizeHeaderName(headers, normalizedName) {
    utils$b.forEach(headers, function processHeader(value, name) {
      if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
        headers[normalizedName] = value;
        delete headers[name];
      }
    });
  };
  var enhanceError$2 = function enhanceError(error, config, code, request2, response) {
    error.config = config;
    if (code) {
      error.code = code;
    }
    error.request = request2;
    error.response = response;
    error.isAxiosError = true;
    error.toJSON = function toJSON() {
      return {
        message: this.message,
        name: this.name,
        description: this.description,
        number: this.number,
        fileName: this.fileName,
        lineNumber: this.lineNumber,
        columnNumber: this.columnNumber,
        stack: this.stack,
        config: this.config,
        code: this.code,
        status: this.response && this.response.status ? this.response.status : null,
      };
    };
    return error;
  };
  var enhanceError$1 = enhanceError$2;
  var createError$2 = function createError(message, config, code, request2, response) {
    var error = new Error(message);
    return enhanceError$1(error, config, code, request2, response);
  };
  var createError$1 = createError$2;
  var settle$1 = function settle(resolve, reject, response) {
    var validateStatus2 = response.config.validateStatus;
    if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
      resolve(response);
    } else {
      reject(createError$1('Request failed with status code ' + response.status, response.config, null, response.request, response));
    }
  };
  var utils$a = utils$e;
  var cookies$1 = utils$a.isStandardBrowserEnv()
    ? (function standardBrowserEnv() {
        return {
          write: function write(name, value, expires, path, domain, secure) {
            var cookie = [];
            cookie.push(name + '=' + encodeURIComponent(value));
            if (utils$a.isNumber(expires)) {
              cookie.push('expires=' + new Date(expires).toGMTString());
            }
            if (utils$a.isString(path)) {
              cookie.push('path=' + path);
            }
            if (utils$a.isString(domain)) {
              cookie.push('domain=' + domain);
            }
            if (secure === true) {
              cookie.push('secure');
            }
            document.cookie = cookie.join('; ');
          },
          read: function read(name) {
            var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
            return match ? decodeURIComponent(match[3]) : null;
          },
          remove: function remove(name) {
            this.write(name, '', Date.now() - 864e5);
          },
        };
      })()
    : (function nonStandardBrowserEnv() {
        return {
          write: function write() {},
          read: function read() {
            return null;
          },
          remove: function remove() {},
        };
      })();
  var isAbsoluteURL$1 = function isAbsoluteURL(url) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
  };
  var combineURLs$1 = function combineURLs(baseURL, relativeURL) {
    return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
  };
  var isAbsoluteURL2 = isAbsoluteURL$1;
  var combineURLs2 = combineURLs$1;
  var buildFullPath$1 = function buildFullPath(baseURL, requestedURL) {
    if (baseURL && !isAbsoluteURL2(requestedURL)) {
      return combineURLs2(baseURL, requestedURL);
    }
    return requestedURL;
  };
  var utils$9 = utils$e;
  var ignoreDuplicateOf = [
    'age',
    'authorization',
    'content-length',
    'content-type',
    'etag',
    'expires',
    'from',
    'host',
    'if-modified-since',
    'if-unmodified-since',
    'last-modified',
    'location',
    'max-forwards',
    'proxy-authorization',
    'referer',
    'retry-after',
    'user-agent',
  ];
  var parseHeaders$1 = function parseHeaders(headers) {
    var parsed = {};
    var key;
    var val;
    var i;
    if (!headers) {
      return parsed;
    }
    utils$9.forEach(headers.split('\n'), function parser(line) {
      i = line.indexOf(':');
      key = utils$9.trim(line.substr(0, i)).toLowerCase();
      val = utils$9.trim(line.substr(i + 1));
      if (key) {
        if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
          return;
        }
        if (key === 'set-cookie') {
          parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
        } else {
          parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
        }
      }
    });
    return parsed;
  };
  var utils$8 = utils$e;
  var isURLSameOrigin$1 = utils$8.isStandardBrowserEnv()
    ? (function standardBrowserEnv2() {
        var msie = /(msie|trident)/i.test(navigator.userAgent);
        var urlParsingNode = document.createElement('a');
        var originURL;
        function resolveURL(url) {
          var href = url;
          if (msie) {
            urlParsingNode.setAttribute('href', href);
            href = urlParsingNode.href;
          }
          urlParsingNode.setAttribute('href', href);
          return {
            href: urlParsingNode.href,
            protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
            host: urlParsingNode.host,
            search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
            hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
            hostname: urlParsingNode.hostname,
            port: urlParsingNode.port,
            pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname,
          };
        }
        originURL = resolveURL(window.location.href);
        return function isURLSameOrigin2(requestURL) {
          var parsed = utils$8.isString(requestURL) ? resolveURL(requestURL) : requestURL;
          return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
        };
      })()
    : (function nonStandardBrowserEnv2() {
        return function isURLSameOrigin2() {
          return true;
        };
      })();
  function Cancel$3(message) {
    this.message = message;
  }
  Cancel$3.prototype.toString = function toString2() {
    return 'Cancel' + (this.message ? ': ' + this.message : '');
  };
  Cancel$3.prototype.__CANCEL__ = true;
  var Cancel_1 = Cancel$3;
  var utils$7 = utils$e;
  var settle2 = settle$1;
  var cookies = cookies$1;
  var buildURL$1 = buildURL$2;
  var buildFullPath2 = buildFullPath$1;
  var parseHeaders2 = parseHeaders$1;
  var isURLSameOrigin = isURLSameOrigin$1;
  var createError2 = createError$2;
  var defaults$4 = defaults_1;
  var Cancel$2 = Cancel_1;
  var xhr = function xhrAdapter(config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
      var requestData = config.data;
      var requestHeaders = config.headers;
      var responseType = config.responseType;
      var onCanceled;
      function done() {
        if (config.cancelToken) {
          config.cancelToken.unsubscribe(onCanceled);
        }
        if (config.signal) {
          config.signal.removeEventListener('abort', onCanceled);
        }
      }
      if (utils$7.isFormData(requestData)) {
        delete requestHeaders['Content-Type'];
      }
      var request2 = new XMLHttpRequest();
      if (config.auth) {
        var username = config.auth.username || '';
        var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
        requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
      }
      var fullPath = buildFullPath2(config.baseURL, config.url);
      request2.open(config.method.toUpperCase(), buildURL$1(fullPath, config.params, config.paramsSerializer), true);
      request2.timeout = config.timeout;
      function onloadend() {
        if (!request2) {
          return;
        }
        var responseHeaders = 'getAllResponseHeaders' in request2 ? parseHeaders2(request2.getAllResponseHeaders()) : null;
        var responseData = !responseType || responseType === 'text' || responseType === 'json' ? request2.responseText : request2.response;
        var response = {
          data: responseData,
          status: request2.status,
          statusText: request2.statusText,
          headers: responseHeaders,
          config,
          request: request2,
        };
        settle2(
          function _resolve(value) {
            resolve(value);
            done();
          },
          function _reject(err) {
            reject(err);
            done();
          },
          response
        );
        request2 = null;
      }
      if ('onloadend' in request2) {
        request2.onloadend = onloadend;
      } else {
        request2.onreadystatechange = function handleLoad() {
          if (!request2 || request2.readyState !== 4) {
            return;
          }
          if (request2.status === 0 && !(request2.responseURL && request2.responseURL.indexOf('file:') === 0)) {
            return;
          }
          setTimeout(onloadend);
        };
      }
      request2.onabort = function handleAbort() {
        if (!request2) {
          return;
        }
        reject(createError2('Request aborted', config, 'ECONNABORTED', request2));
        request2 = null;
      };
      request2.onerror = function handleError() {
        reject(createError2('Network Error', config, null, request2));
        request2 = null;
      };
      request2.ontimeout = function handleTimeout() {
        var timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
        var transitional2 = config.transitional || defaults$4.transitional;
        if (config.timeoutErrorMessage) {
          timeoutErrorMessage = config.timeoutErrorMessage;
        }
        reject(createError2(timeoutErrorMessage, config, transitional2.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED', request2));
        request2 = null;
      };
      if (utils$7.isStandardBrowserEnv()) {
        var xsrfValue =
          (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : void 0;
        if (xsrfValue) {
          requestHeaders[config.xsrfHeaderName] = xsrfValue;
        }
      }
      if ('setRequestHeader' in request2) {
        utils$7.forEach(requestHeaders, function setRequestHeader(val, key) {
          if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
            delete requestHeaders[key];
          } else {
            request2.setRequestHeader(key, val);
          }
        });
      }
      if (!utils$7.isUndefined(config.withCredentials)) {
        request2.withCredentials = !!config.withCredentials;
      }
      if (responseType && responseType !== 'json') {
        request2.responseType = config.responseType;
      }
      if (typeof config.onDownloadProgress === 'function') {
        request2.addEventListener('progress', config.onDownloadProgress);
      }
      if (typeof config.onUploadProgress === 'function' && request2.upload) {
        request2.upload.addEventListener('progress', config.onUploadProgress);
      }
      if (config.cancelToken || config.signal) {
        onCanceled = function (cancel) {
          if (!request2) {
            return;
          }
          reject(!cancel || (cancel && cancel.type) ? new Cancel$2('canceled') : cancel);
          request2.abort();
          request2 = null;
        };
        config.cancelToken && config.cancelToken.subscribe(onCanceled);
        if (config.signal) {
          config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
        }
      }
      if (!requestData) {
        requestData = null;
      }
      request2.send(requestData);
    });
  };
  var utils$6 = utils$e;
  var normalizeHeaderName2 = normalizeHeaderName$1;
  var enhanceError2 = enhanceError$2;
  var DEFAULT_CONTENT_TYPE = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  function setContentTypeIfUnset(headers, value) {
    if (!utils$6.isUndefined(headers) && utils$6.isUndefined(headers['Content-Type'])) {
      headers['Content-Type'] = value;
    }
  }
  function getDefaultAdapter() {
    var adapter;
    if (typeof XMLHttpRequest !== 'undefined') {
      adapter = xhr;
    } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
      adapter = xhr;
    }
    return adapter;
  }
  function stringifySafely(rawValue, parser, encoder) {
    if (utils$6.isString(rawValue)) {
      try {
        (parser || JSON.parse)(rawValue);
        return utils$6.trim(rawValue);
      } catch (e) {
        if (e.name !== 'SyntaxError') {
          throw e;
        }
      }
    }
    return (encoder || JSON.stringify)(rawValue);
  }
  var defaults$3 = {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false,
    },
    adapter: getDefaultAdapter(),
    transformRequest: [
      function transformRequest(data2, headers) {
        normalizeHeaderName2(headers, 'Accept');
        normalizeHeaderName2(headers, 'Content-Type');
        if (
          utils$6.isFormData(data2) ||
          utils$6.isArrayBuffer(data2) ||
          utils$6.isBuffer(data2) ||
          utils$6.isStream(data2) ||
          utils$6.isFile(data2) ||
          utils$6.isBlob(data2)
        ) {
          return data2;
        }
        if (utils$6.isArrayBufferView(data2)) {
          return data2.buffer;
        }
        if (utils$6.isURLSearchParams(data2)) {
          setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
          return data2.toString();
        }
        if (utils$6.isObject(data2) || (headers && headers['Content-Type'] === 'application/json')) {
          setContentTypeIfUnset(headers, 'application/json');
          return stringifySafely(data2);
        }
        return data2;
      },
    ],
    transformResponse: [
      function transformResponse(data2) {
        var transitional2 = this.transitional || defaults$3.transitional;
        var silentJSONParsing = transitional2 && transitional2.silentJSONParsing;
        var forcedJSONParsing = transitional2 && transitional2.forcedJSONParsing;
        var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';
        if (strictJSONParsing || (forcedJSONParsing && utils$6.isString(data2) && data2.length)) {
          try {
            return JSON.parse(data2);
          } catch (e) {
            if (strictJSONParsing) {
              if (e.name === 'SyntaxError') {
                throw enhanceError2(e, this, 'E_JSON_PARSE');
              }
              throw e;
            }
          }
        }
        return data2;
      },
    ],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    validateStatus: function validateStatus(status) {
      return status >= 200 && status < 300;
    },
    headers: {
      common: {
        Accept: 'application/json, text/plain, */*',
      },
    },
  };
  utils$6.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
    defaults$3.headers[method] = {};
  });
  utils$6.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
    defaults$3.headers[method] = utils$6.merge(DEFAULT_CONTENT_TYPE);
  });
  var defaults_1 = defaults$3;
  var utils$5 = utils$e;
  var defaults$2 = defaults_1;
  var transformData$1 = function transformData(data2, headers, fns) {
    var context = this || defaults$2;
    utils$5.forEach(fns, function transform(fn) {
      data2 = fn.call(context, data2, headers);
    });
    return data2;
  };
  var isCancel$1 = function isCancel(value) {
    return !!(value && value.__CANCEL__);
  };
  var utils$4 = utils$e;
  var transformData2 = transformData$1;
  var isCancel2 = isCancel$1;
  var defaults$1 = defaults_1;
  var Cancel$1 = Cancel_1;
  function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
      config.cancelToken.throwIfRequested();
    }
    if (config.signal && config.signal.aborted) {
      throw new Cancel$1('canceled');
    }
  }
  var dispatchRequest$1 = function dispatchRequest(config) {
    throwIfCancellationRequested(config);
    config.headers = config.headers || {};
    config.data = transformData2.call(config, config.data, config.headers, config.transformRequest);
    config.headers = utils$4.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
    utils$4.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {
      delete config.headers[method];
    });
    var adapter = config.adapter || defaults$1.adapter;
    return adapter(config).then(
      function onAdapterResolution(response) {
        throwIfCancellationRequested(config);
        response.data = transformData2.call(config, response.data, response.headers, config.transformResponse);
        return response;
      },
      function onAdapterRejection(reason) {
        if (!isCancel2(reason)) {
          throwIfCancellationRequested(config);
          if (reason && reason.response) {
            reason.response.data = transformData2.call(config, reason.response.data, reason.response.headers, config.transformResponse);
          }
        }
        return Promise.reject(reason);
      }
    );
  };
  var utils$3 = utils$e;
  var mergeConfig$2 = function mergeConfig(config1, config2) {
    config2 = config2 || {};
    var config = {};
    function getMergedValue(target, source2) {
      if (utils$3.isPlainObject(target) && utils$3.isPlainObject(source2)) {
        return utils$3.merge(target, source2);
      } else if (utils$3.isPlainObject(source2)) {
        return utils$3.merge({}, source2);
      } else if (utils$3.isArray(source2)) {
        return source2.slice();
      }
      return source2;
    }
    function mergeDeepProperties(prop) {
      if (!utils$3.isUndefined(config2[prop])) {
        return getMergedValue(config1[prop], config2[prop]);
      } else if (!utils$3.isUndefined(config1[prop])) {
        return getMergedValue(void 0, config1[prop]);
      }
    }
    function valueFromConfig2(prop) {
      if (!utils$3.isUndefined(config2[prop])) {
        return getMergedValue(void 0, config2[prop]);
      }
    }
    function defaultToConfig2(prop) {
      if (!utils$3.isUndefined(config2[prop])) {
        return getMergedValue(void 0, config2[prop]);
      } else if (!utils$3.isUndefined(config1[prop])) {
        return getMergedValue(void 0, config1[prop]);
      }
    }
    function mergeDirectKeys(prop) {
      if (prop in config2) {
        return getMergedValue(config1[prop], config2[prop]);
      } else if (prop in config1) {
        return getMergedValue(void 0, config1[prop]);
      }
    }
    var mergeMap = {
      url: valueFromConfig2,
      method: valueFromConfig2,
      data: valueFromConfig2,
      baseURL: defaultToConfig2,
      transformRequest: defaultToConfig2,
      transformResponse: defaultToConfig2,
      paramsSerializer: defaultToConfig2,
      timeout: defaultToConfig2,
      timeoutMessage: defaultToConfig2,
      withCredentials: defaultToConfig2,
      adapter: defaultToConfig2,
      responseType: defaultToConfig2,
      xsrfCookieName: defaultToConfig2,
      xsrfHeaderName: defaultToConfig2,
      onUploadProgress: defaultToConfig2,
      onDownloadProgress: defaultToConfig2,
      decompress: defaultToConfig2,
      maxContentLength: defaultToConfig2,
      maxBodyLength: defaultToConfig2,
      transport: defaultToConfig2,
      httpAgent: defaultToConfig2,
      httpsAgent: defaultToConfig2,
      cancelToken: defaultToConfig2,
      socketPath: defaultToConfig2,
      responseEncoding: defaultToConfig2,
      validateStatus: mergeDirectKeys,
    };
    utils$3.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
      var merge2 = mergeMap[prop] || mergeDeepProperties;
      var configValue = merge2(prop);
      (utils$3.isUndefined(configValue) && merge2 !== mergeDirectKeys) || (config[prop] = configValue);
    });
    return config;
  };
  var data = {
    version: '0.25.0',
  };
  var VERSION = data.version;
  var validators$1 = {};
  ['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function (type, i) {
    validators$1[type] = function validator2(thing) {
      return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
    };
  });
  var deprecatedWarnings = {};
  validators$1.transitional = function transitional(validator2, version2, message) {
    function formatMessage(opt, desc) {
      return '[Axios v' + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? '. ' + message : '');
    }
    return function (value, opt, opts) {
      if (validator2 === false) {
        throw new Error(formatMessage(opt, ' has been removed' + (version2 ? ' in ' + version2 : '')));
      }
      if (version2 && !deprecatedWarnings[opt]) {
        deprecatedWarnings[opt] = true;
        console.warn(formatMessage(opt, ' has been deprecated since v' + version2 + ' and will be removed in the near future'));
      }
      return validator2 ? validator2(value, opt, opts) : true;
    };
  };
  function assertOptions(options, schema, allowUnknown) {
    if (typeof options !== 'object') {
      throw new TypeError('options must be an object');
    }
    var keys = Object.keys(options);
    var i = keys.length;
    while (i-- > 0) {
      var opt = keys[i];
      var validator2 = schema[opt];
      if (validator2) {
        var value = options[opt];
        var result = value === void 0 || validator2(value, opt, options);
        if (result !== true) {
          throw new TypeError('option ' + opt + ' must be ' + result);
        }
        continue;
      }
      if (allowUnknown !== true) {
        throw Error('Unknown option ' + opt);
      }
    }
  }
  var validator$1 = {
    assertOptions,
    validators: validators$1,
  };
  var utils$2 = utils$e;
  var buildURL2 = buildURL$2;
  var InterceptorManager = InterceptorManager_1;
  var dispatchRequest2 = dispatchRequest$1;
  var mergeConfig$1 = mergeConfig$2;
  var validator = validator$1;
  var validators = validator.validators;
  function Axios$1(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager(),
    };
  }
  Axios$1.prototype.request = function request(configOrUrl, config) {
    if (typeof configOrUrl === 'string') {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }
    if (!config.url) {
      throw new Error('Provided config url is not valid');
    }
    config = mergeConfig$1(this.defaults, config);
    if (config.method) {
      config.method = config.method.toLowerCase();
    } else if (this.defaults.method) {
      config.method = this.defaults.method.toLowerCase();
    } else {
      config.method = 'get';
    }
    var transitional2 = config.transitional;
    if (transitional2 !== void 0) {
      validator.assertOptions(
        transitional2,
        {
          silentJSONParsing: validators.transitional(validators.boolean),
          forcedJSONParsing: validators.transitional(validators.boolean),
          clarifyTimeoutError: validators.transitional(validators.boolean),
        },
        false
      );
    }
    var requestInterceptorChain = [];
    var synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
        return;
      }
      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    var responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });
    var promise;
    if (!synchronousRequestInterceptors) {
      var chain = [dispatchRequest2, void 0];
      Array.prototype.unshift.apply(chain, requestInterceptorChain);
      chain = chain.concat(responseInterceptorChain);
      promise = Promise.resolve(config);
      while (chain.length) {
        promise = promise.then(chain.shift(), chain.shift());
      }
      return promise;
    }
    var newConfig = config;
    while (requestInterceptorChain.length) {
      var onFulfilled = requestInterceptorChain.shift();
      var onRejected = requestInterceptorChain.shift();
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected(error);
        break;
      }
    }
    try {
      promise = dispatchRequest2(newConfig);
    } catch (error) {
      return Promise.reject(error);
    }
    while (responseInterceptorChain.length) {
      promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
    }
    return promise;
  };
  Axios$1.prototype.getUri = function getUri(config) {
    if (!config.url) {
      throw new Error('Provided config url is not valid');
    }
    config = mergeConfig$1(this.defaults, config);
    return buildURL2(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
  };
  utils$2.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData2(method) {
    Axios$1.prototype[method] = function (url, config) {
      return this.request(
        mergeConfig$1(config || {}, {
          method,
          url,
          data: (config || {}).data,
        })
      );
    };
  });
  utils$2.forEach(['post', 'put', 'patch'], function forEachMethodWithData2(method) {
    Axios$1.prototype[method] = function (url, data2, config) {
      return this.request(
        mergeConfig$1(config || {}, {
          method,
          url,
          data: data2,
        })
      );
    };
  });
  var Axios_1 = Axios$1;
  var Cancel = Cancel_1;
  function CancelToken(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('executor must be a function.');
    }
    var resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });
    var token = this;
    this.promise.then(function (cancel) {
      if (!token._listeners) return;
      var i;
      var l = token._listeners.length;
      for (i = 0; i < l; i++) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });
    this.promise.then = function (onfulfilled) {
      var _resolve;
      var promise = new Promise(function (resolve) {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);
      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };
      return promise;
    };
    executor(function cancel(message) {
      if (token.reason) {
        return;
      }
      token.reason = new Cancel(message);
      resolvePromise(token.reason);
    });
  }
  CancelToken.prototype.throwIfRequested = function throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  };
  CancelToken.prototype.subscribe = function subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }
    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  };
  CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    var index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  };
  CancelToken.source = function source() {
    var cancel;
    var token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel,
    };
  };
  var CancelToken_1 = CancelToken;
  var spread = function spread2(callback) {
    return function wrap(arr) {
      return callback.apply(null, arr);
    };
  };
  var utils$1 = utils$e;
  var isAxiosError = function isAxiosError2(payload) {
    return utils$1.isObject(payload) && payload.isAxiosError === true;
  };
  var utils = utils$e;
  var bind2 = bind$2;
  var Axios = Axios_1;
  var mergeConfig2 = mergeConfig$2;
  var defaults = defaults_1;
  function createInstance(defaultConfig) {
    var context = new Axios(defaultConfig);
    var instance = bind2(Axios.prototype.request, context);
    utils.extend(instance, Axios.prototype, context);
    utils.extend(instance, context);
    instance.create = function create(instanceConfig) {
      return createInstance(mergeConfig2(defaultConfig, instanceConfig));
    };
    return instance;
  }
  var axios$1 = createInstance(defaults);
  axios$1.Axios = Axios;
  axios$1.Cancel = Cancel_1;
  axios$1.CancelToken = CancelToken_1;
  axios$1.isCancel = isCancel$1;
  axios$1.VERSION = data.version;
  axios$1.all = function all(promises) {
    return Promise.all(promises);
  };
  axios$1.spread = spread;
  axios$1.isAxiosError = isAxiosError;
  axios$2.exports = axios$1;
  axios$2.exports.default = axios$1;
  var axios = axios$2.exports;
  class Optional {
    isEmpty() {
      return !this.isPresent();
    }
    static of(value) {
      if (value !== null && value !== void 0) return new PresentOptional(value);
      else throw new TypeError('The passed value was null or undefined.');
    }
    static ofNonNull(value) {
      return Optional.of(value);
    }
    static ofNullable(nullable) {
      if (nullable !== null && nullable !== void 0) return new PresentOptional(nullable);
      else return new EmptyOptional();
    }
    static empty() {
      return new EmptyOptional();
    }
    static from(option) {
      switch (option.kind) {
        case 'present':
          return Optional.of(option.value);
        case 'empty':
          return Optional.empty();
        default:
          throw new TypeError('The passed value was not an Option type.');
      }
    }
  }
  class PresentOptional extends Optional {
    constructor(value) {
      super();
      this.payload = value;
    }
    isPresent() {
      return true;
    }
    get() {
      return this.payload;
    }
    ifPresent(consumer) {
      consumer(this.payload);
    }
    ifPresentOrElse(consumer, emptyAction) {
      consumer(this.payload);
    }
    filter(predicate) {
      return predicate(this.payload) ? this : Optional.empty();
    }
    map(mapper) {
      const result = mapper(this.payload);
      return Optional.ofNullable(result);
    }
    flatMap(mapper) {
      return mapper(this.payload);
    }
    or(supplier) {
      return this;
    }
    orElse(another) {
      return this.payload;
    }
    orElseGet(another) {
      return this.payload;
    }
    orElseThrow(exception) {
      return this.payload;
    }
    orNull() {
      return this.payload;
    }
    orUndefined() {
      return this.payload;
    }
    toOption() {
      return { kind: 'present', value: this.payload };
    }
    matches(cases) {
      return cases.present(this.payload);
    }
    toJSON(key) {
      return this.payload;
    }
  }
  class EmptyOptional extends Optional {
    isPresent() {
      return false;
    }
    constructor() {
      super();
    }
    get() {
      throw new TypeError('The optional is not present.');
    }
    ifPresent(consumer) {}
    ifPresentOrElse(consumer, emptyAction) {
      emptyAction();
    }
    filter(predicate) {
      return this;
    }
    map(mapper) {
      return Optional.empty();
    }
    flatMap(mapper) {
      return Optional.empty();
    }
    or(supplier) {
      return supplier();
    }
    orElse(another) {
      return another;
    }
    orElseGet(another) {
      return this.orElse(another());
    }
    orElseThrow(exception) {
      throw exception();
    }
    orNull() {
      return null;
    }
    orUndefined() {
      return void 0;
    }
    toOption() {
      return { kind: 'empty' };
    }
    matches(cases) {
      return cases.empty();
    }
    toJSON(key) {
      return null;
    }
  }
  const version = '2.0.0';
  var VonageSourceType = /* @__PURE__ */ ((VonageSourceType2) => {
    VonageSourceType2['automation'] = 'automation';
    VonageSourceType2['test'] = 'test';
    VonageSourceType2['vbc'] = 'vbc';
    VonageSourceType2['video'] = 'video';
    VonageSourceType2['voice'] = 'voice';
    return VonageSourceType2;
  })(VonageSourceType || {});
  function setVonageMetadata(metadata) {
    globalThis._vonageMediaProcessorMetadata = metadata;
  }
  function getVonageMetadata() {
    return globalThis._vonageMediaProcessorMetadata;
  }
  class ReportBuilder {
    constructor() {
      const metadata = getVonageMetadata();
      this._report = {
        action: Optional.empty(),
        applicationId: Optional.ofNullable(metadata !== void 0 && metadata != null ? metadata.appId : null),
        timestamp: Date.now(),
        fps: Optional.empty(),
        framesTransformed: Optional.empty(),
        guid: Optional.empty(),
        highestFrameTransformCpu: Optional.empty(),
        message: Optional.empty(),
        source: Optional.ofNullable(metadata !== void 0 && metadata != null ? metadata.sourceType : null),
        transformedFps: Optional.empty(),
        transformerType: Optional.empty(),
        variation: Optional.empty(),
        videoHeight: Optional.empty(),
        videoWidth: Optional.empty(),
        version,
        error: Optional.empty(),
        proxyUrl: Optional.ofNullable(metadata !== void 0 && metadata != null ? metadata.proxyUrl : null),
      };
    }
    action(action) {
      this._report.action = Optional.ofNullable(action);
      return this;
    }
    framesTransformed(framesTransformed) {
      this._report.framesTransformed = Optional.ofNullable(framesTransformed);
      return this;
    }
    fps(fps) {
      this._report.fps = Optional.ofNullable(fps);
      return this;
    }
    guid(guid) {
      this._report.guid = Optional.ofNullable(guid);
      return this;
    }
    message(message) {
      this._report.message = Optional.ofNullable(message);
      return this;
    }
    transformedFps(transformedFps) {
      this._report.transformedFps = Optional.ofNullable(transformedFps);
      return this;
    }
    transformerType(transformerType) {
      this._report.transformerType = Optional.ofNullable(transformerType);
      return this;
    }
    variation(variation) {
      this._report.variation = Optional.ofNullable(variation);
      return this;
    }
    videoHeight(videoHeight) {
      this._report.videoHeight = Optional.ofNullable(videoHeight);
      return this;
    }
    videoWidth(videoWidth) {
      this._report.videoWidth = Optional.ofNullable(videoWidth);
      return this;
    }
    error(error) {
      this._report.error = Optional.ofNullable(error);
      return this;
    }
    build() {
      return this._report;
    }
  }
  const serializeReport = (report) => {
    return JSON.stringify(report, (key, value) => {
      if (value !== null) return value;
    });
  };
  class Reporter {
    static report(report) {
      return new Promise((resolve, reject) => {
        if (report.applicationId.isEmpty() || report.source.isEmpty()) {
          resolve('success');
          return;
        }
        let axiosInstance = axios.create();
        let config = {
          timeout: 1e4,
          timeoutErrorMessage: 'Request timeout',
          headers: {
            'Content-Type': 'application/json',
          },
        };
        let telemetryServerUrl = 'hlg.tokbox.com/prod/logging/vcp_webrtc';
        if (!report.proxyUrl.isEmpty()) {
          let proxy;
          if (report.proxyUrl.get().slice(report.proxyUrl.get().length - 1) !== '/') {
            proxy = report.proxyUrl.get() + '/';
          } else {
            proxy = report.proxyUrl.get();
          }
          telemetryServerUrl = proxy + telemetryServerUrl;
        } else {
          telemetryServerUrl = 'https://' + telemetryServerUrl;
        }
        axiosInstance
          .post(telemetryServerUrl, serializeReport(report), config)
          .then((res) => {
            console.log(res);
            resolve('success');
          })
          .catch((e) => {
            console.log(e);
            reject(e);
          });
      });
    }
  }
  var getRandomValues;
  var rnds8 = new Uint8Array(16);
  function rng() {
    if (!getRandomValues) {
      getRandomValues =
        (typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
        (typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto));
      if (!getRandomValues) {
        throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
      }
    }
    return getRandomValues(rnds8);
  }
  var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
  function validate(uuid) {
    return typeof uuid === 'string' && REGEX.test(uuid);
  }
  var byteToHex = [];
  for (var i = 0; i < 256; ++i) {
    byteToHex.push((i + 256).toString(16).substr(1));
  }
  function stringify(arr) {
    var offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    var uuid = (
      byteToHex[arr[offset + 0]] +
      byteToHex[arr[offset + 1]] +
      byteToHex[arr[offset + 2]] +
      byteToHex[arr[offset + 3]] +
      '-' +
      byteToHex[arr[offset + 4]] +
      byteToHex[arr[offset + 5]] +
      '-' +
      byteToHex[arr[offset + 6]] +
      byteToHex[arr[offset + 7]] +
      '-' +
      byteToHex[arr[offset + 8]] +
      byteToHex[arr[offset + 9]] +
      '-' +
      byteToHex[arr[offset + 10]] +
      byteToHex[arr[offset + 11]] +
      byteToHex[arr[offset + 12]] +
      byteToHex[arr[offset + 13]] +
      byteToHex[arr[offset + 14]] +
      byteToHex[arr[offset + 15]]
    ).toLowerCase();
    if (!validate(uuid)) {
      throw TypeError('Stringified UUID is invalid');
    }
    return uuid;
  }
  function v4(options, buf, offset) {
    options = options || {};
    var rnds = options.random || (options.rng || rng)();
    rnds[6] = (rnds[6] & 15) | 64;
    rnds[8] = (rnds[8] & 63) | 128;
    if (buf) {
      offset = offset || 0;
      for (var i = 0; i < 16; ++i) {
        buf[offset + i] = rnds[i];
      }
      return buf;
    }
    return stringify(rnds);
  }
  const anyMap = /* @__PURE__ */ new WeakMap();
  const eventsMap = /* @__PURE__ */ new WeakMap();
  const producersMap = /* @__PURE__ */ new WeakMap();
  const anyProducer = Symbol('anyProducer');
  const resolvedPromise = Promise.resolve();
  const listenerAdded = Symbol('listenerAdded');
  const listenerRemoved = Symbol('listenerRemoved');
  let isGlobalDebugEnabled = false;
  function assertEventName(eventName) {
    if (typeof eventName !== 'string' && typeof eventName !== 'symbol') {
      throw new TypeError('eventName must be a string or a symbol');
    }
  }
  function assertListener(listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('listener must be a function');
    }
  }
  function getListeners(instance, eventName) {
    const events = eventsMap.get(instance);
    if (!events.has(eventName)) {
      events.set(eventName, /* @__PURE__ */ new Set());
    }
    return events.get(eventName);
  }
  function getEventProducers(instance, eventName) {
    const key = typeof eventName === 'string' || typeof eventName === 'symbol' ? eventName : anyProducer;
    const producers = producersMap.get(instance);
    if (!producers.has(key)) {
      producers.set(key, /* @__PURE__ */ new Set());
    }
    return producers.get(key);
  }
  function enqueueProducers(instance, eventName, eventData) {
    const producers = producersMap.get(instance);
    if (producers.has(eventName)) {
      for (const producer of producers.get(eventName)) {
        producer.enqueue(eventData);
      }
    }
    if (producers.has(anyProducer)) {
      const item = Promise.all([eventName, eventData]);
      for (const producer of producers.get(anyProducer)) {
        producer.enqueue(item);
      }
    }
  }
  function iterator(instance, eventNames) {
    eventNames = Array.isArray(eventNames) ? eventNames : [eventNames];
    let isFinished = false;
    let flush = () => {};
    let queue = [];
    const producer = {
      enqueue(item) {
        queue.push(item);
        flush();
      },
      finish() {
        isFinished = true;
        flush();
      },
    };
    for (const eventName of eventNames) {
      getEventProducers(instance, eventName).add(producer);
    }
    return {
      async next() {
        if (!queue) {
          return { done: true };
        }
        if (queue.length === 0) {
          if (isFinished) {
            queue = void 0;
            return this.next();
          }
          await new Promise((resolve) => {
            flush = resolve;
          });
          return this.next();
        }
        return {
          done: false,
          value: await queue.shift(),
        };
      },
      async return(value) {
        queue = void 0;
        for (const eventName of eventNames) {
          getEventProducers(instance, eventName).delete(producer);
        }
        flush();
        return arguments.length > 0 ? { done: true, value: await value } : { done: true };
      },
      [Symbol.asyncIterator]() {
        return this;
      },
    };
  }
  function defaultMethodNamesOrAssert(methodNames) {
    if (methodNames === void 0) {
      return allEmitteryMethods;
    }
    if (!Array.isArray(methodNames)) {
      throw new TypeError('`methodNames` must be an array of strings');
    }
    for (const methodName of methodNames) {
      if (!allEmitteryMethods.includes(methodName)) {
        if (typeof methodName !== 'string') {
          throw new TypeError('`methodNames` element must be a string');
        }
        throw new Error(`${methodName} is not Emittery method`);
      }
    }
    return methodNames;
  }
  const isListenerSymbol = (symbol) => symbol === listenerAdded || symbol === listenerRemoved;
  class Emittery {
    static mixin(emitteryPropertyName, methodNames) {
      methodNames = defaultMethodNamesOrAssert(methodNames);
      return (target) => {
        if (typeof target !== 'function') {
          throw new TypeError('`target` must be function');
        }
        for (const methodName of methodNames) {
          if (target.prototype[methodName] !== void 0) {
            throw new Error(`The property \`${methodName}\` already exists on \`target\``);
          }
        }
        function getEmitteryProperty() {
          Object.defineProperty(this, emitteryPropertyName, {
            enumerable: false,
            value: new Emittery(),
          });
          return this[emitteryPropertyName];
        }
        Object.defineProperty(target.prototype, emitteryPropertyName, {
          enumerable: false,
          get: getEmitteryProperty,
        });
        const emitteryMethodCaller = (methodName) =>
          function (...args) {
            return this[emitteryPropertyName][methodName](...args);
          };
        for (const methodName of methodNames) {
          Object.defineProperty(target.prototype, methodName, {
            enumerable: false,
            value: emitteryMethodCaller(methodName),
          });
        }
        return target;
      };
    }
    static get isDebugEnabled() {
      if (typeof process !== 'object') {
        return isGlobalDebugEnabled;
      }
      const { env } = process || { env: {} };
      return env.DEBUG === 'emittery' || env.DEBUG === '*' || isGlobalDebugEnabled;
    }
    static set isDebugEnabled(newValue) {
      isGlobalDebugEnabled = newValue;
    }
    constructor(options = {}) {
      anyMap.set(this, /* @__PURE__ */ new Set());
      eventsMap.set(this, /* @__PURE__ */ new Map());
      producersMap.set(this, /* @__PURE__ */ new Map());
      this.debug = options.debug || {};
      if (this.debug.enabled === void 0) {
        this.debug.enabled = false;
      }
      if (!this.debug.logger) {
        this.debug.logger = (type, debugName, eventName, eventData) => {
          eventData = JSON.stringify(eventData);
          if (typeof eventName === 'symbol') {
            eventName = eventName.toString();
          }
          const currentTime = new Date();
          const logTime = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}.${currentTime.getMilliseconds()}`;
          console.log(`[${logTime}][emittery:${type}][${debugName}] Event Name: ${eventName}
        data: ${eventData}`);
        };
      }
    }
    logIfDebugEnabled(type, eventName, eventData) {
      if (Emittery.isDebugEnabled || this.debug.enabled) {
        this.debug.logger(type, this.debug.name, eventName, eventData);
      }
    }
    on(eventNames, listener) {
      assertListener(listener);
      eventNames = Array.isArray(eventNames) ? eventNames : [eventNames];
      for (const eventName of eventNames) {
        assertEventName(eventName);
        getListeners(this, eventName).add(listener);
        this.logIfDebugEnabled('subscribe', eventName, void 0);
        if (!isListenerSymbol(eventName)) {
          this.emit(listenerAdded, { eventName, listener });
        }
      }
      return this.off.bind(this, eventNames, listener);
    }
    off(eventNames, listener) {
      assertListener(listener);
      eventNames = Array.isArray(eventNames) ? eventNames : [eventNames];
      for (const eventName of eventNames) {
        assertEventName(eventName);
        getListeners(this, eventName).delete(listener);
        this.logIfDebugEnabled('unsubscribe', eventName, void 0);
        if (!isListenerSymbol(eventName)) {
          this.emit(listenerRemoved, { eventName, listener });
        }
      }
    }
    once(eventNames) {
      return new Promise((resolve) => {
        const off = this.on(eventNames, (data2) => {
          off();
          resolve(data2);
        });
      });
    }
    events(eventNames) {
      eventNames = Array.isArray(eventNames) ? eventNames : [eventNames];
      for (const eventName of eventNames) {
        assertEventName(eventName);
      }
      return iterator(this, eventNames);
    }
    async emit(eventName, eventData) {
      assertEventName(eventName);
      this.logIfDebugEnabled('emit', eventName, eventData);
      enqueueProducers(this, eventName, eventData);
      const listeners = getListeners(this, eventName);
      const anyListeners = anyMap.get(this);
      const staticListeners = [...listeners];
      const staticAnyListeners = isListenerSymbol(eventName) ? [] : [...anyListeners];
      await resolvedPromise;
      await Promise.all([
        ...staticListeners.map(async (listener) => {
          if (listeners.has(listener)) {
            return listener(eventData);
          }
        }),
        ...staticAnyListeners.map(async (listener) => {
          if (anyListeners.has(listener)) {
            return listener(eventName, eventData);
          }
        }),
      ]);
    }
    async emitSerial(eventName, eventData) {
      assertEventName(eventName);
      this.logIfDebugEnabled('emitSerial', eventName, eventData);
      const listeners = getListeners(this, eventName);
      const anyListeners = anyMap.get(this);
      const staticListeners = [...listeners];
      const staticAnyListeners = [...anyListeners];
      await resolvedPromise;
      for (const listener of staticListeners) {
        if (listeners.has(listener)) {
          await listener(eventData);
        }
      }
      for (const listener of staticAnyListeners) {
        if (anyListeners.has(listener)) {
          await listener(eventName, eventData);
        }
      }
    }
    onAny(listener) {
      assertListener(listener);
      this.logIfDebugEnabled('subscribeAny', void 0, void 0);
      anyMap.get(this).add(listener);
      this.emit(listenerAdded, { listener });
      return this.offAny.bind(this, listener);
    }
    anyEvent() {
      return iterator(this);
    }
    offAny(listener) {
      assertListener(listener);
      this.logIfDebugEnabled('unsubscribeAny', void 0, void 0);
      this.emit(listenerRemoved, { listener });
      anyMap.get(this).delete(listener);
    }
    clearListeners(eventNames) {
      eventNames = Array.isArray(eventNames) ? eventNames : [eventNames];
      for (const eventName of eventNames) {
        this.logIfDebugEnabled('clear', eventName, void 0);
        if (typeof eventName === 'string' || typeof eventName === 'symbol') {
          getListeners(this, eventName).clear();
          const producers = getEventProducers(this, eventName);
          for (const producer of producers) {
            producer.finish();
          }
          producers.clear();
        } else {
          anyMap.get(this).clear();
          for (const listeners of eventsMap.get(this).values()) {
            listeners.clear();
          }
          for (const producers of producersMap.get(this).values()) {
            for (const producer of producers) {
              producer.finish();
            }
            producers.clear();
          }
        }
      }
    }
    listenerCount(eventNames) {
      eventNames = Array.isArray(eventNames) ? eventNames : [eventNames];
      let count = 0;
      for (const eventName of eventNames) {
        if (typeof eventName === 'string') {
          count +=
            anyMap.get(this).size +
            getListeners(this, eventName).size +
            getEventProducers(this, eventName).size +
            getEventProducers(this).size;
          continue;
        }
        if (typeof eventName !== 'undefined') {
          assertEventName(eventName);
        }
        count += anyMap.get(this).size;
        for (const value of eventsMap.get(this).values()) {
          count += value.size;
        }
        for (const value of producersMap.get(this).values()) {
          count += value.size;
        }
      }
      return count;
    }
    bindMethods(target, methodNames) {
      if (typeof target !== 'object' || target === null) {
        throw new TypeError('`target` must be an object');
      }
      methodNames = defaultMethodNamesOrAssert(methodNames);
      for (const methodName of methodNames) {
        if (target[methodName] !== void 0) {
          throw new Error(`The property \`${methodName}\` already exists on \`target\``);
        }
        Object.defineProperty(target, methodName, {
          enumerable: false,
          value: this[methodName].bind(this),
        });
      }
    }
  }
  const allEmitteryMethods = Object.getOwnPropertyNames(Emittery.prototype).filter((v) => v !== 'constructor');
  Object.defineProperty(Emittery, 'listenerAdded', {
    value: listenerAdded,
    writable: false,
    enumerable: true,
    configurable: false,
  });
  Object.defineProperty(Emittery, 'listenerRemoved', {
    value: listenerRemoved,
    writable: false,
    enumerable: true,
    configurable: false,
  });
  var emittery = Emittery;
  function isErrorWithMessage(error) {
    return typeof error === 'object' && error !== null && 'message' in error && typeof error.message === 'string';
  }
  function toErrorWithMessage(maybeError) {
    if (isErrorWithMessage(maybeError)) return maybeError;
    try {
      return new Error(JSON.stringify(maybeError));
    } catch {
      return new Error(String(maybeError));
    }
  }
  function getErrorMessage(error) {
    return toErrorWithMessage(error).message;
  }
  var WarningType = /* @__PURE__ */ ((WarningType2) => {
    WarningType2['FPS_DROP'] = 'fps_drop';
    return WarningType2;
  })(WarningType || {});
  var ErrorFunction = /* @__PURE__ */ ((ErrorFunction2) => {
    ErrorFunction2['start'] = 'start';
    ErrorFunction2['transform'] = 'transform';
    ErrorFunction2['flush'] = 'flush';
    return ErrorFunction2;
  })(ErrorFunction || {});
  var PipelineInfoData = /* @__PURE__ */ ((PipelineInfoData2) => {
    PipelineInfoData2['pipeline_ended'] = 'pipeline_ended';
    PipelineInfoData2['pipeline_ended_with_error'] = 'pipeline_ended_with_error';
    PipelineInfoData2['pipeline_started'] = 'pipeline_started';
    PipelineInfoData2['pipeline_started_with_error'] = 'pipeline_started_with_error';
    PipelineInfoData2['pipeline_restarted'] = 'pipeline_restarted';
    PipelineInfoData2['pipeline_restarted_with_error'] = 'pipeline_restarted_with_error';
    return PipelineInfoData2;
  })(PipelineInfoData || {});
  const TELEMETRY_MEDIA_TRANSFORMER_QOS_REPORT_INTERVAL = 500;
  const RATE_DROP_TO_PRECENT = 0.8;
  class InternalTransformer extends emittery {
    constructor(transformer, index) {
      super();
      this.index_ = index;
      this.uuid_ = v4();
      this.framesTransformed_ = 0;
      this.transformer_ = transformer;
      this.shouldStop_ = false;
      this.isFlashed_ = false;
      this.framesFromSource_ = 0;
      this.fps_ = 0;
      this.mediaTransformerQosReportStartTimestamp_ = 0;
      this.videoHeight_ = 0;
      this.videoWidth_ = 0;
      this.trackExpectedRate_ = -1;
      this.transformerType_ = 'Custom';
      if ('getTransformerType' in transformer) {
        this.transformerType_ = transformer.getTransformerType();
      }
      const report = new ReportBuilder()
        .action('MediaTransformer')
        .guid(this.uuid_)
        .transformerType(this.transformerType_)
        .variation('Create')
        .build();
      Reporter.report(report);
    }
    setTrackExpectedRate(trackExpectedRate) {
      this.trackExpectedRate_ = trackExpectedRate;
    }
    async start(controller) {
      this.controller_ = controller;
      if (this.transformer_ && typeof this.transformer_.start === 'function') {
        try {
          await this.transformer_.start(controller);
        } catch (e) {
          const report = new ReportBuilder()
            .action('MediaTransformer')
            .guid(this.uuid_)
            .message(Key.errors['transformer_start'])
            .transformerType(this.transformerType_)
            .variation('Error')
            .error(getErrorMessage(e))
            .build();
          Reporter.report(report);
          const msg = { eventMetaData: { transformerIndex: this.index_ }, error: e, function: 'start' };
          this.emit('error', msg);
        }
      }
    }
    async transform(data2, controller) {
      var _a, _b, _c, _d;
      if (this.mediaTransformerQosReportStartTimestamp_ === 0) {
        this.mediaTransformerQosReportStartTimestamp_ = Date.now();
      }
      if (data2 instanceof VideoFrame) {
        this.videoHeight_ = (_a = data2 == null ? void 0 : data2.displayHeight) != null ? _a : 0;
        this.videoWidth_ = (_b = data2 == null ? void 0 : data2.displayWidth) != null ? _b : 0;
      }
      ++this.framesFromSource_;
      if (this.transformer_) {
        if (!this.shouldStop_) {
          try {
            await ((_d = (_c = this.transformer_).transform) == null ? void 0 : _d.call(_c, data2, controller));
            ++this.framesTransformed_;
            if (this.framesTransformed_ === TELEMETRY_MEDIA_TRANSFORMER_QOS_REPORT_INTERVAL) {
              this.mediaTransformerQosReport();
            }
          } catch (e) {
            const report = new ReportBuilder()
              .action('MediaTransformer')
              .guid(this.uuid_)
              .message(Key.errors['transformer_transform'])
              .transformerType(this.transformerType_)
              .variation('Error')
              .error(getErrorMessage(e))
              .build();
            Reporter.report(report);
            const msg = { eventMetaData: { transformerIndex: this.index_ }, error: e, function: 'transform' };
            this.emit('error', msg);
          }
        } else {
          console.warn('[Pipeline] flush from transform');
          data2.close();
          this.flush(controller);
          controller.terminate();
        }
      }
    }
    async flush(controller) {
      if (this.transformer_ && typeof this.transformer_.flush === 'function' && !this.isFlashed_) {
        this.isFlashed_ = true;
        try {
          await this.transformer_.flush(controller);
        } catch (e) {
          const error = new ReportBuilder()
            .action('MediaTransformer')
            .guid(this.uuid_)
            .message(Key.errors['transformer_flush'])
            .transformerType(this.transformerType_)
            .variation('Error')
            .error(getErrorMessage(e))
            .build();
          Reporter.report(error);
          const msg = { eventMetaData: { transformerIndex: this.index_ }, error: e, function: 'flush' };
          this.emit('error', msg);
        }
      }
      this.mediaTransformerQosReport();
      const deleteReport = new ReportBuilder()
        .action('MediaTransformer')
        .guid(this.uuid_)
        .transformerType(this.transformerType_)
        .variation('Delete')
        .build();
      Reporter.report(deleteReport);
    }
    stop() {
      console.log('[Pipeline] Stop stream.');
      if (this.controller_) {
        this.flush(this.controller_);
        this.controller_.terminate();
      }
      this.shouldStop_ = true;
    }
    mediaTransformerQosReport() {
      let timeElapsed_s = (Date.now() - this.mediaTransformerQosReportStartTimestamp_) / 1e3;
      let fps = this.framesFromSource_ / timeElapsed_s;
      let transformedFps = this.framesTransformed_ / timeElapsed_s;
      if (this.trackExpectedRate_ != -1 && this.trackExpectedRate_ * RATE_DROP_TO_PRECENT > fps) {
        const msg = {
          eventMetaData: { transformerIndex: this.index_ },
          warningType: 'fps_drop',
          dropInfo: { requested: this.trackExpectedRate_, current: fps },
        };
        this.emit('warn', msg);
      }
      const qos = new ReportBuilder()
        .action('MediaTransformer')
        .fps(fps)
        .transformedFps(transformedFps)
        .framesTransformed(this.framesTransformed_)
        .guid(this.uuid_)
        .transformerType(this.transformerType_)
        .videoHeight(this.videoHeight_)
        .videoWidth(this.videoWidth_)
        .variation('QoS')
        .build();
      Reporter.report(qos);
      this.mediaTransformerQosReportStartTimestamp_ = 0;
      this.framesFromSource_ = 0;
      this.framesTransformed_ = 0;
    }
  }
  class Pipeline extends emittery {
    constructor(transformers) {
      super();
      this.transformers_ = [];
      this.trackExpectedRate_ = -1;
      for (let index = 0; index < transformers.length; index++) {
        let internalTransformer = new InternalTransformer(transformers[index], index);
        internalTransformer.on('error', (eventData) => {
          this.emit('error', eventData);
        });
        internalTransformer.on('warn', (eventData) => {
          this.emit('warn', eventData);
        });
        this.transformers_.push(internalTransformer);
      }
    }
    setTrackExpectedRate(trackExpectedRate) {
      this.trackExpectedRate_ = trackExpectedRate;
      for (let transformer of this.transformers_) {
        transformer.setTrackExpectedRate(this.trackExpectedRate_);
      }
    }
    async start(readable, writeable) {
      if (!this.transformers_ || this.transformers_.length === 0) {
        console.log('[Pipeline] No transformers.');
        return;
      }
      try {
        let orgReader = readable;
        for (let transformer of this.transformers_) {
          readable = readable.pipeThrough(new TransformStream(transformer));
        }
        readable
          .pipeTo(writeable)
          .then(async () => {
            console.log('[Pipeline] Setup.');
            await writeable.abort();
            await orgReader.cancel();
            this.emit('pipelineInfo', 'pipeline_ended');
          })
          .catch(async (e) => {
            readable
              .cancel()
              .then(() => {
                console.log('[Pipeline] Shutting down streams after abort.');
              })
              .catch((e2) => {
                console.error('[Pipeline] Error from stream transform:', e2);
              });
            await writeable.abort(e);
            await orgReader.cancel(e);
            this.emit('pipelineInfo', 'pipeline_ended_with_error');
          });
      } catch (e) {
        this.emit('pipelineInfo', 'pipeline_started_with_error');
        this.destroy();
        return;
      }
      this.emit('pipelineInfo', 'pipeline_started');
      console.log('[Pipeline] Pipeline started.');
    }
    async destroy() {
      console.log('[Pipeline] Destroying Pipeline.');
      for (let transformer of this.transformers_) {
        transformer.stop();
      }
    }
  }
  class MediaProcessor extends emittery {
    constructor() {
      super();
      this.uuid_ = v4();
      this.trackExpectedRate_ = -1;
      const report = new ReportBuilder().action('MediaProcessor').guid(this.uuid_).variation('Create').build();
      Reporter.report(report);
    }
    setTrackExpectedRate(trackExpectedRate) {
      this.trackExpectedRate_ = trackExpectedRate;
      if (this.pipeline_) {
        this.pipeline_.setTrackExpectedRate(this.trackExpectedRate_);
      }
    }
    transform(readable, writable) {
      this.readable_ = readable;
      this.writable_ = writable;
      return this.transformInternal();
    }
    transformInternal() {
      return new Promise((resolve, reject) => {
        if (!this.transformers_ || this.transformers_.length === 0) {
          const report = new ReportBuilder()
            .action('MediaProcessor')
            .guid(this.uuid_)
            .message(Key.errors['transformer_none'])
            .variation('Error')
            .build();
          Reporter.report(report);
          reject('[MediaProcessor] Need to set transformers.');
          return;
        }
        if (!this.readable_) {
          const report = new ReportBuilder()
            .action('MediaProcessor')
            .guid(this.uuid_)
            .message(Key.errors['readable_null'])
            .variation('Error')
            .build();
          Reporter.report(report);
          reject('[MediaProcessor] Readable is null.');
          return;
        }
        if (!this.writable_) {
          const report = new ReportBuilder()
            .action('MediaProcessor')
            .guid(this.uuid_)
            .message(Key.errors['writable_null'])
            .variation('Error')
            .build();
          Reporter.report(report);
          reject('[MediaProcessor] Writable is null.');
          return;
        }
        let isPipelineReset = false;
        if (this.pipeline_) {
          isPipelineReset = true;
          this.pipeline_.clearListeners();
          this.pipeline_.destroy();
        }
        this.pipeline_ = new Pipeline(this.transformers_);
        this.pipeline_.on('warn', (eventData) => {
          this.emit('warn', eventData);
        });
        this.pipeline_.on('error', (eventData) => {
          this.emit('error', eventData);
        });
        this.pipeline_.on('pipelineInfo', (eventData) => {
          if (isPipelineReset) {
            if (eventData === 'pipeline_started') {
              eventData = PipelineInfoData.pipeline_restarted;
            } else if (eventData === 'pipeline_started_with_error') {
              eventData = PipelineInfoData.pipeline_restarted_with_error;
            }
          }
          this.emit('pipelineInfo', eventData);
        });
        if (this.trackExpectedRate_ != -1) {
          this.pipeline_.setTrackExpectedRate(this.trackExpectedRate_);
        }
        this.pipeline_
          .start(this.readable_, this.writable_)
          .then(() => {
            resolve();
          })
          .catch((e) => {
            reject(e);
          });
      });
    }
    setTransformers(transformers) {
      const report = new ReportBuilder()
        .action('MediaProcessor')
        .guid(this.uuid_)
        .message(Key.updates['transformer_new'])
        .variation('Update')
        .build();
      Reporter.report(report);
      this.transformers_ = transformers;
      if (this.readable_ && this.writable_) {
        return this.transformInternal();
      }
      return Promise.resolve();
    }
    destroy() {
      return new Promise((resolve) => {
        if (this.pipeline_) {
          this.pipeline_.destroy();
        }
        const report = new ReportBuilder().action('MediaProcessor').guid(this.uuid_).variation('Delete').build();
        Reporter.report(report);
        resolve();
      });
    }
  }
  class InsertableStreamHelper {
    constructor() {
      this.processor_ = null;
      this.generator_ = null;
    }
    init(track) {
      return new Promise((resolve, reject) => {
        try {
          this.processor_ = new MediaStreamTrackProcessor(track);
        } catch (e) {
          console.log(`[InsertableStreamHelper] MediaStreamTrackProcessor failed: ${e}`);
          reject(e);
        }
        try {
          if (track.kind === 'audio') {
            this.generator_ = new MediaStreamTrackGenerator({ kind: 'audio' });
          } else if (track.kind === 'video') {
            this.generator_ = new MediaStreamTrackGenerator({ kind: 'video' });
          } else {
            reject('kind not supported');
          }
        } catch (e) {
          console.log(`[InsertableStreamHelper] MediaStreamTrackGenerator failed: ${e}`);
          reject(e);
        }
        resolve();
      });
    }
    getReadable() {
      return this.processor_.readable;
    }
    getWriteable() {
      return this.generator_.writable;
    }
    getProccesorTrack() {
      return this.generator_;
    }
  }
  class MediaProcessorConnector {
    constructor(vonageMediaProcessor) {
      this.insertableStreamHelper_ = new InsertableStreamHelper();
      this.mediaProcessor_ = vonageMediaProcessor;
    }
    setTrack(track) {
      return new Promise((resolve, reject) => {
        this.insertableStreamHelper_
          .init(track)
          .then(() => {
            this.mediaProcessor_
              .transform(this.insertableStreamHelper_.getReadable(), this.insertableStreamHelper_.getWriteable())
              .then(() => {
                resolve(this.insertableStreamHelper_.getProccesorTrack());
              })
              .catch((e) => {
                reject(e);
              });
          })
          .catch((e) => {
            reject(e);
          });
      });
    }
    destroy() {
      return new Promise((resolve, reject) => {
        if (this.mediaProcessor_) {
          this.mediaProcessor_
            .destroy()
            .then(() => {
              resolve();
            })
            .catch((e) => {
              reject(e);
            });
        } else {
          reject('no processor');
        }
      });
    }
  }
  export {
    ErrorFunction,
    MediaProcessor,
    MediaProcessorConnector,
    PipelineInfoData,
    VonageSourceType,
    WarningType,
    getVonageMetadata,
    isSupported,
    setVonageMetadata,
  };