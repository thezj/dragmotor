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
        velocity: 0,
        viewvelocity: {
            default: null,
            type: cc.Label
        },
        viewrevolve: {
            default: null,
            type: cc.ProgressBar
        },
        accelerate: 0,
        gear: 0,
        toothratio: {
            default: [],
            type: [cc.Float]
        },
        launch: 0,
        distance: 0,
        begintime: 0,
        expendtime: 0
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.begintime = new Date().getTime()
        //当前档位1档加速度变成1
        this.accelerate = 1
        this.gear = 0
        this.toothratio = [0.9, 1.5, 1.9, 2.4, 2.8]
        this.velocity = 0
        setTimeout(() => {
            this.velocity = 60 * Math.pow((1 / (1 + Math.abs(this.viewrevolve.progress - 0.7))), 3)
            this.launch = 1
        }, 4000);
    },

    update(dt) {

        if (!this.launch) return
        this.distance += this.velocity * dt / 2
        if (this.distance >= 800) {
            this.launch = 0
            this.expendtime = (new Date().getTime() - this.begintime) / 1000
        }
        this.viewvelocity.string = `1/2mi成绩：${this.expendtime}\n挡位：${this.gear + 1}\n车速：${Math.round(this.velocity)}\n转速：${Math.round(100 * this.velocity / this.toothratio[this.gear])}`
        this.viewrevolve.progress = (Math.round(100 * this.velocity / this.toothratio[this.gear]) + 1000) / 13900

        switch (this.gear) {
            case 0:
                this.velocity = this.velocity + dt * this.accelerate * 37
                break;
            case 1:
                this.velocity = this.velocity + dt * this.accelerate * 30
                break;
            case 2:
                this.velocity = this.velocity + dt * this.accelerate * 20
                break;
            case 3:
                this.velocity = this.velocity + dt * this.accelerate * 15
                break;
            case 4:
                this.velocity = this.velocity + dt * this.accelerate * 10
                break;
            default:
                break;
        }
        //加速度随着转速的变化呈现出0-1-0的变化
        let x = (Math.round(100 * this.velocity / this.toothratio[this.gear]) + 1100) / 15000
        this.accelerate = (-4 * Math.pow(x, 3) + 4 * Math.pow(x, 2)) * 2
    },
});
