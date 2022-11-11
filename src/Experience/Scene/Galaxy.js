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
        this.scene = this.experience.scene

        this.geometry = new THREE.BufferGeometry()
        this.positions = new Float32Array(this.count * 3)
        this.colors = new Float32Array(this.count * 3)

        this.colorInside = new THREE.Color(this.innerColor)
        this.colorOutside = new THREE.Color(this.outerColor)

        this.setPositions()
        this.setColors()

        this.setMaterial()
        this.setPoints()
    }

    setPositions() {
        for(let i = 0; i < this.count; i++) {
            const i3 = i * 3
            const radiusMultiplier = this.radius + Math.pow(Math.random(), this.concentration)
            const randomRadius = Math.pow(Math.random(), this.concentration) * radiusMultiplier // this concentrates stars toward center of branches, adding addt'l math.pow helps prevent cross formation in center
            const curvatureAngle = randomRadius * this.curvature
            const branchAngle = (i % this.branches) / this.branches * Math.PI * 2

            const randomX = Math.pow(Math.random(), this.concentration) * (Math.random() < .5 ? 1 : -1) * this.randomness * randomRadius
            const randomY = Math.pow(Math.random(), this.concentration) * (Math.random() < .5 ? 1 : -1) * this.randomness * randomRadius
            const randomZ = Math.pow(Math.random(), this.concentration) * (Math.random() < .5 ? 1 : -1) * this.randomness * randomRadius

            // mess with these to make really cool effects
            const alternating = branchAngle < Math.PI ? 1 : -1
            const xPos = Math.cos(branchAngle + curvatureAngle) * randomRadius
            const yPos = Math.sin(randomRadius) * Math.cos(randomRadius) * alternating
            const zPos = Math.sin(branchAngle + curvatureAngle) * randomRadius

            this.positions[i3 + 0] = xPos + randomX
            this.positions[i3 + 1] = this.branchWaves ? yPos + randomY : randomY
            this.positions[i3 + 2] = zPos + randomZ
        }
        this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3))
    }

    setColors() {
        for(let i = 0; i < this.count; i++) {
            const i3 = i * 3
            const radiusMultiplier = this.radius + Math.pow(Math.random(), this.concentration)
            const randomRadius = Math.pow(Math.random(), this.concentration) * radiusMultiplier // this concentrates stars toward center of branches, adding addt'l math.pow helps prevent cross formation in center
            const mixedColor = this.colorInside.clone().lerp(this.colorOutside, randomRadius / this.radius)
            this.colors[i3 + 0] = mixedColor.r
            this.colors[i3 + 1] = mixedColor.g
            this.colors[i3 + 2] = mixedColor.b
        }
        this.geometry.setAttribute('color', new THREE.BufferAttribute(this.colors, 3))
    }

    setMaterial() {
        this.material = new THREE.PointsMaterial({
            size: this.size,
            sizeAttenuation: true,
            depthWrite: false,
            alphaMap: this.resources.items.stars,
            blending: THREE.AdditiveBlending,
            vertexColors: true
        })
    }

    setPoints() {
        this.points = new THREE.Points( this.geometry, this.material )
        this.scene.add(this.points)
    }
}