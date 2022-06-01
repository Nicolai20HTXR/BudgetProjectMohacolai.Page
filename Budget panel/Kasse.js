//Klasse af kassen som indholder titel, penge og visualisering 
class Kasse 
{
    constructor(x, y, r)
    {
        this.x = x;
        this.y = y;
        this.r = r;
        this.editable = false;
        this.tempMoneyValue = 0;

        //Input boks for titel
        this.pengeInput = createInput("").attribute("maxlength", 11);
        this.pengeInput.size(100);
        this.pengeInput.position(
            this.x + (this.r * 2 - this.pengeInput.width) / 2,
            this.y + (this.r - this.pengeInput.height) / 4
        );
        this.textInput = "";

        //Input boks for penge mængde
        this.pengeAmountInput = createInput("0").attribute("type", "number");
        this.pengeAmountInput.size(75);
        this.pengeAmountInput.position(
            this.x + (this.r * 2 - this.pengeAmountInput.width) / 2,
            this.y + (this.r - this.pengeAmountInput.height) / 1.2
        );

        //Billede fra preload funktionen
        this.editimage = editimagepreload;

        //Array for pengene der skal visualiseres
        this.moneyObjects = [];
    }

    //Draw metode af kasse klassen som skal køres hele tiden
    draw() 
    {
        //Baggrund kasse, hvor penge ligger på
        rect(this.x, this.y, this.r * 2, this.r * 8, 25);
        //Øvereste kasse som indholder input bokse og redigere knap
        rect(this.x, this.y, this.r * 2, this.r, 25);

        //Viser om det er muligt at redigere eller ikke
        if (this.editable) 
        {
            //Position af billedet
            image(
                this.editimage,
                this.x + this.r * 2 - 35,
                this.y + 10,
                25,
                25
            );
            //Hvis musen er over og klikkes, vis input, reset string, editable bool til falsk
            if (
                mouseX < this.x + this.r * 2 - 35 + 25 &&
                mouseX > this.x + this.r * 2 - 35 &&
                mouseY < this.y + 25 &&
                mouseY > this.y + 10 &&
                mouseIsPressed
            ) 
            {
                this.editable = false;
                this.pengeInput.show();
                this.textInput = "";
            }
        }

        //Giver text funktionen en variable, så vi kan manipulere teksten, og viser titel.
        this.textw = text(
            this.textInput,
            this.x + this.r / 2,
            this.y + this.r / 2
        );
        this.textw.textSize(20);

        //Når pengeinput input boks ændres med bekræftelse, så køres pil funktionen 
        //kunne ikke laves som normal funktion og var nød til at laves som pil funktion
        //virkede som om den ikke kunne læse i objektets scope
        this.pengeInput.changed(() =>
        {
            this.textInput = this.pengeInput.value();
            this.pengeInput.hide();
            this.editable = true;
        });

        //Samme som forrige
        this.pengeAmountInput.input(() => 
        {
            this.tempMoneyValue = this.pengeAmountInput.value();
            this.moneyObjects = [];
        });

        //Tilføjer nye objekter af money til vores array og ændres på tempMoneyValue
        if (this.tempMoneyValue >= 1000) 
        {
            this.tempMoneyValue -= 1000;
            this.moneyObjects.push(
                new Money(
                    this.x + (this.r * 2 - kr1000.width) / 2,
                    this.y + this.r,
                    kr1000
                )
            );
        } 
        else if (this.tempMoneyValue >= 500) 
        {
            this.tempMoneyValue -= 500;
            this.moneyObjects.push(
                new Money(
                    this.x + (this.r * 2 - kr500.width) / 2,
                    this.y + this.r,
                    kr500
                )
            );
        } 
        else if (this.tempMoneyValue >= 200) 
        {
            this.tempMoneyValue -= 200;
            this.moneyObjects.push(
                new Money(
                    this.x + (this.r * 2 - kr200.width) / 2,
                    this.y + this.r,
                    kr200
                )
            );
        } 
        else if (this.tempMoneyValue >= 100) 
        {
            this.tempMoneyValue -= 100;
            this.moneyObjects.push(
                new Money(
                    this.x + (this.r * 2 - kr100.width) / 2,
                    this.y + this.r,
                    kr100
                )
            );
        } 
        else if (this.tempMoneyValue >= 50) 
        {
            this.tempMoneyValue -= 50;
            this.moneyObjects.push(
                new Money(
                    this.x + (this.r * 2 - kr50.width) / 2,
                    this.y + this.r,
                    kr50
                )
            );
        }

        //Forloop af array af objekter og køres deres draw funktion
        for (let i = 0; i < this.moneyObjects.length; i++) 
        {
            this.moneyObjects[i].y = this.y + i * 25 + this.r;
            this.moneyObjects[i].draw();
        }
    }
}