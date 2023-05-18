describe('GLOBAL: selector', () => {
    before(() => {
        if (!window.$$) VJS.register('prfx');  // for grep to properly work
    });


    describe('$i(), getElemById()', () => {
        it('should return HTMLElement', () => {
            assert.instanceOf( $i('test-id'), HTMLElement );
            assert.instanceOf( $i('#test-id'), HTMLElement );  // with prefix symbol
            // Alternative function
            assert.instanceOf( getElemById('test-id'), HTMLElement );
            assert.instanceOf( getElemById('#test-id'), HTMLElement );
        });
        it('should return NULL', () => {
            assert.isNull( $i('test00') );  // non-existent ID
        });
    });

    describe('$n(), getElemsByName()', () => {
        it('should return NodeList', () => {
            assert.instanceOf( $n('test-name'), NodeList );
            assert.instanceOf( $n('=test-name'), NodeList );  // with prefix symbol
            // Alternative function
            assert.instanceOf( getElemsByName('test-name'), NodeList );
            assert.instanceOf( getElemsByName('=test-name'), NodeList );
        });
        it('should have one element', () => {
            assert.strictEqual( $n('test-name').length, 2 );
        });
        it('should return first of found HTMLelements', () => {
            assert.instanceOf( $n('test-name', true), HTMLElement );
            assert.equal( $n('test-name', true).innerText, 'incidunt' );
        });
        it('should return empty collection', () => {
            assert.instanceOf( $n('test00'), NodeList );
            assert.isEmpty( $n('test00') );
        });
        it('should return NULL', () => {
            assert.isNull( $n('test00', true) );
        });
    });

    describe('$c(), getElemsByClass()', () => {
        it('should return HTMLCollection', () => {
            assert.instanceOf( $c('test-class'), HTMLCollection );
            assert.instanceOf( $c('.test-class'), HTMLCollection );  // with prefix symbol
            // Alternative function
            assert.instanceOf( getElemsByClass('test-class'), HTMLCollection );
            assert.instanceOf( getElemsByClass('.test-class'), HTMLCollection );
        });
        it('should have two elements', () => {
            assert.strictEqual( $c('test-class').length, 2 );
        });
        it('should return first of found HTMLelements', () => {
            assert.instanceOf( $c('test-class', document, true), HTMLElement );
            assert.equal( $c('test-class', document, true).innerText, 'amet' );
        });
        it('should return empty collection', () => {
            assert.instanceOf( $c('test00'), HTMLCollection );
            assert.isEmpty( $c('test00') );
        });
        it('should return NULL', () => {
            assert.isNull( $c('test00', document, true) );
        });
    });

    describe('$t(), getElemsByTag()', () => {
        it('sould return HTMLCollection', () => {
            assert.instanceOf( $t('kbd'), HTMLCollection );
            assert.instanceOf( $t('@kbd'), HTMLCollection );  // with prefix symbol
            // Alternative function
            assert.instanceOf( getElemsByTag('kbd'), HTMLCollection );
            assert.instanceOf( getElemsByTag('@kbd'), HTMLCollection );

        });
        it('should have three elements', () => {
            assert.strictEqual( $t('kbd').length, 3 );
        });
        it('should return first of found HTMLelements', () => {
            assert.instanceOf( $t('kbd', document, true), HTMLElement );
            assert.equal( $t('kbd', document, true).innerText, 'dolor' );
        });
        it('should return empty collection', () => {
            assert.instanceOf( $t('map'), HTMLCollection );
            assert.isEmpty( $t('map') );
        });
        it('should return NULL', () => {
            assert.isNull( $t('map', document, true) );
        });
    });

    describe('$(), $$()', () => {
        it('should return HTMLElement', () => {
            // By ID
            assert.instanceOf( $('#test-id'), HTMLElement );
            assert.instanceOf( $$('test-query', 'id'), HTMLElement );
            // By name
            assert.instanceOf( $('=test-name'), HTMLElement );
            assert.instanceOf( $$('test-query', 'name', 'name'), HTMLElement );
        });
    });
});
