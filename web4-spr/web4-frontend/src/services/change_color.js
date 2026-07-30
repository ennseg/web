export function change_color(R, X, Y) {
    if ((X < R/2 && Y < R && X > 0 && Y >0) || (Y > -X - R && X < 0 && Y < 0 ) || (X > 0 && Y < 0 && X*X + Y*Y < R*R)) {
        return true;
    } else {return false;}
}