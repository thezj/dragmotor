// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        globalnode: {
            default: null,
            type: cc.Node
        },
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        addgasoline: 0
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.node.on('mousedown', function (event) {
            this.addgasoline = 1
        }, this);
        this.node.on('mouseup', function (event) {
            this.addgasoline = 0
        }, this);

        this.node.on('mouseleave', function (event) {
            this.addgasoline = 0
        }, this);
    },

    addfuel() {
    },

    update(dt) {
        if (this.addgasoline) {
            this.globalnode.getComponent('global').viewrevolve.progress += 0.01
            if (this.globalnode.getComponent('global').viewrevolve.progress > 1) {
                this.globalnode.getComponent('global').viewrevolve.progress = 1

            }
        } else {
            this.globalnode.getComponent('global').viewrevolve.progress -= 0.005
            if (this.globalnode.getComponent('global').viewrevolve.progress < 0) {
                this.globalnode.getComponent('global').viewrevolve.progress = 0

            }
        }
    },
});
