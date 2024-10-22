const images = [
  "https://images.pexels.com/photos/28864480/pexels-photo-28864480.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/20425363/pexels-photo-20425363.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
  "https://images.pexels.com/photos/27874991/pexels-photo-27874991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/26600776/pexels-photo-26600776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/26704682/pexels-photo-26704682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/28665518/pexels-photo-28665518.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/28719604/pexels-photo-28719604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/28719604/pexels-photo-28719604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/27981152/pexels-photo-27981152.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/28881678/pexels-photo-28881678.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/12481165/pexels-photo-12481165.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/28457391/pexels-photo-28457391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/6576802/pexels-photo-6576802.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
];

export const mockImage = () => {
  return images[Math.floor(Math.random() * images.length)];
}