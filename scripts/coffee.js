document.addEventListener("DOMContentLoaded", function() {
    var coffeeMachine = {
        recipies: [
            {
                name: "current",
                customizable: false,
                size: "small",
                ingredients: [
                    {name: "milk", selected: false, percentage: 0},
                    {name: "chocolate", selected: false, percentage: 0},
                    {name: "cocoa", selected: false, percentage: 0},
                    {name: "cognac", selected: false, percentage: 0}
                ]
            },
            {
                name: "espresso",
                customizable: false,
                size: "small",
                ingredients: [
                    {name: "milk", selected: false, percentage: 0},
                    {name: "chocolate", selected: false, percentage: 0},
                    {name: "cocoa", selected: false, percentage: 0},
                    {name: "cognac", selected: false, percentage: 0}
                ]
            }, {
                name: "late",
                customizable: false,
                size: "large",
                ingredients: [
                    {name: "milk", selected: true, percentage: 20},
                    {name: "chocolate", selected: false, percentage: 10},
                    {name: "cocoa", selected: false, percentage: 10},
                    {name: "cognac", selected: false, percentage: 0}
                ]
            }, {
                name: "coffee",
                customizable: false,
                size: "middle",
                ingredients: [
                    {name: "milk", selected: false, percentage: 0},
                    {name: "chocolate", selected: false, percentage: 0},
                    {name: "cocoa", selected: false, percentage: 0},
                    {name: "cognac", selected: false, percentage: 0}
                ]
            }, {
                name: "macciato",
                customizable: false,
                size: "middle",
                ingredients: [
                    {name: "milk", selected: true, percentage: 10},
                    {name: "chocolate", selected: true, percentage: 5},
                    {name: "cocoa", selected: true, percentage: 10},
                    {name: "cognac", selected: false, percentage: 0}
                ]
            }, {
                name: "hard",
                customizable: false,
                size: "middle",
                ingredients: [
                    {name: "milk", selected: false, percentage: 0},
                    {name: "chocolate", selected: false, percentage: 0},
                    {name: "cocoa", selected: false, percentage: 0},
                    {name: "cognac", selected: true, percentage: 10}
                ]
            },
            {
                name: "custom1",
                customizable: true,
                size: "middle",
                ingredients: [
                    {name: "milk", selected: true, percentage: 5},
                    {name: "chocolate", selected: true, percentage: 5},
                    {name: "cocoa", selected: true, percentage:5},
                    {name: "cognac", selected: true, percentage: 5}
                ]
            },
            {
                name: "custom2",
                customizable: true,
                size: "middle",
                ingredients: [
                    {name: "milk", selected: true, percentage: 5},
                    {name: "chocolate", selected: true, percentage: 5},
                    {name: "cocoa", selected: true, percentage: 5},
                    {name: "cognac", selected: true, percentage: 5}
                ]
            }],

        schedule: [
            {
                id: 0,
                enabled: true,
                recipeName: "coffee",
                hours:23,
                minute:60
            },
            {
                id: 1,
                enabled: false,
                recipeName: "late",
                hours:23,
                minute:60
            },
            {
                id: 2,
                enabled: false,
                recipeName: "espresso",
                hours:23,
                minute:60
            },
            {
                id: 3,
                enabled: true,
                recipeName: "macchiato",
                hours:23,
                minute:60
            }
        ],
        
        switchCurrentRecipie: function (recipeName) {
            var i = 0;
            while (this.recipies[i].name != recipeName) {
                i++;
            }
            this.recipies[0].size = this.recipies[i].size;
            this.recipies[0].customizable=this.recipies[i].customizable;
            for (var j = 0; j < this.recipies[0].ingredients.length; j++) {
                this.recipies[0].ingredients[j].selected = this.recipies[i].ingredients[j].selected;
                this.recipies[0].ingredients[j].percentage = this.recipies[i].ingredients[j].percentage;
            }
        },
        saveCustomRecipe: function (recipeName) {
            var i = 0;
            while (this.recipies[i].name != recipeName) {
                i++;
            }
            this.recipies[i].size = this.recipies[0].size;
            for (var j = 0; j < this.recipies[0].ingredients.length; j++) {
                this.recipies[i].ingredients[j].selected = this.recipies[0].ingredients[j].selected;
                this.recipies[i].ingredients[j].percentage = this.recipies[0].ingredients[j].percentage;
            }
        },
        updateCurrentRecipeSize: function (recipeSize) {
            this.recipies[0].size = recipeSize;
        },
        updateCurrentRecipeIngredientState: function (ingredientIndex) {
                this.recipies[0].ingredients[ingredientIndex].selected = !this.recipies[0].ingredients[ingredientIndex].selected;
                if (this.recipies[0].ingredients[ingredientIndex].selected) {
                    this.recipies[0].ingredients[ingredientIndex].percentage = 5;
                } else {
                    this.recipies[0].ingredients[ingredientIndex].percentage = 0;
                }
        },
        updateCurrentRecipeIngredientPercentage: function (ingredientName,ingredientPercentage) {
            var j = 0;
            while (this.recipies[0].ingredients[j].name != ingredientName) {
                j++;
            }
            this.recipies[0].ingredients[j].percentage = ingredientPercentage;
        },
        updateScheduleRecipe: function (scheduleTaskId,recipeName) {
            this.schedule[scheduleTaskId].recipeName = recipeName;
        },
        updateCurrentScheduleState: function (scheduledTaskId) {
            this.schedule[scheduledTaskId].enabled = !this.schedule[scheduledTaskId].enabled;
        },
        updateScheduleHours: function (scheduleTaskId,hours) {
            this.schedule[scheduleTaskId].hours = hours;
        },
        updateScheduleMinute: function (scheduleTaskId,minute) {
            this.schedule[scheduleTaskId].minute = minute;
        },
        cancelAllTasks: function () {
            for (var i = 0; i < this.schedule.length; i++){
                this.schedule[i].enabled = false;
            }
        }
    };

    //View
    var coffeeMachineView = {
        selectRecipe: document.getElementById("custom"),//select
        buttonSaveRecipe: document.getElementById("save_recipe"),
        ingredientsButtonsArr: [
            document.getElementById("component-milk"), document.getElementById("component-chocolate"),
            document.getElementById("component-cocoa"), document.getElementById("component-cognac")
        ],
        rangeArray: [
            document.getElementById("milk"), document.getElementById("chocolate"),
            document.getElementById("cocoa"), document.getElementById("cognac")
        ],
        labelArray: [
            document.getElementById("label-milk-percentage"), document.getElementById("label-chocolate-percentage"),
            document.getElementById("label-cocoa-percentage"), document.getElementById("label-cognac-percentage")
        ],
        buttonSmall: document.getElementById("small"),
        buttonMiddle: document.getElementById("middle"),
        buttonLarge: document.getElementById("large"),
        divCoffeeMachinePictures: document.getElementById("coffee_selected-device"),
        scheduleButtons: [
            document.getElementById("0"),document.getElementById("1"),
            document.getElementById("2"),document.getElementById("3")],
        scheduledInputMinutes:
            [document.getElementById("minute0"),document.getElementById("minute1"),
                document.getElementById("minute2"), document.getElementById("minute3")],
        scheduledInputHours:
            [document.getElementById("hour0"),document.getElementById("hour1"),
             document.getElementById("hour2"), document.getElementById("hour3")],
        selectTask: [document.getElementById("recipe0"),document.getElementById("recipe1"),
            document.getElementById("recipe2"), document.getElementById("recipe3")],
        cancelAllButton: document.getElementById("cancel-all"),

        depictCoffeeMachineMenu: function (coffeeMachineObject) {
            this.buttonSaveRecipe.disabled=!coffeeMachineObject.recipies[0].customizable;
            for (var i = 0; i < coffeeMachineObject.recipies[0].ingredients.length; i++) {
                if (coffeeMachineObject.recipies[0].ingredients[i].selected) {
                    this.ingredientsButtonsArr[i].classList.add("button_active");
                    this.rangeArray[i].disabled = false;
                } else {
                    this.ingredientsButtonsArr[i].classList.remove("button_active");
                    this.rangeArray[i].disabled = true;
                }
                this.rangeArray[i].value = coffeeMachineObject.recipies[0].ingredients[i].percentage;
                this.labelArray[i].innerHTML = coffeeMachineObject.recipies[0].ingredients[i].percentage + "%";
            }
            if (coffeeMachineObject.recipies[0].size === "small") {
                this.buttonSmall.classList.add("button_active");
                this.buttonMiddle.classList.remove("button_active");
                this.buttonLarge.classList.remove("button_active");
            } else if (coffeeMachineObject.recipies[0].size === "middle") {
                this.buttonMiddle.classList.add("button_active");
                this.buttonSmall.classList.remove("button_active");
                this.buttonLarge.classList.remove("button_active");
            } else {
                this.buttonLarge.classList.add("button_active");
                this.buttonSmall.classList.remove("button_active");
                this.buttonMiddle.classList.remove("button_active");
            }
        },
        buttonMakeCoffee: function () {
            var makeCoffee = document.getElementById("make-coffee");
            makeCoffee.classList.add("button_active");
            makeCoffee.textContent = "Making coffee";
            setTimeout(function () {
                makeCoffee.textContent = "Make coffee";
                makeCoffee.classList.remove("button_active");
            }, 5000);
        },
        changeImage: function () {
            var i = 0;
            var timer = setInterval(function () {
                if (i < 8) {
                    coffeeMachineView.divCoffeeMachinePictures.classList.remove("sprite-coffee_" + i);
                    coffeeMachineView.divCoffeeMachinePictures.classList.add("sprite-coffee_" + (i + 1));
                    i++;
                }
                else if (i >= 8 && i < 12) {
                    i++;
                }
                else {
                    coffeeMachineView.divCoffeeMachinePictures.classList.remove("sprite-coffee_" + 8);
                    coffeeMachineView.divCoffeeMachinePictures.classList.add("sprite-coffee_" + 0);
                    clearInterval(timer);
                }
            }, 500)
        },
        depictSchedule: function (coffeeMachineObject) {
            for (var i = 0; i < this.scheduleButtons.length; i++){
                if (coffeeMachineObject.schedule[i].enabled){
                    this.scheduleButtons[i].classList.add("button_active");
                    this.scheduledInputHours[i].disabled = false;
                    this.scheduledInputMinutes[i].disabled = false;
                    this.selectTask[i].disabled=false;
                    coffeeMachineObject.schedule[i].recipeName = this.selectTask[i].options[this.selectTask[i].selectedIndex].text;
                }else{
                    this.scheduleButtons[i].classList.remove("button_active");
                    this.scheduledInputHours[i].disabled=true;
                    this.scheduledInputMinutes[i].disabled=true;
                    this.selectTask[i].disabled=true;
                }
            }
            var j = 0;
            while(j < this.scheduleButtons.length && coffeeMachineObject.schedule[j].enabled === false){
                j++;
            }
            if (j === this.scheduleButtons.length){
                this.cancelAllButton.disabled = true;
            }else{
                this.cancelAllButton.disabled = false;
            }
        }
    };


    //Controllers
    coffeeMachineView.depictCoffeeMachineMenu(coffeeMachine);
    coffeeMachineView.depictSchedule(coffeeMachine);

    document.getElementById("make-coffee").onclick = function () {
        coffeeMachineView.buttonMakeCoffee(coffeeMachine);
        coffeeMachineView.changeImage(coffeeMachine);
    };

    document.getElementById('execute').onclick = function (event) {
        if (event.target.tagName == 'BUTTON') {
            coffeeMachine.updateCurrentRecipeSize(event.target.value);
            coffeeMachineView.depictCoffeeMachineMenu(coffeeMachine);
        }     
    };
    
    document.getElementById("control-menu").onclick = function (event) {
        if (event.target.tagName == 'BUTTON') {
            if (event.target.classList.contains("choose-component")) {
                coffeeMachine.updateCurrentRecipeIngredientState(event.target.value);
                coffeeMachineView.depictCoffeeMachineMenu(coffeeMachine);
            } else {
                coffeeMachine.saveCustomRecipe(coffeeMachineView.selectRecipe.value);
            }
        }
    };
    
    document.getElementById("control-menu").onchange = function () {
        if(event.target.tagName == 'SELECT'){
            coffeeMachine.switchCurrentRecipie(coffeeMachineView.selectRecipe.value);
        }
        else if(event.target.tagName == 'INPUT'){
            coffeeMachine.updateCurrentRecipeIngredientPercentage(event.target.id,event.target.value);
        }
        coffeeMachineView.depictCoffeeMachineMenu(coffeeMachine);
    };
    
    document.getElementById("coffee").onclick = function (event) {
        if(event.target.tagName == 'BUTTON'){
            if(event.target.id == "cancel-all"){
                coffeeMachine.cancelAllTasks();
            }else {
                coffeeMachine.updateCurrentScheduleState(event.target.id);
            }
            coffeeMachineView.depictSchedule(coffeeMachine);
            
        }else {}
    };
    
    document.getElementById("coffee").onchange = function (event) {
        var target = event.target;
        if(target.tagName == 'SELECT'){
            coffeeMachine.updateScheduleRecipe(target.id[target.id.length - 1],target.options[target.selectTask[target.id.length - 1].selectedIndex].text);
        }else if(target.tagName == 'INPUT'){
            coffeeMachine.updateScheduleHours(target.id[target.id.length - 1],target.value);
            coffeeMachine.updateScheduleMinute(target.id[target.id.length - 1],target.value);
        }
        coffeeMachineView.depictSchedule(coffeeMachine);
    };

});
