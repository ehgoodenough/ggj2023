import * as Preact from "preact"
import "views/Mount.view.less"

export default class Mount {
    render() {
        return (
            <div className="Mount" onDrop={this.onDrop}>
                <MainScreen/>
            </div>
        )
    }
}

class MainScreen {
    render() {
        return (
            <div class="MainScreen">
                Hello World!!
            </div>
        )
    }
}
