(async function() {
    if (!window.$$) VJS.register('prfx');  // for grep to properly work

    let u = 'https://jsonplaceholder.typicode.com',  // Free fake API for testing and prototyping.
        rGet1 = await $get(`${u}/todos/29`),
        rGet2 = await $get(`${u}/todos?userId=7`),
        rPost = await $post(`${u}/todos?userId=3`, {title: 'Lorem ipsum', completed: false}),
        rPut = await $put(`${u}/todos/73`, {userId: 5, title: 'Lorem ipsum', completed: false}),
        rPatch = await $patch(`${u}/todos/89`, {title: 'Lorem ipsum'}),
        rDel = await $del(`${u}/todos/13`);


    describe('GLOBAL: ajax', () => {
        describe('Response object', () => {
            it('should return JSON object', () => {
                // const rGet1 = await $get(`${url}/todos/29`);
 
                assert.isObject( rGet1 );
                assert.hasAllKeys( rGet1, ['success', 'data', 'message'] );
                assert.isBoolean( rGet1.success );
                assert.isObject( rGet1.data )
                assert.isString( rGet1.message );
            });
        });

        describe('$get()', () => {
            it('returned response data should be JSON object', () => {
                // const rGet1 = await $get(`${url}/todos/29`);
                let data = rGet1.data;
 
                assert.isObject( data );
                assert.hasAllKeys( data, ['userId', 'id', 'title', 'completed'] );
                assert.deepEqual( data, {userId: 2, id: 29, title: 'laborum aut in quam', completed: false} );
             });
             it('returned response data should be Array of twenty JSON objects', () => {
                // const rGet2 = await $get(`${u}/todos?userId=7`);
                let data = rGet2.data;
 
                assert.isArray( data );
                assert.lengthOf( data, 20 );
                assert.hasAllKeys( data[0], ['userId', 'id', 'title', 'completed'] );
             });
        });

        describe('$post()', () => {
            it('should send data and return JSON data', () => {
                // const rPost = await $post(`${url}/todos?userId=3`, {title: 'Lorem ipsum', completed: false});
                let data = rPost.data;
 
                assert.isObject( data );
                assert.hasAllKeys( data, ['userId', 'title', 'completed', 'id'] );
                assert.deepEqual( data, {userId: 3, title: 'Lorem ipsum', completed: false, id: 201} );
            });
        });

        describe('$put()', () => {
            it('should send new data and return JSON data', () => {
                // const rPut = await $put(`${u}/todos/73`, {userId: 5, title: 'Lorem ipsum', completed: false});
                let data = rPut.data;
 
                assert.isObject( data );
                assert.hasAllKeys( data, ['userId', 'title', 'completed', 'id'] );
                assert.deepEqual( data, {userId: 5, title: 'Lorem ipsum', completed: false, id: 73} );
            });
        });

        describe('$patch()', () => {
            it('should send part of new data and return JSON data', () => {
                // const rPatch = await $patch(`${u}/todos/89`, {title: 'Lorem ipsum'});
                let data = rPatch.data;
 
                assert.isObject( data );
                assert.hasAllKeys( data, ['userId', 'id', 'title', 'completed'] );
                assert.deepEqual( data, {userId: 5, id: 89, title: 'Lorem ipsum', completed: true} );
            });
        });

        describe('$del()', () => {
            it('should delete data return empty JSON data', () => {
                // const rDel = await $del(`${u}/todos/13`);
                let data = rDel.data;
 
                assert.isObject( data );
                assert.isEmpty( data );
            });
        });
    });

    run();
})();