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
            let span = $('@span'),
                kbd = $('@kbd');
 
            // Confirm, that element doesn't have attribute yet
            assert.isFalse( $ha(span, 'title') );
            assert.isFalse( $ha(kbd, 'itemscope') );
 
            // Add new attribute
            $sa(span, 'title', 'Hello world!');
            setAttrib(kbd, 'itemscope');  // add boolean value
 
            // Confirm, that element has now added attribute with new value
            assert.isTrue( $ha(span, 'title') );
            assert.isTrue( $ha(kbd, 'itemscope') );
            assert.strictEqual( $ga(span, 'title'), 'Hello world!' );
            assert.strictEqual( $ga(kbd, 'itemscope'), 'itemscope' );
        });
    });

    describe('$ra(), remAttrib()', () => {
        it('should remove added attribute', () => {
            let span = $('@span'),
                kbd = $('@kbd');
 
            // Confirm, that added attribute still exists
            assert.isTrue( $ha(span, 'title') );
            assert.isTrue( $ha(kbd, 'itemscope') );
 
            $ra(span, 'title');
            remAttrib(kbd, 'itemscope');
 
            // Confirm, that element doesn't have attribute anymore
            assert.isFalse( $ha(span, 'title') );
            assert.isFalse( $ha(kbd, 'itemscope') );
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

    describe('$sda(), setDataAttrib', () => {
        it('should set data attribute to the element', () => {
            let del = $('@del'),
                b = $('@b');
 
            // Confirm, that element doesn't have data attribute yet
            assert.isFalse( $ha(del, 'testVal') );
            assert.isFalse( $ha(b, 'testVal') );
 
            // Add new data attribute
            $sda(del, 'testVal', 'Hello world!');
            setDataAttrib(b, 'testVal', 11);  // add numeric value
 
            // Confirm, that element has now added data attribute with new value
            assert.isTrue( $hda(del, 'testVal') );
            assert.isTrue( $hda(b, 'testVal') );
            assert.strictEqual( $gda(del, 'testVal'), 'Hello world!' );
            assert.strictEqual( $gda(b, 'testVal'), 11 );
 
            // Confirm, that element has data attribute with prefixed name
            assert.isTrue( $ha(del, 'data-prfx-testVal') );
            assert.isTrue( $ha(b, 'data-prfx-testVal') );
        });
    });

    describe('$rda(), remDataAttrib()', () => {
        it('should remove added data attribute', () => {
            let del = $('@del'),
                b = $('@b');
 
            // Confirm, that added data attribute still exists
            assert.isTrue( $hda(del, 'testVal') );
            assert.isTrue( $hda(b, 'testVal') );
 
            $rda(del, 'testVal');
            remDataAttrib(b, 'testVal');
 
            // Confirm, that element doesn't have attribute anymore
            assert.isFalse( $hda(del, 'testVal') );
            assert.isFalse( $hda(b, 'testVal') );
        });
    });

    describe('$w(), $h(), width(), height()', () => {
        before(() => $('#vjs-test').style.display = 'block');
        after(() => $('#vjs-test').style.display = 'none');

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

    describe('$s(), size()', () => {
        before(() => $('#vjs-test').style.display = 'block');
        after(() => $('#vjs-test').style.display = 'none');

        it('should return "Size" object', () => {
            let size1 = $s('test-id'),
                size2 = size('test-id');
 
            // Check if it is object
            assert.isObject( size1 );
            assert.isObject( size2 );
 
            // Verify it's structure
            assert.hasAllKeys( size1, ['width', 'height'] );
            assert.hasAllKeys( size2, ['width', 'height'] );
 
            // Verify it's contents
            assert.deepEqual( size1, {width: 777, height: 555} );
            assert.deepEqual( size2, {width: 777, height: 555} );
 
            // Verify it's "inner" dimensions (padding 4px, i.e adds 8px to width and height)
            assert.deepEqual( $s('test-id', 'inner'), {width: 785, height: 563} );
            assert.deepEqual( size('test-id', 'inner'), {width: 785, height: 563} );
 
            // Verify it's "outer" dimensions (border is 2px, i.e adds extra 4px)
            assert.deepEqual( $s('test-id', 'outer'), {width: 789, height: 567} );
            assert.deepEqual( size('test-id', 'outer'), {width: 789, height: 567} );
 
            // Verify it's "outer" dimensions (margin is 5px, i.e adds even more 10px)
            assert.deepEqual( $s('test-id', 'with-margin'), {width: 799, height: 577} );
            assert.deepEqual( size('test-id', 'with-margin'), {width: 799, height: 577} );
        });
    });

    describe('$pos(), position(), offset()', () => {
        before(() => $('#vjs-test').style.display = 'block');
        after(() => $('#vjs-test').style.display = 'none');

        it('should return "Position" object', () => {
            let pos1 = $pos('vjs-test'),
                pos2 = position('vjs-test'),
                pos3 = offset('vjs-test');
 
            // Check if it is object
            assert.isObject( pos1 );
            assert.isObject( pos2 );
            assert.isObject( pos3 );
 
            // Verify it's structure
            assert.hasAllKeys( pos1, ['top', 'left'] );
            assert.hasAllKeys( pos2, ['top', 'left'] );
            assert.hasAllKeys( pos3, ['top', 'left'] );
 
            // Verify it's contents
            assert.deepEqual( pos1, {top: -9990, left: -9990} );
            assert.deepEqual( pos2, {top: -9990, left: -9990} );
            assert.deepEqual( pos3, {top: -9990, left: -9990} );
 
            // Margin 5px moves inner element in screen a bit
            assert.deepEqual( $pos('test-id'), {top: -9985, left: -9985} );
            assert.deepEqual( offset('test-id'), {top: -9985, left: -9985} );
 
            // `position` returns result without margin
            assert.deepEqual( position('test-id'), {top: -9990, left: -9990} );
        });
    });

    describe('$val()', () => {
        it('should return valid value', () => {
            assert.strictEqual( $val($('@i')), 'quo dolores tempora' );
            assert.strictEqual( $val('test-input'), '' );
        });
        it('should set new value', () => {
            let em = $t('em', null, true);

            $val('test-input', 'lorem...');
            $val(em, 'irure');
 
            // Confirm, that new value does exist
            assert.strictEqual( $val('test-input'), 'lorem...' );
            assert.strictEqual( $val(em), 'irure' );
 
            // Confirm, that em tag doesn't have "value" attribute
            assert.isFalse( $ha(em, 'value') );
        });
    });

    describe('$hcl(), hasClass()', () => {
        it('should return TRUE', () => {
            let el = $n('test-name')[1];  // second element contains also class attribute
 
            assert.isTrue( $hcl(el, 'test-class') );
            assert.isTrue( hasClass(el, 'test-class') );
 
            // Check, if there has any class names at all
            assert.isTrue( $hcl('test-input') );
        });
        it('should return FALSE', () => {
            assert.isFalse( $hcl($n('test-name', true), 'test-class') );
 
            // Check, if there has any class names at all
            assert.isFalse( $hcl('test-id') );
        });
        it('should return UNDEFINED', () => {
            assert.isUndefined( $hcl('test00') );
        });
    });

    describe('$gcl(), getClasses()', () => {
        it('should return array of classes', () => {
            let el = $t('kbd', 'test-id')[1],
                cls1 = $gcl(el),
                cls2 = getClasses(el);
 
            assert.isArray( cls1 );
            assert.lengthOf( cls1, 2 );
            assert.includeMembers( cls1, ['test-class', 'another-test-class'] );
 
            assert.isArray( cls2 );
            assert.lengthOf( cls2, 2 );
            assert.includeMembers( cls2, ['test-class', 'another-test-class'] );
        });
        it('should return empty array', () => {
            let cls = $gcl('test-num');
 
            assert.isArray( cls );
            assert.isEmpty( cls );
        });
        it('should return UNDEFINED', () => {
            assert.isUndefined( $gcl('test00') );
        });
    });

    describe('$acl(), addClass()', () => {
        it('should add new class to the element', () => {
            let clsList = ['second-new-class', 'third-new-class'],
                el = $i('test-id');
 
            // Confirm, that it has no classes yes
            assert.isEmpty( $gcl(el) );
 
            // Add new class and confirm it
            $acl(el, 'new-class');
            assert.include( $gcl(el), 'new-class' );
 
            // Add array of classes and confirm
            addClass(el, clsList);
            assert.includeMembers( $gcl(el), ['new-class', ...clsList] );
        });
    });

    describe('$rcl(), remClass()', () => {
        it('should remove added classes from element', () => {
            let clsList = ['second-new-class', 'third-new-class'],
                el = $i('test-id');
 
            // Confirm existence of classes
            assert.includeMembers( $gcl(el), ['new-class', ...clsList] );

            // Remove new class and confirm, that is removed
            $rcl(el, 'new-class');
            assert.includeMembers( $gcl(el), clsList );
 
            // Remove array of classes and confirm, that classes are removed
            remClass(el, clsList);
            assert.isEmpty( $gcl(el) );
        });
    });

});
