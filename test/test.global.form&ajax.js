describe('GLOBAL: form & ajax', () => {
    before(() => {
        if (!window.$$) VJS.register('prfx');  // for grep to properly work
    });


    describe('$fd', () => {
        it('should return NULL and set classes accordingly', () => {
            let validation = ['is-valid', 'is-valid', 'is-valid', 'is-invalid', 'is-invalid'],
                required = ['test-field-1', 'test-field-3'],
                classes = {error: 'is-invalid', success: 'is-valid'};
 
            // Confirm, that validation classes not set yet
            validation.forEach((cl, idx) => {
                assert.isFalse( $hcl(`test-field-${idx}`, cl) );
            });
 
            // Get form data and confirm set classes accordingly
            assert.isNull( $fd('test-form', required, {}, 'json', classes) );
            validation.forEach((cl, idx) => {
                assert.isTrue( $hcl(`test-field-${idx}`, cl) );
            });
        });
    });

});