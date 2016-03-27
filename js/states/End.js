function End(){}

End.prototype = {
    preload: function (){
        //console.log("End preload");
    },
    
    create: function (){
        //console.log("End create");
        var background = this.game.add.image(0,0,'background');
        
        var ground = this.game.add.tileSprite(0, 400, 335, 112, 'ground');
        ground.autoScroll(-150,0);
        
        //var endScreenGroup = this.game.add.group();
        
        var gameOver = this.game.add.image(0,0,'gameOver');
        gameOver.x = 60;
        //titleGroup.add(title);
        
        var startButton = this.game.add.button(this.game.width/2, 300, 'startButton',
                                              function(){
                            this.game.state.start('Play');
        }, this);
        startButton.anchor.setTo(0.5);
        
        var menuButton = this.game.add.button(this.game.width/2, 360, 'startButton',
                                              function(){
                            this.game.state.start('Menu');
        }, this);
        menuButton.anchor.setTo(0.5);
        menuButton.scale.x *= -1;//flip
        
        
    },
    
    update: function (){
        //console.log("End update");
        
    }
};