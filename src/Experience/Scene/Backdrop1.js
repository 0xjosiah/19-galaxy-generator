import * as THREE from 'three'
import Experience from "../Experience";
import Asteroid from './Asteroid';

export default class Backdrop1 {
    constructor() {
        this.count = 10000
        this.experience = new Experience()
        this.scene = this.experience.scene

        this.setAsteroids()
    }

    setAsteroids() {
        for(let i = 0; i < this.count; i++) {
            const asteroid = new Asteroid()
            asteroid.instance.position.set(
                (Math.random() - .5) * 75,
                (Math.random() - .5) * 75,
                (Math.random() - .5) * 75
            )
            asteroid.instance.rotation.x = Math.random() * Math.PI
            const randomScale = Math.random() * 2
            asteroid.instance.scale.set(randomScale, randomScale, randomScale)

            this.scene.add(asteroid.instance)
        }
    }
}