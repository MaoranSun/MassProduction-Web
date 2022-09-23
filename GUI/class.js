class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }

    get X() {
        return this.x;
    }

    get Y() {
        return this.y;
    }

    set set_x(a) {
        this.x = a;
    }

    set set_y(a) {
        this.y = a;
    }
}


class L {
    constructor(p1, p2) {
        this.Start = p1;
        this.End = p2;

        this.color = 'red';
    }

    get start() {
        return this.Start;
    }

    get end() {
        return this.End;
    }

    chageEnd(point) {
        this.End = point;
    }

    get points() {
        return [start, end];
    }

    get slope() {
        if (this.Start.X == this.End.X) return 'None';
        else return (this.Start.Y - this.End.Y) / (this.Start.X - this.End.X);
    }

    get yintersect() {
        if (this.slope == 'None') {
            return 'None';
        }
        else return this.Start.Y - this.slope * this.Start.X;
        // else return None;
    }

    intersection (l1) {
        let inter_x;
        let inter_y;
        let interpoint;
        // check if parallel    
        if (this.slope != l1.slope) {
            if (this.slope == 'None') {
                inter_x = this.start.X;
                inter_y = l1.slope * inter_x + l1.yintersect;
                interpoint = new Point(inter_x, inter_y);
            }
            else if (l1.slope == 'None') {
                inter_x = l1.start.X;
                inter_y = this.slope * inter_x + this.yintersect;
                interpoint = new Point(inter_x, inter_y);
            }
            else {
                inter_x = (l1.yintersect - this.yintersect) / (this.slope - l1.slope);
                inter_y = this.slope * inter_x + this.yintersect;
                interpoint = new Point(inter_x, inter_y);
            }

            return interpoint;
        }
        else return 'None';
    }

    checkAngle(l1) {
        if (this.slope == l1.slope) return 5;
        else if (this.slope == 'None') return PI / 2 - atan(l1.slope);
        else if (l1.slope == 'None') return PI / 2 - atan(this.slope);
        else return atan(this.slope) - atan(l1.slope);
    }

    render(weight){
        push();
        stroke(this.color);
        strokeWeight(weight);
        line(this.Start.X, this.Start.Y, this.End.X, this.End.Y);
        pop();
    }
}


class Rectangle {
  constructor(p1, p2, p3, p4, program, height, fill_color, layer_count) {
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.p4 = p4;
    this.program = program;
    this.height = height;
    this.fill_color = fill_color;

    this.delete = false;
    this.handdelete = false;
    this.hover = false;
    this.select = false;
    this.layer = layer_count
  }

  get corners() {
      return [this.p1, this.p2, this.p3, this.p4];
  }

  get cornerscoord() {
      return [[this.p1.X, this.p1.Y], [this.p2.X, this.p2.Y], [this.p3.X, this.p3.Y], [this.p4.X, this.p4.Y]];
  }

  get totext() {
      return [this.p1.X, this.p1.Y, this.p2.X, this.p2.Y, this.p3.X, this.p3.Y, this.p4.X, this.p4.Y];
  }

  move(x_dist, y_dist) {
      this.p1.set_x = this.p1.X + x_dist;
      this.p1.set_y = this.p1.Y + y_dist;
      this.p2.set_x = this.p2.X + x_dist;
      this.p2.set_y = this.p2.Y + y_dist;
      this.p3.set_x = this.p3.X + x_dist;
      this.p3.set_y = this.p3.Y + y_dist;
      this.p4.set_x = this.p4.X + x_dist;
      this.p4.set_y = this.p4.Y + y_dist;
  }

  render() {
      let colormap = {
          '#E84A5F': [232, 74, 95],
          '#FECEAB': [254, 206, 171],
          '#99B898': [153, 184, 152],
          '#7a7a79': [122, 122, 121]
      }
      let transparent = [0, 1, .6, .3];

      if (!this.delete && !this.handdelete) {
          push();
          if (this.hover) {
              strokeWeight(3);
              stroke('white');
              // fill(this.fill_color);
              // fill('rgba(colormap[this.fill_color][0], colormap[this.fill_color][1], colormap[this.fill_color][2], transparent[this.layer])')
          }
          else {
              noStroke();
              // fill(this.fill_color);
          }
          fill(this.fill_color);
          // fill(`rgba(${colormap[this.fill_color][0]}, ${colormap[this.fill_color][1]}, ${colormap[this.fill_color][2]}, ${transparent[this.layer]})`);

          quad(this.corners[0].x, this.corners[0].y, this.corners[1].x, this.corners[1].y, this.corners[2].x, this.corners[2].y, this.corners[3].x, this.corners[3].y);
          pop();
      }

  }
}


class Polygon {
    constructor(points, program, height, color) {
        this.points = points;
        this.program = program;
        this.height = height;
        this.color = color;

        this.delete = false;
        this.hover = false;
        this.select = false;
    }

    get cornerscoord() {
        let corcoord = [];
        for (let i = 0; i < this.points.length; i++) {
            corcoord.push([this.points[i].X, this.points[i].Y]);
        }
        return corcoord;
    }

    get totext() {
        let corcoord = [];
        for (let i = 0; i < this.points.length; i++) {
            corcoord.push(this.points[i].X, this.points[i].Y);
        }
        return corcoord;
    }

    move(x_dist, y_dist) {
        for (let i = 0; i < this.points.length; i++) {
            this.points[i].set_x = this.points[i].X + x_dist;
            this.points[i].set_y = this.points[i].Y + y_dist;
        }
    }

    render() {
        if (!this.delete) {
            push();
            if (this.hover) {
                strokeWeight(3);
                stroke('white');
            }
            else {
                noStroke();
            }
            fill(this.color);
            beginShape();
            for (let i = 0; i < this.points.length; i++) {
                vertex(this.points[i].X, this.points[i].Y)
            }
            endShape(CLOSE);
            // quad(this.corners[0].x, this.corners[0].y, this.corners[1].x, this.corners[1].y, this.corners[2].x, this.corners[2].y, this.corners[3].x, this.corners[3].y);
            pop();
        }

    }
}


class Button {
    constructor(locationx, locationy, color, word) {
        this.group;
        this.centerx = locationx;
        this.centery = locationy;
        this.color = color;
        this.word = word;
        this.radius = 30;
        this.select = false;
    }

    render() {
    }

    isinside(p) {
        let distance = dist(p.X, p.Y, this.centerx, this.centery);
        if (distance < this.radius) return true;
        else return false;
    }
}


class ButtonColor extends Button {
    constructor(locationx, locationy, color, word) {
        super(locationx, locationy, color, word);
        this.status = 'inactive';
        this.group = 'color';
    }

    execute() {
        s_color = this.color;
    }

    render() {
        push();
        fill(this.color);
        noStroke();
        circle(this.centerx, this.centery, this.radius);

        textFont('Helvetica', 8);
        textAlign(CENTER);
        fill('#aaaaaa');
        text(this.word, this.centerx, this.centery + 24);
        pop();

            if (this.status == 'active'){
                push();
                stroke('white');
                strokeWeight(3);
                noFill();
                circle(this.centerx, this.centery, this.radius - 10);
                pop();
            }
        }
    }


class ButtonHeight extends Button {
    constructor(locationx, locationy, color, word, height) {
        super(locationx, locationy, color, word);
        this.height = height;
        this.status = 'inactive';
        this.group = 'height';
    }

    execute() {
        height = this.height;
    }

    render() {
        if (this.status == 'active'){
            push();
            fill(this.color);
            noStroke();
            circle(this.centerx, this.centery, this.radius);
    
            textFont('Helvetica', 8);
            textAlign(CENTER);
            fill('#aaaaaa');
            text(this.word, this.centerx, this.centery + 24);
            pop();

            push();
            stroke('white');
            strokeWeight(3);
            noFill();
            circle(this.centerx, this.centery, this.radius - 10);
            pop();
        }
        
        else if(this.status == 'inactive'){
            push();
            fill(this.color);
            noStroke();
            circle(this.centerx, this.centery, this.radius);

            textFont('Helvetica', 8);
            textAlign(CENTER);
            fill('#aaaaaa');
            text(this.word, this.centerx, this.centery + 24);
            pop();
        }
    }
}


class ButtonOrtho extends Button {
    constructor(locationx, locationy, color, word) {
        super(locationx, locationy, color, word);
    }

    execute() {
        // if (new_layer) new_layer = false;
        // else new_layer = true;
        if (ortho) ortho = false;
        else ortho = true;
    }

    render(){
        if(ortho != true){
            fill('#aaaaaa');
            noStroke();
            circle(this.centerx, this.centery, this.radius);
    
            textFont('Helvetica', 8);
            textAlign(CENTER);
            fill('#aaaaaa');
            text(this.word, this.centerx, this.centery + 24);
    
            // ortho icon
            push();
            stroke('white');
            strokeWeight('2');
            line(this.centerx - this.radius / 5 , this.centery + this.radius / 5, this.centerx + this.radius/ 5 , this.centery + this.radius / 5);
            line(this.centerx - this.radius / 5 , this.centery - this.radius / 5, this.centerx + this.radius/ 5 , this.centery - this.radius / 5);
            line(this.centerx - 4 , this.centery + 8, this.centerx - 4 , this.centery - 8);
            line(this.centerx + 4 , this.centery + 8, this.centerx + 4 , this.centery - 8);
            pop();
        }

        else if (ortho == true){
            textFont('Helvetica', 8);
            textAlign(CENTER);
            fill('#aaaaaa');
            text(this.word, this.centerx, this.centery + 24);

            fill('#d11919');
            noStroke();
            circle(this.centerx, this.centery, this.radius);
            push();
            stroke('white');
            strokeWeight('3');
            pop();

            // ortho icon
            push();
            stroke('white');
            strokeWeight('2');
            line(this.centerx - this.radius / 5 , this.centery + this.radius / 5, this.centerx + this.radius/ 5 , this.centery + this.radius / 5);
            line(this.centerx - this.radius / 5 , this.centery - this.radius / 5, this.centerx + this.radius/ 5 , this.centery - this.radius / 5);
            line(this.centerx - 4 , this.centery + 8, this.centerx - 4 , this.centery - 8);
            line(this.centerx + 4 , this.centery + 8, this.centerx + 4 , this.centery - 8);
            pop();
        }
    }
}


class ButtonClear extends Button {
    constructor(locationx, locationy, color, word) {
        super(locationx, locationy, color, word);
    }

    execute() {
        if (clear_canvas) {
            clear_canvas = false;
        }
        else {
            clear_canvas = true;
            shapes = [[]];
        }
    }

    render(){
        fill('#aaaaaa');
        noStroke();
        circle(this.centerx, this.centery, this.radius);

        textFont('Helvetica', 8);
        textAlign(CENTER);
        fill('#aaaaaa');
        text(this.word, this.centerx, this.centery + 24);

        // trash can icon
        push();
        stroke('white');
        strokeWeight('1.5');
        noFill();
        rect(this.centerx - 5, this.centery - 9, 10, 3, 5, 5, 0, 0);
        rect(this.centerx - 7.5, this.centery - 6, 15, 4, 3, 3, 0 ,0);
        rect(this.centerx - 6, this.centery - 2, 12, 12, 0, 0, 3, 3);
        line(this.centerx, this.centery + 1, this.centerx, this.centery + 6);
        line(this.centerx - 3, this.centery + 1, this.centerx - 3, this.centery + 6);
        line(this.centerx + 3, this.centery + 1, this.centerx + 3, this.centery + 6);
        pop();

        if (this.select == true){
            push();
            fill('#d11919');
            noStroke();
            circle(this.centerx, this.centery, this.radius);
            pop();

            push();
            stroke('white');
            noFill();
            strokeWeight('1.5');
            rect(this.centerx - 5, this.centery - 9, 10, 3, 5, 5, 0, 0);
            rect(this.centerx - 7.5, this.centery - 6, 15, 4, 3, 3, 0 ,0);
            rect(this.centerx - 6, this.centery - 2, 12, 12, 0, 0, 3, 3);
            line(this.centerx, this.centery + 1, this.centerx, this.centery + 6);
            line(this.centerx - 3, this.centery + 1, this.centerx - 3, this.centery + 6);
            line(this.centerx + 3, this.centery + 1, this.centerx + 3, this.centery + 6);
            pop();
        }
    }
}


class ButtonDelete extends Button {
    constructor(locationx, locationy, color, word) {
        super(locationx, locationy, color, word);
        this.status = 'inactive';
    }

    execute() {
        if (delete_mode) delete_mode = false;
        else delete_mode = true;
    }
 
    render(){
        if(delete_mode != true){
            fill('#aaaaaa');
            noStroke();
            circle(this.centerx, this.centery, this.radius);
    
            textFont('Helvetica', 8);
            textAlign(CENTER);
            fill('#aaaaaa');
            text(this.word, this.centerx, this.centery + 24);
    
            // delete icon
            push();
            stroke('white');
            strokeWeight('3');
            line(this.centerx - this.radius / 6 , this.centery - this.radius / 6, this.centerx + this.radius/ 6 , this.centery + this.radius / 6);
            line(this.centerx - this.radius / 6 , this.centery + this.radius / 6, this.centerx + this.radius/ 6 , this.centery - this.radius / 6);
            pop();
        }
        
        else if (delete_mode == true){
            textFont('Helvetica', 8);
            textAlign(CENTER);
            fill('#aaaaaa');
            text(this.word, this.centerx, this.centery + 24);

            fill('#d11919');
            noStroke();
            circle(this.centerx, this.centery, this.radius);

            // delete icon
            push();
            stroke('white');
            strokeWeight('3');
            line(this.centerx - this.radius / 6 , this.centery - this.radius / 6, this.centerx + this.radius/ 6 , this.centery + this.radius / 6);
            line(this.centerx - this.radius / 6 , this.centery + this.radius / 6, this.centerx + this.radius/ 6 , this.centery - this.radius / 6);
            pop();
        }
    }
}


class ButtonDrawingLayer extends Button {
    constructor(locationx, locationy, color, word) {
        super(locationx, locationy, color, word);
        this.status = 'active';
        this.name = word;
    }

    execute() {
        if (this.status == 'active') {
            this.status = 'close';
            shapes[this.name]
            //delete all geometry in this layer
            for (let i = 0; i < shapes[this.name].length; i++) {
                shapes[this.name][i].delete = true;
            }
            // delete all voids in this layer
            for (let i = 0; i < voids[this.name].length; i++) {
                voids[this.name][i].delete = true;
            }
        }
        // else if (this.status == 'inactive') {
        //     this.status = 'active';
        // }
        else {
            this.status = 'active'
            active_layer = this.name;
            // show geometries in this layer
            for (let i = 0; i < shapes[this.name].length; i++) {
                shapes[this.name][i].delete = false;
            }
            // show voids in this layer
            for (let i = 0; i < voids[this.name].length; i++) {
                voids[this.name][i].delete = false;
            }
            for (let i = 0; i < buttons_layer.length; i++) {
                if (buttons_layer[i].status == 'active' && buttons_layer[i].name != this.name) {
                    buttons_layer[i].status = 'inactive';
                }
                // else {
                //     buttons_layer[i].status = 'active';
                // }
            }
        }
    }

    render() {
        push();
        textAlign(CENTER);
        fill(this.color);
        if (this.status == 'active') {
            stroke('#d11919');
            strokeWeight(1.5);
        }
        else if (this.status == 'close') {
            fill('black');
        }
        else noStroke();
        // noStroke();
        circle(this.centerx, this.centery, this.radius);
        noStroke();

        textFont('Helvetica', 8);
        textAlign(CENTER);
        fill('#aaaaaa');
        text(this.word, this.centerx, this.centery + this.radius);
        pop();
    }
}


class ButtonLayer extends Button {
    constructor(locationx, locationy, color, word) {
        super(locationx, locationy, color, word);
        this.status = 'inactive';
    }

    execute() {
        // if (new_layer) new_layer = false;
        // else new_layer = true;
        layer_count += 1;
        buttons_layer.push(new ButtonDrawingLayer(1025, layer_btn_y, '#ffffff', layer_count));
        layer_btn_y += 50;
        active_layer = layer_count;
        for (let i = 0; i < buttons_layer.length; i++) {
            if (buttons_layer[i].name != active_layer) {
                buttons_layer[i].status = 'inactive';
            }
        }
        voids.push([]);
        shapes.push([]);
    }

    render(){
        fill('#aaaaaa');
        noStroke();
        circle(this.centerx, this.centery, this.radius);

        textFont('Helvetica', 8);
        textAlign(CENTER);
        fill('#aaaaaa');
        text(this.word, this.centerx, this.centery + 24);

        // new layer icon
        push();
        stroke('white');
        strokeWeight('3');
        line(this.centerx, this.centery - 8, this.centerx, this.centery + 8);
        line(this.centerx - 8, this.centery, this.centerx + 8, this.centery);
        pop();

        if (this.select == true){
            fill('#d11919'); ``
            noStroke();
            circle(this.centerx, this.centery, this.radius);

            push();
            stroke('white');
            strokeWeight('3');
            line(this.centerx, this.centery - 8, this.centerx, this.centery + 8);
            line(this.centerx - 8, this.centery, this.centerx + 8, this.centery);
            pop();
        }
    }
}

class ButtonMode extends Button {
    constructor(locationx, locationy, color, word) {
        super(locationx, locationy, color, word);
        this.mode = 'rect';
    }

    execute() {
        if (curvemode) curvemode = false;
        else curvemode = true;
    }
}


class ButtonSave extends Button {
    constructor(locationx, locationy, color, word) {
        super(locationx, locationy, color, word);
    }

    execute() {
        saveStrings(finalExport(shapes),'shapes.txt')
        // location.reload();
        // saveStrings(shapes, 'shapes.txt');
        count = 0;
    }
}
