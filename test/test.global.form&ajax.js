describe('GLOBAL: form & ajax', () => {
    before(() => {
        if (!window.$$) VJS.register('prfx');  // for grep to properly work
    });


    describe('$fd', () => {
        it('should throw Error', () => {
            assert.throws( $fd, Error, 'Form not found.' );
        });
        it('should return NULL and set classes accordingly', () => {
            let validation = ['is-valid', 'is-valid', 'is-valid', 'is-invalid', 'is-invalid'],
                required = ['test-field-1', 'test-field-3'],
                classes = {error: 'is-invalid', success: 'is-valid'};
 
            // Confirm, that validation classes not set yet
            validation.forEach((cl, idx) => {
                assert.isFalse( $hcl(`test-field-${idx}`, cl) );
            });
 
            // Get form data and confirm set classes accordingly
            assert.isNull( $fd('test-form-1', 'json', required, {}, classes) );
            validation.forEach((cl, idx) => {
                assert.isTrue( $hcl(`test-field-${idx}`, cl) );
            });
        });
        it('should return JSON object', () => {
            let data = $fd('test-form-2', 'json');
 
            assert.isObject( data );
            assert.hasAllKeys( data, ['testField5', 'testField6'] );
            assert.deepEqual( data, {testField5: 'textual value', testField6: 7} );
        });
        it('should return string (URLSearchParams)', () => {
            let data = $fd('test-form-2', 'string');
 
            assert.strictEqual( data, 'test-field-5=textual+value&test-field-6=7' );
        });
    });

});