fn main() {
  let mut vec1: Vec<i16> = Vec::new();

  vec1.push(1);
  vec1.push(5);
  vec1.push(100);
  println!("vec1: {:?}", &vec1);

  vec1.pop();
  println!("vec1: {:?}", &vec1);

  // match
  match vec1.get(100) {
    Some(el) => println!("{:?}", el),
    None => println!("Out of bounds"),
  }
  match vec1.get(1) {
    Some(el) => println!("{:?}", el),
    None => println!("Out of bounds"),
  }

  // iteration
  for i in vec1.iter() {
    print!("{:?} ", i);
  }
  println!("");

  // other iteration
  for (i, v) in vec1.iter().enumerate() {
    println!("Index: {}, Value: {}", i, v);
  }
}
