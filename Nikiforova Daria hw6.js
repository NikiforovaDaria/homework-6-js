        function Character(options) {
            this.name = options.name
            this.typeOfClass = options.typeOfClass
            this.life = options.life;
            this.damage = options.damage;
            this.maxLife = options.life;
            this.elexir = options.elexir;
            this.counter = 2;
        }
        
        Character.prototype.getName = function () {
            return this.name;
        }
        Character.prototype.typeOfClass = function () {
            return this.typeOfClass;
        }
        Character.prototype.getLife = function () {
            return this.life;
        }
        Character.prototype.setLife = function (dmg) {
            this.life -= dmg;
        }
        Character.prototype.getDamage = function () {
            return this.damage;
        }
        Character.prototype.attack = function (obj) {
            obj.setLife(this.getDamage());
        }
        Character.prototype.isAlive = function () {
            return this.life > 0;
        }
        Character.prototype.elexir = function () {
            return this.elexir;
        }
        Character.prototype.shouldUseSkill = function () {
            return (this.life < this.maxLife / 2 && this.counter > 0);
        }
        Character.prototype.updateLife = function () {
                this.life = this.maxLife;
        }


//HERO//////////////////////////////////////////////////////////////////////////
        function Hero() {
            Character.apply(this, arguments);
        }
        Hero.prototype = Object.create(Character.prototype);
        Hero.prototype.constructor = Hero;

        Hero.prototype.setLife = function (dmg) {
            if (this.shouldUseSkill()) {
                this.counter--;
            } else {
                this.life -= dmg;
            }   
        }
    // skill of enemy
        Hero.prototype.getDamage = function () {
            if (this.shouldUseSkill() && this.elexir) {
                return this.damage * 2;
            }
            return this.damage;
        }


//MONSTER//////////////////////////////////////////////////////////////////      

        function Monster() {
            Character.apply(this, arguments);
        }
        Monster.prototype = Object.create(Character.prototype);
        Monster.prototype.constructor = Monster;

        Monster.prototype.getDamage = function () {
            if (this.shouldUseSkill()) {
                this.counter--;
                return this.damage * 2;
            }
            return this.damage;
        }
    // skill of enemy
        Monster.prototype.setLife = function (dmg) {
            if (this.shouldUseSkill() && this.elexir) {  
            } else {
                this.life -= dmg;
            }   
        }

//HERO'S CLASSES/////////////////////////////////////////////////////////////////
        function Hero_Of_Warior_Class(){
            Hero.apply(this, arguments);
            this.typeOfClass = 'Warior',
            this.life = 250,
            this.maxLife = this.life,
            this.damage = 20
        }
        Hero_Of_Warior_Class.prototype = Object.create(Hero.prototype);
        Hero_Of_Warior_Class.prototype.constructor = Hero_Of_Warior_Class;

        function Hero_Of_Thief_Class(){
            Hero.apply(this, arguments);
            this.typeOfClass = 'Thief',
            this.life = 200,
            this.maxLife = this.life,
            this.damage = 40
        }
        Hero_Of_Thief_Class.prototype = Object.create(Hero.prototype);
        Hero_Of_Thief_Class.prototype.constructor = Hero_Of_Thief_Class;

        function Hero_Of_Wizard_Class(){
            Hero.apply(this, arguments);
            this.typeOfClass = 'Wizard',
            this.life = 300,
            this.maxLife = this.life,
            this.damage = 50
        }
        Hero_Of_Wizard_Class.prototype = Object.create(Hero.prototype);
        Hero_Of_Wizard_Class.prototype.constructor = Hero_Of_Wizard_Class;


        function HeroFactory(){};
        HeroFactory.prototype.createHero = function(options) {
            let hero
            if (options.typeOfClass === 'Warior'){
                hero = new Hero_Of_Warior_Class(options)
            } else if (options.typeOfClass === 'Thief'){
                hero = new Hero_Of_Thief_Class(options)
            }else if (options.typeOfClass === 'Wizard'){
                hero = new Hero_Of_Wizard_Class(options)
            }
            return hero;
        };

//MONSTER'S CLASSES//////////////////////////////////////////////////////////////////////
        function Monster_Of_Vampire_Class(){
            Monster.apply(this, arguments);
            this.typeOfClass = 'Vampire',
            this.life = 450,
            this.maxLife = this.life,
            this.damage = 50
        }
        Monster_Of_Vampire_Class.prototype = Object.create(Monster.prototype);
        Monster_Of_Vampire_Class.prototype.constructor = Monster_Of_Vampire_Class;

        function Monster_Of_Goblin_Class(){
            Monster.apply(this, arguments);
            this.typeOfClass = 'Goblin',
            this.life = 300,
            this.maxLife = this.life,
            this.damage = 35
        }
        Monster_Of_Goblin_Class.prototype = Object.create(Monster.prototype);
        Monster_Of_Goblin_Class.prototype.constructor = Monster_Of_Goblin_Class;

        function Monster_Of_Ork_Class(){
            Monster.apply(this, arguments);
            this.typeOfClass = 'Ork',
            this.life = 300,
            this.maxLife = this.life,
            this.damage = 50
        }
        Monster_Of_Ork_Class.prototype = Object.create(Monster.prototype);
        Monster_Of_Ork_Class.prototype.constructor = Monster_Of_Ork_Class;


        function MonsterFactory(){};
        MonsterFactory.prototype.createMonster = function(options) {
            let monster
            if (options.typeOfClass === 'Vampire'){
                monster = new Monster_Of_Vampire_Class(options)
            } else if (options.typeOfClass === 'Goblin'){
                monster = new Monster_Of_Goblin_Class(options)
            }else if (options.typeOfClass === 'Ork'){
                monster = new Monster_Of_Ork_Class(options)
            }
            return monster;
        };

//GAME////////////////////////////////////////////////////////////////////////// 
    function Game(...players) {
        this.players = players;
        this.admittedPlayers = [];
        this.hero_PermittedNames = ['aaa', 'ccc', 'ddd','yyy', 'ttt', 'fff', 'eee', 'xxx', 'ppp', 'uuu', 'qqq', 'vvv', 'ggg'];
        this.monster_PermittedNames = ['aaa', 'ccc', 'ddd','yyy', 'ttt', 'fff', 'eee', 'xxx', 'ppp', 'uuu', 'qqq', 'vvv', 'ggg'];
        this.listOfClasse = ['Hero_Of_Thief_Class', 'Hero_Of_Warior_Class', 'Hero_Of_Wizard_Class', 
                            'Monster_Of_Ork_Class', 'Monster_Of_Vampire_Class', 'Monster_Of_Goblin_Class']
        
    }
    Game.prototype.checkName = function(player){
        if(player instanceof Hero &&  this.hero_PermittedNames.indexOf(player.name) != -1){
            return true;
        }else if (player instanceof Monster &&  this.monster_PermittedNames.indexOf(player.name) != -1) {
            return true
        }else{
            return false;
        }
    };  
    Game.prototype.checkClass = function(player){
        if(player instanceof Hero_Of_Thief_Class || player instanceof Hero_Of_Warior_Class || 
            player instanceof Hero_Of_Wizard_Class || player instanceof Monster_Of_Vampire_Class||
            player instanceof Monster_Of_Goblin_Class || player instanceof Monster_Of_Ork_Class){
            return true;
        }else{ 
            return false;
        };
    };
    Game.prototype.registration = function (...players) {
        for(let i=0; i < this.players.length; i++){
            if(this.checkClass(players[i]) && this.checkName(players[i])){
                this.admittedPlayers.push(players[i]);
            }   
            }
    }
    Game.prototype.Play = function () {
        while(this.admittedPlayers.length > 1){ 
            new_AmittedPlayers =[];
                if(this.admittedPlayers.length % 2 ===1){
                    new_AmittedPlayers[0] = this.admittedPlayers[this.admittedPlayers.length-1];
                    this.admittedPlayers.slice(-1,1);
                }
                new_AmittedPlayers = new_AmittedPlayers.concat(this.roundPlay(this.admittedPlayers))
            this.admittedPlayers = new_AmittedPlayers; 
        } 
        console.log(new_AmittedPlayers[0].name + ' is a winner!') 
        return new_AmittedPlayers[0].name + ' is a winner!'
    }


    Game.prototype.roundPlay = function(currentPlayers){
        new_CurrentPalayers=[]
        for(let i=0; i < currentPlayers.length; i+=2){
            if(i+1 >= currentPlayers.length){
                break;
            }
            player1=currentPlayers[i]
            player2=currentPlayers[i+1]
            winPlayer = this.Battle(player1,player2)
            console.log(player1.name + " vs " + player2.name + " win = " + winPlayer.name)
            new_CurrentPalayers.push(winPlayer)
        }   
        return new_CurrentPalayers;     
    }



    Game.prototype.Battle = function (player1, player2){
        while (player1.isAlive() && player2.isAlive()){
            player1.attack(player2);
            console.log('Hp '+ player1.name + ': ' + player1.getLife());
            player2.attack(player1);
            console.log('Hp ' + player2.name + ': ' + player2.getLife());
        }
        if(!player1.isAlive()){
            player2.updateLife();
            return player2;
        }else if (!player2.isAlive()){
            player1.updateLife();
            return player1;
            
        }
    }


//EXAMPLE////////////////////////////////////////////////////////////////////////// 
    let newHero = new HeroFactory();
    let hero1 = newHero.createHero({name: 'aab', typeOfClass: 'Warior', elexir: true});
    let hero2 = newHero.createHero({name: 'eee', typeOfClass: 'Thief', elexir: false})
    let hero3 = newHero.createHero({name: 'ccc', typeOfClass: 'Warior', elexir: true});
    let hero4 = newHero.createHero({name: 'xxx', typeOfClass: 'Wizard', elexir: true});

    let newMonster = new MonsterFactory();
    let monster1 = newMonster.createMonster({name: 'qqq', typeOfClass: 'Goblin', elexir: false})
    let monster2 = newMonster.createMonster({name: 'ttt', typeOfClass: 'Ork', elexir: true})
    let monster3 = newMonster.createMonster({name: 'ooo', typeOfClass: 'Vampire', elexir: false})

    let game1 = new Game(hero1,hero2, hero3, hero4, monster1, monster2, monster3);
    game1.registration(hero1,hero2, hero3, hero4, monster1, monster2, monster3)
    console.log(game1.admittedPlayers)
    console.log(game1.Play())