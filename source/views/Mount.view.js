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
                <div class="SelectableLevel" onClick={this.onClick(1)}>Level 1 - Shakshoka</div>
                <div class="SelectableLevel" onClick={this.onClick(2)}>Level 2 - Molokheya</div>
                <div class="SelectableLevel" onClick={this.onClick(3)}>Level 3 - Takleya</div>
            </div>
        )
    }
    onClick(level) {
        return (event) => {
            game.screen = "GameScreen"
            game.level = Deepclone(Levels[level])
        }
    }
}

class GameScreen {
    render() {
        if(game.level == undefined) return
        return (
            <div class="GameScreen" onMouseDown={this.onMouseDown} onContextMenu={this.onContextMenu}
                hasSelectedItem={game.level.selectedItem != undefined}>
                <div class="CookbookSpace">
                    {game.level.instructions.map((instruction) => <p>{instruction}</p>)}
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
    get onMouseDown() {
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
                <div class="Image"/>
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
                onMouseDown={this.onMouseDown}
                onMouseUp={this.onMouseUp}
                hasBlobShadow={this.hasBlobShadow}>
                <div class="BlobShadow"/>
                <div class="Image"/>
            </div>
        )
    }
    get hasBlobShadow() {
        return game.level.items[this.props.item]?.hasBlobShadow
            && game.level.items[this.props.item].position == undefined
            && game.selectedItem != this.props.item
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
        && game.level.items[this.props.item]?.isLocation != true) {
            return true
        }
    }
    get onMouseDown() {
        return (event) => {
            event.stopPropagation()
            game.level.interact(this.props.item)
        }
    }
    // get onMouseUp() {
    //     return (event) => {
    //         event.stopPropagation()
    //         // if(this.props.item != this.props.selectedItem))
    //         game.level.interact(this.props.item)
    //     }
    // }
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

const Levels = {
    "1": {
        "name": "Shakshoka",
        "items": {
            // Ingredients
            "Onion": {"canBeCut": true, "maxcuts": 2, "canBePotted": false, "hasBlobShadow": true},
            "GreenPepper": {"canBeCut": true, "maxcuts": 2, "canBePotted": false, "hasBlobShadow": true},
            "Tomato": {"canBeCut": true, "maxcuts": 2, "canBePotted": false, "hasBlobShadow": true},
            "Oil": {"canBePotted": true, "hasBlobShadow": true},
            "Egg": {"hasBlobShadow": true},
            "Salt": {"hasBlobShadow": true},
            // Tools
            "Knife": {},
            "Spoon": {},
            "Stove": {"isLocation": true, "isSelectable": false},
            "Pot": {"isLocation": true},
            "CuttingBoard": {"isLocation": true, "isSelectable": false},
        },
        "instructions": [
            "Level 1 - شوربة عدس",
            "Chop the tomatoes, green peppers, onion.",
            "Put oil in the pan.",
            "Put the chop vegetables in the pan.",
            "Stir until mixed.",
            "Crack an egg over the pan.",
            "Add salt and pepper."
        ],
        "interact": function(clickedItem) {
            console.log(game.level.selectedItem, "onto", clickedItem)
            if(clickedItem == "Stove"
            && game.level.selectedItem == "Pot") {
                game.level.items["Pot"].position = "Stove"
                game.level.items["Pot"].isSelectable = false
                game.level.selectedItem = undefined
                return
            }
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
            if(game.level.selectedItem == "Egg"
            && clickedItem == "Pot") {
                if(game.level.items["Oil"].status == "StirFry") {
                    game.level.items["Oil"].status = "Shakshoka"
                    game.level.items["Egg"].isGone = true
                    game.level.selectedItem = undefined
                }
                return
            }
            if(game.level.selectedItem == "Salt"
            && clickedItem == "Pot") {
                if(game.level.items["Oil"].status == "Shakshoka") {
                    game.level.items["Salt"].isGone = true
                    game.level.selectedItem = undefined
                    game.level.hasWon = true
                }
                return
            }
            if(clickedItem == "Pot"
            && game.level.items["Pot"].position == "Stove"
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
    },
    "2": {
        "name": "Molokheya",
        "instructions": [
            "1. Put the chicken stock in the pot.",
            "2. Cut the molokheya.",
            "3. Add the molokheya to the pot.",
            "4. Add the takleya to the pot.",
            "5. Stir.",
            "6. Add salt and pepper to the pot.",
        ],
        "items": {
            // Ingredients
            "ChickenStock": {},
            "Molokheya": {},
            "Takleya": {},
            "Salt": {},
            // Tools
            "Knife": {},
            "Spoon": {},
            "Pot": {"isLocation": true},
            "CuttingBoard": {"isLocation": true},
        },
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
            // if(clickedItem == "CuttingBoard"
            // && game.level.selectedItem != undefined
            // && game.level.items[game.level.selectedItem]?.canBeCut == true) {
            //     Object.values(game.level.items).forEach((item) => {
            //         if(item.position == "CuttingBoard") {
            //             item.position = undefined
            //         }
            //     })
            //     game.level.items[game.level.selectedItem].position = "CuttingBoard"
            //     game.level.selectedItem = undefined
            //     return
            // }
            // if(game.level.selectedItem == "Spoon"
            // && clickedItem == "Pot") {
            //     if(game.level.items["Onion"].position == "Pot"
            //     && game.level.items["Tomato"].position == "Pot"
            //     && game.level.items["GreenPepper"].position == "Pot"
            //     && game.level.items["Oil"].position == "Pot") {
            //         game.level.items["Onion"].isGone = true
            //         game.level.items["Tomato"].isGone = true
            //         game.level.items["GreenPepper"].isGone = true
            //         game.level.items["Oil"].status = "StirFry"
            //         game.level.items["Egg"].canBePotted = true
            //     }
            //     return
            // }
            // if(game.level.selectedItem == "Salt") {
            //     if(game.level.items["Oil"].status == "Shakshoka") {
            //         game.level.items["Salt"].isGone = true
            //         game.level.selectedItem = undefined
            //         game.level.hasWon = true
            //     }
            //     return
            // }

            // ADD CHICKEN STOCK TO POT
            // if(clickedItem == "Pot"
            // && game.level.items["ChickenStock"].position == "Pot"
            // && game.level.selectedItem == "Molokheya"
            // && game.level.items["Molokheya"].cuts == 3) {
            //     ADD TO POT
            // }

            // && game.level.items[game.level.selectedItem]?.canBePotted == true) {
            //     game.level.items[game.level.selectedItem].position = "Pot"
            //     game.level.items[game.level.selectedItem].isSelectable = false
            //     game.level.selectedItem = undefined
            //     return
            // }

            if(clickedItem == "CuttingBoard"
            || clickedItem == "Knife") {
                return
            }

            game.level.selectedItem = clickedItem
        }
    }
}

window.game = {
    "screen": "GameScreen",
    // "screen": "TitleScreen",
    "level": Deepclone(Levels[1])
}
