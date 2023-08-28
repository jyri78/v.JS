describe('GLOBAL: selectors', () => {
    before(() => {
        if (!window.$$) VJS.register({prefix: 'prfx'});  // for grep to properly work
    });


    describe('$i()', () => {
        it('should return HTMLElement', () => {
            assert.instanceOf( $i('test-id'), HTMLElement );
            assert.instanceOf( $i('#test-id'), HTMLElement );  // with prefix symbol
        });
        it('should return NULL', () => {
            assert.isNull( $i('test00') );  // non-existent ID
        });
    });

    describe('$n()', () => {
        it('should return live(!) NodeList', () => {
            assert.instanceOf( $n('test-name'), NodeList );
            assert.instanceOf( $n('=test-name'), NodeList );  // with prefix symbol
            assert.isTrue( isLive($n('test-name')) );  // confirm that it's live
        });
        it('should have two elements', () => {
            assert.lengthOf( $n('test-name'), 2 );
        });
        it('should return first of found HTMLelements', () => {
            assert.instanceOf( $n('test-name', true), HTMLElement );
            assert.equal( $n('test-name', true).innerText, 'incidunt' );
        });
        it('should return empty list', () => {
            var elems = $n('test00');  // non-existent name
 
            assert.instanceOf( elems, NodeList );
            assert.isEmpty( elems );
            assert.isUndefined( isLive(elems) );
        });
        it('should return NULL', () => {
            assert.isNull( $n('test00', true) );
        });
    });

    describe('$c()', () => {
        it('should return HTMLCollection', () => {
            assert.instanceOf( $c('test-class'), HTMLCollection );
            assert.instanceOf( $c('.test-class'), HTMLCollection );  // with prefix symbol
        });
        it('should have two elements', () => {
            assert.strictEqual( $c('test-class').length, 2 );
        });
        it('should return first of found HTMLelements', () => {
            assert.instanceOf( $c('test-class', '#vjs-test', true), HTMLElement );
            assert.equal( $c('test-class', '#vjs-test', true).innerText, 'amet' );
        });
        it('should return empty collection', () => {
            assert.instanceOf( $c('test00'), HTMLCollection );  // non-existent class
            assert.isEmpty( $c('test00') );
        });
        it('should return NULL', () => {
            assert.isNull( $c('test00', '#vjs-test', true) );
        });
    });

    describe('$t()', () => {
        it('sould return HTMLCollection', () => {
            assert.instanceOf( $t('kbd'), HTMLCollection );
            assert.instanceOf( $t('@kbd'), HTMLCollection );  // with prefix symbol

        });
        it('should have three elements', () => {
            assert.lengthOf( $t('kbd'), 3 );
        });
        it('should return first of found HTMLelements', () => {
            assert.instanceOf( $t('kbd', '#vjs-test', true), HTMLElement );
            assert.equal( $t('kbd', '#vjs-test', true).innerText, 'dolor' );
        });
        it('should return empty collection', () => {
            assert.instanceOf( $t('map'), HTMLCollection );
            assert.isEmpty( $t('map') );
        });
        it('should return NULL', () => {
            assert.isNull( $t('map', '#vjs-test', true) );
        });
    });

    describe('$q()', () => {
        it('should return HTMLElement', () => {
            assert.instanceOf( $q('#test-id>kbd'), HTMLElement );
        });
        it('should return non-live NodeList', () => {
            // Attribute `element` can be set as empty string, in that case it defaults to Document
            assert.instanceOf( $q('#test-id>kbd', '', true), NodeList );
 
            // Confirm that it's not live
            assert.isFalse( isLive($q('#test-id>kbd', '', true)) );
        });
        it('should return empty list', () => {
            var elems = $q('#test-id>test00', '', true);
 
            assert.instanceOf( elems, NodeList );
            assert.isEmpty( elems );
            assert.isUndefined( isLive(elems) );  // empty list can't be checked
        });
        it('should return NULL', () => {
            assert.isNull( $q('#test-id>test00') );
        });
    });

    describe('$()', () => {
        it('should return HTMLElement', () => {
            assert.instanceOf( $('#test-id'), HTMLElement );
            assert.instanceOf( $('=test-name'), HTMLElement );
            assert.instanceOf( $('.test-class'), HTMLElement );
            assert.instanceOf( $('@kbd'), HTMLElement );
        });
        it('should return NULL', () => {
            assert.isNull( $('#test-00') );
            assert.isNull( $('=test-00') );
            assert.isNull( $('.test-00') );
            assert.isNull( $('@map') );
        });
        it('should return live(!) NodeList', () => {
            assert.instanceOf( $('=test-name', '#vjs-test', true), NodeList );
 
            // confirm that returned NodeList is live
            assert.isTrue( isLive($('=test-name', '#vjs-test', true)) );
        });
        it('should return HTMLCollection', () => {
            assert.instanceOf( $('.test-class', '#vjs-test', true), HTMLCollection );
            assert.instanceOf( $('@kbd', '#vjs-test', true), HTMLCollection );
        });
        it('should return empty NodeList', () => {
            assert.isEmpty( $('=test-00', '#vjs-test', true) );
        });
        it('should return empty HTMLCollection', () => {
            assert.isEmpty( $('.test-00', '#vjs-test', true) );
            assert.isEmpty( $('@map', '#vjs-test', true) );
        });
    });

    describe('$$(), $$n(), $$c(), $$t(), $$q()', () => {
        it('should return HTMLElement', () => {
            // By ID
            assert.instanceOf( $$('test-query', 'idVal'), HTMLElement );
 
            // By name attribute
            assert.instanceOf( $$('test-query', 'nameVal', 'name'), HTMLElement );
            assert.instanceOf( $$n('test-query', 'nameVal'), HTMLElement );
 
            // By class name
            assert.instanceOf( $$('test-query', 'classVal', 'class'), HTMLElement );
            assert.instanceOf( $$c('test-query', 'classVal'), HTMLElement );
 
            // By tag name
            assert.instanceOf( $$('test-query', 'tagVal', 'tag'), HTMLElement );
            assert.instanceOf( $$t('test-query', 'tagVal'), HTMLElement );
        });
        it('should return NULL', () => {
            // By ID
            assert.isNull( $$('test-qry00', 'idVal') );
 
            // By name attribute
            assert.isNull( $$('test-qry00', 'nameVal', 'name') );
            assert.isNull( $$n('test-qry00', 'nameVal') );
 
            // By class name
            assert.isNull( $$('test-qry00', 'classVal', 'class'));
            assert.isNull( $$c('test-qry00', 'classVal'));
 
            // By tag name
            assert.isNull( $$('test-qry00', 'tagVal', 'tag') );
            assert.isNull( $$t('test-qry00', 'tagVal') );
        });
        it('should return live(!) NodeList', () => {
            assert.instanceOf( $$('test-query', 'nameVal', 'name', true), NodeList );
            assert.instanceOf( $$n('test-query', 'nameVal', true), NodeList );
 
            // confirm that returned NodeList is live
            assert.isTrue( isLive($$('test-query', 'nameVal', 'name', true)) );
            assert.isTrue( isLive($$n('test-query', 'nameVal', true)) );
        });
        it('should return HTMLCollection', () => {
            // By class name
            assert.instanceOf( $$('test-query', 'classVal', 'class', true), HTMLCollection );
            assert.instanceOf( $$c('test-query', 'classVal', true), HTMLCollection );
 
            // By tag name
            assert.instanceOf( $$('test-query', 'tagVal', 'tag', true), HTMLCollection );
            assert.instanceOf( $$t('test-query', 'tagVal', true), HTMLCollection );
        });
        it('should return empty NodeList', () => {
            assert.isEmpty( $$('test-qry00', 'nameVal', 'name', true) );
            assert.isEmpty( $$n('test-qry00', 'nameVal', true) );
        });
        it('should return empty HTMLCollection', () => {
            // By class name
            assert.isEmpty( $$('test-qry00', 'classVal', 'class', true) );
            assert.isEmpty( $$c('test-qry00', 'classVal', true) );
 
            // By tag name
            assert.isEmpty( $$('test-qry00', 'tagVal', 'tag', true) );
            assert.isEmpty( $$t('test-qry00', 'tagVal', true) );
        });
    });

    describe('$f()', () => {
        it('should return array with two HTMLElements', () => {
            var callback = el => el.innerText === 'elit' || el.innerText === 'amet',
                filtered = $f('@kbd', callback);
 
            assert.instanceOf( filtered, Array );
            assert.instanceOf( filtered[0], HTMLElement );
            assert.lengthOf( filtered, 2 );
        });
    });

    describe('$cs()', () => {
        it('should return array with two HTMLElements', () => {
            var elems = $cs('@b', 'dolor');
 
            assert.isArray( elems );
            assert.lengthOf( elems, 2 );
            assert.instanceOf( elems[0], HTMLElement );
            assert.instanceOf( elems[1], HTMLElement );
        });
        it('should return empty array', () => {
            var elems1 = $cs('@b', 'elit'),
                elems2 = $cs('@map', 'lorem');  // non-existent element(s)
 
            assert.isArray( elems1 );
            assert.isEmpty( elems1 );
 
            assert.isArray( elems2 );
            assert.isEmpty( elems2 );
        });
    });

    describe('$sp()', () => {
        it('should return HTMLElement', () => {
            assert.instanceOf( $sp('test-field-1'), HTMLElement );
        });
        it('should return NULL', () => {
            assert.isNull( $sp('test-field-3', 'b') );
            assert.isNull( $sp(document) );
            assert.isNull( $sp(window) );
            assert.isNull( $sp('window') );
        });
    });

});
