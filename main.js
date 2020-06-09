/* main.js */

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
}

const clearImage = () => {
	let image_area = document.getElementById("image_area");
	while (image_area.firstChild) {
		image_area.removeChild(image_area.firstChild);
	}
}
