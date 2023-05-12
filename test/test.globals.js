describe('[GLOBALS]', () => {
    describe('$(), getElemById()', () => {
        it('should return HTMLElement', () => {
            assert.instanceOf( $('test01'), HTMLElement );
            assert.instanceOf( $('#test01'), HTMLElement );
            assert.instanceOf( getElemById('test01'), HTMLElement );
            assert.instanceOf( getElemById('#test01'), HTMLElement );
        });
        it('should return NULL', () => {
            assert.isNull( $('test00') );  // non-existent ID
        });
    });

    describe('$c(), getElemsByClass()', () => {
        it('should return HTMLCollection', () => {
            assert.instanceOf( $c('test02'), HTMLCollection );
            assert.instanceOf( $c('.test02'), HTMLCollection );
            assert.instanceOf( getElemsByClass('test02'), HTMLCollection );
            assert.instanceOf( getElemsByClass('.test02'), HTMLCollection );
        });
        it('should have two elements', () => {
            assert.strictEqual( $c('test02').length, 2 );
        });
        it('should return first of found HTMLelements', () => {
            assert.instanceOf( $c('test02', document, true), HTMLElement );
            assert.equal( $c('test02', document, true).innerText, 'amet' );
        });
        it('should return empty collection', () => {
            assert.instanceOf( $c('test00'), HTMLCollection );
            assert.isEmpty( $c('test00') );
        });
        it('should return NULL', () => {
            assert.isNull( $c('test00', document, true) );
        });
    });

    describe('$n(), getElemsByName()', () => {
        it('should return NodeList', () => {
            assert.instanceOf( $n('test03'), NodeList );
            assert.instanceOf( $n('=test03'), NodeList );
            assert.instanceOf( getElemsByName('test03'), NodeList );
            assert.instanceOf( getElemsByName('=test03'), NodeList );
        });
        it('should have one element', () => {
            assert.strictEqual( $n('test03').length, 2 );
        });
        it('should return first of found HTMLelements', () => {
            assert.instanceOf( $n('test03', true), HTMLElement );
            assert.equal( $n('test03', true).innerText, 'incidunt' );
        });
        it('should return empty collection', () => {
            assert.instanceOf( $n('test00'), NodeList );
            assert.isEmpty( $n('test00') );
        });
        it('should return NULL', () => {
            assert.isNull( $n('test00', true) );
        });
    });

    describe('$t(), getElemsByTag()', () => {
        it('sould return HTMLCollection', () => {
            assert.instanceOf( $t('kbd'), HTMLCollection );
            assert.instanceOf( getElemsByTag('kbd'), HTMLCollection );
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
});
