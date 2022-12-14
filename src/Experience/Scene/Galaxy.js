import * as THREE from 'three'
import Experience from '../Experience'
import BlackHole from './BlackHole'

export default class Galaxy {
    
    constructor(parameters) {
        
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.scene = this.experience.scene
        this.parameters = parameters

        this.setGeometry()
        this.setBlackHole()
        this.setMaterial()
        this.setPoints()
    }

    setGeometry() {
        this.geometry = new THREE.BufferGeometry()
        this.positions = new Float32Array(this.parameters.count * 3)
        this.colors = new Float32Array(this.parameters.count * 3)

        this.colorInside = new THREE.Color(this.parameters.innerColor)
        this.colorOutside = new THREE.Color(this.parameters.outerColor)

        for(let i = 0; i < this.parameters.count; i++) {
            const i3 = i * 3
            const radiusMultiplier = this.parameters.radius + Math.pow(Math.random(), this.parameters.concentration)
            const randomRadius = Math.pow(Math.random(), this.parameters.concentration) * radiusMultiplier // this concentrates stars toward center of branches, adding addt'l math.pow helps prevent cross formation in center
            
            // Positions
            const curvatureAngle = randomRadius * this.parameters.curvature
            const branchAngle = (i % this.parameters.branches) / this.parameters.branches * Math.PI * 2

            const randomX = Math.pow(Math.random(), this.parameters.concentration) * (Math.random() < .5 ? 1 : -1) * this.parameters.randomness * randomRadius
            const randomY = Math.pow(Math.random(), this.parameters.concentration) * (Math.random() < .5 ? 1 : -1) * this.parameters.randomness * randomRadius
            const randomZ = Math.pow(Math.random(), this.parameters.concentration) * (Math.random() < .5 ? 1 : -1) * this.parameters.randomness * randomRadius

            // mess with these to make really cool effects
            const alternating = branchAngle < Math.PI ? 1 : -1
            const xPos = Math.cos(branchAngle + curvatureAngle) * randomRadius
            const yPos = Math.sin(randomRadius) * Math.cos(randomRadius) * alternating
            const zPos = Math.sin(branchAngle + curvatureAngle) * randomRadius

            this.positions[i3 + 0] = xPos + randomX
            this.positions[i3 + 1] = this.parameters.branchWaves ? yPos + randomY : randomY
            this.positions[i3 + 2] = zPos + randomZ

            // Colors
            const mixedColor = this.colorInside.clone().lerp(this.colorOutside, randomRadius / this.parameters.radius)
            this.colors[i3 + 0] = mixedColor.r
            this.colors[i3 + 1] = mixedColor.g
            this.colors[i3 + 2] = mixedColor.b
        }
        this.geometry.setAttribute('color', new THREE.BufferAttribute(this.colors, 3))
        this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3))
    }

    setMaterial() {
        const stars = this.resources.items[`stars${this.parameters.starShape}`]

        this.material = new THREE.PointsMaterial({
            size: this.parameters.size,
            sizeAttenuation: true,
            depthWrite: false,
            alphaMap: stars,
            blending: THREE.AdditiveBlending,
            vertexColors: true
        })
    }

    setPoints() {
        this.points = new THREE.Points( this.geometry, this.material )
        this.scene.add(this.points)
    }

    setBlackHole() {
        if(this.parameters.isBlackHole && !this.blackHole) {
            this.blackHole = new BlackHole()
        }
        if(this.parameters.isBlackHole && this.blackHole) {
            this.scene.add(this.blackHole.instance)
        }
    }

    updateGalaxy() {
        this.geometry.dispose()
        this.material.dispose()
        this.scene.remove(this.points)
        if(this.blackHole) this.scene.remove(this.blackHole.instance)

        this.setGeometry()
        this.setBlackHole()
        this.setMaterial()
        this.setPoints()
    }

    setGroup() {
        this.group = new THREE.Group()
        this.group.add(this.points)
        if(this.parameters.isBlackHole) this.group.add(this.blackHole.instance)
        this.scene.add(this.group)
    }
}