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
                    <Item item="CuttingBoard" unselectable={true}/>
                    <Item item="Sink" unselectable={true}/>
                    <Item item="Stove" unselectable={true}/>
                    <Item item="Pot"/>
                    <Item item="Salt"/>
                    <Item item="Beef"/>
                    <Item item="Onions"/>
                    <Item item="Carrots"/>
                    <Item item="Garlic"/>
                    <SelectedItem/>
                </div>
            </div>
        )
    }
    get onClick() {
        return (event) => {
            game.selectedItem = undefined
        }
    }
    get onContextMenu() {
        return (event) => {
            event.preventDefault()
            game.selectedItem = undefined
        }
    }
}

class Item {
    render() {
        return (
            <div class={this.class} onClick={this.onClick} isSelectable={this.props.unselectable != true}
                style={{"display": game.selectedItem != this.props.item ? "block" : "none"}}>
                {this.props.item}
            </div>
        )
    }
    get onClick() {
        return (event) => {
            event.stopPropagation()
            if(game.selectedItem != undefined) {

            }

            if(this.props.unselectable == true) return
            game.selectedItem = this.props.item
        }
    }
    get class() {
        return ["Item", this.props.item, game.items[this.props.item]?.state || "Default"].join(" ")
    }
}

class SelectedItem {
    render() {
        if(game.selectedItem == undefined) return
        return (
            <div class={"SelectedItem" + " " + game.selectedItem} style={this.style}>
                {game.selectedItem}
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
        "CuttingBoard": {

        }
    }
}
