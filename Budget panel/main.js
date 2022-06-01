//Loader billederne ind som det første, så de kan bruges af vores klasser
function preload() 
{
    kr50 = loadImage('50dkk.jpg');
    kr100 = loadImage('100dkk.jpg');
    kr200 = loadImage('200dkk.jpg');
    kr500 = loadImage('500dkk.jpg');
    kr1000 = loadImage('1000dkk.jpg');
    editimagepreload = loadImage("Edit.png");
}

//Setup køres en gang før draw for ting der kun skal køres en gang
function setup() 
{
    createCanvas(windowWidth, windowHeight);
    objArray = [];
    tilføjkasse = new Tilføjkasse(25, 25, 100);
}

function draw() 
{
    background(210);
    tilføjkasse.draw();
    tilføjkasse.clickOn(objArray);

    //Hver eneste kasse der bliver tilføjet gennem tilføjkasse.clickOn() funktionen skal der køres en funktion på
    for (i = 0; i < objArray.length; i++) 
    {
        objArray[i].draw();
    }
}