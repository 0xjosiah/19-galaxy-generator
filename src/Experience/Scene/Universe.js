import * as THREE from 'three'
import Backdrop from './Backdrop'
import Experience from '../Experience'
import Galaxy from './Galaxy'

export default class Universe {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.resources.on('ready', () => {
            this.backdrop = new Backdrop(10000)
            this.galaxy = new Galaxy()
        })
    }
}