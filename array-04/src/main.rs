fn main() {
  println!("\n==========================");
  // array interger
  let array = [1, 2, 3, 4, 5];
  println!("array[1]: {}", array[1]);

  // array custom data type
  let mut array2: [u8; 3] = [3, 4, 5];

  // iter()
  print!("array2: ");
  for n in array2.iter() {
    print!("{} ", n);
  }

  // other way of iterating
  print!("\nother way iter() array2: ");
  for i in 0..array2.len() {
    print!("{} ", array2[i]);
  }

  // change of value
  array2[1] = 100;
  print!("\nchange array2: ");
  for i in 0..array2.len() {
    print!("{} ", array2[i]);
  }

  println!("\n==========================");
}
