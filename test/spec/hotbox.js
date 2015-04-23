define(function(require, exports, module) {
    var HotBox = require('../../src/hotbox');
    var hotbox;

    describe('Hot Box', function() {

        it('was exported', function() {
            expect(HotBox).not.toBeNull();
        });

        it('can be constructed', function() {
            hotbox = new HotBox('#hotbox-container');
            expect(hotbox).not.toBeNull();
            expect(hotbox instanceof HotBox).toBeTruthy();
        });

        var main;
        it('can define a state', function() {
            main = hotbox.state('main');
            expect(main).not.toBeNull();
            expect(document.querySelector('.hotbox .state.main')).not.toBeNull();
        });

        var center, ring, top, bottom;
        it('can create a button on center', function() {
            center = main.button({
                position: 'center',
                label: 'Center',
                key: 'c'
            });
            expect(center).not.toBeNull();
            expect(document.querySelector('.hotbox .state.main .center .button')).not.toBeNull();
        });

        it('can create a button on ring', function() {
            ring = main.button({
                position: 'ring',
                label: 'ring',
                key: 'r'
            });
            expect(ring).not.toBeNull();
            expect(document.querySelector('.hotbox .state.main .ring .button')).not.toBeNull();
        });

        it('can create a button on top', function() {
            top = main.button({
                position: 'top',
                label: 'top',
                key: 't'
            });
            expect(top).not.toBeNull();
            expect(document.querySelector('.hotbox .state.main .top .button')).not.toBeNull();
        });

        it('can create a button on bottom', function() {
            bottom = main.button({
                position: 'bottom',
                label: 'bottom',
                key: 'b'
            });
            expect(bottom).not.toBeNull();
            expect(document.querySelector('.hotbox .state.main .bottom .button')).not.toBeNull();
        });

    });
});
