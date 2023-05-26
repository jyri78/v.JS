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
 * @typedef  {Object} Position
 * @property {number} top
 * @property {number} left
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
 * @throws           {Error}  If script is not runned in Browser (ex. Node.js), or Browser doesn't support ECMAScript11 (2020).
 */
class VJS
{
    /**
     * Constructor of VJS.
     *
     * @param   {string=}  [prefix] String to be prepended to the data name (will be "remembered" statically)
     *
     * @return  {VJS}
     */
    constructor(p = '') {
        if (typeof window === 'undefined') throw new Error(VJS.E1);
        if (typeof String.prototype.replaceAll !== 'function') throw new Error(VJS.E2);

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
     * @see     also alternatives {@link $i|$i()}, {@link $n|$n()}, {@link $c|$c()}, and {@link $t|$t()}
     * 
     * @param   {string}                         selector
     * @param   {(Document|HTMLElement|string)}  [element=document]  Document/HTMLElement or ID of element (if can be used)
     * @param   {boolean}                        [all=false]         Return HTMLCollection/NodeList of HTMLElements
     * 
     * @return  {(HTMLElement|HTMLCollection|NodeList|null)}
     */
    $(s, e = document, a = false) { return VJS.__e(s, e, a); }

    /**
     * `getElementByDataAttributeValue` - returns HTMLElement or `NULL` by other elements data attribute value.
     * 
     * @method  $$
     *
     * @param   {(HTMLElement|string)}  element      Where data attribute to look for
     * @param   {string}                name         Data attribute name
     * @param   {string}                [type=id]    How to handle data attributes value; accepted values are `id`, `class`, `name` and `tag` (all other types are ignored and attribute value is hadled as query string)
     * @param   {boolean}               [all=false]  Return HTMLCollection/NodeList of HTMLElements
     *
     * @return  {(HTMLElement|HTMLCollection|NodeList|null)}
     */
    $$(e, n, t = 'id', a = false) {
        let s = {id: '#', class: '.', name: '=', tag: '@'},
            i = VJS.__i(),
            q = i.$gda(e, n);  // get data attribute value (selector)

        if (!q) return null;
        if (Object.keys(s).includes(t)) q = `${s[t]}${q}`;
        return i.$(q, 0, a);  // '0' defaults to `document`
    }

    /**
     * `getElementByDataAttributeValueName` - returns HTMLElement or `NULL` by other elements data attribute value (handles as name).
     * 
     * @method  $$n
     *
     * @param   {(HTMLElement|string)}  element      Where data attribute to look for
     * @param   {string}                name         Data attribute name
     * @param   {boolean}               [all=false]  Return HTMLCollection/NodeList of HTMLElements
     * 
     * @return  {(HTMLElement|NodeList|null)}
     */
    $$n(e, n, a = false) { return VJS.__i().$$(e, n, 'name', a); }

    /**
     * `getElementByDataAttributeValueClass` - returns HTMLElement or `NULL` by other elements data attribute value (handles as class).
     * 
     * @method  $$c
     *
     * @param   {(HTMLElement|string)}  element     Where data attribute to look for
     * @param   {string}                name        Data attribute name
     * @param   {boolean}               [all=false]  Return HTMLCollection/NodeList of HTMLElements
     * 
     * @return  {(HTMLElement|HTMLCollection|null)}
     */
    $$c(e, n, a = false) { return VJS.__i().$$(e, n, 'class', a); }

    /**
     * `getElementByDataAttributeValueTagName` - returns HTMLElement or `NULL` by other elements data attribute value (handles as tag name).
     * 
     * @method  $$t
     *
     * @param   {(HTMLElement|string)}  element    Where data attribute to look for
     * @param   {string}                name       Data attribute name
     * @param   {boolean}               [all=false]  Return HTMLCollection/NodeList of HTMLElements
     * 
     * @return  {(HTMLElement|HTMLCollection|NodeList|null)}
     */
    $$t(e, n, a = false) { return VJS.__i().$$(e, n, 'tag', a); }

    /**
     * `getElementByDataAttributeValueQuery` - returns HTMLElement or `NULL` by other elements data attribute value (handles as query string).
     * 
     * @method  $$q
     *
     * @param   {(HTMLElement|string)}  element      Where data attribute to look for
     * @param   {string}                name         Data attribute name
     * @param   {boolean}               [all=false]  Return HTMLCollection/NodeList of HTMLElements
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
     * @param   {string}   name                  Value of attribute `name`
     * @param   {boolean}  [firstElement=false]  Return first HTML element or all of them (HTMLCollection/NodeList)
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
     * @param   {(Document|HTMLElement|string)}  [element=document]    Document/HTMLElement or ID of element
     * @param   {boolean}                        [firstElement=false]  Return first HTML element or all of them (HTMLCollection)
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
     * @param   {(Document|HTMLElement|string)}  [element=document]    Document/HTMLElement or ID of element
     * @param   {boolean}                        [firstElement=false]  Return first HTML element or all of them (HTMLCollection/NodeList)
     * 
     * @return  {(HTMLCollection|NodeList|HTMLElement|null)}  WebKit (like Firefox) browsers return `NodeList` instead of `HTMLCollection` (see {@link https://bugzil.la/14869|Firefox bug 14869})
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
     * @param   {boolean}                        [all=false]         Return all found elements (NodeList)
     * 
     * @return  {(HTMLElement|HTMLCollection|NodeList|null)}
     */
    $q(q, a = false) { return VJS.__$q(q, a); }
    /**
     * @method  querySel
     * @see     read more {@link $q|$q()}
     */
    querySel(q, a = false) { return VJS.__$q(q, a); }

    /**
     * `filter` - returns an array of HTMLElements of filtered (by function) HTMLCollection/NodeList.
     *
     * @method  $f
     * @see     alias {@link filter|filter()}
     * 
     * @param   {(HTMLElement|string)}  selector          Element or query string to search for, or data attribute name, if `dataAttribute` is set
     * @param   {Function}              callbackFunction  Function to use for filtering
     * @param   {string=}               dataAttribute     If set, use query string by other elements data attribute; value should be in format `<ID>|<type>`; accepted types are `id`, `class`, `name` and `tag`
     *
     * @return  {HTMLElement[]}
     */
    $f(s, c, d = '') {
        let o;

        if(!d) o = VJS.__i().$(s, 0, true);  // '0' defaults to `document`
        else {
            let p = d.split('|');
            if (p.length < 2) return [];  // avoid error
            o = VJS.__i().$$(p[0], s, p[1], true);
        }

        if (!o) return [];
        if (o instanceof HTMLElement) return [o];
        if (!o?.[Symbol.iterator]) return [];  // just-in-case, but shouldn't happen
        return [...o].filter(c);
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
     * 
     * @param   {(HTMLElement|string)}  element
     * @param   {string=}               [type]   Type of height to return:  `inner` – elements height with padding;  `outer` – elements height with padding, border and scrollbar;  `with-margin` – computed `outer` + margin
     * @param   {(string|number)}       [value]  Value to set as elements height, `type` is ignored
     *
     * @return  {number}
     */
    $h(e, t = '', v = null) {
        let r = VJS.__h(e, t, v);
        if (!v) return r;
    }

    /**
     * `width` - returns or sets elements width.
     *
     * @method  $w
     * @see     alias {@link width|width()}
     * 
     * @param   {(HTMLElement|string)}  element
     * @param   {string=}               [type]   Type of width to return:  `inner` – elements width with padding;  `outer` – elements width with padding, border and scrollbar;  `with-margin` – computed `outer` + margin
     * @param   {(string|number)}       [value]  Value to set as elements height, `type` is ignored
     *
     * @return  {number}
     */
    $w(e, t = '', v = null) {
        let r = VJS.__w(e, t, v);
        if (!v) return r;
    }

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
     * @param   {(HTMLElement|string)}  selector       Element or query string to search for
     * @param   {string=}               [includeText]  The text that the element should contains
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
     * @param   {(HTMLElement|string)}  element           Document/HTMLElement or ID of element
     * @param   {string=}               [attributeName]   Name of the elements attribute
     *
     * @return  {(boolean|undefined)}  If no valid element given, returns `undefined`, otherwise boolean value
     */
    $ha(e, n = '') {
        e = VJS.__o(e);
        if (!e) return undefined;
        return (!n ? e.hasAttributes() : e.hasAttribute(n));
    }
    /**
     * @method  hasAttrib
     * @see     read more {@link $ha|$ha()}
     */
    hasAttrib(e, n = '') { return VJS.__i().$ha(e, n); }

    /**
     * `getAttribute` - returns elements attribute value or empty string.
     *
     * @method  $ga
     * @see     alias {@link getAttrib|getAttrib()}
     * 
     * @param   {(HTMLElement|string)}  element              Document/HTMLElement or ID of element
     * @param   {string}                attributeName        Name of the elements attribute
     * @param   {(string|null)=}        [defaultValue=null]  Default value to return, if attribute not found
     *
     * @return  {(string|null)}
     */
    $ga(e, n, d = null) {
        e = VJS.__o(e);
        if (!e) return d;
        return (VJS.__i().$ha(e, n) ? (e.getAttribute(n) ?? d) : d);
    }
    /**
     * @method  getAttrib
     * @see     read more {@link $ga|$ga()}
     */
    getAttrib(e, n, d = null) { return VJS.__i().$ga(e, n, d); }

    /**
     * `setAttribute` - sets elements attribute value; attributes with boolean value don't need value.
     *
     * @method  $sa
     * @see     alias {@link setAttrib|setAttrib()}
     * 
     * @param   {(HTMLElement|string)}  element        Document/HTMLElement or ID of element
     * @param   {string}                attributeName  Name of the elements attribute
     * @param   {(string|boolean)}      [value=true]   Value of the elements attribute; **note:** if set to boolean `false`, then attribute will be removed
     */
    $sa(e, n, v = true) {
        e = VJS.__o(e);
        if (!e) return;
        if (typeof v === 'boolean') {
            if (v) e.setAttribute(n, n);
            else VJS.__i().$ra(e, n);  // remove instead of setting
        }
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
     * @param   {(HTMLElement|string)}  element        Document/HTMLElement or ID of element
     * @param   {string}                attributeName  Name of the elements attribute
     */
    $ra(e, n) {
        e = VJS.__o(e);
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
     * Returns form data.
     * 
     * @method  $fd
     * @throws  {(DOMException|Error)}  If form not found, then function throws `DOMException` **NotFoundError**. If missing some required fields and validation classes not given, then function throws `Error`.
     *
     * @todo    Add to parameter `required` extra validation data and update validation functionality.
     * 
     * @param   {(HTMLElement|string)}               form               Form element or ID of form
     * @param   {string[]}                           [required=[]]      IDs of required fields
     * @param   {object}                             [extraData={}]     Additional data to be added
     * @param   {string}                             [type=FormData]    Type of returned data. Accepted values are:  `string`, `json`, or `FormData`
     * @param   {{error: string, success: string}=}  [validationClass]  Validation class to be set; for example for Bootstrap it would be `{error: 'is-invalid', success: 'is-valid'}`
     *
     * @return  {(FormData|object|string)}
     */
    $fd(f, r = [], e = {}, t = '', v = null) {
        t = t.toLowerCase();
        if (['string', 'json'].includes(t)) t = t.substring(0, 1);
        else t = 'fd';

        let o = VJS.__fd(f, r, e, t);

        if (o.err === 'nfe') throw new DOMException('Form not found', 'NotFoundError');
        if (o.err === 'mrf') {  // "Missing Required Field(s)"
            if (v && v.error && v.success) {
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
            else throw new Error('Fill up required fields');
        }

        return o.data;
    }

    /**
     * `hasDataAttribute` - returns boolean value if element has data attribute, or any attributes at all (if attribute name is empty string).
     *
     * @method  $hda
     * @see     alias {@link hasDataAttrib|hasDataAttrib()}
     * 
     * @param   {(HTMLElement|string)}  element        Document/HTMLElement or ID of element
     * @param   {string}                attributeName  Name of the elements attribute
     *
     * @return  {boolean}
     */
    $hda(e, n) {
        if (!n) return VJS.__i().$ha(e);
        return VJS.__i().$ha(e, VJS.__dn(n));
    }
    /**
     * @method  hasDataAttrib
     * @see     read more {@link $hda|$hda()}
     */
    hasDataAttrib(e, n) { return VJS.__i().$hda(e, n); }

    /**
     * `getDataAttribute` - returns elements data attribute value or empty string.
     *
     * @method  $gda
     * @see     alias {@link getDataAttrib|getDataAttrib()}
     * 
     * @param   {(HTMLElement|string)}  element        Document/HTMLElement or ID of element
     * @param   {string}                attributeName  Name of the elements attribute
     *
     * @return  {string}
     */
    $gda(e, n) {
        if (!n) return '';
        return VJS.__i().$ga(e, VJS.__dn(n));
    }
    /**
     * @method  getDataAttrib
     * @see     read more {@link $gda|$gda()}
     */
    getDataAttrib(e, n) { return VJS.__i().$gda(e, n); }

    /**
     * `setDataAttribute` - sets elements data attribute value.
     *
     * @method  $sda
     * @see     alias {@link setDataAttrib|setDataAttrib()}
     * 
     * @param   {(HTMLElement|string)}  element        Document/HTMLElement or ID of element
     * @param   {string}                attributeName  Name of the elements attribute
     * @param   {(string|boolean)}      [value=true]   Value of the elements attribute
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
    setDataAttrib(e, n, v = true) { VJS.__i().$dsa(e, n, v); }

    /**
     * `removeDataAttribute` - removes attribute from element.
     *
     * @method  $rda
     * @see     alias {@link remDataAttrib|remDataAttrib()}
     * 
     * @param   {(HTMLElement|string)}  element        Document/HTMLElement or ID of element
     * @param   {string}                attributeName  Name of the elements attribute
     */
    $rda(e, n) { if (n) VJS.__i().$ra(e, VJS.__dn(n)); }
    /**
     * @method  remDataAttrib
     * @see     read more {@link $rda|$rda()}
     */
    remDataAttrib(e, n) { VJS.__i().$rda(e, n); }

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
     * @see     alias {@link classToggle|classToggle()}
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
     * @method  classToggle
     * @see     read more {@link $clt|$clt()}
     */
    classToggle(e, c, f) { VJS.__i().$clt(e, c, f); }

    /**
     * Returns elements position relative to viewport or undefined if element not found.
     *
     * @method  $pos
     * @see     also {@link position|position()} and {@link offset|offset()} 
     * 
     * @param   {(HTMLElement|string)}  element    HTMLElement or ID of element
     *
     * @return  {(Position|undefined)}
     */
    $pos(e) {
        e = VJS.__o(e);
        if (!e) return undefined;
        let {top, left} = e.getBoundingClientRect();
        return {top, left};
    }

    /**
     * Returns elements value(s).
     *
     * @method  $val
     * 
     * @param   {(HTMLElement|string)}  element    HTMLElement or ID of element
     *
     * @return  {(string|string[])}
     */
    $val(e) {
        e = VJS.__o(e);
        if (!e) return '';

        if (e.options && e.multiple)
            return e.options.filter(o => o.selected).map(o => o.value);
        else return e.value || e.innerText;
    }

    /**
     * `addEventListener` - adds event listener to the element or elements.
     *
     * @method  $ael
     * @see     alias {@link addEvtListener|addEvtListener()}
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
     * @param   {Function}                  function       Function to call, if event occurs
     * @param   {string}                    event          Name of the event to listen
     * @param   {(HTMLElement[]|string[])}  [elements=[]]  Array of Document/HTMLElement objects or IDs
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
     * @param   {Function}                  function       Function to call, if event occurs
     * @param   {string}                    event          Name of the event to listen
     * @param   {(HTMLElement[]|string[])}  [elements=[]]  Array of Document/HTMLElement objects or IDs
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
     * Inserts or returns elements HTML string.
     * 
     * @method  $html
     *
     * @param   {(HTMLElement|string)}  element
     * @param   {string=}               [text]      HTML string to add to the element; if empty, then returns elements content
     * @param   {string=}               [position]  If empty string, then replaces child elements, or inserts HTML string by next values: `beforebegin` – before element itself; `afterbegin` – before its first child; `beforeend` – after its last child; `afterend` – after element itself
     *
     * @return  {(string|undefined)}
     */
    $html(e, t = '', p = '') {
        e = VJS.__o(e);
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
                    catch (e) {
                        throw new DOMException(e.message, e.name);
                    }
                }
                else throw new DOMException('Not valid Element given.', 'NotSupportedError');
            }
            else return e.innerHTML;
        }
        else if (t) throw new DOMException('No valid Element found.', 'NotFoundError');
    }

    /**
     * Returns static (not live) NodeList of all child elements of selector.
     *
     * @method  children
     * 
     * @param   {string}  selector
     *
     * @return  {NodeList}
     */
    children(s) { return VJS.__i().$q(`:scope ${s}`); }


    /**
     * Returns or sets elements height.
     *
     * @method  height
     * @see     alias {@link $h|$h()}
     * 
     * @param   {(HTMLElement|string)}  element
     * @param   {string=}               [type]   Type of height to return:  `inner` – elements height with padding;  `outer` – elements height with padding, border and scrollbar;  `with-margin` – computed `outer` + margin
     * @param   {(string|number)}       [value]  Value to set as elements height, `type` is ignored
     *
     * @return  {number}
     */
    height(e, t = '', v = null) {
        let r = VJS.__h(e, t, v);
        if (!v) return r;
    }

    /**
     * Returns or sets elements width.
     *
     * @method  width
     * @see     alias {@link $w|$w()}
     * 
     * @param   {(HTMLElement|string)}  element
     * @param   {string=}               [type]   Type of width to return:  `inner` – elements width with padding;  `outer` – elements width with padding, border and scrollbar;  `with-margin` – computed `outer` + margin
     * @param   {(string|number)}       [value]  Value to set as elements height, `type` is ignored
     *
     * @return  {number}
     */
    width(e, t = '', v = null) {
        let r = VJS.__w(e, t, v);
        if (!v) return r;
    }

    /**
     * Returns elements offset or undefined if element not found.
     *
     * @method  offset
     * @see     also {@link position|position()} and {@link $pos|$pos()} 
     * 
     * @param   {(HTMLElement|string)}  element
     *
     * @return  {(Position|undefined)}
     */
    offset(e) {
        e = VJS.__o(e);
        if (!e) return undefined;

        let b = VJS.__i().$pos(e), d = document.documentElement, w = window;
        return {
            top:   b.top + w.scrollY - d.clientTop,
            left:  b.left + w.scrollX - d.clientLeft
        }
    }

    /**
     * Returns elements position or undefined if element not found.
     *
     * @method  position
     * @see     also {@link $pos|$pos()} and {@link offset|offset()} 
     * 
     * @param   {(HTMLElement|string)}  element
     *
     * @return  {(Position|undefined)}
     */
    position(e) {
        e = VJS.__o(e);
        if (!e) return undefined;

        let b = VJS.__i().$pos(e), s = getComputedStyle(e);
        return {
            top:   b.top - parseInt(s.marginTop),
            left:  b.left - parseInt(s.marginLeft)
        }
    }

    /**
     * Returns serialized form data.
     *
     * @method  serialize
     * 
     * @param   {(HTMLElement|string)}  formElement
     * @param   {object}                extraData    Extra data to add to the form data
     *
     * @return  {string}
     */
    serialize(f, e = {}) {
        f = VJS.__o(e);
        if (!f) return '';

        let u = new URLSearchParams(new FormData(f));
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
     * @param   {(HTMLCollection|NodeList)}  collection  HTMLCollection or NodeList to check
     *
     * @return  {(boolean|undefined)}  If answer is inconclusive, returns `undefined`.
     */
    isLive(c) {
        if (c instanceof HTMLCollection) return true;
        let l = c.length;
        if (!l) return undefined;
        let e = c.item(0);
        let p = e.parentNode;
        let n = e.cloneNode();
        n.style = "display:none!important";
        p.appendChild(n);
        let i = c.length !== l;
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
        e = VJS.__o(e);
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

    /** @ignore @readonly */static get E1() { return 'VJS class works only in Browser!'; }
    /** @ignore @readonly */static get E2() { return 'Your Browser does not support ECMAScript11 (2020)!'; }
    /** @private */static __v;  //* value (instance)
    /** @private */static __p;  //* prefix
    /** @private */static __$i(i) { return document.getElementById(i); }
    /** @private */static __$n(n) { return document.getElementsByName(n); }
    /** @private */static __$c(e, c) { return !e ? null : e.getElementsByClassName(c); }
    /** @private */static __$t(e, t) { return !e ? null : e.getElementsByTagName(t); }
    /** @private */static __$q(q, a) { try { return document[`querySelector${a ? 'All' : ''}`](q); } catch (_) { return null; } }

    /** @private */  //* getObject  (params:  `selector`, `firstSymbol`, `element`, `all`)
    static __go(s, f, e = null, a = false) {
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

    /** @private */  //* instance  (param: `prefix`)
    static __i(p = '') {
        if (!VJS.__v) VJS.__v = new VJS(p);
        else VJS.__sp(p);
        return VJS.__v;
    }

    /** @private */  //* object  (param: `element`)
    static __o(e) {
        if (!e) return null;  // don't do anything
        if (typeof e === 'string' && e[0] !== '#') e = `#${e}`;
        return this.__e(e) ?? null;
    }

    /** @private */  //* class  (params: `element`, `classList`, `function`)
    static __c(e, c, f) {
        e = this.__o(e);
        if (!e) return;
        if (!(c instanceof Array)) c = [c];
        else e.classList[f](...c);
    }

    /** @private */  //* dataName  (params: `name`)
    static __dn(n) {
        if (!n) return '';
        if (VJS.__p) return `data-${VJS.__p}-${n}`;
        return `data-${n}`;
    }

    /** @private */  //* heightWeight  (params:  `function`, `element`, `type`, `value`)
    static __hw(f, e, t, v) {
        e = VJS.__o(e);
        if (!e) return !v ? 0 : undefined;

        let ff = f.toLowerCase(),
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
    static __e(s, e = null, a = false) {
        let d = document;

        if (typeof s === 'string') {
            s = s.trim();

            let _s = s.toLowerCase();
            if (!e) e = document;

            if (_s.match(/^\#?document$/)) return d;
            else if (_s.match(/^\#?window$/)) return window;
            else if (_s.match(/^\#[a-z][\w\-]+$/)) return VJS.__$i(s.substring(1));
            else if (_s.match(/^\.[a-z][\w\-]+$/)) {
                let r = VJS.__$c(VJS.__o(e), s.substring(1));
                return a ? r : r.item(0);
            }
            else if (_s.match(/^\=["']?[a-z][\w\-]+["']?$/)) {
                let r = VJS.__$n(s.substring(1));
                return a ? r : r.item(0);
            }
            else if (
                _s.match(/^\@[a-z][\w\-]*$/) ||
                _s.match(/^(?:h[1-6]|[abipqsu]|[a-z]{2,})$/)
            ) {
                let r = VJS.__$t(VJS.__o(e), s[0] === '@' ? s.substring(1) : s);
                return a ? r : r.item(0);
            }
            else return VJS.__$q(s, a);
        }
        else if (s instanceof Window) {
            if (!e && !a) return d;  // prevent requesting elements from `window`
            else return s;
        }
        else if (s instanceof Document || s instanceof HTMLElement) return s;
        else return d;  // default to `document`
    }


    /** @private */  //* formData  (params: `form`, `required`, `extraData`, `type`)
    static __fd(f, r = [], e = {}, t = 's') {  // `t` values: "s" (string), "j" (JSON), or "fd" (FormData)
        if (!(f instanceof FormData)) { // try to convert to FormData
            if (f.constructor === {}.constructor) {  // is JSON
                let _f = new FormData();
                for (let k in f) _f.append(k, f[k]);
                f = _f;
            }
            else {
                let _f = VJS.__o(f);
                if (!(_f instanceof HTMLFormElement)) return {err: 'nfe'};
                f = new FormData(_f);
            }
        }

        /// Check for existence of required fields
        let _r = [...r], i = [];
        // d = [...f.entries()].map(([k, v]) => {
        for (let [k, v] of f) {
            let _i = _r.indexOf(k);
            i.push(k);

            if (typeof v === 'string') {
                v = encodeURI(v.trim());
                f.set(k, v);
            }
            if (!v) {
                if (VJS.__i().$ha(k, 'required')) _r.push(k);
            }
            else if (_i > -1) _r.splice(_i, 1);
        }
        // });

        if (!!r && _r.length) return {err: 'mrf', data: _r, ids: i};

        /// Add extra data to FormData
        if (typeof e === 'object') {
            for (let k in e) f.append(k, e[k].trim());
        }

        let d;
        if (t === 's') d = new URLSearchParams(f).toString();
        else if (t === 'j') d = Object.fromEntries(f);
        else d = f;

        return {err: '', data: d};
    }



    // =========================================================================
    //    Static methods
    // =========================================================================



    /**
     * Returns instance of VJS class or throws error, if `window` object doesn't exist (not in Browser).
     * 
     * @example <caption>test</caption>
     * let vjs = VJS.getInstance();
     * 
     * @static
     * @method    getInstance
     * 
     * @constructs  VJS
     * @throws      {Error}    If script is not runned in Browser (ex. Node.js)
     * 
     * @param       {string=}  [prefix] String to be prepended to the data name (will be "remembered" statically)
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
     * @param   {string=}  [prefix] String to be prepended to the data name (will be "remembered" statically)
     *
     * @return  {void}
     */
    static register(p = '') {
        try {
            let v = VJS.getInstance(p);

            Object.getOwnPropertyNames(VJS.prototype)
                .filter(n => n!=='constructor' && !~n.indexOf('__'))
                .forEach(f => window[f] = v[f]);
        }
        catch(e) { console.error(`${e.name}: ${e.message}`); }
    }

}
