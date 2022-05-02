use std::collections::HashMap;

fn main() {
  let mut courses: HashMap<String, u16> = HashMap::new();

  courses.insert("k1".to_string(), 10);
  courses.insert("k2".to_string(), 30);
  courses.insert("k3".to_string(), 20);

  println!("{:?}", courses);

  // get el by key
  println!("el k2: {:?}", courses.get(&"k1".to_string()));

  // match
  match courses.get(&"k100".to_string()) {
    Some(el) => println!("el: {:?}", el),
    None => println!("Out of range!"),
  }
  match courses.get(&"k3".to_string()) {
    Some(el) => println!("el: {:?}", el),
    None => println!("Out of range!"),
  }

  // access([])
  println!("{:?}", courses[&"k1".to_string()]);

  // contains key
  if courses.contains_key(&"k1".to_string()) {
    println!("Contains");
  }

  // iteration
  for (k, v) in courses.iter() {
    println!("{:?} => {:?}", k, v);
  }

  // overwite
  courses.insert("k1".to_string(), 1000);
  println!("{:?}", courses);

  // or insert entry
  courses.entry("k4".to_string()).or_insert(999);
  println!("{:?}", courses);

  // removte
  courses.remove(&"k4".to_string());
  println!("{:?}", courses);
}
