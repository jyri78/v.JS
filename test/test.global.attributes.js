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
});
