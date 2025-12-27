use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();

    if args.len() < 4 {
        println!("false");
        return;
    }

    let x: f64 = args[1].parse().unwrap_or(0.0);
    let y: f64 = args[2].parse().unwrap_or(0.0);
    let r: f64 = args[3].parse().unwrap_or(0.0);

    let result =
        (x >= 0.0 && y >= 0.0 && x * x + y * y <= r * r) ||
        (x <= 0.0 && y >= 0.0 && x >= -r && y <= r / 2.0) ||
        (x >= 0.0 && y <= 0.0 && y >= x - r);

    println!("{}", result);
}
