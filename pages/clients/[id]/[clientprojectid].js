import { useRouter } from "next/router";

function SelectedClientProjectPag() {
  const router = useRouter();
  console.log(router.pathname);
  console.log(router.query);

  return (
    <div>
      <h1>A specific client's specific Project Page</h1>
      <p>Client's Project ID</p>
    </div>
  );
}

export default SelectedClientProjectPag;
