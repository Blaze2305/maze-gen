let cell=[];
let i,j;
let size=20;
let current;
let w=600;
let h=600;
let neighbour=[];
let stack=[];
let prev;
let left=0;
let n;

function setup(){
  createCanvas(w,h);
  n=floor((w-10)/size);
  // frameRate(60)
  for(i=0;i<n;i++){
    cell[i]=[];
    for(j=0;j<n;j++){
      cell[i][j]=new cells((i)*size,(j)*size,i,j); //if first row and cols are shown then i->i+1,j->j+1 for proper display
    }
  }
  current=cell[0][0];
  current.visit=true;
  stack.push(current);
  
  cell[n-1][n-1].walls[0]=false;
}


function draw(){
    left=0;
    background(0)
    for(i=1;i<n;i++){ // i=1; therefore the first col is not shown, if needed set i=0;
      for(j=1;j<n;j++){ // j=1;therfore the first row is not shown,if needed set j=0;
        cell[i][j].show();
        if(!cell[i][j].visit){
          left+=1;
        }
      }
    }

    if(left>0){
      neighbour=current.neighbours(current.i,current.j)
      // console.log(neighbour)
      if(neighbour){
        prev = current;
        current= random(neighbour);
        current.check(prev);
        prev.check(current);
        // console.log(current)
        stack.push(current)
        current.visit=true;
        neighbour=current.neighbours(current.i,current.j)
      }
      else if(stack.length>0){
        current=stack.pop();
        // console.log(current)
        current.visit=true
        neighbour=current.neighbours(current.i,current.j);
      }
    }
    else{
      console.log("FINISHED");
      noLoop()
    }


}


class cells{
  constructor(x,y,i,j){
    this.x=x;
    this.y=y;
    this.vist=false;
    this.side=size;
    this.walls=[true,true,true,true];  // bottom,right,top ,left
    this.i=i;
    this.j=j;
  }
  show(){
    rectMode(CENTER);
    stroke(255);
    strokeWeight(3)
    if(this.walls[0] == true){
      line(this.x-this.side/2,this.y+this.side/2,this.x+this.side/2,this.y+this.side/2);
    }
    if(this.walls[1]== true){
      line(this.x+this.side/2,this.y+this.side/2,this.x+this.side/2,this.y-this.side/2);
    }
    if(this.walls[2]==true){
      line(this.x-this.side/2,this.y-this.side/2,this.x+this.side/2,this.y-this.side/2);
    }
    if(this.walls[3]==true){
      line(this.x-this.side/2,this.y+this.side/2,this.x-this.side/2,this.y-this.side/2);
    }
  }

  check(child){
    if(child.i-this.i==1){
      this.walls[1]=false;
    }
    if(child.i-this.i==-1){
      this.walls[3]=false;
    }
    if(child.j-this.j==1){
      this.walls[0]=false;
    }
    if(child.j-this.j==-1){
      this.walls[2]=false;
    }
  }

neighbours(i,j){
  let arr=[];
  if(i>1){
    if(cell[i-1][j] && !cell[i-1][j].visit){
      arr.push(cell[i-1][j]);
    }
  }
  if(j>1){
    if(cell[i][j-1] && !cell[i][j-1].visit){
      arr.push(cell[i][j-1]);
    }
  }
  if(i<n-1){
    if(cell[i+1][j] && !cell[i+1][j].visit){
      arr.push(cell[i+1][j]);
    }
  }
  if(j<n-1){
    if(cell[i][j+1] && !cell[i][j+1].visit){
      arr.push(cell[i][j+1]);
    }
  }
  if(arr.length>0){
    return(arr);
  }
  else{
    return undefined;
  }

}

}



function arr_strip(arr){
  for(let i=0;i<arr.length;i++){
    if(arr[i]==undefined){
      arr.splice(i,1);
    }
  }
  return(arr)
}


