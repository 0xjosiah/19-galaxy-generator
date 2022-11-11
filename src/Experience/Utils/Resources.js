import * as THREE from 'three'
import Experience from "../Experience";
import EventEmitter from './EventEmitter';

export default class Resources extends EventEmitter {
    constructor(sources) {
        super()
        
        this.sources = sources
        console.log(this.sources);


    }
}