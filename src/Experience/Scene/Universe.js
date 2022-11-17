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

        this.resources.on('ready', () => {
            this.backdrop = new Backdrop1()
            this.galaxy = new Galaxy()
        })

        const debugObj = {
            placeGalaxy: () => this.placeGalaxy()
        }
        this.debugFolder.add(debugObj, 'placeGalaxy')
    }

    locationGenerator() {
        return (Math.random() - .5) * 75
    }

    placeGalaxy() {
        this.galaxy.groupGalaxy()
        let location = this.locationGenerator()
        if(location < this.galaxy.parameters.radius) location += this.galaxy.parameters.radius
        this.galaxy.group.position.set( location, location, location )
        this.galaxy = new Galaxy()
    }
}