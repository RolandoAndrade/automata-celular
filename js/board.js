let filter = [[0.2,0.3,0.4],[0.1,1,0.1],[0.4,0.3,0.2]];


class Board
{
    constructor()
    {
        this.background=new Rectangle(0,0,WIDTH, HEIGHT, "#626766");
        this.background.draw();
        this.board=[];
        this.isDrawing=false;
        this.isDeleting=false;

        this.initBoard();
        let me=this;
        canvas.onmousedown = function (event) {Board.mouseDown(event, me)};
        canvas.onmousemove = function (event) {Board.mouseMove(event, me)};
        canvas.onmouseup = function (event) {Board.mouseUp(event, me)};
    }

    initBoard()
    {
        for(let i=0;i<DIMENSIONS;i++)
        {
            let row=[];
            for(let j=0;j<DIMENSIONS;j++)
            {
                row.push(new Cell(i,j));
                row[j].draw();
            }
            this.board.push(row);
        }
    }

    static mouseDown(event, board)
    {
        let x=parseInt((event.clientX - rect.left)/SQUARE_WIDTH);
        let y=parseInt((event.clientY - rect.top)/SQUARE_WIDTH);
        console.log(y,x);
        if(board.board[y][x].isAlive()!==0)
        {
            board.board[y][x]=new Cell(x,y);
            board.isDeleting=true;
        }
        else
        {
            board.board[y][x]=new Cell(x,y,actualColor);
            board.isDrawing=true;
        }
    }

    static mouseMove(event, board)
    {

        let x=parseInt((event.clientX - rect.left)/SQUARE_WIDTH);
        let y=parseInt((event.clientY - rect.top)/SQUARE_WIDTH);
        if(board.isDrawing)
        {
            board.board[y][x]=new Cell(x,y,actualColor);
        }
        else if(board.isDeleting)
        {
            board.board[y][x]=new Cell(x,y);
        }
    }

    static mouseUp(event, board)
    {
        board.isDrawing=false;
        board.isDeleting=false;
    }

    play()
    {
        let axBoard=[];
        for(let i=0;i<this.board.length;i++)
        {
            let axRow=[];
            for (let j = 0; j < this.board[i].length; j++)
            {
                let colors = 0;
                let cellsAlive = 0;
                let filterI=i>0?0:1;

                for(let x=Math.max(i-1,0);x<i+2&&x<this.board.length;x++,filterI++)
                {
                    let filterJ=j>0?0:1;
                    for(let y=Math.max(j-1,0);y<j+2&&y<this.board[i].length;y++,filterJ++)
                    {
                        if(i!==x||j!==y)
                        {
                            cellsAlive+=this.board[x][y].isAlive();
                        }
                        colors+=this.board[x][y].value*filter[filterI][filterJ];
                    }
                }

                if((this.board[i][j].isAlive()===0&&cellsAlive===3)||(this.board[i][j].isAlive()===1&&(cellsAlive===3||cellsAlive===2)))
                {
                    console.log("viva");
                    console.log(i,j,cellsAlive,colors);
                    axRow.push(new Cell(j,i,colors));
                }
                else
                {
                    axRow.push(new Cell(j,i));
                }
            }
            axBoard.push(axRow);
        }
        this.board=axBoard;
    }
}