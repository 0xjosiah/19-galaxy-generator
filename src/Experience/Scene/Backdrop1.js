import * as THREE from 'three'
import Experience from "../Experience";

export default class Backdrop1 {
    constructor() {
        this.count = 10000
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.geometry = new THREE.OctahedronGeometry(.01, 0)
        this.positions = new Float32Array(this.count * 3)
        this.colors = new Float32Array(this.count * 3)
        this.material = new THREE.MeshMatcapMaterial({ matcap: this.resources.items.matcap3 })

        // this.setPositions()
        // this.setColors()
        // this.setMaterial()
        // this.setPoints()
    }
}