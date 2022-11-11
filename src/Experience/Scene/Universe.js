import * as THREE from 'three'
import Experience from '../Experience'

export default class Universe {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene

        const testBox = new THREE.Mesh(
            new THREE.BoxGeometry(),
            new THREE.MeshBasicMaterial()
        )

        this.scene.add(testBox)
    }
}