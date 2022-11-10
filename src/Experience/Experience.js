import * as THREE from 'three'
import { Camera } from 'three';
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";

let instance = null

export default class Experience {
    constructor(canvas) {

        // Singleton
        if(instance) return instance
        instance = this

        // Options
        this.canvas = canvas

        // Setup
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.camera = new Camera()

        // Resize event
        this.sizes.on('resize', () => this.resize())

        // Tick event
        this.time.on('tick', () => this.update())
    }

    resize() {
        // console.log('resize event');
        this.camera.resize()
    }

    update() {
        // console.log('update event');
        this.camera.update()
    }
}