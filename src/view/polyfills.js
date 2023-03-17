// https://www.rainbowkit.com/docs/installation#additional-build-tooling-setup

import {Buffer} from 'buffer'
import * as process from "process";

window.global = window.global ?? window
window.Buffer = window.Buffer ?? Buffer
window.process = window.process ?? {env: {}}
window.process.nextTick = process.nextTick

export { }
