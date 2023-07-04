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
        describe('$get()', () => {
            it('returned response should be JSON object', () => {
                // const rGet1 = await $get(`${url}/todos/29`);
 
                assert.isObject( rGet1 );
                assert.hasAllKeys( rGet1, ['userId', 'id', 'title', 'completed'] );
                assert.deepEqual( rGet1, {userId: 2, id: 29, title: 'laborum aut in quam', completed: false} );
             });
             it('returned response should be Array of twenty JSON objects', () => {
                // const rGet2 = await $get(`${u}/todos?userId=7`);
 
                assert.isArray( rGet2 );
                assert.lengthOf( rGet2, 20 );
                assert.hasAllKeys( rGet2[0], ['userId', 'id', 'title', 'completed'] );
             });
        });

        describe('$post()', () => {
            it('should send data and return JSON response', () => {
                // const rPost = await $post(`${url}/todos?userId=3`, {title: 'Lorem ipsum', completed: false});
 
                assert.isObject( rPost );
                assert.hasAllKeys( rPost, ['userId', 'title', 'completed', 'id'] );
                assert.deepEqual( rPost, {userId: 3, title: 'Lorem ipsum', completed: false, id: 201} );
            });
        });

        describe('$put()', () => {
            it('should send new data and return JSON response', () => {
                // const rPut = await $put(`${u}/todos/73`, {userId: 5, title: 'Lorem ipsum', completed: false});
 
                assert.isObject( rPut );
                assert.hasAllKeys( rPut, ['userId', 'title', 'completed', 'id'] );
                assert.deepEqual( rPut, {userId: 5, title: 'Lorem ipsum', completed: false, id: 73} );
            });
        });

        describe('$patch()', () => {
            it('should send part of new data and return JSON response', () => {
                // const rPatch = await $patch(`${u}/todos/89`, {title: 'Lorem ipsum'});
 
                assert.isObject( rPatch );
                assert.hasAllKeys( rPatch, ['userId', 'id', 'title', 'completed'] );
                assert.deepEqual( rPatch, {userId: 5, id: 89, title: 'Lorem ipsum', completed: true} );
            });
        });

        describe('$del()', () => {
            it('should delete data return empty JSON', () => {
                // const rDel = await $del(`${u}/todos/13`);
 
                assert.isObject( rDel );
                assert.isEmpty( rDel );
            });
        });
    });

    run();
})();