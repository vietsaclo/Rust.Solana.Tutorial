fn main() {
  // references
  let mut i = 0;
  let i_res = &mut i;
  *i_res += 1;
  i += 1;

  println!("{:?}", i);
}
