let cell=[];
let i,j;
let size=10
let current;
let w=600;
let h=600;
let n=(w/size)-1;
let neighbour=[];
let stack=[];
let prev;
let left=0;

function setup(){
  createCanvas(w,h);
  frameRate(100)
  for(i=0;i<n;i++){
    cell[i]=[];
    for(j=0;j<n;j++){
      cell[i][j]=new cells((i+1)*size,(j+1)*size,i,j);
    }
  }
  current=cell[0][0];
  current.visit=true;
  stack.push(current);
}


function draw(){
    left=0;
    background(0)
    for(i=0;i<n;i++){
      for(j=0;j<n;j++){
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
      else if(stack){
        current=stack.pop();
        current.visit=true
        neighbour=current.neighbours(current.i,current.j);
      }
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
    strokeWeight(1)
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

    if(this.visit){
      noStroke();
      noFill()
      // fill(148,0,211,100)
      rect(this.x,this.y,this.side,this.side);
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



  // neighbours(i,j){
  //   let arr=[]
  //   if(i>1){
  //     arr[0]=cell[i-1][j];
  //   }
  //   else{
  //     arr[0]=undefined;
  //   }
  //   if(j>1){
  //     arr[1]=cell[i][j-1];
  //   }
  //   else{
  //     arr[1]=undefined
  //   }
  //   if(i<n-1){
  //     arr[2]=cell[i+1][j];
  //   }
  //   else{
  //     arr[2]=undefined;
  //   }
  //   if(j<n-1){
  //     arr[3]=cell[i][j+1];
  //   }
  //   else{
  //     arr[3]=undefined;
  //   }
  //   return(arr)
  // }

}



function arr_strip(arr){
  for(let i=0;i<arr.length;i++){
    if(arr[i]==undefined){
      arr.splice(i,1);
    }
  }
  // console.log(arr)
  return(arr)
}
