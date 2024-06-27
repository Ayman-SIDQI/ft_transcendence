
let profilepic = document.getElementById("profile-pic");
let inputfile = document.getElementById("input-file");
let iconpic = document.getElementById("icon-pic");

if (profilepic && profilepic.style) {
// profilepic.style.height = '80px';
// profilepic.style.width = '80px';
// profilepic.style.borderRadius = '50%';
// profilepic.style.backgroundColor = 'red';

profilepic.style.display = 'block';
profilepic.style.marginLeft = 'auto';
profilepic.style.marginright = 'auto';
// profilepic.style.margintop = '20px';
profilepic.style.width = '250px';
profilepic.style.height = '250px';
profilepic.style.borderRadius = '50%';

iconpic.style.borderRadius = '50%';
}
inputfile.onchange = function(){
profilepic.src = URL.createObjectURL(inputfile.files[0]);
iconpic.src = URL.createObjectURL(inputfile.files[0]);
}