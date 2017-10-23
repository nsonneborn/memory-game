var BoxOpened = "";
var ImgOpened = "";
var Counter = 0;
var ImgFound = 0;
var numImg = 0;
var seconds = 100;

var Source = "#boxcard";

var ImgSource = [
  "images/ada-lovelace.jpg",
  "images/ellen-ochoa.jpg",
  "images/grace-hopper.png",
  "images/katherine_johnson.jpg",
  "images/marie-curie.jpg",
  "images/rosalind-franklin.png",
  "images/sophie-germain.jpg",
  "images/women-eniac.jpg",
  "images/women-in-tech.jpg",
  "images/WomenSTEM.jpg"
];

function promptUser() {
    numImg = prompt("Welcome! How many different images would you like to play with? (3-10)", "");
    while (!(numImg >= 3 && numImg <= 10 )){
      numImg = prompt("Invalid input. Please enter a number between 3 and 10. How many images would you like to play with?", "");
    }
    seconds = prompt("How many seconds would you like to play? (Enter a number between 10 and 120)", "");
    while(!(seconds >= 10 && seconds <= 120)){
      seconds= prompt("Invalid input. Please enter a number between 10 and 120. How many seconds would you like to play?.", "");
    }
}

function RandomFunction(MaxValue, MinValue) {
		return Math.round(Math.random() * (MaxValue - MinValue) + MinValue);
	}

function ShuffleImages() {
	var ImgAll = $(Source).children();
	var ImgThis = $(Source + " div:first-child");
	var ImgArr = new Array();


	for (var i = 0; i < numImg; i++) {
		ImgArr[i] = $("#" + ImgThis.attr("id") + " img").attr("src");
		ImgThis = ImgThis.next();
	}

		ImgThis = $(Source + " div:first-child");

	for (var z = 0; z < ImgAll.length; z++) {
	var RandomNumber = RandomFunction(0, ImgArr.length - 1);

		$("#" + ImgThis.attr("id") + " img").attr("src", ImgArr[RandomNumber]);
		ImgArr.splice(RandomNumber, 1);
		ImgThis = ImgThis.next();
	}
}

function ResetGame() {
  numImg = 0;
  seconds = 0;
	$(Source + " div img").hide();
	$(Source + " div").css("visibility", "visible");
	Counter = 0;
	$("#success").remove();
	$("#counter").html("" + Counter);
	BoxOpened = "";
	ImgOpened = "";
	ImgFound = 0;
  //playGame();
	return false;
}

function OpenCard() {

	var id = $(this).attr("id");

	if ($("#" + id + " img").is(":hidden")) {
		$(Source + " div").unbind("click", OpenCard);

		$("#" + id + " img").slideDown('fast');

		if (ImgOpened == "") {
			BoxOpened = id;
			ImgOpened = $("#" + id + " img").attr("src");
			setTimeout(function() {
				$(Source + " div").bind("click", OpenCard)
			}, 300);
		} else {
			CurrentOpened = $("#" + id + " img").attr("src");
			if (ImgOpened != CurrentOpened) {
				setTimeout(function() {
					$("#" + id + " img").slideUp('fast');
					$("#" + BoxOpened + " img").slideUp('fast');
					BoxOpened = "";
					ImgOpened = "";
				}, 400);
			} else {
				$("#" + id + " img").parent().css("visibility", "hidden");
				$("#" + BoxOpened + " img").parent().css("visibility", "hidden");
				ImgFound++;
				BoxOpened = "";
				ImgOpened = "";
			}
			setTimeout(function() {
				$(Source + " div").bind("click", OpenCard)
			}, 400);
		}
		Counter++;
		$("#counter").html("" + Counter);

		if (ImgFound == ImgSource.length) {
			$("#counter").prepend('<span id="success">You Found All Pictures With </span>');
    }
    if (Counter == 1){
    setInterval(function(){
      $('#counter').prepend('<span id="success">You Found "'+ ImgFound + ' Pictures With </span>');
    }, seconds*1000);
  }
	}
}

$(function() {
  promptUser();
  var ImgSourceTrimmed = ImgSource.slice(0, numImg);
  ShuffleImages();
for (var y = 1; y < 3 ; y++) {
	$.each(ImgSourceTrimmed, function(i, val) {
		$(Source).append("<div id=card" + y + i + "><img src=" + val + " />");
	});
}
	$(Source + " div").click(OpenCard);
});

// function playGame() {
//     promptUser();
//     var ImgSourceTrimmed = ImgSource.slice(0, numImg);
//     ShuffleImages();
//   for (var y = 1; y < 3 ; y++) {
//   	$.each(ImgSourceTrimmed, function(i, val) {
//   		$(Source).append("<div id=card" + y + i + "><img src=" + val + " />");
//   	});
//   }
//   	$(Source + " div").click(OpenCard);
//
// }
//
// playGame();
