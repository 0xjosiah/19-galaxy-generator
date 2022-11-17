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
        this.galaxies[this.galaxyCount] = new Galaxy()
        console.log(this.galaxies[this.galaxyCount])
        console.log(this.galaxies[this.galaxyCount].points)
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
        this.galaxies[this.galaxyCount].group.position.set( this.locationGenerator(), this.locationGenerator(), this.locationGenerator() )
        this.galaxies[this.galaxyCount].group.rotation.x = Math.random() * Math.PI
        this.addGalaxy()
    }
}