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


/**
 * Vanilla JS (`VJS`) class with common methods plus some syntactic sugars.
 * 
 * Targeted browsers: released since about mid 2016, like Chrome 50+, Edge 14+, Firefox 46+, Opera 37+, and Safari 10+. 
 * 
 * @version    0.1
 * @author     Jüri Kormik
 * 
 * @class
 * @throws           {Error}  If script is not runned in Browser (ex. Node.js)
 * @hideconstructor
 */
class VJS
{
    /** @ignore */
    constructor() {
        if (typeof window === 'undefined') throw new Error(VJS.E);
    }


    /**
     * `getElementById` - returns HTMLElement by ID.
     * 
     * @method  $
     * @see     alias {@link getElemById|getElemById()}
     * 
     * @param   {string}       id
     * 
     * @return  {HTMLElement}
     */
    $(i) {
        if (i[0] !== '#') i = `#${i}`;  // don't add `#` symbol, if it has already
        return VJS.__e(i);
    }
    /**
     * @method  getElemById
     * @see     read more {@link $|$()}
     */
    getElemById(i) { return VJS.__i().$(i); }

    /**
     * Similar to jQuery `$` function, but simplified version of it.
     * 
     * @method  $$
     * 
     * @param   {string}  queryString
     * 
     * @return  {(HTMLElement|HTMLCollection|NodeList)}
     */
    $$(s) { return VJS.__e(s, document, true); }

    /**
     * `getElementsByTagName` - returns a live HTMLCollection of all found elements or first HTMLElement by tag name.
     * 
     * @method  $t
     * @see     alias {@link getElemsByTagNm|getElemsByTagNm()}
     * 
     * @param   {string}                         tagName
     * @param   {(Document|HTMLElement|string)}  [element=document]    Document/HTMLElement or ID of element
     * @param   {boolean}                        [firstElement=false]  Return first element or all of them (HTMLCollection/NodeList)
     * 
     * @return  {(HTMLCollection|NodeList|HTMLElement)}  WebKit (like Firefox) browsers return `NodeList` instead of `HTMLCollection` (see {@link https://bugzil.la/14869|Firefox bug 14869})
     */
    $t(t, e = document, f = false) { return VJS.__e(t, e, !f); }
    /**
     * @method  getElemsByTagNm
     * @see     read more {@link $t|$t()}
     */
    getElemsByTagNm (t, e = document, f = false) { return VJS.__e(t, e, !f); }

    /**
     * `getElementsByClassName` - returns a live HTMLCollection of all found elements by class name.
     *
     * @method  $c
     * @see     alias {@link getElemsByClassNm|getElemsByClassNm()}
     * 
     * @param   {string}                         className
     * @param   {(Document|HTMLElement|string)}  [element=document]    Document/HTMLElement or ID of element
     * @param   {boolean}                        [firstElement=false]  Return first element or all of them (HTMLCollection/NodeList)
     * 
     * @return  {HTMLCollection}
     */
    $c(c, e = document, f = false) {
        if (c[0] !== '.') c = `.${c}`;  // don't add `.` symbol, if it has already
        return VJS.__e(c, e, !f);
    }
    /**
     * @method  getElemsByClassNm
     * @see     read more {@link $c|$c()}
     */
    getElemsByClassNm(c, e = document, f = false) { return VJS.__i().$c(c, e, f); }

    /**
     * `querySelector` - returns a static (not live) NodeList if `all = true`, HTMLElement otherwise.
     *
     * @method  $q
     * @see     alias {@link querySel|querySel()}
     * 
     * @param   {string}                         queryString
     * @param   {(Document|HTMLElement|string)}  [element=document]  Document/HTMLElement or ID of element
     * @param   {boolean}                        [all=false]         Return all found elements (HTMLCollection/NodeList) or only first one
     * 
     * @return  {(HTMLElement|HTMLCollection|NodeList)}
     */
    $q(q, e = document, a = false) { return VJS.__e(q, e, a); }
    /**
     * @method  querySel
     * @see     read more {@link $q|$q()}
     */
    querySel(q, e = document, a = false) { return VJS.__e(q, e, a); }

    /**
     * `filter` - returns an array of a static (not live) NodeList or live HTMLCollection of filtered (by function) elements.
     *
     * @method  $f
     * @see     alias {@link filter|filter()}
     * 
     * @param   {string}    selector          Element or query string to search for
     * @param   {Function}  callbackFunction  Function to use for filtering
     *
     * @return  {(NodeList[]|HTMLCollection[]|HTMLElement[])}
     */
    $f(s, c) { return [...VJS.__i().$$(s)].filter(c); }
    /**
     * @method  filter
     * @see     read more {@link $f|$f()}
     */
    filter(s, c) { return this.$f(s, c); }

    /**
     * `createElement` - creates new HTML Element by tagName, or an HTMLUnknownElement if tagName isn't recognized.
     *
     * @method  $ce
     * @see     alias {@link createElem|createElem()}
     * 
     * @param   {string}   [tagName=div]  Name of the element to be created
     * @param   {string=}  [optionsIs]    Name of the custom element
     *
     * @return  {(Element|HTMLUnknownElement)}
     */
    $ce(t = 'div', is = '')
    {
        if (typeof t !== 'string') return null;
        let p = [t];
        if (is) p.push({is});
        return document.createElement(...p);
    }
    /**
     * @method  createElem
     * @see     read more {@link $ce|$ce()}
     */
    createElem(t = 'div', i = '') { return VJS.__i().$ce(t, i); }

    /**
     * `createElements` - creates new HTML Element(s) by html string, and/or add to the specified element.
     *
     * @method  $cels
     * @see     alias {@link createElems|createElems()}
     * 
     * @param   {string}                 html
     * @param   {?(HTMLElement|string)}  [element=null]  An element to which add newly created elements
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
     * `containsSelector` - returns array of HTML Elements, that contain specified text, or all of them.
     *
     * @method  $cs
     * @see     alias {@link containsSel|containsSel()}
     * 
     * @param   {string}   selector       Element or query string to search for
     * @param   {string=}  [includeText]  The text that the element should contains
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
     * @see     alias {@link hasAttr|hasAttr()}
     * 
     * @param   {(HTMLElement|string)}  element           Document/HTMLElement or ID of element
     * @param   {string=}               [attributeName]   Name of the elements attribute
     *
     * @return  {boolean}
     */
    $ha(e, n = '') {
        e = VJS.__o(e);
        if (!e) return false;
        return (!n ? e.hasAttributes() : e.hasAttribute(n));
    }
    /**
     * @method  hasAttr
     * @see     read more {@link $ha|$ha()}
     */
    hasAttr(e, n = '') { return VJS.__i().$ha(e, n); }

    /**
     * `getAttribute` - returns elements attribute value or empty string.
     *
     * @method  $ga
     * @see     alias {@link getAttr|getAttr()}
     * 
     * @param   {(HTMLElement|string)}  element        Document/HTMLElement or ID of element
     * @param   {string}                attributeName  Name of the elements attribute
     *
     * @return  {string}
     */
    $ga(e, n) {
        e = VJS.__o(e);
        if (!e) return '';
        return (VJS.__i().$ha(e, n) ? e.getAttribute(n) : '');
    }
    /**
     * @method  getAttr
     * @see     read more {@link $ga|$ga()}
     */
    getAttr(e, n) { return VJS.__i().$ga(e, n); }

    /**
     * `setAttribute` - sets elements attribute value; attributes with boolean value don't need value.
     *
     * @method  $sa
     * @see     alias {@link setAttr|setAttr()}
     * 
     * @param   {(HTMLElement|string)}  element        Document/HTMLElement or ID of element
     * @param   {string}                attributeName  Name of the elements attribute
     * @param   {(string|boolean)}      [value=true]   Value of the elements attribute
     */
    $sa(e, n, v = true) {
        e = VJS.__o(e);
        if (!e) return;
        if (typeof v === 'boolean') e.setAttribute(n, n);
        else e.setAttribute(n, v);
    }
    /**
     * @method  setAttr
     * @see     read more {@link $sa|$sa()}
     */
    setAttr(e, n, v = true) { VJS.__i().$sa(e, n, v); }

    /**
     * `removeAttribute` - removes attribute from element.
     *
     * @method  $ra
     * @see     alias {@link remAttr|remAttr()}
     * 
     * @param   {(HTMLElement|string)}  element        Document/HTMLElement or ID of element
     * @param   {string}                attributeName  Name of the elements attribute
     */
    $ra(e, n) {
        e = VJS.__o(e);
        if (e) e.removeAttribute(n);
    }
    /**
     * @method  remAttr
     * @see     read more {@link $ra|$ra()}
     */
    remAttr(e, n) { VJS.__i().$ra(e, n); }

    /**
     * `setTimeout` / `setInterval` - sets timeout or interval to call a function.
     *
     * @method  $st
     * 
     * @param   {Function}    function          Function to call after time is up
     * @param   {number}      seconds           Timeout in seconds
     * @param   {Array.<*>}   [parameters=[]]   Array of parameters or just one parameter to be passed to the function
     * @param   {boolean}     [interval=false]  Set interval instead of timeout
     *
     * @return  {number}  `timeoutID`, that can be passed to {@link $ct|$ct()} to cancel timeout
     */
    $st(f, s, p = [], i = false) {
        let t = s * 1000;
        if (!t) return 0;
        if (!(p instanceof Array)) p = [p];
        if (!p.length) return i ? setInterval(f, t) : setTimeout(f, t);
        return i ? setInterval(f, t, ...p) : setTimeout(f, t, ...p);
    }

    /**
     * `clearTimeout` / `clearInterval` - clears/resets timeout or interval.
     *
     * @method  $ct
     * 
     * @param   {number}   id                `timoutID` or `intervalID`
     * @param   {boolean}  [interval=false]  Clear interval instead of timeout
     */
    $ct(d, i = false) {
        if (!d) return;
        if (i) clearInterval(d);
        else clearTimeout(d);
    }

    /**
     * `hasDataAttribute` - returns boolean value if element has data attribute, or any attributes at all (if attribute name is empty string).
     *
     * @method  $hda
     * @see     alias {@link hasDataAttr|hasDataAttr()}
     * 
     * @param   {(HTMLElement|string)}  element        Document/HTMLElement or ID of element
     * @param   {string}                attributeName  Name of the elements attribute
     * @param   {string=}               [prefix]       Prefix of the elements data attribute name
     *
     * @return  {boolean}
     */
    $hda(e, n, p = '') {
        if (!n) return VJS.__i().$ha(e);
        return VJS.__i().$ha(e, VJS.__d(n, p));
    }
    /**
     * @method  hasDataAttr
     * @see     read more {@link $hda|$hda()}
     */
    hasDataAttr(e, n, p = '') { return VJS.__i().$hda(e, n, p); }

    /**
     * `getDataAttribute` - returns elements data attribute value or empty string.
     *
     * @method  $gda
     * @see     alias {@link getDataAttr|getDataAttr()}
     * 
     * @param   {(HTMLElement|string)}  element        Document/HTMLElement or ID of element
     * @param   {string}                attributeName  Name of the elements attribute
     * @param   {string=}               [prefix]       Prefix of the elements data attribute name
     *
     * @return  {string}
     */
    $gda(e, n, p = '') {
        if (!n) return '';
        return VJS.__i().$ga(e, VJS.__d(n, p));
    }
    /**
     * @method  getDataAttr
     * @see     read more {@link $gda|$gda()}
     */
    getDataAttr(e, n, p = '') { return VJS.__i().$gda(e, n, p); }

    /**
     * `setDataAttribute` - sets elements data attribute value.
     *
     * @method  $sda
     * @see     alias {@link setDataAttr|setDataAttr()}
     * 
     * @param   {(HTMLElement|string)}  element        Document/HTMLElement or ID of element
     * @param   {string}                attributeName  Name of the elements attribute
     * @param   {string=}               [prefix]       Prefix of the elements data attribute name
     * @param   {(string|boolean)}      [value=true]   Value of the elements attribute
     */
    $sda(e, n, p = '', v = true) {
        if (n) {
            if (typeof v === 'boolean') v = v|0;  // turn boolean value to integer
            VJS.__i().$sa(e, VJS.__d(n, p), v);
        }
    }
    /**
     * @method  setDataAttr
     * @see     read more {@link $sda|$sda()}
     */
    setDataAttr(e, n, p = '', v = true) { VJS.__i().$dsa(e, n, p, v); }

    /**
     * `removeDataAttribute` - removes attribute from element.
     *
     * @method  $rda
     * @see     alias {@link remDataAttr|remDataAttr()}
     * 
     * @param   {(HTMLElement|string)}  element        Document/HTMLElement or ID of element
     * @param   {string}                attributeName  Name of the elements attribute
     * @param   {string=}               [prefix]       Prefix of the elements data attribute name
     */
    $rda(e, n, p = '') { if (n) VJS.__i().$ra(e, VJS.__d(n, p)); }
    /**
     * @method  remDataAttr
     * @see     read more {@link $rda|$rda()}
     */
    remDataAttr(e, n, p = '') { VJS.__i().$rda(e, n, p); }

    /**
     * `classContains` - returns boolean value if the element contains class name or not.
     *
     * @method  $clc
     * @see     alias {@link classCont|classCont()}
     * 
     * @param   {(HTMLElement|string)}  element    HTMLElement or ID of element
     * @param   {string}                className  Class name to check
     */
    $clc(e, c) {
        e = VJS.__o(e);
        return !e ? false : e.classList.contains(c);
    }
    /**
     * @method  classCont
     * @see     read more {@link $clc|$clc()}
     */
    classCont(e, o) { VJS.__i().$clc(e, o); }

    /**
     * `classAdd` - adds class name or array of class names to the element.
     *
     * @method  $cla
     * @see     alias {@link classAdd|classAdd()}
     * 
     * @param   {(HTMLElement|string)}  element    HTMLElement or ID of element
     * @param   {(string|string[])}     className  Class name or array of class names to add
     */
    $cla(e, c) { VJS.__c(e, c, 'add'); }
    /**
     * @method  classAdd
     * @see     read more {@link $cla|$cla()}
     */
    classAdd(e, c) { VJS.__i().$cla(e, c); }

    /**
     * `classRemove` - removes class name or array of class names from the element.
     *
     * @method  $clr
     * @see     alias {@link classRem|classRem()}
     * 
     * @param   {(HTMLElement|string)}  element    HTMLElement or ID of element
     * @param   {(string|string[])}     className  Class name or array of class names to remove
     */
    $clr(e, c) { VJS.__c(e, c, 'remove'); }
    /**
     * @method  classRem
     * @see     read more {@link $clr|$clr()}
     */
    classRem(e, c) { VJS.__i().$clr(e, c); }

    /**
     * `classReplace` - replaces elements old class name with new one.
     *
     * @method  $clp
     * @see     alias {@link classRepl|classRepl()}
     * 
     * @param   {(HTMLElement|string)}  element       HTMLElement or ID of element
     * @param   {string}                oldClassName  Class name to be replaced
     * @param   {string}                newClassName  Class name to replace with
     */
    $clp(e, o, n) { VJS.__c(e, [o, n], 'replace'); }
    /**
     * @method  classRepl
     * @see     read more {@link $clp|$clp()}
     */
    classRepl(e, o, n) { VJS.__i().$clp(e, o, n); }

    /**
     * `classToggle` - toggles class name in the element.
     *
     * @method  $clt
     * @see     alias {@link classTogg|classTogg()}
     * 
     * @param   {(HTMLElement|string)}  element    HTMLElement or ID of element
     * @param   {string}                className  Class name to toggle
     * @param   {boolean=}              [force]    If set, toggles one way-only (`true` - sets; `false` - removes)
     */
    $clt(e, c, f) {
        if (typeof f !== 'undefined') c = [c, f];
        VJS.__c(e, c, 'toggle');
    }
    /**
     * @method  classTogg
     * @see     read more {@link $clt|$clt()}
     */
    classTogg(e, c, f) { VJS.__i().$clt(e, c, f); }

    /**
     * `addEventListener` - adds event listener to the element or elements.
     *
     * @method  $ael
     * @see     alias {@link addEvtListen|addEvtListen()}
     * @see     Look also {@link $aels|$aels()} (alias {@link addEvtListens|addEvtListens()})
     * 
     * @param   {Function}              function          Function to call, if event occurs
     * @param   {string}                [event=load]      Name of the event to listen
     * @param   {(HTMLElement|string)}  [element=window]  Document/HTMLElement or ID of element (or array of elements)
     */
    $ael(f, v = 'load', e = window) {
        if (typeof f !== 'function') return;
        if (e instanceof Array) return VJS.__i().$aels(f, v, e);  // in case of array of elements
        e = VJS.__o(e);
        if (!e) return;
        e.addEventListener(v, f);
    }
    /**
     * @method  addEvtListen
     * @see     read more {@link $ael|$ael()}
     */
    addEvtListen(f, v = 'load', e = window) { VJS.__i().$ael(f, v, e); }

    /**
     * `removeEventListener` - removes event listener from the element or elements.
     *
     * @method  $rel
     * @see     alias {@link remEvtListen|remEvtListen()}
     * @see     Look also {@link $rels|$rels()} (alias {@link addEvtListens|addEvtListens()})
     * 
     * @param   {Function}              function          Function to call, if event occurs
     * @param   {string}                [event=load]      Name of the event to listen
     * @param   {(HTMLElement|string)}  [element=window]  Document/HTMLElement or ID of element (or array of elements)
     */
    $rel(f, v = 'load', e = window) {
        if (typeof f !== 'function') return;
        if (e instanceof Array) return VJS.__i().$rels(f, v, e);  // in case of array of elements
        e = VJS.__o(e);
        if (!e) return;
        e.removeEventListener(v, f);
    }
    /**
     * @method  remEvtListen
     * @see     read more {@link $rel|$rel()}
     */
    remEvtListen(f, v = 'load', e = window) { VJS.__i().$rel(f, v, e); }

    /**
     * `addEventListeners` - adds event listener to several elements at once.
     *
     * @method  $aels
     * @see     alias {@link addEvtListens|addEvtListens()}
     * @see     Look also {@link $ael|$ael()} (alias {@link addEvtListen|addEvtListen()})
     * 
     * @param   {Function}                  function       Function to call, if event occurs
     * @param   {string}                    event          Name of the event to listen
     * @param   {(HTMLElement[]|string[])}  [elements=[]]  Array of Document/HTMLElement objects or IDs
     */
    $aels(f, v, e = []) {
        if (e instanceof Array) e.forEach(i => VJS.__i().$ael(f, v, i));
        else VJS.__i().$ael(f, v, e);  // just-in-case
    }
    /**
     * @method  addEvtListens
     * @see     read more {@link $aels|$aels()}
     */
    addEvtListens(f, v, e = []) { VJS.__i().$aels(f, v, e); }

    /**
     * `removeEventListeners` - removes event listener from several elements at once.
     *
     * @method  $rels
     * @see     alias {@link remEvtListens|remEvtListens()}
     * @see     Look also {@link $ael|$ael()} (alias {@link remEvtListen|remEvtListen()})
     * 
     * @param   {Function}                  function       Function to call, if event occurs
     * @param   {string}                    event          Name of the event to listen
     * @param   {(HTMLElement[]|string[])}  [elements=[]]  Array of Document/HTMLElement objects or IDs
     */
    $rels(f, v, e = []) {
        if (e instanceof Array) e.forEach(i => VJS.__i().$rel(f, v, i));
        else VJS.__i().$rel(f, v, e);  // just-in-case
    }
    /**
     * @method  remEvtListens
     * @see     read more {@link $rels|$rels()}
     */
    remEvtListens(f, v, e = []) { VJS.__i().$rels(f, v, e); }



    // =========================================================================
    //    So-called private static helper methods (should not called outside)
    // =========================================================================

    /** @ignore @readonly */static get E() { return 'VJS class works only in Browser!'; }
    /** @private */static __v;
    /** @private */static __$(i) { return document.getElementById(i); }
    /** @private */static __$t(e, t) { return e.getElementsByTagName(t); }
    /** @private */static __$c(e, c) { return e.getElementsByClassName(c); }
    /** @private */static __$q(e, q, a) { return e[`querySelector${a ? 'All' : ''}`](q); }

    /** @private */
    static __i() {
        if (!VJS.__v) VJS.__v = new VJS();
        return VJS.__v;
    }

    /** @private */
    static __o(e, d = null) {
        if (typeof e === 'string' && e[0] !== '#') e = `#${e}`;
        return this.__e(e) ?? d;
    }

    /** @private */
    static __d(n, p = '') {
        if (!n) return '';
        if (p) return `data-${p}-${n}`;
        return `data-${n}`;
    }

    /** @private */
    static __c(e, c, f) {
        e = this.__o(e);
        if (!e) return;
        if (!(c instanceof Array)) c = [c];
        else e.classList[f](...c);
    }

    /** @private */
    static __e(s, e = null, a = false) {
        let d = document;

        if (typeof s === 'string') {
            s = s.toLowerCase();

            if (s === 'document') return d;
            else if (s === 'window') return window;
            else if (s.match(/^\#[a-z0-9_\-]+$/i)) return VJS.__$(s.substring(1));
            else if (s.match(/^\.[a-z0-9_\-]+$/i)) {
                let r = VJS.__$c(VJS.__o(e, d), s.substring(1));
                return a ? r : r.item(0);
            }
            else if (s.match(/^(?:h[1-6]|[abipqsu]|[a-z]{2,})$/i)) {
                let r = VJS.__$t(VJS.__o(e, d), s);
                return a ? r : r.item(0);
            }
            else return VJS.__$q(VJS.__o(e, d), s, a);
        }
        else if (s instanceof Window) {
            if (!e && !a) return d;  // prevent requesting elements from `window`
            else return s;
        }
        else if (s instanceof Document || s instanceof HTMLElement) return s;
        else return d;  // default to `document`
    }



    // =========================================================================
    //    Static methods
    // =========================================================================



    /**
     * Returns instance of VJS class or throws error, if `window` object doesn't exist (not in Browser).
     * 
     * @static
     * @method    getInstance
     * 
     * @constructs  VJS
     * @throws      {Error}  If script is not runned in Browser (ex. Node.js)
     * 
     * @return      {VJS}
     */
    static getInstance() { return VJS.__i(); }

    /**
     * Registers VJS Methods to the window object (makes global functions).
     * 
     * *Warning!* To avoid conflicts don't use this method with jQuery.
     * 
     * @static
     * @method  register
     * 
     * @return  {void}
     */
    static register() {
        try {
            let v = VJS.getInstance();

            Object.getOwnPropertyNames(VJS.prototype)
                .filter(n => n!=='constructor' && !~n.indexOf('__'))
                .forEach(f => window[f] = v[f]);
        }
        catch(e) { console.error(`${e.name}: ${e.message}`); }
    }

}
