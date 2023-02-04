import * as Preact from "preact"
import "views/Mount.view.less"
import Poin from "poin"
import Deepclone from "lodash.clonedeep"

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

//////////////
// SCREENS //
////////////

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
        if(game.level == undefined) return
        return (
            <div class="GameScreen" onClick={this.onClick} onContextMenu={this.onContextMenu}
                hasSelectedItem={game.level.selectedItem != undefined}>
                <div class="CookbookSpace">
                    {game.level.instructions}
                </div>
                <div class="CookingSpace">
                    {Object.keys(game.level.items).map((itemId) => <Item item={itemId}/>)}
                    <SelectedItem/>
                </div>
                <div class="YouWinModal" hasWon={game.level.hasWon == true}>
                    <h1>Recipe Complete!!</h1>
                    <div class="ContinueButton" onClick={() => game.screen = "LevelSelectScreen"}>
                        Click here to continue
                    </div>
                </div>
            </div>
        )
    }
    get onClick() {
        return (event) => {
            if(game.level.selectedItem != undefined) {
                game.level.items[game.level.selectedItem].position = undefined
                game.level.selectedItem = undefined
            }
        }
    }
    get onContextMenu() {
        return (event) => {
            event.preventDefault()
            if(game.level.selectedItem != undefined) {
                game.level.items[game.level.selectedItem].position = undefined
                game.level.selectedItem = undefined
            }
        }
    }
}

class SelectedItem {
    render() {
        if(game.level.selectedItem == undefined) return
        return (
            <div class={"Selected Item"}
                id={game.level.selectedItem}
                cuts={game.level.items[game.level.selectedItem]?.cuts || 0}
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

class Item {
    render() {
        return (
            <div class="Item"
                id={this.props.item}
                status={game.level.items[this.props.item]?.status}
                cuts={game.level.items[this.props.item]?.cuts || 0}
                position={game.level.items[this.props.item]?.position || "Default"}
                isGone={game.level.items[this.props.item]?.isGone}
                isSelected={game.level.selectedItem == this.props.item}
                isSelectable={this.isSelectable}
                isPaused={this.isPaused}
                onClick={this.onClick}/>
        )
    }
    get isSelectable() {
        if(game.level.items[this.props.item].isSelectable === false) {
            return false
        } else {
            return true
        }
    }
    get isPaused() {
        if(game.level.selectedItem != undefined
        && this.props.item != "Pot"
        && this.props.item != "CuttingBoard") {
            return true
        }
    }
    get onClick() {
        return (event) => {
            event.stopPropagation()
            game.level.interact(this.props.item)
        }
    }
}

////////////
// DEBUG //
//////////

window.addEventListener("keydown", function(event) {
    if(event.keyCode != 32) return
    const bounds = document.getElementById("frame").getBoundingClientRect()
    let x = (((Poin.position.x - bounds.left) / bounds.width) * (16 * 3))
    let y = (((Poin.position.y - bounds.top) / bounds.height) * (9 * 3))
    x = x.toFixed(2)
    y = y.toFixed(2)
    x += "em"
    y += "em"
    const style = "left: " + x + "; " + "top: " + y + ";"
    navigator.clipboard.writeText(style)
    console.log(style)
})

/////////////
// LEVELS //
///////////

const Level1 = {
    "items": {
        // Ingredients
        "Onion": {"canBeCut": true, "maxcuts": 2, "canBePotted": false},
        "GreenPepper": {"canBeCut": true, "maxcuts": 2, "canBePotted": false},
        "Tomato": {"canBeCut": true, "maxcuts": 2, "canBePotted": false},
        "Oil": {"canBePotted": true},
        "Egg": {},
        "Salt": {},
        // Tools
        "Knife": {},
        "Spoon": {},
        // Appliances
        "Pot": {"isSelectable": false},
        "CuttingBoard": {"isSelectable": false},
    },
    "instructions": [
        <p>Level 1 - شوربة عدس</p>,
        <p>Chop the tomatoes, green peppers, onion.</p>,
        <p>Put oil in the pan.</p>,
        <p>Put the chop vegetables in the pan.</p>,
        <p>Stir until mixed.</p>,
        <p>Crack an egg over the pan.</p>,
        <p>Add salt and pepper.</p>
    ],
    "interact": function(clickedItem) {
        if(game.level.selectedItem == "Knife"
        && clickedItem == "CuttingBoard") {
            Object.values(game.level.items).forEach((item) => {
                if(item.position == "CuttingBoard"
                && item.canBeCut == true) {
                    item.cuts = item.cuts || 0
                    item.cuts += 1
                    if(item.cuts >= item.maxcuts) {
                        item.cuts = item.maxcuts
                        item.canBePotted = true
                    }
                }
            })
            return
        }
        if(clickedItem == "CuttingBoard"
        && game.level.selectedItem != undefined
        && game.level.items[game.level.selectedItem]?.canBeCut == true) {
            Object.values(game.level.items).forEach((item) => {
                if(item.position == "CuttingBoard") {
                    item.position = undefined
                }
            })
            game.level.items[game.level.selectedItem].position = "CuttingBoard"
            game.level.selectedItem = undefined
            return
        }
        if(game.level.selectedItem == "Spoon"
        && clickedItem == "Pot") {
            if(game.level.items["Onion"].position == "Pot"
            && game.level.items["Tomato"].position == "Pot"
            && game.level.items["GreenPepper"].position == "Pot"
            && game.level.items["Oil"].position == "Pot") {
                game.level.items["Onion"].isGone = true
                game.level.items["Tomato"].isGone = true
                game.level.items["GreenPepper"].isGone = true
                game.level.items["Oil"].status = "StirFry"
                game.level.items["Egg"].canBePotted = true
            }
            return
        }
        if(game.level.selectedItem == "Egg") {
            if(game.level.items["Oil"].status == "StirFry") {
                game.level.items["Oil"].status = "Shakshoka"
                game.level.items["Egg"].isGone = true
                game.level.selectedItem = undefined
                console.log("!!!")
            }
            return
        }
        if(game.level.selectedItem == "Salt") {
            if(game.level.items["Oil"].status == "Shakshoka") {
                game.level.items["Salt"].isGone = true
                game.level.selectedItem = undefined
                game.level.hasWon = true
            }
            return
        }
        if(clickedItem == "Pot"
        && game.level.selectedItem != undefined
        && (game.level.selectedItem == "Oil" || game.level.items["Oil"].position == "Pot")
        && game.level.items[game.level.selectedItem]?.canBePotted == true) {
            game.level.items[game.level.selectedItem].position = "Pot"
            game.level.items[game.level.selectedItem].isSelectable = false
            game.level.selectedItem = undefined
            return
        }

        if(game.level.items[clickedItem].isSelectable === false) return
        game.level.selectedItem = clickedItem
    }
}

window.game = {
    "screen": "GameScreen",
    // "screen": "TitleScreen",
    "level": Deepclone(Level1)
}
