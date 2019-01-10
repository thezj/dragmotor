cc.Class({
    extends: cc.Component,

    properties: {
        globalnode: {
            default: null,
            type: cc.Node
        },
        cloud: {
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
        originX: 0
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.originX = this.node.x
        this.origincloudX = this.cloud.x
    },

    update(dt) {
        if (this.originX - this.node.x >= 1198) {
            this.node.x = this.originX

        } else {
            this.node.x -= this.globalnode.getComponent('global').velocity
        }
        if (this.origincloudX - this.cloud.x >= 1627) {
            this.cloud.x = this.origincloudX
        } else {
            this.cloud.x -= this.globalnode.getComponent('global').velocity / 150
        }
    },
});
