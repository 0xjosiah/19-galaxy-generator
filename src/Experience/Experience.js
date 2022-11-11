import * as THREE from 'three'
import Camera from './Camera';
import Renderer from './Renderer';
import Universe from './Scene/Universe';
import sources from './sources';
import Debug from './Utils/Debug';
import Resources from './Utils/Resources';
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
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.universe = new Universe()


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