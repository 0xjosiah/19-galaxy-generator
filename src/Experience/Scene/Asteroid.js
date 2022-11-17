import * as THREE from 'three'
import Experience from '../Experience'

export default class Asteroid {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.geometry = new THREE.OctahedronGeometry(.01, 0)
        this.material = new THREE.MeshMatcapMaterial({ matcap: this.resources.items.asteroidTexture })

        this.instance = new THREE.Mesh( this.geometry, this.material )

        this.scene.add(this.instance)
    }
}