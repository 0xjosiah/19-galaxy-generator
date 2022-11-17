import * as THREE from 'three'
import Backdrop1 from './Backdrop1'
import Experience from '../Experience'
import Galaxy from './Galaxy'

export default class Universe {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.resources.on('ready', () => {
            this.backdrop = new Backdrop1()
            this.galaxy = new Galaxy()
        })
    }
}