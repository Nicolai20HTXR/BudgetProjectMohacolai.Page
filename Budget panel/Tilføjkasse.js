//Klasse af den firkantet boks som tilføjer flere af kasse objekter
class Tilføjkasse 
{
    constructor(x, y, r) 
    {
        this.x = x;
        this.y = y;
        this.r = r;
        this.beingPressed = false;
    }
    draw() 
    {
        //Tegner firkant boks og streger over som et plus
        square(this.x, this.y, this.r, this.r / 4);
        push();
        strokeWeight(this.r / 16);
        line(
            this.x + this.r / 2,
            this.y + this.r / 6,
            this.x + this.r / 2,
            this.y + this.r - this.r / 6
        );
        line(
            this.x + this.r / 6,
            this.y + this.r / 2,
            this.x + this.r - this.r / 6,
            this.y + this.r / 2
        );
        pop();
        
        //Hvis denne firkantet kasse kommer til nok ud over canvaset, ville der tilføjes mere til canvas
        if (this.x + this.r > width) 
        {
            resizeCanvas(width + 200, height);
        }
    }
    //Funktion gør at når der klikkes på kassen så ville den tilføje kasse objekt til givet array i parameteren
    clickOn(array) 
    {
        //Tjekker om mus er over og trykkes, og ikke alrede trykkes ned
        if (
            mouseX > this.x &&
            mouseX < this.x + this.r &&
            mouseY > this.y &&
            mouseY < this.y + this.r &&
            mouseIsPressed &&
            !this.beingPressed
        ) 
        {
            //Tilføjet lille algoritme som tjekker om, hvor musen trykkes ved er samme farve som tilføjer kassen,
            // så de bløde, runde hjørner også ville virke, så der ikke kan trykkes udfor
            this.mousePosColor = get(mouseX, mouseY);       //For farven ved mus position, gives i array
            this.boolPosColor = [];                         //Array som skal holdes om farverne passer sort eller hvid

            //Looper over de farver RGB der er gives og tilføjer true i boolPosColor hvis sort eller hvid
            for (i = 0; i < this.mousePosColor.length - 1; i++) 
            {
                if (
                    this.mousePosColor[i] == 255 ||
                    this.mousePosColor[i] == 0
                ) 
                {
                    this.boolPosColor[i] = true;
                } 
                else 
                {
                    this.boolPosColor[i] = false;
                }
            }

            //Fuktion som ville tage array fra argument
            function boolSum(arr) 
            {
                return arr.every(Boolean); // og tjekke hver eneste i gennem om det er en true boolean og returnere det
            }

            //Køre funktionen her med boolPosColor, hvis alle elementer i array'en er true, så køres konditions
            if (boolSum(this.boolPosColor)) 
            {
                this.x += 200;  //Flytter sit ejet x position af længde af kasse
                this.newKasse = new Kasse(this.x - 200, this.y, 100);   //Laver ny kasse ved forrige position
                array.push(this.newKasse);  //Tilføjer nye kasse i givet array fra clickon(array)
            }
        }
        //Bliver trykket ændres ved mus er trykket hele tiden, bagefter
        this.beingPressed = mouseIsPressed;
    }
}
