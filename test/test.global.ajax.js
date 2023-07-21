describe('GLOBAL: ajax', () => {
    var url = 'https://jsonplaceholder.typicode.com';  // Free fake API for testing and prototyping.

    before(() => {
        if (!window.$$) VJS.register({prefix: 'prfx'});  // for grep to properly work
    });


    describe('$get()', () => {
        it('should return JSON object and returned response data should be JSON object', async () => {
            var rGet = await $get(`${url}/todos/29`);
            var data = rGet.data;
 
            assert.isObject( rGet );
            assert.hasAllKeys( rGet, ['success', 'data', 'message'] );
            assert.isBoolean( rGet.success );
            assert.isObject( rGet.data )
            assert.isString( rGet.message );
 
            assert.isObject( data );
            assert.hasAllKeys( data, ['userId', 'id', 'title', 'completed'] );
            assert.deepEqual( data, {userId: 2, id: 29, title: 'laborum aut in quam', completed: false} );
        });
        it('returned response data should be Array of twenty JSON objects', async () => {
            var rGet = await $get(`${url}/todos?userId=7`);
            var data = rGet.data;
 
            assert.isArray( data );
            assert.lengthOf( data, 20 );
            assert.hasAllKeys( data[0], ['userId', 'id', 'title', 'completed'] );
        });
    });

    describe('$post()', () => {
        it('should send data and return JSON data', async () => {
            var rPost = await $post(`${url}/todos?userId=3`, {title: 'Lorem ipsum', completed: false});
            var data = rPost.data;
 
            assert.isObject( data );
            assert.hasAllKeys( data, ['userId', 'title', 'completed', 'id'] );
            assert.deepEqual( data, {userId: 3, title: 'Lorem ipsum', completed: false, id: 201} );
        });
    });

    describe('$put()', () => {
        it('should send new data and return JSON data', async () => {
            var rPut = await $put(`${url}/todos/73`, {userId: 5, title: 'Lorem ipsum', completed: false});
            var data = rPut.data;
 
            assert.isObject( data );
            assert.hasAllKeys( data, ['userId', 'title', 'completed', 'id'] );
            assert.deepEqual( data, {userId: 5, title: 'Lorem ipsum', completed: false, id: 73} );
        });
    });

    describe('$patch()', () => {
        it('should send part of new data and return JSON data', async () => {
            var rPatch = await $patch(`${url}/todos/89`, {title: 'Lorem ipsum'});
            var data = rPatch.data;
 
            assert.isObject( data );
            assert.hasAllKeys( data, ['userId', 'id', 'title', 'completed'] );
            assert.deepEqual( data, {userId: 5, id: 89, title: 'Lorem ipsum', completed: true} );
        });
    });

    describe('$del()', () => {
        it('should devare data return empty JSON data', async () => {
            var rDel = await $del(`${url}/todos/13`);
            var data = rDel.data;
 
            assert.isObject( data );
            assert.isEmpty( data );
        });
    });
});
