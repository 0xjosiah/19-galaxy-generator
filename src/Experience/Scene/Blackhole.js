import * as THREE from 'three'
import Experience from '../Experience'

export default class Blackhole {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.debug = this.experience.debug

        this.debugFolder = this.debug.ui.addFolder('Black hole')

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
        
        const debugObj = { on: true }
        this.debugFolder.add(debugObj, 'on')
        
        if(debugObj.on) this.scene.add(this.instance)
        else this.scene.remove(this.instance)

    }
}