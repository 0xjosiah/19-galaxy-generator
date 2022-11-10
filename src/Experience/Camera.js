import * as THREE from 'three'
import Experience from './Experience'

export default class Camera {
    constructor() {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas

        this.setInstance()
        this.setOrbitControls()
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, .1, 100)
        this.instance.position.set(3, 3, 3)
        this.scene.add(this.instance)
    }
}