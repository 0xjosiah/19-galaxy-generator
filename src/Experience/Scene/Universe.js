import * as THREE from 'three'
import Backdrop from './Backdrop'
import Experience from '../Experience'

export default class Universe {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.backdropStarsCount = 30000

        this.resources.on('ready', () => {
            this.backdrop = new Backdrop(this.backdropStarsCount)
        })
    }
}