import * as THREE from 'three'
import Experience from "../Experience";

export default class Backdrop {
    constructor(count) {
        this.count = count
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.geometry = new THREE.BufferGeometry()
        this.positions = new Float32Array(this.count * 3)
        this.colors = new Float32Array(this.count * 3)

        this.setPositions()
        this.setColors()
        this.setMaterial()
        this.setPoints()
    }

    setPositions() {
        this.positions.forEach((item, index) => {
            return this.positions[index] = (Math.random() - .5) * 75
        })

        this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3))
    }

    setColors() {
        this.colors.forEach((item, index) => {
            return this.colors[index] = Math.random()
        })

        this.geometry.setAttribute('color', new THREE.BufferAttribute(this.colors, 3))
    }

    setMaterial() {
        this.material = new THREE.PointsMaterial({
            size: .1,
            sizeAttenuation: true,
            depthWrite: false,
            alphaMap: this.resources.items.spaceDust,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
        })
    }

    setPoints() {
        this.points = new THREE.Points(this.geometry, this.material)
        this.scene.add(this.points)
    }
}