import { useState, useEffect } from "react";
import { BanIcon } from "lucide-react";

function Asset({ name = "", type = "item", size = "small", alt = "" }) {
  let [imageExists, setImageExists] = useState(false);
	let [imagePath, setImagePath] = useState("");

  useEffect(() => {
		let imgSrc = "/assets";
		let imgName = name.replaceAll(" ", "_");
		let folder = "item_icons";
		let imgType = type.toLowerCase();
		
		// remove the last character if it's a period - notably for "Glacierfish Jr."
		// do NOT remove periods elsewhere - "Ms._Angler" exists!
		if(imgName.slice(-1) === ".") imgName = imgName.substring(0, imgName.length - 1);

		if (imgType === "npc") {
			imgName += size.toLowerCase() === "small" ? "_Icon" : "";
			folder = size.toLowerCase() === "small" ? "npc_icons" : "npc_portraits";
		} else if (imgType === "season") {
			folder = "season_icons";
		} else if(imgType === "fish") {
			folder = "fish_icons";
		} else if(imgType === "cooked goods" || imgType === "cooked dish") {
			folder = "cookedgoods_icons";
		}

		let testPath = `${imgSrc}/${folder}/${imgName}.png`;

		const checkImage = (path) => {
			const img = new Image();
			img.src = path;

			if (img.complete) {
				setImagePath(path);
				setImageExists(true);
			} else {
				img.onload = () => {
					setImagePath(path);
					setImageExists(true);
				};
				img.onerror = () => {
					setImageExists(false);
				};
			}
		};
		checkImage(testPath);
	})

  return (
    <>{imageExists ? <img src={imagePath} alt={alt} className={`icon ${size}`} /> : <BanIcon size={64} color="pink" />}</>
  );
}

export default Asset;
