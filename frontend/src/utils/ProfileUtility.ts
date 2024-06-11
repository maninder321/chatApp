import userAvatar from "./../assets/userAvatar.png";

const defaultProfileImage = (): string => {
  return userAvatar;
};

function getRandomColor() {
  // List of common colors
  var colors = [
    "red",
    "green",
    "blue",
    "yellow",
    "orange",
    "purple",
    "pink",
    "cyan",
    "magenta",
    "teal",
    // Add more colors as needed
  ];

  // Generate a random index to select a color from the list
  var randomIndex = Math.floor(Math.random() * colors.length);

  // Get the color at the random index
  var color = colors[randomIndex];

  return "skyblue";
}

export { defaultProfileImage, getRandomColor };
