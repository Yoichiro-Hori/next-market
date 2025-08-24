import Link from "next/link";
const getSingleItem = async (id) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`,
    { cache: "no-cache" }
  );
  const jsonData = await response.json();
  return jsonData.singleItem;
};

const ReadSingleItem = async (context) => {
  const resolvedParams = await context.params;
  const singleItem = await getSingleItem(resolvedParams.id);
  return (
    <div className="grid-container-si">
      <div>
        <img src={singleItem.image} />
      </div>
      <div>
        <h2>¥{singleItem.price}</h2>
        <h3>{singleItem.title}</h3>
        <hr />
        <p>{singleItem.description}</p>
        <div>
          <Link href={`/item/update/${singleItem._id}`}>アイテム編集</Link>
          <Link href={`/item/delete/${singleItem._id}`}>アイテム削除</Link>
        </div>
      </div>
    </div>
  );
};

export default ReadSingleItem;
