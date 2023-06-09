// Copyright (C) 2023 Jüri Kormik
// 
// This file is part of v.JS.
// 
// v.JS is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// v.JS is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with v.JS.  If not, see <http://www.gnu.org/licenses/>.


// Define some object types for JSDoc.
/**
 * @typedef  {Object} Position  HTMLElement position returned by {@link $pos|$pos()} and {@link offset|offset()}.
 * @property {number} top
 * @property {number} left
 */

/**
 * @typedef  {Object} Size    HTMLElement size returned by {@link $s|$s()}.
 * @property {number} width
 * @property {number} height
 */

/**
 * @typedef  {Object}   WsEvent         Object with callbacks to be added as methods {@link $ws|$ws()} second parameter.
 * @property {function} [open=null]
 * @property {function} [message=null]
 * @property {function} [close=null]
 * @property {function} [error=null]
 */

/**
 * @typedef  {Object}                     Response  Returned by AJAX request (GET, POST etc).
 * @property {boolean}                    success   If response was OK (status in the range 200-299), or not.
 * @property {(Object|Blob|string|null)}  data      Response data, or `NULL`.
 * @property {string}                     message   If `success == false`, then status code and text or error message (in case of AJAX error), otherwise empty string.
 */


/**
 * Vanilla JS (`VJS`) class with common methods plus some syntactic sugars.
 * 
 * Targeted ES11/ES2020 supporting browsers: released since about mid 2020, like Chrome 85+, Edge 85+, Firefox 77+, Opera 71+, and Safari 13.1+. 
 * 
 * @version    0.1
 * @author     Jüri Kormik
 * @license    GPL-3.0-or-later
 * 
 * @todo    Add proper testing.
 * @todo    Update documentation.
 * 
 * @class
 * @throws     {Error}  If script is not runned in Browser (ex. Node.js), or Browser doesn't support ECMAScript11 (2020).
 */
class VJS
{
    /**
     * Constructor of VJS.
     * 
     * @param   {string=}  [prefix] String to be prepended to the data attribute name (will be "remembered" statically).
     *
     * @return  {VJS}
     */
    constructor(p = '') {
        if (typeof window === 'undefined') VJS._err(VJS.E1);
        if (typeof String.prototype.replaceAll !== 'function') VJS._err(VJS.E2);

        VJS.__sp(p);
    }


    /**
     * Similar to jQuery `$` function, but much simpler version of it.
     * At first function tries to find single Element (by ID, by class name etc.), then live HTMLCollection, and finally static NodeList.
     * 
     * **Note!** If `selector` string begins with symbol `=`, then function tries to find live NodeList of elements by name attribute.
     *           If `selector` string begins with symbol `@`, then function handles it as tag name (doesn't make simple tag name validation).
     * 
     * @method  $
     * @see     Look also {@link $i|$i()}, {@link $n|$n()}, {@link $c|$c()}, and {@link $t|$t()}
     * 
     * @param   {string}                         selector
     * @param   {(Document|HTMLElement|string)}  [element=document]  Document/HTMLElement or ID of element (if can be used).
     * @param   {boolean}                        [all=false]         Return HTMLCollection/NodeList of HTMLElements.
     * 
     * @return  {(HTMLElement|HTMLCollection|NodeList|null)}
     */
    $(s, e = document, a = false) { return VJS.__e(s, e, a); }

    /**
     * `getElementByDataAttributeValue` - returns HTMLElement or `NULL` by other elements data attribute value.
     * 
     * @method  $$
     *
     * @param   {(HTMLElement|string)}  element      Where data attribute to look for.
     * @param   {string}                name         Data attribute name.
     * @param   {string}                [type=id]    How to handle data attributes value; accepted values are `id`, `class`, `name` and `tag` (all other types are ignored and attribute value is hadled as query string).
     * @param   {boolean}               [all=false]  Return HTMLCollection/NodeList of HTMLElements.
     *
     * @return  {(HTMLElement|HTMLCollection|NodeList|null)}
     */
    $$(e, n, t = 'id', a = false) {
        const s = {id: '#', class: '.', name: '=', tag: '@'},
              i = VJS.__i();
        let q = i.$gda(e, n);  // get data attribute value (selector)

        if (!q) return null;
        if (Object.keys(s).includes(t)) q = `${s[t]}${q}`;
        return i.$(q, 0, a);  // '0' defaults to `document`
    }

    /**
     * `getElementByDataAttributeValueName` - returns HTMLElement or `NULL` by other elements data attribute value (handles as name).
     * 
     * @method  $$n
     *
     * @param   {(HTMLElement|string)}  element      Where data attribute to look for.
     * @param   {string}                name         Data attribute name.
     * @param   {boolean}               [all=false]  Return HTMLCollection/NodeList of HTMLElements.
     * 
     * @return  {(HTMLElement|NodeList|null)}
     */
    $$n(e, n, a = false) { return VJS.__i().$$(e, n, 'name', a); }

    /**
     * `getElementByDataAttributeValueClass` - returns HTMLElement or `NULL` by other elements data attribute value (handles as class).
     * 
     * @method  $$c
     *
     * @param   {(HTMLElement|string)}  element     Where data attribute to look for.
     * @param   {string}                name        Data attribute name.
     * @param   {boolean}               [all=false]  Return HTMLCollection/NodeList of HTMLElements.
     * 
     * @return  {(HTMLElement|HTMLCollection|null)}
     */
    $$c(e, n, a = false) { return VJS.__i().$$(e, n, 'class', a); }

    /**
     * `getElementByDataAttributeValueTagName` - returns HTMLElement or `NULL` by other elements data attribute value (handles as tag name).
     * 
     * @method  $$t
     *
     * @param   {(HTMLElement|string)}  element    Where data attribute to look for.
     * @param   {string}                name       Data attribute name.
     * @param   {boolean}               [all=false]  Return HTMLCollection/NodeList of HTMLElements.
     * 
     * @return  {(HTMLElement|HTMLCollection|NodeList|null)}
     */
    $$t(e, n, a = false) { return VJS.__i().$$(e, n, 'tag', a); }

    /**
     * `getElementByDataAttributeValueQuery` - returns HTMLElement or `NULL` by other elements data attribute value (handles as query string).
     * 
     * @method  $$q
     *
     * @param   {(HTMLElement|string)}  element      Where data attribute to look for.
     * @param   {string}                name         Data attribute name.
     * @param   {boolean}               [all=false]  Return HTMLCollection/NodeList of HTMLElements.
     * 
     * @return  {(HTMLElement|HTMLCollection|NodeList|null)}
     */
    $$q(e, n, a = false) { return VJS.__i().$$(e, n, 'query', a); }

    /**
     * `getElementById` - returns HTMLElement by ID, or `null` if not found.
     * 
     * @method  $i
     * @see     alias {@link getElemById|getElemById()}
     * @see     Look also {@link $|$()}, {@link $n|$n()}, {@link $c|$c()}, and {@link $t|$t()}
     * 
     * @param   {string}       id
     * 
     * @return  {(HTMLElement|null)}
     */
    $i(i) { return VJS.__go(i, '#'); }
    /**
     * @method  getElemById
     * @see     read more {@link $i|$i()}
     */
    getElemById(i) { return VJS.__i().$i(i); }

    /**
     * `getElementsByName` - returns a live NodeList of all found elements or first HTMLElement by name attribute.
     * 
     * @method  $n
     * @see     alias {@link getElemsByName|getElemsByName()}
     * @see     Look also {@link $|$()}, {@link $i|$i()}, {@link $c|$c()}, and {@link $t|$t()}
     * 
     * @param   {string}   name                  Value of attribute `name`.
     * @param   {boolean}  [firstElement=false]  Return first HTML element or all of them (HTMLCollection/NodeList).
     * 
     * @return  {(NodeList|HTMLElement|null)}
     */
    $n(n, f = false) { return VJS.__go(n, '=', null, !f); }
    /**
     * @method  getElemsByName
     * @see     read more {@link $n|$n()}
     */
    getElemsByName (n, f = false) { return VJS.__$n(n, f); }

    /**
     * `getElementsByClassName` - returns a live HTMLCollection of all found elements by class name.
     *
     * @method  $c
     * @see     alias {@link getElemsByClass|getElemsByClass()}
     * @see     Look also {@link $|$()}, {@link $i|$i()}, {@link $n|$n()}, and {@link $t|$t()}
     * 
     * @param   {string}                         className
     * @param   {(Document|HTMLElement|string)}  [element=document]    Document/HTMLElement or ID of element.
     * @param   {boolean}                        [firstElement=false]  Return first HTML element or all of them (HTMLCollection).
     * 
     * @return  {(HTMLCollection|HTMLElement|null)}
     */
    $c(c, e = document, f = false) { return VJS.__go(c, '.', e, !f); }
    /**
     * @method  getElemsByClass
     * @see     read more {@link $c|$c()}
     */
    getElemsByClass(c, e = document, f = false) { return VJS.__i().$c(c, e, f); }

    /**
     * `getElementsByTagName` - returns a live HTMLCollection of all found elements or first HTMLElement by tag name.
     * 
     * @method  $t
     * @see     alias {@link getElemsByTag|getElemsByTag()}
     * @see     Look also {@link $|$()}, {@link $i|$i()}, {@link $n|$n()}, and {@link $c|$c()}
     * 
     * @param   {string}                         tagName
     * @param   {(Document|HTMLElement|string)}  [element=document]    Document/HTMLElement or ID of element.
     * @param   {boolean}                        [firstElement=false]  Return first HTML element or all of them (HTMLCollection/NodeList).
     * 
     * @return  {(HTMLCollection|NodeList|HTMLElement|null)}  WebKit (like Firefox) browsers return `NodeList` instead of `HTMLCollection` (see {@link https://bugzil.la/14869|Firefox bug 14869}).
     */
    $t(t, e = document, f = false) { return VJS.__go(t, '@', e, !f); }
    /**
     * @method  getElemsByTag
     * @see     read more {@link $t|$t()}
     */
    getElemsByTag(t, e = document, f = false) { return VJS.__i().$t(t, e, f); }

    /**
     * `querySelector` - returns a static (non-live) NodeList if `all = true`, HTMLElement otherwise.
     *
     * @method  $q
     * @see     alias {@link querySel|querySel()}
     * 
     * @param   {string}                         queryString
     * @param   {(Document|Element|string)}      [element=document]  Document/HTMLElement or ID of element.
     * @param   {boolean}                        [all=false]         Return all found elements (NodeList).
     * 
     * @return  {(HTMLElement|HTMLCollection|NodeList|null)}
     */
    $q(q, e = document, a = false) {
        e = VJS.__o(e);
        if (!e) e = document;  // default to Document
        return VJS.__$q(e, q, a);
    }
    /**
     * @method  querySel
     * @see     read more {@link $q|$q()}
     */
    querySel(q, e = document, a = false) { return VJS.__i().$q(q, e, a); }

    /**
     * `filter` - returns an array of HTMLElements of filtered (by function) HTMLCollection/NodeList.
     *
     * @method  $f
     * @see     alias {@link filter|filter()}
     * 
     * @param   {(HTMLElement|string)}  selector          Element or query string to search for, or data attribute name, if `dataAttribute` is set.
     * @param   {Function}              callbackFunction  Function to use for filtering.
     * @param   {string=}               dataAttribute     If set, use query string by other elements data attribute; value should be in format `<ID>|<type>`; accepted types are `id`, `class`, `name` and `tag`.
     *
     * @return  {HTMLElement[]}
     */
    $f(s, c, d = '') {
        let o;

        if(!d) o = VJS.__i().$(s, 0, 1);  // '0' defaults to `document`
        else {
            const p = d.split('|');
            if (p.length < 2) return [];  // avoid error
            o = VJS.__i().$$(p[0], s, p[1], 1);
        }

        return !o ? [] : (
            o instanceof HTMLElement ? [o] : (
                !o?.[Symbol.iterator] ? [] : [...o].filter(c)
            )
        );
    }
    /**
     * @method  filter
     * @see     read more {@link $f|$f()}
     */
    filter(s, c, d = '') { return VJS.__i().$f(s, c, d); }

    /**
     * `height` - returns or sets elements height.
     *
     * @method  $h
     * @see     alias {@link height|height()}
     * @see     also  {@link size|size()}
     * 
     * @param   {(HTMLElement|string)}  element
     * @param   {string=}               [type]   Type of height to return:  `inner` – elements height with padding;  `outer` – elements height with padding, border and scrollbar;  `with-margin` – computed `outer` + margin.
     * @param   {(string|number)}       [value]  Value to set as elements height, `type` is ignored.
     *
     * @return  {(number|void)}
     */
    $h(e, t = '', v = null) {
        const h = VJS.__h(e, t, v);
        if (!v) return h;
    }
    /**
     * @method  height
     * @see     read more {@link $h|$h()}
     */
    height(e, t = '', v = null) {
        const h = VJS.__h(e, t, v);
        if (!v) return h;
    }

    /**
     * `width` - returns or sets elements width.
     *
     * @method  $w
     * @see     alias {@link width|width()}
     * @see     also  {@link size|size()}
     * 
     * @param   {(HTMLElement|string)}  element
     * @param   {string=}               [type]   Type of width to return:  `inner` – elements width with padding;  `outer` – elements width with padding, border and scrollbar;  `with-margin` – computed `outer` + margin.
     * @param   {(string|number)}       [value]  Value to set as elements height, `type` is ignored.
     *
     * @return  {(number|void)}
     */
    $w(e, t = '', v = null) {
        const w = VJS.__w(e, t, v);
        if (!v) return w;
    }
    /**
     * @method  width
     * @see     read more {@link $w|$w()}
     */
    width(e, t = '', v = null) {
        const w = VJS.__w(e, t, v);
        if (!v) return w;
    }

    /**
     * Returns or sets elements dimensions.
     * 
     * @method  $s
     * @see     alias {@link size|size()}
     * @see     also  {@link $w|$w()}, {@link $h|$h()}, {@link width|width()} and {@link height|height()}
     *
     * @param   {(HTMLElement|string)}  element
     * @param   {string=}               [type]    Type of width to return:  `inner` – elements width with padding;  `outer` – elements width with padding, border and scrollbar;  `with-margin` – computed `outer` + margin.
     * @param   {(string|number)}       [width]   Value to set as elements width, `type` is ignored. If `height` not set, then this value is used.
     * @param   {(string|number)}       [height]  Value to set as elements height, `type` is ignored.
     *
     * @return  {(Size|void)}
     */
    $s(e, t = '', w = null, h = null)
    {
        const s = {
            width:  VJS.__w(e, t, !w ? h : w),  // just-in case
            height: VJS.__h(e, t, !h ? w : h)
        };
        if (!w && !h) return s;
    }
    /**
     * @method  size
     * @see     read more {@link $s|$s()}
     */
    size(e, t = '', w = null, h = null)
    {
        const s = VJS.__i().$s(e, t, w, h);
        if (s) return s;
    }

    /**
     * `selectParent` - returns parent element by Tag name or NULL if not found.
     *
     * @method  $sp
     * @see     alias {@link selParent|selParent()}
     * 
     * @param   {(HTMLElement|string)}  selector        Element or query string to search for.
     * @param   {string}                [tagName=form]  Name of parent tag to select.
     * 
     * @return  {(HTMLElement|null)}
     */
    $sp(e, t = 'form')
    {
        e = VJS.__o(e);
        if (!e || e instanceof Window) return null;

        while (e.nodeName.toLowerCase() !== t) {
            if (!e.parentNode) return null;  // can't find parent element
            e = e.parentNode;
        }
        return e;
    }
    /**
     * @method  selParent
     * @see     read more {@link $sp|$sp()}
     */
    selParent(e, t = 'form') { return VJS.__i().$sp(e, t); }

    /**
     * `containsSelector` - returns array of HTML Elements, that contain specified text, or all of them.
     *
     * @method  $cs
     * @see     alias {@link containsSel|containsSel()}
     * 
     * @param   {(HTMLElement|string)}  selector       Element or query string to search for.
     * @param   {string=}               [includeText]  The text that the element should contains.
     *
     * @return  {HTMLElement[]}
     */
    $cs(s, i = '') { return VJS.__i().$f(s, e => e.textContent.includes(i)); }
    /**
     * @method  containsSel
     * @see     read more {@link $cs|$cs()}
     */
    containsSel(s, i = '') { return VJS.__i().$cs(s, i); }

    /**
     * `hasAttribute` - returns boolean value if element has attribute, or any attributes at all (if attribute name not given).
     *
     * @method  $ha
     * @see     alias {@link hasAttrib|hasAttrib)}
     * 
     * @param   {(HTMLElement|string)}  element           HTMLElement or ID of element.
     * @param   {string=}               [attributeName]   Name of the elements attribute.
     *
     * @return  {(boolean|undefined)}  If no valid element given, returns `undefined`, otherwise boolean value.
     */
    $ha(e, n = '') {
        e = VJS.__o(e, null);
        return !e ? undefined : (!n ? e.hasAttributes() : e.hasAttribute(n));
    }
    /**
     * @method  hasAttrib
     * @see     read more {@link $ha|$ha()}
     */
    hasAttrib(e, n = '') { return VJS.__i().$ha(e, n); }

    /**
     * `getAttribute` - returns elements attribute value or null (or whatever default value).
     *
     * @method  $ga
     * @see     alias {@link getAttrib|getAttrib()}
     * 
     * @param   {(HTMLElement|string)}  element              HTMLElement or ID of element.
     * @param   {string}                attributeName        Name of the elements attribute.
     * @param   {(string|null)}         [defaultValue=null]  Default value to return, if attribute not found.
     *
     * @return  {(string|number|boolean|null)}
     */
    $ga(e, n, d = null) {
        e = VJS.__o(e, null);
        if (!e || !VJS.__i().$ha(e, n)) return d;

        const v = e.getAttribute(n);
        if (!v) return d;

        return VJS.__vn(v);
    }
    /**
     * @method  getAttrib
     * @see     read more {@link $ga|$ga()}
     */
    getAttrib(e, n, d = null) { return VJS.__i().$ga(e, n, d); }

    /**
     * `setAttribute` - sets elements attribute value; attributes with boolean value don't need value (same for anumerated attributes except for setting falsy value).
     *
     * @method  $sa
     * @see     alias {@link setAttrib|setAttrib()}
     * 
     * @param   {(HTMLElement|string)}  element        HTMLElement or ID of element.
     * @param   {string}                attributeName  Name of the elements attribute.
     * @param   {(string|boolean)}      [value=true]   Value of the elements attribute; **note:** if set to boolean `false`, then attribute will be removed.
     */
    $sa(e, n, v = true) {
        e = VJS.__o(e, null);
        if (!e) return;
        let r = 0;  // do remove instead of setting

        if (typeof v === 'boolean') {
            // Change enumerated attribute value to string;
            // see: [Enumerated - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Glossary/Enumerated)
            if (n === 'translate') v = v ? 'yes' : 'no';
            else if (['contenteditable', 'draggable', 'spellcheck'].includes(n)) v = v ? 'true' : 'false';
            else if (['autocomplete', 'autocorrect'].includes(n)) v = v ? 'on' : 'off';

            else if (v) v = n;
            else r = 1;  // remove instead of setting
        }
        else if (!v) r = 1;  // in case of empty string remove it

        if (r) VJS.__i().$ra(e, n);
        else e.setAttribute(n, v);
    }
    /**
     * @method  setAttrib
     * @see     read more {@link $sa|$sa()}
     */
    setAttrib(e, n, v = true) { VJS.__i().$sa(e, n, v); }

    /**
     * `removeAttribute` - removes attribute from element.
     *
     * @method  $ra
     * @see     alias {@link remAttrib|remAttrib()}
     * 
     * @param   {(HTMLElement|string)}  element        HTMLElement or ID of element.
     * @param   {string}                attributeName  Name of the elements attribute.
     */
    $ra(e, n) {
        e = VJS.__o(e, null);
        if (e) e.removeAttribute(n);
    }
    /**
     * @method  remAttrib
     * @see     read more {@link $ra|$ra()}
     */
    remAttrib(e, n) { VJS.__i().$ra(e, n); }

    /**
     * `setTimeout` / `setInterval` - sets timeout or interval to call a function.
     *
     * @method  $st
     * 
     * @param   {number}      seconds           Timeout/Interval in seconds.
     * @param   {Function}    function          Function to call after time is up.
     * @param   {Array.<*>}   [parameters=[]]   Array of parameters or just one parameter to be passed to the function.
     * @param   {boolean}     [interval=false]  Set interval instead of timeout.
     *
     * @return  {number}  `timeoutID`, that can be passed to the {@link $ct|$ct()} to cancel timeout/interval.
     */
    $st(s, f, p = [], i = false) {
        if (isNaN(s)) return 0;  // if seconds not numeric, don't try to set timeout

        const t = s * 1000;
        if (!(p instanceof Array)) p = [p];

        return !p.length ? 
            (i ? setInterval(f, t) : setTimeout(f, t)) :
            (i ? setInterval(f, t, ...p) : setTimeout(f, t, ...p));
    }

    /**
     * `clearTimeout` / `clearInterval` - clears/resets timeout or interval.
     *
     * @method  $ct
     * 
     * @param   {number}   id                `timoutID` or `intervalID`.
     * @param   {boolean}  [interval=false]  Clear interval instead of timeout.
     */
    $ct(d, i = false) {
        if (!d) return;
        if (i) clearInterval(d);
        else clearTimeout(d);
    }

    /**
     * `formData` - returns form data object, string or JSON.
     * 
     * **Note!** The method differs from {@link serialize|serialize()} in a way that it checks if required fields are filled or not.
     * 
     * @method  $fd
     * @throws  {(DOMException|Error)}  If form not found, then function throws `DOMException` **NotFoundError**. If missing some required fields and validation classes not given, then function throws `Error`.
     * 
     * @see     Look also {@link serialize|serialize()}
     *
     * @param   {(HTMLElement|string)}               form               Form element or ID of form.
     * @param   {string}                             [type=FormData]    Type of returned data. Accepted values are:  `string`, `json`, or `FormData`.<br>**Note!** In case of `json` keys with hyphen are converted automatically to `camelCase` (i.e `test-field` is converted to `testField`).
     * @param   {string[]}                           [required=[]]      IDs of required fields.
     * @param   {object}                             [extraData={}]     Additional data to be added.
     * @param   {{error: string, success: string}=}  [validationClass]  Validation class to be set; for example for Bootstrap it would be `{error: 'is-invalid', success: 'is-valid'}`.
     *
     * @return  {(FormData|object|string|null)}
     */
    $fd(f, t = '', r = [], e = {}, v = null) {
        t = t.toLowerCase();
        if (['str', 'string', 'json'].includes(t)) t = t.substring(0, 1);
        else t = 'fd';

        const o = VJS.__fd(f, t, r, e);

        if (o.err === 'nfe') VJS.__de(1, VJS.E7);  // "NotFormElement"
        if (o.err === 'mrf') {                     // "Missing Required Field(s)"
            if (v && v.error && v.success) {  // if error and success classes is given, set them accordingly,...
                o.ids.forEach(i => {
                    if (o.data.includes(i)) {
                        VJS.__c(i, [v.success], 'remove');
                        VJS.__c(i, [v.error], 'add');
                    }
                    else {
                        VJS.__c(i, [v.error], 'remove');
                        VJS.__c(i, [v.success], 'add');
                    }
                });
                return null;
            }
            else VJS._err(VJS.E3);  // ... else raise Error
        }

        return o.data;
    }

    /**
     * `WebSocket` - creates new connection instance, adds event listeners, and returns it.
     * 
     * @method  $ws
     *
     * @param   {string}   url        URL to the server.
     * @param   {WsEvent}  callbacks  Object of callbacks. Needs include at least one of `open`, `message`, `close` or `error`; all other keys are ignored.
     *
     * @return  {(WebSocket|null)}  In case of any error `null` is returned, otherwise on success `WebSocket` instance.
     */
    $ws(u, c) {
        const _f = ['open', 'message', 'close', 'error'];
        let ok = false, _u, ws;

        try {
            if (u.substring(0, 2) === '//') u = `wss:${u}`;  // prefer secure connection
            _u = new URL(u.trim());
        }
        catch (e) { return null; }

        if (_u.protocol !== 'ws:' && _u.protocol !== 'wss:') return null;  // allow only WebSocket url
        for (const k in Object.keys(c)) {
            if (_f.includes(k)) ok = true;  // there is at least one accepted callback
        }
        u = `${_u.origin}${_u.pathname}${_u.search}`;  // "clean" URL (hash/fragment not allowed)

        try { ws = new WebSocket(u); }
        catch (e) { return null; }

        // Finally add event listeners callbacks
        for (const k in Object.keys(c)) {
            if (_f.includes(k)) ws[`on${k}`] = c[k];
        }
        return ws;
    }

    /**
     * `createElement` - creates new HTML Element by tagName, or an HTMLUnknownElement if tagName isn't recognized.
     *
     * @method  $cel
     * @see     alias {@link createElem|createElem()}
     * 
     * @param   {string}   [tagName=div]  Name of the element to be created.
     * @param   {string=}  [optionsIs]    Name of the custom element.
     *
     * @return  {(Element|HTMLUnknownElement)}
     */
    $cel(t = 'div', is = '')
    {
        if (typeof t !== 'string') return null;
        const p = [t];
        if (is) p.push({is});
        return document.createElement(...p);
    }
    /**
     * @method  createElem
     * @see     read more {@link $cel|$cel()}
     */
    createElem(t = 'div', i = '') { return VJS.__i().$cel(t, i); }

    /**
     * `createElements` - creates new HTML Element(s) by html string, and/or add to the specified element.
     *
     * @method  $cels
     * @see     alias {@link createElems|createElems()}
     * 
     * @param   {string}                 html
     * @param   {?(HTMLElement|string)}  [element=null]  An element to which add newly created elements.
     *
     * @return  {Element[]}
     */
    $cels(h, e = null)
    {
        if (typeof h !== 'string') return null;
        let t = VJS.__i().$ce(), r;

        t.innerHTML = h.trim();
        r = t.children;

        if (e) {
            e = VJS.__o(e);
            if (e) for(let c of r) e.append(c);
        }
        return r;
    }
    /**
     * @method  createElems
     * @see     read more {@link $cels|$cels()}
     */
    createElems(h) { return VJS.__i().$cels(h); }

    /**
     * `hasDataAttribute` - returns boolean value if element has data attribute, or any data attributes at all (if attribute name is empty string).
     *
     * @method  $hda
     * @see     alias {@link hasDataAttrib|hasDataAttrib()}
     * 
     * @param   {(HTMLElement|string)}  element               HTMLElement or ID of element.
     * @param   {string}                attributeName         Name of the elements attribute.
     * @param   {boolean}               [ignorePrefix=false]  If `attributeName` not set, returns boolean, if there are any data attributes regardless of prefix.
     *
     * @return  {(boolean|undefined)}  If no valid element given, returns `undefined`, otherwise boolean value.
     */
    $hda(e, n, i = false) {
        // if (!n) return VJS.__i().$ha(e);
        const dn = VJS.__dn(n, i);

        if (!dn) {
            const da = VJS.__da(e, i);

            if (!da) return undefined;
            return da.length > 0;
        }
        return VJS.__i().$ha(e, dn);
    }
    /**
     * @method  hasDataAttrib
     * @see     read more {@link $hda|$hda()}
     */
    hasDataAttrib(e, n) { return VJS.__i().$hda(e, n); }

    /**
     * `getDataAttribute` - returns elements data attribute value or null (or whatever default value).
     *
     * @method  $gda
     * @see     alias {@link getDataAttrib|getDataAttrib()}
     * 
     * @param   {(HTMLElement|string)}  element               HTMLElement or ID of element.
     * @param   {string}                attributeName         Name of the elements attribute.
     * @param   {(string|null)}         [defaultValue=null]   Default value to return, if attribute not found.
     * @param   {boolean}               [ignorePrefix=false]  Ignore prefix in data attribute name.
     *
     * @return  {(string|null)}
     */
    $gda(e, n, d = null, i = false) { return VJS.__i().$ga(e, VJS.__dn(n, i), d); }
    /**
     * @method  getDataAttrib
     * @see     read more {@link $gda|$gda()}
     */
    getDataAttrib(e, n, d = null, i = false) { return VJS.__i().$gda(e, n, d, i); }

    /**
     * `setDataAttribute` - sets elements data attribute value.
     *
     * @method  $sda
     * @see     alias {@link setDataAttrib|setDataAttrib()}
     * 
     * @param   {(HTMLElement|string)}     element        HTMLElement or ID of element.
     * @param   {string}                   attributeName  Name of the elements data attribute (withoud prefix `data-*`).
     * @param   {(string|number|boolean)}  [value=true]   Value of the elements data attribute.
     */
    $sda(e, n, v = true) {
        if (n) {
            if (typeof v === 'boolean') v = v|0;  // turn boolean value to integer
            VJS.__i().$sa(e, VJS.__dn(n), v);
        }
    }
    /**
     * @method  setDataAttrib
     * @see     read more {@link $sda|$sda()}
     */
    setDataAttrib(e, n, v) { VJS.__i().$sda(e, n, v); }

    /**
     * `removeDataAttribute` - removes attribute from element.
     *
     * @method  $rda
     * @see     alias {@link remDataAttrib|remDataAttrib()}
     * 
     * @param   {(HTMLElement|string)}  element        HTMLElement or ID of element.
     * @param   {string}                attributeName  Name of the elements attribute.
     */
    $rda(e, n) { if (n) VJS.__i().$ra(e, VJS.__dn(n)); }
    /**
     * @method  remDataAttrib
     * @see     read more {@link $rda|$rda()}
     */
    remDataAttrib(e, n) { VJS.__i().$rda(e, n); }

    /**
     * `hasClass` - returns boolean value if the element contains class name or not.
     *
     * @method  $hcl
     * @see     alias {@link hasClass|hasClass()}
     * 
     * @param   {(HTMLElement|string)}  element      HTMLElement or ID of element.
     * @param   {string=}               [className]  Class name to check. If not set, return existence of any class names.
     *
     * @return  {(boolean|undefined)}  If no valid element given, returns `undefined`, otherwise boolean value.
     */
    $hcl(e, c = '') {
        e = VJS.__o(e, null);
        return !e ? undefined : (!c ? e.classList.length > 0 : e.classList.contains(c));
    }
    /**
     * @method  hasClass
     * @see     read more {@link $hcl|$hcl()}
     */
    hasClass(e, c) { return VJS.__i().$hcl(e, c); }

    /**
     * `getClasses` - returns array of elements class names, or `undefined` if element not found.
     *
     * @method  $gcl
     * @see     alias {@link getClasses|getClasses()}
     * 
     * @param   {(HTMLElement|string)}  element  HTMLElement or ID of element.
     * 
     * @return  {(Array|undefined)}
     */
    $gcl(e) {
        e = VJS.__o(e, null);
        return !e ? undefined : (!e.classList ? [] : [...e.classList]);
    }
    /**
     * @method  getClasses
     * @see     read more {@link $gcl|$gcl()}
     */
    getClasses(e) { return VJS.__i().$gcl(e); }

    /**
     * `addClass` - adds class name or array of class names to the element.
     *
     * @method  $acl
     * @see     alias {@link addClass|addClass()}
     * 
     * @param   {(HTMLElement|string)}  element    HTMLElement or ID of element.
     * @param   {(string|string[])}     className  Class name or array of class names to add.
     */
    $acl(e, c) { VJS.__c(e, c, 'add'); }
    /**
     * @method  addClass
     * @see     read more {@link $acl|$acl()}
     */
    addClass(e, c) { VJS.__i().$acl(e, c); }

    /**
     * `removeClass`/`replaceClass` - removes class name or array of class names from the element.
     *
     * @method  $rcl
     * @see     alias {@link remClass|remClass()}
     * 
     * @param   {(HTMLElement|string)}  element         HTMLElement or ID of element.
     * @param   {(string|string[])}     className       Class name to remove/replace. If `newClassName` not given, can be also array of class names.
     * @param   {string=}               [newClassName]  Class name to replace with. If not given, `className` will be removed, otherwise will be replaced with this one.
     */
    $rcl(e, c, n = '') {
        if (!n) VJS.__c(e, c, 'remove');
        else {
            if (Array.isArray(c)) c = c[0];  // replace only one class
            VJS.__c(e, [c, n], 'replace');
        }
    }
    /**
     * @method  remClass
     * @see     read more {@link $rcl|$rcl()}
     */
    remClass(e, c) { VJS.__i().$rcl(e, c); }
    /**
     * @method  replClass
     * @see     read more {@link $rcl|$rcl()}
     */
    replClass(e, o, n) { VJS.__i().$rcl(e, o, n); }

    /**
     * `toggleClass` - toggles class name in the element.
     *
     * @method  $tcl
     * @see     alias {@link toggleClass|toggleClass()}
     * 
     * @param   {(HTMLElement|string)}  element    HTMLElement or ID of element.
     * @param   {string}                className  Class name to toggle.
     * @param   {boolean=}              [force]    If set, toggles one way-only (`true` - sets; `false` - removes).
     */
    $tcl(e, c, f) {
        if (typeof f !== 'undefined') c = [c, f];
        VJS.__c(e, c, 'toggle');
    }
    /**
     * @method  toggleClass
     * @see     read more {@link $tcl|$tcl()}
     */
    toggleClass(e, c, f) { VJS.__i().$tcl(e, c, f); }

    /**
     * Returns elements position relative to viewport or undefined if element not found.
     * 
     * **Note!** This method is not an alias of `position()`. Unlike a `position()`, this method returns position with margin included.
     *
     * @method  $pos
     * @see     also {@link position|position()} and {@link offset|offset()} 
     * 
     * @param   {(HTMLElement|string)}  element    HTMLElement or ID of element.
     *
     * @return  {(Position|undefined)}
     */
    $pos(e) {
        e = VJS.__o(e, null);
        if (!e) return undefined;
        const {top, left} = e.getBoundingClientRect();
        return {top, left};
    }

    /**
     * Returns or sets elements value(s).
     *
     * @method  $val
     * 
     * @param   {(HTMLElement|string)}  element      HTMLElement or ID of element.
     * @param   {string=}               [value]      Value to be adde to the element; if empty, value will be returned.
     * @param   {boolean}               [all=false]  Return all text, including non-visible (i.e style or script, if present).
     *
     * @return  {(string|number|boolean|string[]|number[]|boolean[]|void)}
     */
    $val(e, v = '', a = false) {
        e = VJS.__o(e, null);
        if (!e) return '';

        if (!v) {
            if (e.options && e.multiple)
                return e.options.filter(o => o.selected).map(o => VJS.__vn(o.value));

            return VJS.__vn(e.value || (a ? e.textContent : e.innerText));
        }
        else {
            if (typeof e.value === 'undefined') e.textContent = v;
            else e.value = v;
        }
    }

    /**
     * `addEventListener` - adds event listener to the element or elements.
     *
     * @method  $ael
     * @see     alias {@link addEvtListener|addEvtListener()}
     * @see     Look also {@link $aels|$aels()} (alias {@link addEvtListens|addEvtListens()})
     * 
     * @param   {Function}                              function          Function to call, if event occurs.
     * @param   {string}                                [event=load]      Name of the event to listen.
     * @param   {(Window|Document|HTMLElement|string)}  [element=window]  Window/Document/HTMLElement or ID of element (or array of elements).
     */
    $ael(f, v = 'load', e = window) {
        if (typeof f !== 'function') return;
        if (e instanceof Array) return VJS.__i().$aels(f, v, e);  // in case of array of elements
        e = VJS.__o(e);
        if (!e) return;
        e.addEventListener(v, f);
    }
    /**
     * @method  addEvtListener
     * @see     read more {@link $ael|$ael()}
     */
    addEvtListener(f, v = 'load', e = window) { VJS.__i().$ael(f, v, e); }

    /**
     * `removeEventListener` - removes event listener from the element or elements.
     *
     * @method  $rel
     * @see     alias {@link remEvtListener|remEvtListener()}
     * @see     Look also {@link $rels|$rels()} (alias {@link addEvtListens|addEvtListens()})
     * 
     * @param   {Function}                              function          Function to call, if event occurs.
     * @param   {string}                                [event=load]      Name of the event to listen.
     * @param   {(Window|Document|HTMLElement|string)}  [element=window]  Window/Document/HTMLElement or ID of element (or array of elements).
     */
    $rel(f, v = 'load', e = window) {
        if (typeof f !== 'function') return;
        if (e instanceof Array) return VJS.__i().$rels(f, v, e);  // in case of array of elements
        e = VJS.__o(e);
        if (!e) return;
        e.removeEventListener(v, f);
    }
    /**
     * @method  remEvtListener
     * @see     read more {@link $rel|$rel()}
     */
    remEvtListener(f, v = 'load', e = window) { VJS.__i().$rel(f, v, e); }

    /**
     * `addEventListeners` - adds event listener to several elements at once.
     *
     * @method  $aels
     * @see     alias {@link addEvtListeners|addEvtListeners()}
     * @see     Look also {@link $ael|$ael()} (alias {@link addEvtListen|addEvtListen()})
     * 
     * @param   {Function}                  function       Function to call, if event occurs.
     * @param   {string}                    event          Name of the event to listen.
     * @param   {(HTMLElement[]|string[])}  [elements=[]]  Array of HTMLElement objects or IDs.
     */
    $aels(f, v, e = []) {
        if (e instanceof Array) e.forEach(i => VJS.__i().$ael(f, v, i));
        else VJS.__i().$ael(f, v, e);  // just-in-case
    }
    /**
     * @method  addEvtListeners
     * @see     read more {@link $aels|$aels()}
     */
    addEvtListeners(f, v, e = []) { VJS.__i().$aels(f, v, e); }

    /**
     * `removeEventListeners` - removes event listener from several elements at once.
     *
     * @method  $rels
     * @see     alias {@link remEvtListeners|remEvtListeners()}
     * @see     Look also {@link $ael|$ael()} (alias {@link remEvtListen|remEvtListen()})
     * 
     * @param   {Function}                  function       Function to call, if event occurs.
     * @param   {string}                    event          Name of the event to listen.
     * @param   {(HTMLElement[]|string[])}  [elements=[]]  Array of HTMLElement objects or IDs.
     */
    $rels(f, v, e = []) {
        if (e instanceof Array) e.forEach(i => VJS.__i().$rel(f, v, i));
        else VJS.__i().$rel(f, v, e);  // just-in-case
    }
    /**
     * @method  remEvtListeners
     * @see     read more {@link $rels|$rels()}
     */
    remEvtListeners(f, v, e = []) { VJS.__i().$rels(f, v, e); }


    /**
     * Makes AJAX GET request to the server and returns response `Promise` object.
     *
     * @async
     * @method  $get
     * @see     also {@link $post|$post()}, {@link $put|$put()}, {@link $patch|$patch()}, and {@link $del|$del()}
     *
     * @param   {string}   url                 URL to the server.
     *
     * @return  {Promise<Response>}
     */
    $get(u) { return VJS.__r(u); }

    /**
     * Makes AJAX PUT request to the server and returns response `Promise` object.
     *
     * @async
     * @method  $put
     * @see     also {@link $get|$get()}, {@link $post|$post()}, {@link $patch|$patch()}, and {@link $del|$del()}
     *
     * @param   {string}                    url   URL to the server.
     * @param   {(FormData|Object|string)}  data  Data or form ID (begin with symbol `#`) to be sent to the server.
     * 
     * @return  {Promise<Response>}
     */
    $put(u, d = {}) { return VJS.__r(u, 'PUT', d); }

    /**
     * Makes AJAX DELETE request to the server and returns response `Promise` object.
     *
     * @async
     * @method  $del
     * @see     also {@link $get|$get()}, {@link $post|$post()}, {@link $put|$put()}, and {@link $patch|$patch()}
     *
     * @param   {string}                    url   URL to the server.
     * @param   {(FormData|Object|string)}  data  Data or form ID (begin with symbol `#`) to be sent to the server.
     * 
     * @return  {Promise<Response>}
     */
    $del(u, d = {}) { return VJS.__r(u, 'DELETE', d); }

    /**
     * Makes AJAX POST request to the server and returns response `Promise` object.
     *
     * @async
     * @method  $post
     * @see     also {@link $get|$get()}, {@link $put|$put()}, {@link $patch|$patch()}, and {@link $del|$del()}
     *
     * @param   {string}                    url                 URL to the server.
     * @param   {(FormData|Object|string)}  [data={}]           Data or form ID (begin with symbol `#`) to be sent to the server.
     *
     * @return  {Promise<Response>}
     */
    $post(u, d = {}) { return VJS.__r(u, 'POST', d); }

    /**
     * Makes AJAX PATCH request to the server and returns response `Promise` object.
     *
     * @async
     * @method  $patch
     * @see     also {@link $get|$get()}, {@link $post|$post()}, {@link $put|$put()}, and {@link $del|$del()}
     *
     * @param   {string}                    url                 URL to the server.
     * @param   {(FormData|Object|string)}  [data={}]           Data or form ID (begin with symbol `#`) to be sent to the server.
     *
     * @return  {Promise<Response>}
     */
    $patch(u, d = {}) { return VJS.__r(u, 'PATCH', d); }


    /**
     * `listenServerSentEvents` - adds event listener to the server-sent events (similar to WebSocket, but is a one-way connection) by URL.
     * 
     * @method  $lsse
     * 
     * @example <caption>Example usage of method.</caption>
     * $lsse('http://localhost/sse.php', (data, id, origin) => {
     *     $html('server-msg', `${id}: ${origin}<br>${data}`);
     * }, 'ping');
     *
     * @param   {string}    url                      Events generating script.
     * @param   {Function}  callback                 Function to be called on event message. Called function params (optional) are `data`, `id`, and `origin`.
     * @param   {string=}   [eventName]              Name of event to listen. Default: empty string
     * @param   {boolean}   [withCredentials=false]  If EventSource is instatiated with cross-origin credentials set, or not.
     *
     * @return  {(EventSource|null)}  If connection can't be created or fails, NULL is returned.
     */
    $lsse(u, c, e = '', w = false) {
        if (!u || typeof c !== 'function') return null;  // nothing to listen

        const es = new EventSource(u, {withCredentials: w});
        if (!es) return null;
        const f = evt => { c(evt.data, evt.lastEventId, evt.origin); };

        if (!e) es.onmessage = f;
        else es.addEventListener(e, f);

        es.onerror = err => console.error(`'EventSource' ${(err.type ?? 'error')} @${VJS.__ms(err.timeStamp ?? 0)}`);
        return es;
    }

    /**
     * `closeServerSentEvents` - closes EventSource connection to the server, if any.
     *
     * @method  $csse
     *
     * @param   {EventSource}  eventSource
     */
    $csse(e) { if (e instanceof EventSource) e.close(); }


    /**
     * Inserts or returns elements HTML string.
     * 
     * @method  $html
     * @throws  {DOMException}   If no valid element found or given, method raises DOM exception with the corresponding name.
     *
     * @param   {(HTMLElement|string)}  element     HTMLElement or ID of element.
     * @param   {string=}               [text]      HTML string to add to the element; if empty, then returns elements content.
     * @param   {string=}               [position]  If empty string, then replaces child elements, or inserts HTML string by next values: `beforebegin` – before element itself; `afterbegin` – before its first child; `beforeend` – after its last child; `afterend` – after element itself.
     *
     * @return  {(string|undefined)}
     */
    $html(e, t = '', p = '') {
        e = VJS.__o(e, null);
        if (e) {
            if (t) {
                if (e instanceof Element) {
                    try {
                        if (p) {
                            if (!['beforebegin', 'afterbegin', 'beforeend', 'afterend'].includes(p)) p = 'beforeend';
                            e.insertAdjacentHTML(p, t);
                        }
                        else e.innerHTML = t;
                    }
                    catch (e) { VJS.__de(1, e.message, 0, e.name); }
                }
                else VJS.__de(1, VJS.E6, 1);
            }
            else return e.innerHTML;
        }
        else if (t) VJS.__de(1);
    }


    /**
     * Returns elements offset or undefined if element not found.
     * 
     * **Note!** This method takes into account scrollbar width/height and Documents client top/left position.
     *
     * @method  offset
     * @see     also {@link position|position()} and {@link $pos|$pos()} 
     * 
     * @param   {(HTMLElement|string)}  element  HTMLElement or ID of element.
     *
     * @return  {(Position|undefined)}
     */
    offset(e) {
        e = VJS.__o(e, null);
        if (!e) return undefined;

        const b = VJS.__i().$pos(e), d = document.documentElement, w = window;
        return {
            top:   b.top + w.scrollY - d.clientTop,
            left:  b.left + w.scrollX - d.clientLeft
        }
    }

    /**
     * Returns elements position or undefined if element not found.
     * 
     * **Note!** This method is not an alias of `$pos()`. Unlike a `$pos()`, this method returns position without margin.
     *
     * @method  position
     * @see     also {@link $pos|$pos()} and {@link offset|offset()} 
     * 
     * @param   {(HTMLElement|string)}  element  HTMLElement or ID of element.
     *
     * @return  {(Position|undefined)}
     */
    position(e) {
        e = VJS.__o(e, null);
        if (!e) return undefined;

        const b = VJS.__i().$pos(e), s = getComputedStyle(e);
        return {
            top:   b.top - parseInt(s.marginTop),
            left:  b.left - parseInt(s.marginLeft)
        }
    }

    /**
     * Returns serialized form data.
     * 
     * **Note!** The method differs from {@link $fd|$fd()} in a way that it doesn't check field requirements and returns only serialized string.
     *
     * @method  serialize
     * 
     * @see     Look also {@link $fd|$fd()}
     *
     * @param   {(HTMLElement|string)}  formElement
     * @param   {object}                extraData    Extra data to add to the form data.
     *
     * @return  {string}
     */
    serialize(f, e = {}) {
        f = VJS.__gf(f);
        if (!f) return '';

        let u = new URLSearchParams(f);
        if (typeof e === 'object' && Object.keys(e).length) {
            for (let [k, v] in e) u.append(k, v);
        }
        return u.toString();
    }

    /**
     * Checks if collection is live or not.
     *
     * @method  isLive
     * 
     * @param   {(HTMLCollection|NodeList)}  collection  HTMLCollection or NodeList to check.
     *
     * @return  {(boolean|undefined)}  If answer is inconclusive, returns `undefined`.
     */
    isLive(c) {
        if (c instanceof HTMLCollection) return true;
        const l = c.length;
        if (!l) return undefined;

        let e = c.item(0),
            p = e.parentNode,
            n = e.cloneNode();

        n.style = "display:none!important";
        p.appendChild(n);

        const i = c.length !== l;
        p.removeChild(n);

        return i;
    }

    /**
     * Checks if element is hidden or not.
     *
     * @method  isHidden
     * 
     * @param   {(HTMLElement|string)}  element
     *
     * @return  {boolean}
     */
    isHidden(e) {
        e = VJS.__o(e, null);
        return !(e.offsetWidth || e.offsetHeight || e.getClientRects().height);
    }

    /**
     * Checks if element is visible or not.
     *
     * @method  isVisible
     * 
     * @param   {(HTMLElement|string)}  element
     *
     * @return  {boolean}
     */
    isVisible(e) { return !VJS.__i().isHidden(e); }

    /**
     * Converts HTMLCollection/NodeList or HTMLElement to the array.
     *
     * @method  toArray
     * 
     * @param   {(HTMLCollection|NodeList|HTMLElement|string)}  element
     *
     * @return  {Array.<*>}
     */
    toArray(e) {
        e = VJS.__o(e);
        if (e instanceof NodeList || e instanceof HTMLCollection) return [...e];
        return [e];
    }



    // =========================================================================
    //    So-called private static helper methods (should not called outside)
    // =========================================================================

    /** @readonly */static get E1() { return 'VJS class works only in Browser!'; }
    /** @readonly */static get E2() { return 'Your Browser does not support ECMAScript11 (2020)!'; }
    /** @readonly */static get E3() { return 'Fill up required fields!'; }
    /** @readonly */static get E4() { return 'No data given.'; }
    /** @readonly */static get E5() { return 'No valid Element found.'; }
    /** @readonly */static get E6() { return 'No valid Element given.'; }
    /** @readonly */static get E7() { return 'Form not found.'; }
    /** @readonly */static get E8() { return 'Given data type not supported.'; }
    /** @readonly */static get RSC() {
        return {
            301: 'Moved Permanently', 307: 'Temporary Redirect', 308: 'Permanent Redirect',
            400: 'Bad Request', 401: 'Unauthorized', 403: 'Forbidden', 404: 'Not Found',
            406: 'Not Acceptable', 408: 'Request Timeout', 409: 'Conflict', 410: 'Gone',
            500: 'Internal Server Error', 501: 'Not Implemented', 502: 'Bad Gateway',
            503: 'Service Unavailable', 504: 'Gateway Timeout', 505: 'HTTP Version Not Supported'
        }
    };
    /** @private */static __v;  //* value (instance)
    /** @private */static __p;  //* prefix
    /** @private */static __$i(i) { return document.getElementById(i); }
    /** @private */static __$n(n) { return document.getElementsByName(n); }
    /** @private */static __$c(e, c) { return !e ? null : e.getElementsByClassName(c); }
    /** @private */static __$t(e, t) { return !e ? null : e.getElementsByTagName(t); }
    /** @private */static __$q(e, q, a) { try { return e[`querySelector${a ? 'All' : ''}`](q); } catch (_) { return null; } }
    /** @private */static _err(m) { throw new Error(m); }

    /** @private */  //* domError  (params:  `throw`, `message`, `notSupported`, `name`)
    static __de(t = 0, m = VJS.E5, s = 0, n = '') {
        if (t) throw new DOMException(m, s ? 'NotSupportedError' : (!n ? 'NotFoundError' : n));
    }

    /** @private */  //* getObject  (params:  `selector`, `firstSymbol`, `element`, `all`)
    static __go(s, f, e = null, a = 0) {
        if (typeof s !== 'string') return null;
        if (!['#', '.', '=', '@'].includes(s[0])) s = `${f}${s}`;  // don't add symbol `f`, if it has already

        return VJS.__e(s, e, a);
    }

    /** @private */  //* setPrefix  (param: `prefix`)
    static __sp(p = '') {
        p = p.trim();
        if (p) {
            p = p.replace(/[^\w\d]/gi, '');
            if (p) VJS.__p = p;
        }
    }

    /** @private */  //* minSec  (param:  `millisec`)
    static __ms(ms) {
        let s = ms / 1000,
            m = Math.floor(s/60),
            _f = n => n<10 ? `0${n}` : n;

        s = Math.round((s - m*60)*10) / 10;
        return `${_f(m)}:${_f(s)}`;
    }

    /** @private */  //* valueToNum  (param: `value`)
    static __vn(v) {
        if (typeof v !== 'string') return v;  // try to convert only string

        v = v.trim();

        // Don't convert empty string
        if (v === '') return '';

        // Try to convert to numeric value
        if (!isNaN(v)) {
            const _n = +v, _i = _n|0;

            if (_n === _i) return _i;
            return _n;
        }

        // Try to convert to boolean value
        const _v = v.toLowerCase();
        if (_v === 'true' || _v === 'on') return true;
        if (_v === 'false' || _v === 'off') return false;

        return v;  // finally return string
    }

    /** @private */  //* instance  (param: `prefix`)
    static __i(p = '') {
        if (!VJS.__v) VJS.__v = new VJS(p);
        else VJS.__sp(p);

        return VJS.__v;
    }

    /** @private */  //* object  (param: `element`, `default`)
    static __o(e, d) {
        if (!e) return null;  // don't do anything
        if (typeof e === 'string' && e[0] !== '#') e = `#${e}`;

        return this.__e(e, d) ?? null;
    }

    /** @private */  //* class  (params: `element`, `classList`, `function`)
    static __c(e, c, f) {
        e = this.__o(e, null);

        if (!e) return;
        if (!(c instanceof Array)) c = [c];

        e.classList[f](...c);
    }

    /** @private */  //* dataName  (params: `name`, `ignorePrefix`)
    static __dn(n, i = 0) {
        if (!n) return '';
        if (VJS.__p) return `data-${ i ? n : `${VJS.__p}-${n}` }`;

        return `data-${n}`;
    }

    /** @private */  //* dataAttributes  (params: `element`, `all`)
    static __da(e, a) {
        e = VJS.__o(e, null);
        if (!e) return undefined;

        let k = Object.keys(e.dataset),
            c = [];

        if (a || !VJS.__p) return k;

        k.forEach(d => {
            if (d.includes(VJS.__p)) c.push(d);
        });
        return c;
    }

    /** @private */  //* getForm  (param:  `formSelector`)
    static __gf(f) {
        if (!f) return null;
        if (!(f instanceof FormData)) { // try to convert to FormData
            if (f.constructor === {}.constructor) {  // is JSON
                let _f = new FormData();
                for (let k in f) _f.append(k, f[k]);
                f = _f;
            }
            else {
                let _f = VJS.__o(f, null);
                if (!(_f instanceof HTMLFormElement)) return null;  // "NotFormElement"
                f = new FormData(_f);
            }
        }
        return f;
    }

    /** @private */  //* heightWeight  (params:  `function`, `element`, `type`, `value`)
    static __hw(f, e, t, v) {
        e = VJS.__o(e, null);
        if (!e) return !v ? 0 : undefined;

        const ff = f.toLowerCase(),
              b = f === 'Height' ? ['Top', 'Bottom'] : ['Left', 'Right'];

        if (!v) {
            let r;

            if (t === 'inner') r = e[`client${f}`];
            else if (t === 'outer') r = e[`offset${f}`];
            else if (t === 'with-margin') {
                let s = getComputedStyle(e);
                r = e.getBoundingClientRect()[ff] + parseInt(s[`margin${b[0]}`]) + parseInt(s[`margin${b[1]}`]);
            }
            else r = parseInt(e.style[ff]);

            return r;
        }
        else {
            if (typeof v === 'function') v = v();
            if (typeof v === 'string') e.style[ff] = v;
            else e.style[ff] = `${v}px`;

            return undefined;
        }
    }
    /** @private */static __h(e, t, v) { return VJS.__hw('Height', e, t, v); }
    /** @private */static __w(e, t, v) { return VJS.__hw('Width', e, t, v); }

    /** @private */  //* element  (params: `stringQuery`, `element`, `all`)
    static __e(s, e, a = 0) {
        const d = document;

        if (typeof s === 'string') {
            s = s.trim();

            const _s = s.toLowerCase();
            if (!e) e = d;

            if (_s.match(/^\#?document$/)) return d;
            else if (_s.match(/^\#?window$/)) return window;
            else if (_s.match(/^\#[a-z][\w\-]+$/)) return VJS.__$i(s.substring(1));
            else if (_s.match(/^\.[a-z][\w\-]+$/)) {
                const r = VJS.__$c(VJS.__o(e), s.substring(1));
                return a ? r : r.item(0);
            }
            else if (_s.match(/^\=["']?[a-z][\w\-]+["']?$/)) {
                const r = VJS.__$n(s.substring(1));
                return a ? r : r.item(0);
            }
            else if (
                _s.match(/^\@[a-z][\w\-]*$/) ||
                _s.match(/^(?:h[1-6]|[abipqsu]|[a-z]{2,})$/)
            ) {
                const r = VJS.__$t(VJS.__o(e), s[0] === '@' ? s.substring(1) : s);
                return a ? r : r.item(0);
            }
            else return VJS.__$q(e, s, a);
        }
        else if (s instanceof Window) {
            if (!e && !a) return d;  // prevent requesting elements from `window`
            else return s;
        }
        else if (s instanceof Document || s instanceof HTMLElement) return s;
        else if (e === null) return e;
        else return d;  // default to `document`
    }


    /** @private */  //* formData  (params: `form`, `type`, `required`, `extraData`)
    static __fd(f, t, r = [], e = {}) {  // `t` values: "s" (string), "j" (JSON), or "fd" (FormData)
        f = VJS.__gf(f);

        if (!f) return {err: 'nfe'};  // "NotFormElement"
        if (!(r instanceof Array)) r = [r];  // just-in-case

        /// Check for existence of required fields
        let _r = [...r], i = [];

        for (let [k, v] of f) {  // or `[...f.entries()].map(([k, v]) => {`
            const _i = _r.indexOf(k);
            i.push(k);

            if (!v) {
                if (VJS.__i().$ha(k, 'required')) _r.push(k);
            }
            else if (_i > -1) _r.splice(_i, 1);
        }

        if (_r.length) return {err: 'mrf', data: _r, ids: i};  // "MissingRequiredField"

        /// Add extra data to FormData
        if (typeof e === 'object') {
            for (let k in e) f.append(k, e[k].trim());
        }

        let d;

        if (t === 's') d = new URLSearchParams(f).toString();
        else if (t === 'j') {
            d = Object
                .entries(Object.fromEntries(f))
                .reduce((_a, [_k, _v]) => {
                    return {
                        ..._a,
                        ...{
                            [ _k.replace(/\-([\w])/g, g => g[1].toUpperCase()) ]: VJS.__vn(_v)
                        }
                    };
                }, {});
        }
        else d = f;

        return {err: '', data: d};
    }


    /** @private */  //* bodyData  (params: `bodyData`, `url`, `isPost`)
    static __bd(b, u) {
        if (typeof b === 'string') {
            if (b[0] === '#') {
                const o = VJS.__fd(b, 'j');

                if (o.err === 'nfe') VJS.__de(1, VJS.E7);  // "NotFormElement"
                if (o.err === 'mrf') VJS.__err(VJS.E3);    // "Missing Required Field(s)"

                b = o.data;
            }
            else b = Object.fromEntries(new URLSearchParams(b));
        }
        else if (b instanceof FormData || b.constructor !== {}.constructor) {
            if (!b[Symbol.iterator]) throw new TypeError(VJS.E8);  // "Unsupported Data"

            let o = {}
            for (let [k, v] of b) o[k] = v;
            b = o;
        }
        return {...Object.fromEntries(u.searchParams), ...b};
    }

    /** @private */  //* request  (params: `url`, `blob`, `method`, `data`)
    static async __r(u, m = 'GET', d = {}) {
        m = m.toUpperCase();

        const _p = m === 'POST' || m === 'GET';  // GET for URL search params
        let f, _e, _u,
            o = {method: m, cache: 'no-cache'},
            success = false, data = null;

        try {
            _u = new URL(u);
            u = `${_u.origin}${_u.pathname}`;
            d = VJS.__bd(d, _u);
        }
        catch(e) { return {success, data, message: e.toString()}; }

        const b = _p ? new URLSearchParams(d).toString() : JSON.stringify(d);

        if (['PUT', 'PATCH', 'POST', 'DELETE'].includes(m)) {
            try {
                if (!Object.keys(d).length) {
                    if (m !== 'DELETE') throw new TypeError(VJS.E4);  // just-in-case
                }
                else {
                    o.mode = 'cors';
                    o.credentials = 'same-origin';
                    o.headers = {
                        'Content-Type': _p ? 'application/x-www-form-urlencoded' : 'application/json'
                    };
                    o.body = b;
                }
            }
            catch (e) { return {success, data, message: e.toString()} }
        }
        else if (b) u += `?${b}`;

        try { f = await fetch(u, o); }
        catch (e) { _e = e.toString(); }

        if (!f) return {success, data, message: _e};

        let r, ct = f.headers.get('Content-Type');
        success = f.ok;

        if (success) {
            let message = '';

            if (f.status === 204) message = '204 No Content';
            else {
                if (ct && ct.includes('/json')) {
                    data = await f.json();

                    // Try to convert JSON and Array values
                    if (data.constructor === {}.constructor || Array.isArray(data))
                        for (let k of Object.keys(data)) data[k] = VJS.__vn(data[k]);
                }
                else {
                    data = await f.blob();  // try to read as Blob
                    if (data.constructor.name !== 'Blob') data = await f.text();  // finally get plain text
                }
            }
            r = {success, data, message}
        }
        else r = {
            success, data,
            message: `Response: ${f.status} ${VJS.RSC[f.status] ?? ''}`
        };

        return r;
    }



    // =========================================================================
    //    Static methods
    // =========================================================================



    /**
     * Returns instance of VJS class or throws error, if `window` object doesn't exist (not in Browser).
     * 
     * @example
     * let vjs = VJS.getInstance();
     * 
     * @static
     * @method    getInstance
     * 
     * @constructs  VJS
     * @throws      {Error}    If script is not runned in Browser (ex. Node.js).
     * 
     * @param       {string=}  [prefix] String to be prepended to the data name (will be "remembered" statically).
     *
     * @return      {object}
     */
    static getInstance(p = '') { return VJS.__i(p); }

    /**
     * Registers VJS Methods to the window object (makes global functions).
     * 
     * **Warning!** To avoid conflicts don't use this function with jQuery.
     * 
     * @static
     * @function  register
     * 
     * @param   {string=}  [prefix] String to be prepended to the data name (will be "remembered" statically).
     *
     * @return  {void}
     */
    static register(p = '') {
        try {
            const v = VJS.getInstance(p);

            Object.getOwnPropertyNames(VJS.prototype)
                .filter(n => n!=='constructor' && !~n.indexOf('_'))
                .forEach(f => window[f] = v[f]);
        }
        catch(e) { console.error(`${e.name}: ${e.message}`); }
    }

}
