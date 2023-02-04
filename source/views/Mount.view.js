import * as Preact from "preact"
import "views/Mount.view.less"
import Poin from "poin"

export default class Mount {
    render() {
        return (
            <div className="Mount">
                <div className="Frame">
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
                <div class="SelectableLevel" onClick={this.onClick}>Level 2 - Soup???</div>
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
                    <div>Level 2 - SOUP????</div>
                    <div>Step 1: Add water to pot.</div>
                    <div>Step 2: Put pot on stove. Boil.</div>
                    <div>Step 3: Cut onions, carrots and garlic. Put in pot.</div>
                    <div>Step 4: Stir.</div>
                    <div>Step 5: Cut beef into tiny(?) cubes. Put in the pot.</div>
                    <div>Step 6: Stir.</div>
                    <div>Step 7: Add salt, to taste.</div>
                    <div>Step 8: Eat!!</div>
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
            game.items[game.selectedItem].position = undefined
            game.selectedItem = undefined
        }
    }
    get onContextMenu() {
        return (event) => {
            event.preventDefault()
            game.items[game.selectedItem].position = undefined
            game.selectedItem = undefined
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
            && game.items[game.selectedItem].canBeCut == true) {
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
