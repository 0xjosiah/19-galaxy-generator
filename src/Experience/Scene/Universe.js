import * as THREE from 'three'
import Backdrop1 from './Backdrop1'
import Experience from '../Experience'
import Galaxy from './Galaxy'

export default class Universe {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        this.debugFolder = this.debug.ui.addFolder('Galaxy Placement')
        this.galaxies = {}
        this.galaxyCount = 0
        
        this.debugFolder = this.debug.ui.addFolder(`Galaxy ${this.code}`)

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

        this.debugFolder.add(this.parameters, 'count', 100, 1000000, 100).onFinishChange(() => this.galaxies[this.galaxyCount].updateGalaxy())
        this.debugFolder.add(this.parameters, 'size', .001, .1, .001).onFinishChange(() => this.galaxies[this.galaxyCount].updateGalaxy())
        this.debugFolder.add(this.parameters, 'radius', .01, 20, .01).onFinishChange(() => this.galaxies[this.galaxyCount].updateGalaxy())
        this.debugFolder.add(this.parameters, 'branches', 2, 20, 1).onFinishChange(() => this.galaxies[this.galaxyCount].updateGalaxy())
        this.debugFolder.add(this.parameters, 'curvature', -5, 5, .01).onFinishChange(() => this.galaxies[this.galaxyCount].updateGalaxy())
        this.debugFolder.add(this.parameters, 'randomness', 0, 2, .01).onFinishChange(() => this.galaxies[this.galaxyCount].updateGalaxy())
        this.debugFolder.add(this.parameters, 'concentration', 1, 10, .1).onFinishChange(() => this.galaxies[this.galaxyCount].updateGalaxy())
        this.debugFolder.addColor(this.parameters, 'innerColor').onFinishChange(() => this.galaxies[this.galaxyCount].updateGalaxy())
        this.debugFolder.addColor(this.parameters, 'outerColor').onFinishChange(() => this.galaxies[this.galaxyCount].updateGalaxy())
        this.debugFolder.add(this.parameters, 'isBlackHole').onFinishChange(() => this.galaxies[this.galaxyCount].updateGalaxy())
        this.debugFolder.add(this.parameters, 'branchWaves').onFinishChange(() => this.galaxies[this.galaxyCount].updateGalaxy())
        this.debugFolder.add(this.parameters, 'starShape', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]).onFinishChange(() => this.galaxies[this.galaxyCount].updateGalaxy())

        this.resources.on('ready', () => {
            this.backdrop = new Backdrop1()
            this.addGalaxy()
        })

        const debugObj = {
            placeGalaxy: () => this.placeGalaxy()
        }
        this.debugFolder.add(debugObj, 'placeGalaxy')

        // this.axesHelper = new THREE.AxesHelper(5)
        // this.scene.add(this.axesHelper)
    }

    addGalaxy() {
        this.galaxyCount++
        this.galaxies[this.galaxyCount] = new Galaxy(this.parameters)
    }

    locationGenerator() {
        let location = (Math.random() - .5) * 75
        if(Math.abs(location) < this.galaxies[this.galaxyCount].parameters.radius) {
            (Math.random() - .5) > 0 
            ? location -= this.galaxies[this.galaxyCount].parameters.radius
            : location += this.galaxies[this.galaxyCount].parameters.radius
        }
        return location
    }

    placeGalaxy() {
        this.galaxies[this.galaxyCount].setGroup()
        this.galaxies[this.galaxyCount].group.position.set( this.locationGenerator(), this.locationGenerator(), this.locationGenerator() )
        this.galaxies[this.galaxyCount].group.rotation.x = Math.random() * Math.PI
        this.addGalaxy()
    }
}