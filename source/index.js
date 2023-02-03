import * as Preact from "preact"
import Yaafloop from "yaafloop"

import Mount from "views/Mount.view.js"

let loop = new Yaafloop(function(delta) {
    this.mount = Preact.render(<Mount/>, document.body, this.mount)
})
