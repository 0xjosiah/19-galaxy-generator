import * as THREE from 'three'
import { Camera } from 'three';
import Renderer from './Renderer';
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
        this.renderer = new Renderer()

        // Resize event
        this.sizes.on('resize', () => this.resize())

        // Tick event
        this.time.on('tick', () => this.update())
    }

    resize() {
        this.camera.resize()
        this.renderer.resize()
    }

    update() {
        this.camera.update()
        this.renderer.update()
    }
}