function Preload(){}

Preload.prototype = {
    preload: function (){
        console.log("preload preload");
        
        this.load.image('background','images/background.png');
        this.load.image('ground','images/ground.png');
        this.load.image('title','images/title.png');
        this.load.image('startButton','images/start-button.png');
        this.load.spritesheet('bird','images/bird.png', 34, 24, 3);
        this.load.spritesheet('pipe','images/pipes.png', 54, 320, 2);
        this.load.image('gameOver','images/gameover.png');
        this.load.spritesheet('coin','images/medals.png', 44, 46, 2);
        
        this.load.onFileComplete.add(function(percent) {
            console.log('loaded ' + percent + "%");
        })
        
        this.load.onLoadComplete.add(function (){
            console.log('Loading complete bre');
            this.game.state.start('Play');//Manu - kad zavrsimo debag
        }, this);
        
        
    },
    
    create: function (){
        console.log("preload create");
    },
    
    update: function (){
        console.log("preload update");
    }
};