const CELLS_COLOR=["#333333","#fff156","#00ff7b","#6bb9ff","#ff5a4d"];

class Cell
{
    constructor(x,y,value=0)
    {
        this.square = new Rectangle(x * SQUARE_WIDTH + SQUARE_BORDER, y * SQUARE_WIDTH + SQUARE_BORDER,
            SQUARE_WIDTH - 2 * SQUARE_BORDER, SQUARE_WIDTH - 2 * SQUARE_BORDER, CELLS_COLOR[0]);
        this.setColor(value)
    }

    setColor(count)
    {
        if(count < 0.1)
        {
            this.number = 0;
            this.value = 0;
        }
        else if (count < 0.3)
        {
            this.value = 0.1;
            this.number = 1;
        }
        else if (count < 0.5)
        {
            this.value = 0.3;
            this.number = 2;
        }
        else if (count < 0.7)
        {
            this.value = 0.5;
            this.number = 3;
        }
        else
        {
            this.value = 0.8;
            this.number = 4;
        }
        this.square.color = CELLS_COLOR[this.number];
    }

    isAlive()
    {
        return this.value !== 0 ? 1 : 0;
    }

    draw()
    {
        this.square.draw();
    }
}