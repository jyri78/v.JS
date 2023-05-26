describe('GLOBAL: attributes', () => {
    before(() => {
        if (!window.$$) VJS.register('prfx');  // for grep to properly work
    });


    describe('$w(), $h()', () => {
        before(() => {
            $('#vjs-test').style.display = 'block';
        });
        after(() => {
            $('#vjs-test').style.display = 'none';
        });

        it('should return size of 777 × 555 px', () => {
            assert.strictEqual( $w('test-id'), 777 );
            assert.strictEqual( $h('test-id'), 555 );
        });
        it('should return "inner" size of 785 × 563 px', () => {
            // Padding is 4px, i.e adds 8px to width and height
            assert.strictEqual( $w('test-id', 'inner'), 785 );
            assert.strictEqual( $h('test-id', 'inner'), 563 );
        });
        it('should return "outer" size of 789 × 567 px', () => {
            // Border is 2px, i.e adds extra 4px (totally 12px) to width and height
            assert.strictEqual( $w('test-id', 'outer'), 789 );
            assert.strictEqual( $h('test-id', 'outer'), 567 );
        });
        it('should return "with-margin" size of 799 × 577 px', () => {
            // Margin is 5px, i.e adds even more 10px (totally 22px) to width and height
            assert.strictEqual( $w('test-id', 'with-margin'), 799 );
            assert.strictEqual( $h('test-id', 'with-margin'), 577 );
        });
    });

    describe('$ha(), hasAttrib()', () => {
        it('should return TRUE', () => {
            assert.isTrue( $ha($('@del'), 'name') );
            assert.isTrue( hasAttrib($('@del'), 'name') );
 
            // Has any attribute at all
            assert.isTrue( $ha($('@del')) );
        });
        it('should return FALSE', () => {
            assert.isFalse( $ha($('@kbd'), 'class') );
            assert.isFalse( $ha($('@kbd')) );  // any attribute at all
        });
        it('should return UNDEFINED', () => {
            assert.isUndefined( $ha($('@map'), 'id') );
            assert.isUndefined( $ha($('@map')) );  // any attribute at all
        });
    });

    describe('$ga(), getAttrib()', () => {
        it('should return "test-name"', () => {
            assert.strictEqual( $ga($('@del'), 'name'), 'test-name' );
            assert.strictEqual( getAttrib($('@del'), 'name'), 'test-name' );
        });
        it('should return NULL', () => {
            assert.isNull( $ga($('@del'), 'id') );
            assert.isNull( getAttrib($('@del'), 'id') );
            assert.isNull( $ga($('@del')) );  // without attribute name
            assert.isNull( $ga($('test00'), 'id') );  // non-existent element
        });
        it('should return empty string', () => {
            assert.isString( $ga($('@del'), 'id', '') );  // confirm, that it is String
 
            assert.isEmpty( $ga($('@del'), 'id', '') );
            assert.isEmpty( $ga($('test00'), 'id', '') );  // non-existent element
        });
    });
});
