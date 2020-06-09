/* main.js */

window.onload = () => {
	var downloadCSV = document.getElementById("downloadCSV");
}

const loadImage = (input) => {
	// 描画領域の初期化
	clearImage();
	// 選択したファイルの読み込み
	const file = input.files[0];
	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = (ev) => {
		// 読み込んだ画像をセットする
		const src_data = ev.target.result;
		let img = new Image();
		img.src = src_data;
		img.onload = (e) => {
			// canvas要素を用意し読み込んだ画像を貼り付ける
			const image = e.target;
			let cv = document.createElement("canvas");
			cv.width = image.naturalWidth;
			cv.height = image.naturalHeight;
			let ct = cv.getContext("2d");
			ct.drawImage(image, 0, 0);
			let data = ct.getImageData(0, 0, cv.width, cv.height);
			// 描画領域に作成したcanvas要素を追加する
			document.getElementById("image_area").appendChild(cv);
		}
	}
	downloadCSV.disabled = false;
}

const clearImage = () => {
	let image_area = document.getElementById("image_area");
	while (image_area.firstChild) {
		image_area.removeChild(image_area.firstChild);
	}
	downloadCSV.disabled = true;
}

const getPixelCSV = () => {
	let canvas = document.querySelector("canvas");
	let width = canvas.width;
	let context = canvas.getContext("2d");
	let pixelArray = context.getImageData(0, 0, canvas.width, canvas.height);
	let d = pixelArray.data;
	// ピクセルごとにRGBA値をまとめる
	let tmp = [];
	for (let i = 0; i < d.length; i = i + 4) {
		tmp.push(d.slice(i, i + 4).join(" "));
	}
	// ピクセルを行ごとにまとめる
	let data = [];
	for (let i = 0; i < tmp.length; i = i + width) {
		data.push(tmp.slice(i, i + width).join(","));
	}
	// CSVとして書き出す
	let csvData = "data:text/csv;charset=UTF-8," + data.join("\n");
	let encodedURI = encodeURI(csvData);
	let link = document.createElement("a");
	link.href = encodedURI;
	link.download = "photo.csv";
	link.click();
}

