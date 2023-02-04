import * as Preact from "preact"
import "views/Mount.view.less"
import Poin from "poin"

export default class Mount {
    render() {
        return (
            <div className="Mount">
                <div className="Frame" id="frame">
                    {this.screen}
                </div>
            </div>
        )
    }
    get screen() {
        if(game.screen == "TitleScreen") {
            return <TitleScreen/>
        }
        if(game.screen == "LevelSelectScreen") {
            return <LevelSelectScreen/>
        }
        return <GameScreen/>
    }
}

class TitleScreen {
    render() {
        return (
            <div class="TitleScreen" onClick={this.onClick}>
                TITLE SCREEN - click anywhere to continue
            </div>
        )
    }
    onClick() {
        game.screen = "LevelSelectScreen"
    }
}

class LevelSelectScreen {
    render() {
        return (
            <div class="LevelSelectScreen">
                <div>LEVEL SELECT SCREEN - click on your level</div>
                <div class="SelectableLevel" onClick={this.onClick}>Level 1 - شكشوكة</div>
                <div class="SelectableLevel" onClick={this.onClick}>Level 2 - شوربة عدس</div>
                <div class="SelectableLevel" onClick={this.onClick}>Level 3 - يالنجي ورق عنب</div>
            </div>
        )
    }
    onClick() {
        game.screen = "GameScreen"
    }
}

class GameScreen {
    render() {
        return (
            <div class="GameScreen" onClick={this.onClick} onContextMenu={this.onContextMenu}
                hasSelectedItem={game.selectedItem != undefined}>
                <div class="CookbookSpace">
                    <p>Level 2 - شوربة عدس</p>
                    <p>Add water to pot.</p>
                    <p>Put pot on stove. Boil.</p>
                    <p>Cut onions, carrots and garlic. Put in pot.</p>
                    <p>Stir.</p>
                    <p>Cut beef into tiny(?) cubes. Put in the pot.</p>
                    <p>Stir.</p>
                    <p>Add salt, to taste.</p>
                    <p>Eat!!</p>
                </div>
                <div class="CookingSpace">
                    <Item item="CuttingBoard" isSelectable={false}/>
                    <Item item="Sink" isSelectable={false}/>
                    <Item item="Stove" isSelectable={false}/>
                    <Item item="Pot"/>
                    <Item item="Salt"/>
                    <Item item="Beef"/>
                    <Item item="Onions"/>
                    <Item item="Carrots"/>
                    <Item item="Garlic"/>
                    <Item item="Knife"/>
                    <SelectedItem/>
                </div>
            </div>
        )
    }
    get onClick() {
        return (event) => {
            if(game.selectedItem != undefined) {
                game.items[game.selectedItem].position = undefined
                game.selectedItem = undefined
            }
        }
    }
    get onContextMenu() {
        return (event) => {
            event.preventDefault()
            if(game.selectedItem != undefined) {
                game.items[game.selectedItem].position = undefined
                game.selectedItem = undefined
            }
        }
    }
}

class Item {
    render() {
        return (
            <div class="Item"
                id={this.props.item}
                cuts={game.items[this.props.item]?.cuts || 0}
                position={game.items[this.props.item]?.position || "Default"}
                isSelected={game.selectedItem == this.props.item}
                isSelectable={this.props.isSelectable !== false}
                onClick={this.onClick}/>
        )
    }
    get onClick() {
        return (event) => {
            event.stopPropagation()
            const clickedItem = this.props.item
            if(game.selectedItem == "Knife"
            && clickedItem == "CuttingBoard") {
                Object.values(game.items).forEach((item) => {
                    if(item.position == "CuttingBoard"
                    && item.canBeCut == true) {
                        console.log(item)
                        item.cuts = item.cuts || 0
                        item.cuts += 1
                        if(item.cuts > item.maxcuts) {
                            item.cuts = item.maxcuts
                        }
                    }
                })
                return
            }
            if(clickedItem == "CuttingBoard"
            && game.selectedItem != undefined
            && game.items[game.selectedItem]?.canBeCut == true) {
                Object.values(game.items).forEach((item) => {
                    if(item.position == "CuttingBoard") {
                        item.position = undefined
                    }
                })
                game.items[game.selectedItem].position = "CuttingBoard"
                game.selectedItem = undefined
                return
            }

            if(this.props.isSelectable === false) return
            game.selectedItem = this.props.item
        }
    }
}

class SelectedItem {
    render() {
        if(game.selectedItem == undefined) return
        return (
            <div class={"Selected Item"}
                id={game.selectedItem}
                cuts={game.items[game.selectedItem]?.cuts || 0}
                style={this.style}>
            </div>
        )
    }
    get style() {
        return {
            "left": Poin.position.x + "px",
            "top": Poin.position.y + "px",
        }
    }
}

window.addEventListener("keydown", function(event) {
    if(event.keyCode != 32) return
    const bounds = document.getElementById("frame").getBoundingClientRect()
    let x = (((Poin.position.x - bounds.left) / bounds.width) * (16 * 3))
    let y = (((Poin.position.y - bounds.top) / bounds.height) * (9 * 3))
    x -= 1
    y -= 1
    x = x.toFixed(2)
    y = y.toFixed(2)
    x += "em"
    y += "em"
    const style = "left: " + x + "; " + "top: " + y + ";"
    navigator.clipboard.writeText(style)
    console.log(style)
})

const game = {
    "screen": "GameScreen",
    // "screen": "TitleScreen",
    "selectedItem": undefined,
    "items": {
        "Onions": {"canBeCut": true, "maxcuts": 3},
        "Carrots": {"canBeCut": true, "maxcuts": 3},
        "Garlic": {"canBeCut": true, "maxcuts": 3},
        "Beef": {"canBeCut": true, "maxcuts": 5},
        "Salt": {},
        "Stove": {},
        "Sink": {},
        "Pot": {},
        "CuttingBoard": {},
        "Knife": {},
    }
}
