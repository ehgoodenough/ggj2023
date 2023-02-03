import * as Preact from "preact"
import "views/Mount.view.less"

export default class Mount {
    render() {
        return (
            <div className="Mount">
                <MainScreen/>
            </div>
        )
    }
}

class MainScreen {
    render() {
        return (
            <div class="MainScreen">
                <div class="CookbookSpace">
                    <div>SOUP????</div>
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
                    <div class="CuttingBoard">Cutting Board</div>
                    <div class="Sink">Sink</div>
                    <div class="Stove">Stove</div>
                    <div class="Pot">Pot</div>
                    <div class="Salt">Salt</div>
                    <div class="Beef">Beef</div>
                    <div class="Onions">Onions</div>
                    <div class="Carrots">Carrots</div>
                    <div class="Garlic">Garlic</div>
                </div>
            </div>
        )
    }
}
