describe('VJS', () => {
    describe('.getInstance()', () => {
        it('created instance should exist', () => {
            var vjsObj = VJS.getInstance('prfx');
 
            assert.exists(vjsObj);
            assert.instanceOf( vjsObj, VJS );
        });
        it('next instances should be the same', () => {
            var vjsObj = VJS.getInstance();
            assert.strictEqual( VJS.getInstance(), vjsObj );
        });
        it('with new keyword created instance should be different', () => {
            var another = new VJS();
 
            assert.notEqual( another, VJS.getInstance() );
            assert.instanceOf( another, VJS );
        });
    });

    describe('.register()', () => {
        it('registered functions should exist', () => {
            VJS.register();
 
            assert.exists($$);
            assert.isFunction($$);
        });
    });

});
