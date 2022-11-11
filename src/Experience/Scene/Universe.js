import * as THREE from 'three'
import Experience from '../Experience'

export default class Universe {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.resources.on('ready', () => {
            console.log('scene ready to display');
        })
    }
}