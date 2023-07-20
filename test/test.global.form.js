describe('GLOBAL: form', () => {
    before(() => {
        /*if (!window.$$)*/ VJS.register({prefix: 'prfx', raiseError: true});  // set options to raise error (for testing purpose)
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

    describe('serialize()', () => {
        it('should return serialized string', () => {
            let str1 = 'test-field-0=&test-field-1=some+value&test-field-2=other+value&test-field-3=&test-field-4=',
                str2 = 'test-field-5=textual+value&test-field-6=7';
 
            assert.strictEqual( serialize('test-form'), '' );  // if non existent form, empty string is returned
            assert.strictEqual( serialize('test-form-1'), str1 );
            assert.strictEqual( serialize('test-form-2'), str2 );
        });
    });

});