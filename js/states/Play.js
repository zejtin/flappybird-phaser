function Play(){}

Play.prototype = {
    /*preload: function (){
        console.log("Play preload");
    },*/
    
    bird: null, //instanciranje tice
    ground: null,
    pipes: null, // grupa
    scoreText: null,
    score: 0,
    
    create: function (){
        console.log("Play create");
        var background = this.game.add.image(0,0,'background');
        
        this.ground = this.game.add.tileSprite(0, 400, 335, 112, 'ground');
        this.ground.autoScroll(-150,0);
        
        //console.log(this.ground.body);
        this.game.physics.arcade.enableBody(this.ground);
        //console.log(this.ground.body);
        this.ground.body.immovable = true;
        this.ground.body.allowGravity = false;

        
        this.bird = this.game.add.sprite(this.game.width/2, this.game.height/2, 'bird');
        this.bird.anchor.setTo(0.5,0.5);
        
        this.bird.animations.add('flap');
        this.bird.animations.play('flap', 12, true);
        //this.bird.animations.currentAnimation.currentFrame(2);
        
        this.game.physics.arcade.enableBody(this.bird);
        
        
        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);//da se ne mrda u browseru sa space
        var flapKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        flapKey.onDown.add(this.flap, this);
        
        this.input.onDown.add(this.flap, this);// i za tastaturu i za prs'
        
        this.scoreText = this.game.add.text(20, 20, this.score);//new Text(game, x, y, text, style)
        
        this.pipes = this.game.add.group();
        
        this.game.time.events.loop(//add, repeat opcije takodje sem loop
            Phaser.Timer.SECOND * 1.25, 
            this.generatePipes,
            this
        );
        
        /*this.game.time.events.loop(//add, repeat opcije takodje sem loop
            Phaser.Timer.SECOND * 1.25, 
            this.score += 1,
            this
        );*/
        
    },
    
    update: function (){
        //console.log("Play create");
        
        this.game.physics.arcade.collide(this.bird, this.ground, this.deathHandler, null, this);
        
        this.pipes.forEach(function(pipeGroup) {
                           //if(pipeGroup.coin
            
                           this.game.physics.arcade.collide(this.bird, pipeGroup, this.deathHandler, null, this);
            this.checkScore(pipeGroup);
        },this);
        
        if(this.bird.angle < 90){
            this.bird.angle += 2.5;
        }
        
        
        this.game.physics.arcade.collide(this.bird, this.coin, this.scoreHandler, null, this);
        
        console.log("Play create");
        //this.bird.animations.play('flap', 12, true);
    },
    
    flap: function () {
        this.bird.body.velocity.y = -400;//gurni pticu gore
        this.game.add.tween(this.bird).to(
            {
                angle: -40
            },
            100
        ).start();
    },
    
    generatePipes: function(){
     
        var topPipe = this.game.add.sprite(0,0, 'pipe', 0); //fix index za prvi pajp
        topPipe.anchor.setTo(0,0.5);
        
        this.game.physics.arcade.enableBody(topPipe);
        topPipe.body.immovable = true;
        topPipe.body.allowGravity = false;
        
        var bottomPipe = this.game.add.sprite(0,440, 'pipe', 1); //fix index za drugi pajp
        bottomPipe.anchor.setTo(0,0.5);
        
        this.game.physics.arcade.enableBody(bottomPipe);
        bottomPipe.body.immovable = true;
        bottomPipe.body.allowGravity = false;
        
        
        var pipeGroup = this.game.add.group();
        pipeGroup.add(topPipe);
        pipeGroup.add(bottomPipe);
        //pipeGroup.add(coin);
        pipeGroup.x= this.game.width;
        pipeGroup.y= this.game.rnd.integerInRange(-100,100);// pomeranje grupisanih pajpova za +/- 100
        
        pipeGroup.setAll('body.velocity.x', -200); // uzima sve child-ove pravi da se pomera po x osi
        console.log("pipes generated");
        this.pipes.add(pipeGroup);//dodajemo koliziju
        
        this.generateCoins(pipeGroup);
        //this.generateCoins;
        //coin.setAll('body.velocity.x', -200); // uzima sve child-ove pravi da se pomera po x osi
        //this.pipes.add(coin);
        //console.log("coins");
        //this.score += 1;  
        //this.scoreText.text = this.score; 
        //console.log("socre: " + this.score);
    },
    
    deathHandler: function(){
        this.game.state.start('End');
    },
    
    generateCoins: function(pipeGroup){
        var coin = this.game.add.sprite(0,220, 'coin', 0);
        coin.anchor.setTo(0,0.5);
        this.game.physics.arcade.enableBody(coin);
        coin.body.immovable = true;
        coin.body.allowGravity = false;
        
        coin.x = pipeGroup.x/2;
        coin.y= pipeGroup.y/2;
        console.log("coin");
    },
    
    checkScore: function(pipeGroup) {  
    if(pipeGroup.exists && !pipeGroup.hasScored) { //&& pipeGroup.topPipe.world.x <= this.bird.world.x) {
        pipeGroup.hasScored = true;
        this.score++;
        this.scoreText.setText(this.score.toString());
    }
  }
};