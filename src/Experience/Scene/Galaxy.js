import * as THREE from 'three'
import Experience from '../Experience'

export default class Galaxy {
    
    constructor() {
        const parameters = {
            count: 100000,
            size: .01,
            radius: 5,
            branches: 3,
            curvature: 1,
            randomness: .2,
            concentration: 3,
            innerColor: 0xff6030,
            outerColor: 0x1b3984,
            blackHole: false,
            branchWaves: false,
        }

        this.count = parameters.count
        this.size = parameters.size
        this.radius = parameters.radius
        this.branches = parameters.branches
        this.curvature = parameters.curvature
        this.randomness = parameters.randomness
        this.concentration = parameters.concentration
        this.innerColor = parameters.innerColor
        this.outerColor = parameters.outerColor
        this.blackHole = parameters.blackHole
        this.branchWaves = parameters.branchWaves

        this.experience = new Experience()
        this.resources = this.experience.resources

        this.geometry = new THREE.BufferGeometry()
        this.positions = new Float32Array(this.count * 3)
        this.colors = new Float32Array(this.count * 3)

        this.colorInside = new THREE.Color(this.innerColor)
        this.colorOutside = new THREE.Color(this.outerColor)

        // this.setPositions()
        // this.setColors()

        // this.setMaterial()
        // this.setPoints()

    }
}