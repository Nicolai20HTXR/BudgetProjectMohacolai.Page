class Money 
{
    constructor(x, y, image) 
    {
        this.x = x;
        this.y = y;
        this.picture = image;
        this.beingPressed = false;
    }
    draw() 
    {
        image(this.picture, this.x, this.y);
    }
}