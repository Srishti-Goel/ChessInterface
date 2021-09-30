export function generateMovables_fail(pieces_in: string[][]): string[][] {
    // Generates a list of which pieces can move to which place
      let movable_positions = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""]
      ];
      const pieces = [...pieces_in];
      console.log("Called generator with: ", pieces);
  
      for(let i = 0; i < 8 ; i++){
        for(let j = 0; j < 8; j++){
  
          let pieceId = pieces[i][j];

          console.log(pieceId, i, j);
  
          //Pawn movables:
          if(pieceId[1] === "p"){
            //Black Pawns:
            if(pieceId[0] === "B"){
              if(pieces[i-1][j] === ""){
                movable_positions[i-1][j] += " " +  pieceId;
                
                //Initial 2 steps for black:
                if(i === 6 && pieces[i-2][j] === ""){
                  movable_positions[i-2][j] += " " +  pieceId;
                }
              }
              //Black pawn kills
              if(pieces[i-1][j-1]){ 
                if(pieces[i-1][j-1][0] === "W"){
                  movable_positions[i-1][j-1] += " " +  pieceId;
                }
              }
              if(pieces[i-1][j+1]){
                if(pieces[i-1][j+1][0] === "W"){
                  movable_positions[i-1][j+1] += " " +  pieceId;
                }
              }
            }
  
  
            //White pawns
            if(pieceId[0] === "W"){
              if(pieces[i+1][j] === ""){
                movable_positions[i+1][j] += " " +  pieceId;
                //Initial 2 steps for white:
                if(i === 1 && pieces[i+2][j] === ""){
                  movable_positions[i+2][j] += " " +  pieceId;
                }
              }
  
              //White pawn kills
              if(pieces[i+1][j-1]){ 
                if(pieces[i+1][j-1][0] === "B"){
                  movable_positions[i+1][j-1] += " " +  pieceId;
                }
              }
              if(pieces[i+1][j+1]){
                if(pieces[i+1][j+1][0] === "B"){
                  movable_positions[i+1][j+1] += " " +  pieceId;
                }
              }
            }

          }
          
          //Bishops & Part Queen
          if(pieceId[1] === "b" || pieceId[1] === "q"){
            let ul = 1, ur = 1, dl = 1, dr = 1;
            for(let r = 1; (i - r >= 0)||(r + i < 8)||(j - r >= 0)||(r + j < 8); r++){
              if(i - r < 0){ul = 0; ur = 0;}
              if(r + i >= 8){dl = 0; dr = 0;}
              if(j - r < 0){ul = 0; dl = 0;}
              if(r + j >= 8){ur = 0; dr = 0;}
  
              if(ul){
                if(pieces[i - r][j - r] === ""){
                  movable_positions[i - r][j - r] += " " +  pieceId;
                }
                else{
                 ul = 0;
                 if(pieces[i - r][j - r][0] !== pieceId[0]){
                  movable_positions[i - r][j - r] += " " +  pieceId;
                 } 
                }
              }
              if(ur){
                if(pieces[i - r][j + r] === ""){
                  movable_positions[i - r][j + r] += " " +  pieceId;
                }
                else{
                 ur = 0;
                 if(pieces[i - r][j + r][0] !== pieceId[0]){
                  movable_positions[i - r][j + r] += " " +  pieceId;
                 } 
                }
              }
              if(dl){
                if(pieces[i + r][j - r] === ""){
                  movable_positions[i + r][j - r] += " " +  pieceId;
                }
                else{
                 dl = 0;
                 if(pieces[i + r][j - r][0] !== pieceId[0]){
                  movable_positions[i + r][j - r] += " " +  pieceId;
                 } 
                }
              }
              if(dr){
                if(pieces[i + r][j + r] === ""){
                  movable_positions[i + r][j + r] += " " +  pieceId;
                }
                else{
                 dr = 0;
                 if(pieces[i + r][j + r][0] !== pieceId[0]){
                  movable_positions[i + r][j + r] += " " +  pieceId;
                 } 
                }
              }
  
            }
          }
  
          //Knights
          if(pieceId[1] === "n"){
            for(let x = -2; x < 3; x+=4){
              for(let y = -1; y < 2; y+=2){
                if(i+x < 8 && i+x >= 0 && j+y < 8 && j+y >= 0){
                  if(pieces[i+x][j+y] === ""){
                    movable_positions[i+x][j+y] += " " +  pieceId;
                  }
                  else{
                    if(pieces[i+x][j+y] !== pieceId[0]){
                      movable_positions[i+x][j+y] += " " +  pieceId;
                    }
                  }
                }
              }
            }
  
            for(let y = -2; y < 3; y+=4){
              for(let x = -1; x < 2; x+=2){
                if(i+x < 8 && i+x >= 0 && j+y < 8 && j+y >= 0){
                  if(pieces[i+x][j+y] === ""){
                    movable_positions[i+x][j+y] += " " +  pieceId;
                  }
                  else{
                    if(pieces[i+x][j+y][0] !== pieceId[0]){
                      movable_positions[i+x][j+y] += " " +  pieceId;
                      //console.log("Added ", pieceId, "killing at: ", i+x, j+y, "Because", pieces[i+x][j+y]);
                    }
                  }
                }
              }
            }
            
            
          }
  
          //Rooks & Rest of Queen
          if(pieceId[1] === "r" || pieceId[1] === "q"){
            for(let x = 1; x + i < 8; x++){
              if(pieces[i + x][j] === ""){
                movable_positions[i + x][j] += " " +  pieceId;
              }
              else{
                if(pieces[i + x][j][0] !== pieceId[0]){
                  movable_positions[i + x][j] += " " +  pieceId;
                }
                break;
              }
            }
            for(let x = -1; x + i >= 0; x--){
              if(pieces[i + x][j] === ""){
                movable_positions[i + x][j] += " " +  pieceId;
              }
              else{
                if(pieces[i + x][j][0] !== pieceId[0]){
                  movable_positions[i + x][j] += " " +  pieceId;
                }
                break;
              }
            }
            //Left-right is a little messed up at the moment
  
            for(let x = 1; x + j < 8; x++){
              if(pieces[i][j + x] === ""){
                movable_positions[i][j + x] += " " +  pieceId;
              }
              else{
                if(pieces[i][j + x][0] !== pieceId[0]){
                  movable_positions[i][j + x] += " " +  pieceId;
                }
                break;
              }
            }
            for(let x = -1; x + i >= 0; x--){
              if(pieces[i][j + x] === ""){
                movable_positions[i][j + x] += " " +  pieceId;
              }
              else if(pieces[i][j + x]){
                if(pieces[i][j + x][0] !== pieceId[0]){
                  movable_positions[i][j + x] += " " +  pieceId;
                }
                break;
              }
            }
          }
  
          //King
          if(pieceId[1] === "k"){
            let otherPlayer = ( pieceId[0] === "W" )?"B": "W";
            for(let x = -1; x <= 1; x++){
              for(let y = -1; y <= 1; y++){
                if((i+x < 8) && (i+x > 0) && (j+y < 8) && (j+y > 0)){                                                 // Checks if the moved positions are on the board in the first place
                  if((pieces[i+x][j+y] === "") && (!movable_positions[i+x][j+y].includes(otherPlayer))){     // If the space is empty and the opposite player cannot move there
                    //console.log(movable_positions[i+x][j+y].includes(otherPlayer));
                    movable_positions[i+x][j+y] += " " +  pieceId;
                  }
                  else if((pieces[i+x][j+y][0] !== pieceId[0]) && (!movable_positions[i+x][j+y].includes(otherPlayer))){ // If the opposite player is present on the position, and is not protected
                    movable_positions[i+x][j+y] += " " +  pieceId;
                  }
                }
              }
            }
          }
        }
      }
      console.log("Returned movables: ", movable_positions);
      return movable_positions;
}

export function checkMovability_v2(piece_positions: string[][], initialPos: { x: number; y: number; }, finalPos: { x: number; y: number; }, movable_positions: string[][]){
    let pieceId = piece_positions[initialPos.x][initialPos.y];
    if(movable_positions[finalPos.x][finalPos.y].includes(pieceId)){ // Piece can potentially move to the new spot

        let positions_after_move = [...piece_positions];

        positions_after_move[initialPos.x][initialPos.y] = "";
        positions_after_move[finalPos.x][finalPos.y] = pieceId;

        
        console.log("In v2", positions_after_move);
        let movable_positions_after_move = generateMovables(positions_after_move);
        let kingPositions = findKings(positions_after_move);

        
        console.log("Kings at: ", kingPositions);
        console.log("Movables at: ", movable_positions_after_move);

        if(movable_positions_after_move[kingPositions.bx][kingPositions.by].includes("W")){
            if(pieceId[0] === "W"){
                alert("White checks black");
            }
            else{
                alert("Don't suicide!");
                return 0;
            }
        }
        if(movable_positions_after_move[kingPositions.wx][kingPositions.wy].includes("B")){
            if(pieceId[0] === "B"){
                alert("Black checks white");
            }
            else{
                alert("Don't suicide!");
                return 0;
            }
        }
        return 1;
    }
    else{
        return 0;
    }
}

function findKings(positions: string[][]) {
    let bf = 0, wf = 0; // Flags to save if the kings have been found
    let bx = -1, by = -1, wx = -1, wy = -1;
    for(let i = 0; i < 8 && !(bf && wf); i++){
        for(let j = 0; j < 8 && !(bf && wf); j++){
            if(positions[i][j][1] === "k"){
                if(positions[i][j][0] === "W"){
                    wx = i;
                    wy = j;
                }
                else{
                    bx = i;
                    by = j;
                }
            }
        }
    }

    return {bx, by, wx, wy};
}


export function generateMovables(pieces_in: string[][]): string[][] {
    // Generates a list of which pieces can move to which place
      let movable_positions = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""]
      ];
      const pieces = [...pieces_in];
      console.log("Called generator with: ", pieces);
  
      for(let i = 0; i < 8 ; i++){
        for(let j = 0; j < 8; j++){
            console.log(pieces[i][j], i, j);
        }
      }

      return movable_positions;
}