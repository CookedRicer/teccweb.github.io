/**
 * Work with xlsx.js
 * Read the post.xlsx and generate post & post page
 * dev:Fred Cheung 2024-1Mar © 2023 Teccelerates. All Rights Reserved.
 *
 */
const getExcelData = async () => {
  const url = "/post.xlsx";
  const data = await (await fetch(url)).arrayBuffer();
  /* data is an ArrayBuffer */
  const postSheetResult = await XLSX.read(data);
  const postSheet = await postSheetResult.Sheets[postSheetResult.SheetNames[0]];
  const postJson = XLSX.utils.sheet_to_json(postSheet);
  console.log("xlsx", postJson);
  return postJson;
};

const initPost = async () => {
  const postData = await getExcelData();
  const postListElement = document.getElementById("post-list");
  postData.forEach((post) => {
    postListElement.innerHTML += /*html*/ `
	<section class="col-6 col-12-narrower">
	<div class="box post">
		<a href="/posts?id=${post.index}" class="image left"><img src="/images/${post.images}" alt="" /></a>
		<div class="inner">
			<h3><a href="/posts?id=${post.id}">${post.title}</a></h3>
			<p>
				${post.desc}
			</p>
		</div>
	</div>
</section>`;
  });
};
initPost();
