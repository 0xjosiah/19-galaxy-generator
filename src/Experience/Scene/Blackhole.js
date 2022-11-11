import * as THREE from 'three'
import Experience from '../Experience'

export default class Blackhole {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene

        this.setGeometry()
        this.setMaterial()
        this.setMesh()

    }
    
    setGeometry() {
        this.geometry = new THREE.SphereGeometry(1, 64, 64)
    }

    setMaterial() {
        this.material = new THREE.MeshStandardMaterial()
    }

    setMesh() {
        this.instance = new THREE.Mesh( this.geometry, this.material )
        this.scene.add(this.instance)
    }
}