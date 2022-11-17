import * as THREE from 'three'
import Experience from '../Experience'
import BlackHole from './BlackHole'

export default class Galaxy {
    
    constructor() {
        
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.scene = this.experience.scene
        this.debug = this.experience.debug
        this.debugFolder = this.debug.ui.addFolder('Galaxy')

        this.parameters = {}
        this.parameters.count = 100000
        this.parameters.size = .01
        this.parameters.radius = 5
        this.parameters.branches = 3
        this.parameters.curvature = 1
        this.parameters.randomness = .2
        this.parameters.concentration = 3
        this.parameters.innerColor = 0xff6030
        this.parameters.outerColor = 0x1b3984
        this.parameters.branchWaves = false
        this.parameters.isBlackHole = true
        this.parameters.starShape = 4

        this.debugFolder.add(this.parameters, 'count', 100, 1000000, 100).onFinishChange(() => this.updateGalaxy())
        this.debugFolder.add(this.parameters, 'size', .001, .1, .001).onFinishChange(() => this.updateGalaxy())
        this.debugFolder.add(this.parameters, 'radius', .01, 20, .01).onFinishChange(() => this.updateGalaxy())
        this.debugFolder.add(this.parameters, 'branches', 2, 20, 1).onFinishChange(() => this.updateGalaxy())
        this.debugFolder.add(this.parameters, 'curvature', -5, 5, .01).onFinishChange(() => this.updateGalaxy())
        this.debugFolder.add(this.parameters, 'randomness', 0, 2, .01).onFinishChange(() => this.updateGalaxy())
        this.debugFolder.add(this.parameters, 'concentration', 1, 10, .1).onFinishChange(() => this.updateGalaxy())
        this.debugFolder.addColor(this.parameters, 'innerColor').onFinishChange(() => this.updateGalaxy())
        this.debugFolder.addColor(this.parameters, 'outerColor').onFinishChange(() => this.updateGalaxy())
        this.debugFolder.add(this.parameters, 'isBlackHole').onFinishChange(() => this.updateGalaxy())
        this.debugFolder.add(this.parameters, 'branchWaves').onFinishChange(() => this.updateGalaxy())
        this.debugFolder.add(this.parameters, 'starShape', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]).onFinishChange(() => this.updateGalaxy())

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
        if(this.parameters.isBlackHole) {
            this.blackHole = new BlackHole()
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

    groupGalaxy() {
        this.group = new THREE.Group()
        this.group.add(this.points, this.blackHole)
    }
}