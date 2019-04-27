class Board
{
    constructor()
    {
        this.background=new Rectangle(0,0,WIDTH, HEIGHT, "#48ff72");
        this.background.draw();
        this.board=[];
        this.isDrawing=false;
        this.isDeleting=false;

        this.initBoard();
        let me=this;
        /*canvas.onmousedown = function (event) {Board.mouseDown(event, me)};
        canvas.onmousemove = function (event) {Board.mouseMove(event, me)};
        canvas.onmouseup = function (event) {Board.mouseUp(event, me)};
        document.onkeydown = function (event) {Board.keyDown(event, me)};*/
    }

    initBoard(matrix)
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
        if(board.board[x][y].isAWall())
        {
            board.board[x][y]=new Node(x,y);
            board.isDeleting=true;
        }
        else
        {
            board.board[x][y]=new WallNode(x,y);
            board.isDrawing=true;
        }
    }

    static mouseMove(event, board)
    {
        let x=parseInt((event.clientX - rect.left)/SQUARE_WIDTH);
        let y=parseInt((event.clientY - rect.top)/SQUARE_WIDTH);
        if(board.isDrawing)
        {
            board.board[x][y]=new WallNode(x,y);
        }
        else if(board.isDeleting)
        {
            board.board[x][y]=new Node(x,y);
        }
    }

    static mouseUp(event, board)
    {
        board.isDrawing=false;
        board.isDeleting=false;
    }


    print()
    {
        for(let i=0;i<20;i++)
        {
            let s="";
            for(let j=0;j<20;j++)
            {
                s+=this.board[j][i].getNumber()+" ";
            }
            console.log(s);
        }
    }
    static keyDown(event,board)
    {
        console.log(board.findPath());
        board.print();
    }

    mark(i,j,k)
    {
        try {
            if(!this.board[i+1][j].isAWall()&&this.board[i+1][j].isEmpty())
                this.board[i+1][j].number=k;
            if(this.board[i+1][j].isEnd())
                return true;} catch (e) {}
        try {if(!this.board[i-1][j].isAWall()&&this.board[i-1][j].isEmpty())
            this.board[i-1][j].number=k;
            if(this.board[i-1][j].isEnd())
                return true;} catch (e) {}
        try {if(!this.board[i][j+1].isAWall()&&this.board[i][j+1].isEmpty())
            this.board[i][j+1].number=k;
            if(this.board[i][j+1].isEnd())
                return true;} catch (e) {}
        try {if(!this.board[i][j-1].isAWall()&&this.board[i][j-1].isEmpty())
            this.board[i][j-1].number=k;
            if(this.board[i][j-1].isEnd())
                return true;} catch (e) {}
        return false;
    }

    paint(i,j,x)
    {


        if(x>0)
        {
            this.board[i][j].paint();
            x--;
            try {if(this.board[i+1][j].number===x) {return this.paint(i+1,j,x);}} catch (e) {console.log(e)}
            try {if(this.board[i-1][j].number===x) {return this.paint(i-1,j,x);}} catch (e) {console.log(e)}
            try {if(this.board[i][j+1].number===x) {return this.paint(i,j+1,x);}} catch (e) {console.log(e)}
            try {if(this.board[i][j-1].number===x) {return this.paint(i,j-1,x);}} catch (e) {console.log(e)}
        }
        return 1;

    }

    findPath()
    {
        for(let x=0;x<this.board.length*this.board.length;x++)
            for(let i=0;i<this.board.length;i++)
            {
                for(let j=0;j<this.board.length;j++)
                {
                    if(this.board[j][i].getNumber()===x)
                    {
                        if(this.mark(j,i,x+1))
                        {
                            this.paint(j,i,x);
                            return x;
                        }

                    }
                }
            }

    }



}