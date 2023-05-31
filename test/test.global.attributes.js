describe('GLOBAL: attributes', () => {
    before(() => {
        if (!window.$$) VJS.register('prfx');  // for grep to properly work
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
            assert.isNull( $ga('test00', 'id') );  // non-existent element
        });
        it('should return empty string', () => {
            assert.isString( $ga($('@del'), 'id', '') );  // confirm, that it is String
 
            assert.isEmpty( $ga($('@del'), 'id', '') );
            assert.isEmpty( $ga('test00', 'id', '') );  // non-existent element
        });
        it('should be numeric value', () => {
            assert.isNumber( $ga('test-num', 'width') );
            assert.strictEqual( $ga('test-num', 'width'), 7 );
 
            assert.isNumber( $ga('test-num', 'height') );
            assert.strictEqual( $ga('test-num', 'height'), 3.5 );
        });
    });

    describe('$sa(), setAttrib()', () => {
        it('should add new attribute', () => {
            let elem1 = $('@span'),
                elem2 = $('@kbd');
 
            // Confirm, that element doesn't have attribute yet
            assert.isFalse( $ha(elem1, 'title') );
            assert.isFalse( $ha(elem2, 'itemscope') );
 
            // Add new attribute
            $sa(elem1, 'title', 'Hello world!');
            setAttrib(elem2, 'itemscope');  // add boolean value
 
            // Confirm, that element has now added attribute with new value
            assert.isTrue( $ha(elem1, 'title') );
            assert.isTrue( $ha(elem2, 'itemscope') );
            assert.strictEqual( $ga(elem1, 'title'), 'Hello world!' );
            assert.strictEqual( $ga(elem2, 'itemscope'), 'itemscope' );
        });
    });

    describe('$ra(), remAttrib()', () => {
        it('should remove added attribute', () => {
            let elem1 = $('@span'),
                elem2 = $('@kbd');;
 
            $ra(elem1, 'title');
            remAttrib(elem2, 'itemscope');
 
            // Confirm, that element doesn't have attribute anymore
            assert.isFalse( $ha(elem1, 'title') );
            assert.isFalse( $ha(elem2, 'itemscope') );
        });
    });

    describe('$hda(), hasDataAttrib()', () => {
        it('should return TRUE', () => {
            assert.isTrue( $hda('test-query', 'nameVal') );
            assert.isTrue( hasDataAttrib('test-query', 'classVal') );
 
            // Verify existence of prefix (should be "prfx")
            assert.isTrue( $ha('test-query', 'data-prfx-nameVal') );
 
            // Ignore data attribute name prefix (i.e. Bootstrap has it's own name prefix `bs`)
            assert.isTrue( $hda('test-id', 'testVal', true) );
 
            // Has any data attribute at all
            assert.isTrue( $hda('test-query') );         // only with prefixes
            assert.isTrue( $hda('test-id', '', true) );  // ignore prefixes
        });
        it('should return FALSE', () => {
            assert.isFalse( $hda('test-query', 'testVal') );
            assert.isFalse( $hda($('.test-class'), '', true) );
 
            // Has any data attribute at all
            assert.isFalse( $hda($('@kbd')) );
            assert.isFalse( $hda('test-id') );
        });
        it('should return UNDEFINED', () => {
            assert.isUndefined( $hda($('@map'), 'testVal') );
            assert.isUndefined( $hda($('@map')) );
        });
    });

    describe('$gda(), getDataAttrib()', () => {
        it('should return valid value', () => {
            assert.strictEqual( $gda('test-query', 'idVal'), 'test-id' );
            assert.strictEqual( getDataAttrib('test-query', 'idVal'), 'test-id' );
            assert.strictEqual( $gda('test-id', 'testVal', '', true), 'test-00' );  // ignore prefix
        });
        it('should return NULL', () => {
            assert.isNull( $gda('test-query', 'testVal') );
            assert.isNull( $gda('test-id', 'testVal') );
            assert.isNull( $gda('test-query') );  // without data attribute name
            assert.isNull( $gda('test-00', 'testVal') );  // non-existent element
        });
        it('should return empty string', () => {
            // Confirm, that returned value is String
            assert.isString( $gda('test-query', 'testVal', '') );
            assert.isString( $gda('test-id', 'testVal', '') );
            assert.isString( $gda('test-query', '', '') );
            assert.isString( $gda('test-00', 'testVal', '') );
 
            assert.isEmpty( $gda('test-query', 'testVal', '') );
            assert.isEmpty( $gda('test-id', 'testVal', '') );
            assert.isEmpty( $gda('test-query', '', '') );  // without data attribute name
            assert.isEmpty( $gda('test-00', 'testVal', '') );  // non-existent element
        });
    });

    describe('$w(), $h(), width(), height()', () => {
        before(() => {
            $('#vjs-test').style.display = 'block';
        });
        after(() => {
            $('#vjs-test').style.display = 'none';
        });

        it('should return size of 777 × 555 px', () => {
            assert.strictEqual( $w('test-id'), 777 );
            assert.strictEqual( width('test-id'), 777 );
            
            assert.strictEqual( $h('test-id'), 555 );
            assert.strictEqual( height('test-id'), 555 );
        });
        it('should return "inner" size of 785 × 563 px', () => {
            // Padding is 4px, i.e adds 8px to width and height
            assert.strictEqual( $w('test-id', 'inner'), 785 );
            assert.strictEqual( width('test-id', 'inner'), 785 );
 
            assert.strictEqual( $h('test-id', 'inner'), 563 );
            assert.strictEqual( height('test-id', 'inner'), 563 );
        });
        it('should return "outer" size of 789 × 567 px', () => {
            // Border is 2px, i.e adds extra 4px (totally 12px) to width and height
            assert.strictEqual( $w('test-id', 'outer'), 789 );
            assert.strictEqual( width('test-id', 'outer'), 789 );
 
            assert.strictEqual( $h('test-id', 'outer'), 567 );
            assert.strictEqual( height('test-id', 'outer'), 567 );
        });
        it('should return "with-margin" size of 799 × 577 px', () => {
            // Margin is 5px, i.e adds even more 10px (totally 22px) to width and height
            assert.strictEqual( $w('test-id', 'with-margin'), 799 );
            assert.strictEqual( width('test-id', 'with-margin'), 799 );
 
            assert.strictEqual( $h('test-id', 'with-margin'), 577 );
            assert.strictEqual( height('test-id', 'with-margin'), 577 );
        });
    });

});
